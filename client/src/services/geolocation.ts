/**
 * Serviço Centralizado de Geolocalização
 * 
 * Este serviço detecta a localização do usuário usando:
 * 1. Sistema de votação com 4 APIs de geolocalização por IP
 * 2. Validação de país (apenas Brasil)
 * 3. Fallback inteligente usando DDD do número de telefone
 * 4. Cache no localStorage para evitar múltiplas chamadas
 */

export interface LocationData {
  ip: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  isp?: string;
}

interface APIResult {
  city: string;
  region: string;
  country: string;
  latitude: number;
  longitude: number;
  ip?: string;
  org?: string;
}

// Mapeamento de DDD para cidade (fallback)
const dddToCity: Record<string, { city: string; region_code: string }> = {
  "11": { city: "São Paulo", region_code: "SP" },
  "12": { city: "São José dos Campos", region_code: "SP" },
  "13": { city: "Santos", region_code: "SP" },
  "14": { city: "Bauru", region_code: "SP" },
  "15": { city: "Sorocaba", region_code: "SP" },
  "16": { city: "Ribeirão Preto", region_code: "SP" },
  "17": { city: "São José do Rio Preto", region_code: "SP" },
  "18": { city: "Presidente Prudente", region_code: "SP" },
  "19": { city: "Campinas", region_code: "SP" },
  "21": { city: "Rio de Janeiro", region_code: "RJ" },
  "22": { city: "Campos dos Goytacazes", region_code: "RJ" },
  "24": { city: "Volta Redonda", region_code: "RJ" },
  "27": { city: "Vitória", region_code: "ES" },
  "28": { city: "Cachoeiro de Itapemirim", region_code: "ES" },
  "31": { city: "Belo Horizonte", region_code: "MG" },
  "32": { city: "Juiz de Fora", region_code: "MG" },
  "33": { city: "Governador Valadares", region_code: "MG" },
  "34": { city: "Uberlândia", region_code: "MG" },
  "35": { city: "Poços de Caldas", region_code: "MG" },
  "37": { city: "Divinópolis", region_code: "MG" },
  "38": { city: "Montes Claros", region_code: "MG" },
  "41": { city: "Curitiba", region_code: "PR" },
  "42": { city: "Ponta Grossa", region_code: "PR" },
  "43": { city: "Londrina", region_code: "PR" },
  "44": { city: "Maringá", region_code: "PR" },
  "45": { city: "Foz do Iguaçu", region_code: "PR" },
  "46": { city: "Francisco Beltrão", region_code: "PR" },
  "47": { city: "Joinville", region_code: "SC" },
  "48": { city: "Florianópolis", region_code: "SC" },
  "49": { city: "Chapecó", region_code: "SC" },
  "51": { city: "Porto Alegre", region_code: "RS" },
  "53": { city: "Pelotas", region_code: "RS" },
  "54": { city: "Caxias do Sul", region_code: "RS" },
  "55": { city: "Santa Maria", region_code: "RS" },
  "61": { city: "Brasília", region_code: "DF" },
  "62": { city: "Goiânia", region_code: "GO" },
  "63": { city: "Palmas", region_code: "TO" },
  "64": { city: "Rio Verde", region_code: "GO" },
  "65": { city: "Cuiabá", region_code: "MT" },
  "66": { city: "Rondonópolis", region_code: "MT" },
  "67": { city: "Campo Grande", region_code: "MS" },
  "68": { city: "Rio Branco", region_code: "AC" },
  "69": { city: "Porto Velho", region_code: "RO" },
  "71": { city: "Salvador", region_code: "BA" },
  "73": { city: "Ilhéus", region_code: "BA" },
  "74": { city: "Juazeiro", region_code: "BA" },
  "75": { city: "Feira de Santana", region_code: "BA" },
  "77": { city: "Barreiras", region_code: "BA" },
  "79": { city: "Aracaju", region_code: "SE" },
  "81": { city: "Recife", region_code: "PE" },
  "82": { city: "Maceió", region_code: "AL" },
  "83": { city: "João Pessoa", region_code: "PB" },
  "84": { city: "Natal", region_code: "RN" },
  "85": { city: "Fortaleza", region_code: "CE" },
  "86": { city: "Teresina", region_code: "PI" },
  "87": { city: "Petrolina", region_code: "PE" },
  "88": { city: "Juazeiro do Norte", region_code: "CE" },
  "89": { city: "Picos", region_code: "PI" },
  "91": { city: "Belém", region_code: "PA" },
  "92": { city: "Manaus", region_code: "AM" },
  "93": { city: "Santarém", region_code: "PA" },
  "94": { city: "Marabá", region_code: "PA" },
  "95": { city: "Boa Vista", region_code: "RR" },
  "96": { city: "Macapá", region_code: "AP" },
  "97": { city: "Tefé", region_code: "AM" },
  "98": { city: "São Luís", region_code: "MA" },
  "99": { city: "Imperatriz", region_code: "MA" },
};

// Coordenadas aproximadas das principais cidades por DDD
const dddCoordinates: Record<string, { lat: number; lon: number }> = {
  "11": { lat: -23.5505, lon: -46.6333 }, // São Paulo
  "19": { lat: -22.9099, lon: -47.0626 }, // Campinas
  "21": { lat: -22.9068, lon: -43.1729 }, // Rio de Janeiro
  "31": { lat: -19.9167, lon: -43.9345 }, // Belo Horizonte
  "41": { lat: -25.4284, lon: -49.2733 }, // Curitiba
  "47": { lat: -26.3045, lon: -48.8487 }, // Joinville
  "48": { lat: -27.5954, lon: -48.5480 }, // Florianópolis
  "51": { lat: -30.0346, lon: -51.2177 }, // Porto Alegre
  "61": { lat: -15.8267, lon: -47.9218 }, // Brasília
  "71": { lat: -12.9714, lon: -38.5014 }, // Salvador
  "81": { lat: -8.0476, lon: -34.8770 }, // Recife
  "85": { lat: -3.7172, lon: -38.5433 }, // Fortaleza
};

const CACHE_KEY = "user_location_data";
const CACHE_DURATION = 1000 * 60 * 30; // 30 minutos

/**
 * Obtém a localização do cache se ainda estiver válida
 */
function getLocationFromCache(): LocationData | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const now = Date.now();

    // Verifica se o cache ainda é válido
    if (now - timestamp < CACHE_DURATION) {
      console.log("📍 Usando localização do cache:", data.city);
      return data;
    }

    // Cache expirado
    localStorage.removeItem(CACHE_KEY);
    return null;
  } catch (error) {
    console.error("Erro ao ler cache de localização:", error);
    return null;
  }
}

/**
 * Salva a localização no cache
 */
function saveLocationToCache(location: LocationData): void {
  try {
    const cacheData = {
      data: location,
      timestamp: Date.now(),
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
    console.log("💾 Localização salva no cache:", location.city);
  } catch (error) {
    console.error("Erro ao salvar cache de localização:", error);
  }
}

/**
 * Detecta a localização do usuário usando sistema de votação com 4 APIs
 * @param phoneNumber - Número de telefone para fallback por DDD (opcional)
 * @param forceRefresh - Força nova detecção ignorando cache
 */
export async function detectUserLocation(
  phoneNumber?: string,
  forceRefresh: boolean = false
): Promise<LocationData> {
  // Verifica cache primeiro (se não for forçar refresh)
  if (!forceRefresh) {
    const cached = getLocationFromCache();
    if (cached) return cached;
  }

  console.log("🌍 Iniciando detecção de localização...");

  // Extrair DDD do número de telefone para fallback
  const ddd = phoneNumber ? phoneNumber.replace(/\D/g, "").substring(0, 2) : "11";
  const dddLocation = dddToCity[ddd] || dddToCity["11"];

  const defaultLocation = {
    ip: "Unknown",
    city: dddLocation.city,
    state: dddLocation.region_code,
    country: "Brasil",
    latitude: dddCoordinates[ddd]?.lat || -23.5505,
    longitude: dddCoordinates[ddd]?.lon || -46.6333,
    isp: "Provedor de Internet",
  };

  const apiResults: APIResult[] = [];

  // API 1: ipapi.co
  try {
    const response = await fetch("https://ipapi.co/json/", {
      signal: AbortSignal.timeout(3000),
    });
    if (response.ok) {
      const apiData = await response.json();
      if (
        apiData &&
        apiData.latitude &&
        apiData.longitude &&
        (apiData.country_code === "BR" || apiData.country === "Brazil")
      ) {
        apiResults.push({
          city: apiData.city,
          region: apiData.region_code || apiData.region,
          country: "Brasil",
          latitude: apiData.latitude,
          longitude: apiData.longitude,
          ip: apiData.ip,
          org: apiData.org,
        });
        console.log("✅ API 1 (ipapi.co):", apiData.city);
      }
    }
  } catch (e) {
    console.log("❌ API 1 (ipapi.co) falhou");
  }

  // API 2: ip-api.com
  try {
    const response = await fetch("https://ip-api.com/json/", {
      signal: AbortSignal.timeout(3000),
    });
    if (response.ok) {
      const apiData = await response.json();
      if (
        apiData &&
        apiData.lat &&
        apiData.lon &&
        (apiData.countryCode === "BR" || apiData.country === "Brazil")
      ) {
        apiResults.push({
          city: apiData.city,
          region: apiData.regionName || apiData.region,
          country: "Brasil",
          latitude: apiData.lat,
          longitude: apiData.lon,
          ip: apiData.query,
          org: apiData.isp || apiData.org,
        });
        console.log("✅ API 2 (ip-api.com):", apiData.city);
      }
    }
  } catch (e) {
    console.log("❌ API 2 (ip-api.com) falhou");
  }

  // API 3: ipwho.is
  try {
    const response = await fetch("https://ipwho.is/", {
      signal: AbortSignal.timeout(3000),
    });
    if (response.ok) {
      const apiData = await response.json();
      if (
        apiData &&
        apiData.latitude &&
        apiData.longitude &&
        (apiData.country_code === "BR" || apiData.country === "Brazil")
      ) {
        apiResults.push({
          city: apiData.city,
          region: apiData.region,
          country: "Brasil",
          latitude: apiData.latitude,
          longitude: apiData.longitude,
          ip: apiData.ip,
          org: apiData.connection?.isp || "Provedor de Internet",
        });
        console.log("✅ API 3 (ipwho.is):", apiData.city);
      }
    }
  } catch (e) {
    console.log("❌ API 3 (ipwho.is) falhou");
  }

  // API 4: ipinfo.io
  try {
    const response = await fetch("https://ipinfo.io/json", {
      signal: AbortSignal.timeout(3000),
    });
    if (response.ok) {
      const apiData = await response.json();
      if (apiData && apiData.loc && apiData.country === "BR") {
        const [lat, lon] = apiData.loc.split(",").map(Number);
        apiResults.push({
          city: apiData.city,
          region: apiData.region,
          country: "Brasil",
          latitude: lat,
          longitude: lon,
          ip: apiData.ip,
          org: apiData.org || "Provedor de Internet",
        });
        console.log("✅ API 4 (ipinfo.io):", apiData.city);
      }
    }
  } catch (e) {
    console.log("❌ API 4 (ipinfo.io) falhou");
  }

  // Sistema de votação: contar qual cidade apareceu mais vezes
  let finalData = defaultLocation;

  if (apiResults.length > 0) {
    const cityVotes: Record<string, { count: number; data: APIResult }> = {};

    apiResults.forEach((result) => {
      const city = result.city;
      if (cityVotes[city]) {
        cityVotes[city].count++;
      } else {
        cityVotes[city] = { count: 1, data: result };
      }
    });

    // Encontrar a cidade com mais votos
    let winnerCity = "";
    let maxVotes = 0;

    Object.entries(cityVotes).forEach(([city, info]) => {
      console.log(`🗳️ Votação: ${city} = ${info.count} voto(s)`);
      if (info.count > maxVotes) {
        maxVotes = info.count;
        winnerCity = city;
      }
    });

    if (winnerCity && cityVotes[winnerCity]) {
      const winner = cityVotes[winnerCity].data;
      finalData = {
        ip: winner.ip || defaultLocation.ip,
        city: winner.city,
        state: winner.region,
        country: "Brasil",
        latitude: winner.latitude,
        longitude: winner.longitude,
        isp: winner.org || "Provedor de Internet",
      };
      console.log(
        `🏆 Cidade vencedora por maioria: ${winnerCity} (${maxVotes} votos)`
      );
    }
  } else {
    console.log(
      `⚠️ Nenhuma API retornou dados brasileiros, usando localização baseada no DDD: ${ddd} → ${dddLocation.city}`
    );
  }

  const location: LocationData = {
    ip: finalData.ip,
    city: finalData.city,
    state: finalData.state,
    country: "Brasil",
    latitude: Number(finalData.latitude),
    longitude: Number(finalData.longitude),
    isp: finalData.isp,
  };

  // Salvar no cache
  saveLocationToCache(location);

  return location;
}

/**
 * Limpa o cache de localização
 */
export function clearLocationCache(): void {
  localStorage.removeItem(CACHE_KEY);
  console.log("🗑️ Cache de localização limpo");
}

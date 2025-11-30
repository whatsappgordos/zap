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
  apiName?: string;
  weight?: number;
}

// Pesos de confiabilidade das APIs (quanto maior, mais confiável)
const API_WEIGHTS: Record<string, number> = {
  "ipinfo.io": 3,      // Mais confiável
  "ipapi.co": 3,       // Mais confiável
  "ip-api.com": 2,     // Confiável
  "ipwho.is": 2,       // Confiável
  "ipgeolocation.io": 1, // Menos confiável (free tier)
  "ipapi.com": 1,      // Menos confiável
};

/**
 * Extrai o DDD de um número de telefone brasileiro
 */
function extractDDD(phoneNumber: string): string {
  const cleaned = phoneNumber.replace(/\D/g, "");
  return cleaned.substring(0, 2);
}

/**
 * Verifica se uma cidade pertence a um determinado DDD
 */
function cityBelongsToDDD(city: string, ddd: string): boolean {
  const dddInfo = dddToCity[ddd];
  if (!dddInfo) return false;
  
  // Verifica se é a cidade principal do DDD
  if (city === dddInfo.city) return true;
  
  // Verifica se está na lista de cidades do DDD
  const citiesList = dddCities[ddd];
  if (citiesList) {
    // Normalizar para comparação (remover acentos e maiúsculas)
    const normalizedCity = city.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    const found = citiesList.some(c => 
      c.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase() === normalizedCity
    );
    if (found) return true;
  }
  
  // Verifica se é uma cidade da região metropolitana
  const metropolitanList = metropolitanCities[ddd];
  if (metropolitanList && metropolitanList.includes(city)) return true;
  
  return false;
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

// Cidades da região metropolitana de SÃO PAULO (DDD 11) que devem ser normalizadas para "São Paulo"
const metropolitanCities: Record<string, string[]> = {
  "11": [
    "Francisco Morato", "Guarulhos", "Osasco", "Carapicuíba", "Barueri", 
    "Cotia", "Itaquaquecetuba", "Taboão da Serra", "Embu das Artes", 
    "Diadema", "Mauá", "Santo André", "São Bernardo do Campo", 
    "São Caetano do Sul", "Suzano", "Mogi das Cruzes", "Ferraz de Vasconcelos",
    "Poá", "Itapevi", "Jandira", "Franco da Rocha", "Caieiras", "Mairiporã"
  ],
};

// Todas as cidades que pertencem a cada DDD (para validação)
const dddCities: Record<string, string[]> = {
  "11": [
    "São Paulo", "Guarulhos", "Osasco", "Santo André", "São Bernardo do Campo",
    "São Caetano do Sul", "Diadema", "Mauá", "Suzano", "Mogi das Cruzes",
    "Taboao da Serra", "Embu das Artes", "Cotia", "Itaquaquecetuba", "Barueri",
    "Carapicuíba", "Francisco Morato", "Franco da Rocha", "Caieiras", "Mairiporã"
  ],
  "12": [
    "São José dos Campos", "Jacareí", "Taubaté", "Guaratinguetá", "Pindamonhangaba",
    "Caraguatatuba", "São Sebastião", "Campos do Jordão", "Ubatuba"
  ],
  "13": [
    "Santos", "São Vicente", "Guarujá", "Praia Grande", "Cubatão",
    "Itanhaém", "Peruibe", "Mongaguá"
  ],
  "14": [
    "Bauru", "Jaú", "Lençóis Paulista", "Botucatu", "Avaré",
    "Ourinhos", "Marília"
  ],
  "15": [
    "Sorocaba", "Itapetininga", "Tatuí", "Itu", "Salto",
    "Votorantim", "Araçoiaba da Serra"
  ],
  "16": [
    "Ribeirão Preto", "Franca", "Araraquara", "São Carlos",
    "Sertãozinho", "Bebedouro", "Jaboticabal"
  ],
  "17": [
    "São José do Rio Preto", "Catanduva", "Votuporanga", "Fernandópolis",
    "Jales", "Birigui"
  ],
  "18": [
    "Presidente Prudente", "Araçatuba", "Birigui", "Andradina",
    "Dracena", "Adamantina"
  ],
  "19": [
    "Campinas", "Piracicaba", "Limeira", "Americana", "Rio Claro",
    "Sumaré", "Hortolândia", "Indaiatuba", "Paulínia", "Valinhos",
    "Vinhedo", "Santa Bárbara d'Oeste", "Mogi Guaçu", "Mogi Mirim",
    "São João da Boa Vista", "Araras", "Leme", "Pirassununga",
    "Porto Ferreira", "Capivari", "Itatiba", "Jaguariúna", "Pedreira",
    "Amparo", "Socorro", "Braganca Paulista", "Atibaia", "Jundiai"
  ],
  "21": [
    "Rio de Janeiro", "Niterói", "São Gonçalo", "Duque de Caxias",
    "Nova Iguaçu", "Belford Roxo", "São João de Meriti", "Nilopólis",
    "Mesquita", "Queimados", "Magé"
  ],
  "31": [
    "Belo Horizonte", "Contagem", "Betim", "Ribeirão das Neves",
    "Santa Luzia", "Sabará", "Vespasiano", "Nova Lima"
  ],
  "22": ["Campos dos Goytacazes", "Macaé", "Cabo Frio", "Nova Friburgo", "Itaperuna"],
  "24": ["Volta Redonda", "Barra Mansa", "Resende", "Angra dos Reis", "Três Rios"],
  "27": ["Vitória", "Vila Velha", "Serra", "Cariacica", "Viana", "Guarapari", "Linhares"],
  "28": ["Cachoeiro de Itapemirim", "Colatina", "São Mateus", "Aracruz"],
  "32": ["Juiz de Fora", "Petrópolis", "Barbacena", "São João del Rei"],
  "33": ["Governador Valadares", "Teófilo Otoni", "Ipatinga", "Coronel Fabriciano"],
  "34": ["Uberlândia", "Uberaba", "Patos de Minas", "Araguari"],
  "35": ["Pouso Alegre", "Varginha", "Pocos de Caldas", "Alfenas", "Lavras"],
  "37": ["Divinópolis", "Formiga", "Itauna", "Para de Minas"],
  "38": ["Montes Claros", "Janauba", "Salinas", "Pirapora"],
  "41": ["Curitiba", "São José dos Pinhais", "Colombo", "Pinhais", "Araucária"],
  "42": ["Ponta Grossa", "Guarapuava", "Irati", "Telmaco Borba"],
  "43": ["Londrina", "Cambe", "Rolandia", "Arapongas"],
  "44": ["Maringá", "Sarandi", "Paranavaí", "Umuarama", "Cianorte"],
  "45": ["Foz do Iguaçu", "Cascavel", "Toledo", "Guaira"],
  "46": ["Francisco Beltrão", "Pato Branco", "Dois Vizinhos"],
  "47": ["Joinville", "Blumenau", "Itajai", "Balneário Camboriu", "Jaragua do Sul"],
  "48": ["Florianópolis", "São José", "Palhoca", "Biguacu", "Laguna"],
  "49": ["Chapecó", "Lages", "Criciúma", "Tubarão", "Ararangua"],
  "51": ["Porto Alegre", "Canoas", "Gravataí", "Viamão", "Alvorada", "Cachoeirinha"],
  "53": ["Pelotas", "Rio Grande", "Bagé", "São Lourenço do Sul"],
  "54": ["Caxias do Sul", "Bento Gonçalves", "Farroupilha", "Vacaria"],
  "55": ["Santa Maria", "Uruguaiana", "Santo Angelo", "Cruz Alta"],
  "61": ["Brasília", "Taguatinga", "Ceilândia", "Samambaia", "Planaltina"],
  "62": ["Goiânia", "Aparecida de Goiânia", "Anápolis", "Rio Verde", "Luziania"],
  "63": ["Palmas", "Araguaína", "Gurupi", "Porto Nacional"],
  "64": ["Rio Verde", "Itumbiara", "Caldas Novas", "Catalão"],
  "65": ["Cuiabá", "Várzea Grande", "Rondonópolis", "Sinop"],
  "66": ["Rondonópolis", "Sinop", "Tangara da Serra", "Caceres"],
  "67": ["Campo Grande", "Dourados", "Três Lagoas", "Corumbá"],
  "68": ["Rio Branco", "Cruzeiro do Sul", "Sena Madureira"],
  "69": ["Porto Velho", "Ji-Paraná", "Ariquemes", "Vilhena"],
  "71": ["Salvador", "Feira de Santana", "Lauro de Freitas", "Camacari"],
  "73": ["Ilhéus", "Itabuna", "Teixeira de Freitas", "Porto Seguro"],
  "74": ["Juazeiro", "Paulo Afonso", "Senhor do Bonfim"],
  "75": ["Feira de Santana", "Alagoinhas", "Jacobina", "Santo Antonio de Jesus"],
  "77": ["Barreiras", "Luiz Eduardo Magalhães", "Bom Jesus da Lapa"],
  "79": ["Aracaju", "Nossa Senhora do Socorro", "Lagarto", "Itabaiana"],
  "81": ["Recife", "Jaboatão dos Guararapes", "Olinda", "Paulista", "Caruaru"],
  "82": ["Maceió", "Arapiraca", "Rio Largo", "União dos Palmares"],
  "83": ["João Pessoa", "Campina Grande", "Santa Rita", "Patos"],
  "84": ["Natal", "Mossoró", "Parnamirim", "São Gonçalo do Amarante"],
  "85": ["Fortaleza", "Caucaia", "Juazeiro do Norte", "Maracanaú", "Sobral"],
  "86": ["Teresina", "Parnaíba", "Picos", "Floriano"],
  "87": ["Petrolina", "Garanhuns", "Serra Talhada", "Arcoverde"],
  "88": ["Juazeiro do Norte", "Crato", "Sobral", "Iguatu"],
  "89": ["Picos", "Floriano", "Parnaíba"],
  "91": ["Belém", "Ananindeua", "Castanhal", "Marabá", "Santarém"],
  "92": ["Manaus", "Parintins", "Itacoatiara", "Manacapuru"],
  "93": ["Santarém", "Altamira", "Itaituba"],
  "94": ["Marabá", "Parauapebas", "Redencao"],
  "95": ["Boa Vista", "Rorainopolis"],
  "96": ["Macapá", "Santana", "Laranjal do Jari"],
  "97": ["Manaus", "Coari", "Tefe"],
  "98": ["São Luís", "Imperatriz", "Caxias", "Timon", "Codó"],
  "99": ["Imperatriz", "Açailândia", "Bacabal"],
};

/**
 * Normaliza o nome da cidade, substituindo cidades da região metropolitana pela capital
 */
function normalizeCityName(city: string, ddd: string): string {
  const metropolitanList = metropolitanCities[ddd];
  if (metropolitanList && metropolitanList.includes(city)) {
    const capital = dddToCity[ddd];
    console.log(`🔄 Normalizando: ${city} → ${capital.city} (região metropolitana DDD ${ddd})`);
    return capital.city;
  }
  return city;
}

/**
 * Calcula a distância entre dois pontos geográficos (em km)
 */
function calculateGeoDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Raio da Terra em km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Detecta a localização do usuário usando sistema de votação ponderada com 6 APIs
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
          apiName: "ipapi.co",
          weight: API_WEIGHTS["ipapi.co"],
        });
        console.log("✅ API 1 (ipapi.co):", apiData.city, `[peso: ${API_WEIGHTS["ipapi.co"]}]`);
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
          apiName: "ip-api.com",
          weight: API_WEIGHTS["ip-api.com"],
        });
        console.log("✅ API 2 (ip-api.com):", apiData.city, `[peso: ${API_WEIGHTS["ip-api.com"]}]`);
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
          apiName: "ipwho.is",
          weight: API_WEIGHTS["ipwho.is"],
        });
        console.log("✅ API 3 (ipwho.is):", apiData.city, `[peso: ${API_WEIGHTS["ipwho.is"]}]`);
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
          apiName: "ipinfo.io",
          weight: API_WEIGHTS["ipinfo.io"],
        });
        console.log("✅ API 4 (ipinfo.io):", apiData.city, `[peso: ${API_WEIGHTS["ipinfo.io"]}]`);
      }
    }
  } catch (e) {
    console.log("❌ API 4 (ipinfo.io) falhou");
  }

  // API 5: ipgeolocation.io (gratuita)
  try {
    const response = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=free", {
      signal: AbortSignal.timeout(3000),
    });
    if (response.ok) {
      const apiData = await response.json();
      if (
        apiData &&
        apiData.latitude &&
        apiData.longitude &&
        (apiData.country_code2 === "BR" || apiData.country_name === "Brazil")
      ) {
        apiResults.push({
          city: apiData.city,
          region: apiData.state_prov,
          country: "Brasil",
          latitude: parseFloat(apiData.latitude),
          longitude: parseFloat(apiData.longitude),
          ip: apiData.ip,
          org: apiData.isp || "Provedor de Internet",
          apiName: "ipgeolocation.io",
          weight: API_WEIGHTS["ipgeolocation.io"],
        });
        console.log("✅ API 5 (ipgeolocation.io):", apiData.city, `[peso: ${API_WEIGHTS["ipgeolocation.io"]}]`);
      }
    }
  } catch (e) {
    console.log("❌ API 5 (ipgeolocation.io) falhou");
  }

  // API 6: ipapi.com (diferente de ip-api.com)
  try {
    const response = await fetch("https://ipapi.com/ip_api.php?ip=", {
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
          org: apiData.asn?.org || "Provedor de Internet",
          apiName: "ipapi.com",
          weight: API_WEIGHTS["ipapi.com"],
        });
        console.log("✅ API 6 (ipapi.com):", apiData.city, `[peso: ${API_WEIGHTS["ipapi.com"]}]`);
      }
    }
  } catch (e) {
    console.log("❌ API 6 (ipapi.com) falhou");
  }

  // Sistema de votação PONDERADA: cada API tem um peso diferente
  let finalData = defaultLocation;

  if (apiResults.length > 0) {
    console.log(`🔍 Analisando ${apiResults.length} resultado(s) das APIs...`);
    
    // Votação ponderada: cada voto vale o peso da API
    const cityScores: Record<string, { 
      score: number; 
      count: number;
      data: APIResult;
      apis: string[];
    }> = {};

    apiResults.forEach((result) => {
      // Normalizar nome da cidade (apenas para região metropolitana de SP)
      const normalizedCity = normalizeCityName(result.city, ddd);
      const weight = result.weight || 1;
      const apiName = result.apiName || "unknown";
      
      if (cityScores[normalizedCity]) {
        cityScores[normalizedCity].score += weight;
        cityScores[normalizedCity].count++;
        cityScores[normalizedCity].apis.push(apiName);
      } else {
        cityScores[normalizedCity] = { 
          score: weight,
          count: 1,
          data: { ...result, city: normalizedCity },
          apis: [apiName]
        };
      }
    });

    // Encontrar a cidade com maior pontuação
    let winnerCity = "";
    let maxScore = 0;
    let winnerCount = 0;

    Object.entries(cityScores).forEach(([city, info]) => {
      console.log(
        `🗳️ ${city}: ${info.count} voto(s), pontuação = ${info.score} [${info.apis.join(", ")}]`
      );
      if (info.score > maxScore) {
        maxScore = info.score;
        winnerCity = city;
        winnerCount = info.count;
      }
    });

    // Usar a cidade vencedora da votação ponderada
    if (winnerCity && cityScores[winnerCity]) {
      const winner = cityScores[winnerCity].data;
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
        `🏆 Cidade vencedora: ${winnerCity} (${winnerCount} APIs, pontuação: ${maxScore})`
      );
      
      // Validar se a cidade pertence ao DDD correto
      if (!cityBelongsToDDD(winnerCity, ddd)) {
        console.log(
          `⚠️ Cidade ${winnerCity} não pertence ao DDD ${ddd}, usando fallback: ${dddLocation.city}`
        );
        finalData = {
          ...finalData,
          city: dddLocation.city,
          state: dddLocation.region_code,
          latitude: dddCoordinates[ddd]?.lat || defaultLocation.latitude,
          longitude: dddCoordinates[ddd]?.lon || defaultLocation.longitude,
        };
      }
    } else {
      console.log(
        `⚠️ Nenhuma cidade vencedora, usando fallback: ${dddLocation.city}`
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

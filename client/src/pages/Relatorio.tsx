import { useState, useEffect } from "react";
import { StaticMap } from "@/components/StaticMap";

interface Conversation {
  id: string;
  number: string;
  type: "message" | "audio" | "photo";
  title: string;
  time: string;
  messages?: Array<{ text: string; time: string; sender: "you" | "them"; blocked?: boolean }>;
}

interface LocationData {
  ip: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
}

interface MotelData {
  name: string;
  distance: string;
  rating: string;
  latitude: number;
  longitude: number;
}

export default function Relatorio() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [motelData, setMotelData] = useState<MotelData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [mapCity, setMapCity] = useState<string>("");

  useEffect(() => {
    // Recuperar número do localStorage
    const savedPhone = localStorage.getItem("phoneNumber") || "(XX) XXXXX-XXXX";
    setPhoneNumber(savedPhone);
  }, []);

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



  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const defaultLocation = {
          ip: "8.8.8.8",
          city: "Mountain View",
          region: "CA",
          country_name: "United States",
          latitude: 37.4224,
          longitude: -122.0842,
        };

        let data = defaultLocation;

        try {
          const response = await fetch("https://ipapi.co/json/");
          if (response.ok) {
            const apiData = await response.json();
            if (apiData && apiData.latitude && apiData.longitude) {
              data = apiData;
            }
          }
        } catch (e) {
          try {
            const response = await fetch("https://ip-api.com/json/");
            if (response.ok) {
              const apiData = await response.json();
              if (apiData && apiData.lat && apiData.lon) {
                data = {
                  ip: apiData.query || defaultLocation.ip,
                  city: apiData.city || defaultLocation.city,
                  region: apiData.region || defaultLocation.region,
                  country_name: apiData.country || defaultLocation.country_name,
                  latitude: apiData.lat,
                  longitude: apiData.lon,
                };
              }
            }
          } catch (e2) {
            console.log("APIs falharam, usando fallback");
          }
        }

        if (!data.latitude || !data.longitude) {
          data = defaultLocation;
        }

        const location: LocationData = {
          ip: data.ip || defaultLocation.ip,
          city: data.city || defaultLocation.city,
          state: data.region || defaultLocation.region,
          country: data.country_name || defaultLocation.country_name,
          latitude: Number(data.latitude) || defaultLocation.latitude,
          longitude: Number(data.longitude) || defaultLocation.longitude,
        };

        setLocationData(location);

        // Atualizar mapa com localização por DDD
        const ddd = phoneNumber.replace(/\D/g, "").substring(0, 2);
        const locationInfo = dddToCity[ddd] || dddToCity["11"];
        setMapCity(locationInfo.city);

        const calculateDistance = (
          lat1: number,
          lon1: number,
          lat2: number,
          lon2: number
        ): number => {
          const R = 6371;
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
        };

        const lat = Number(location.latitude);
        const lon = Number(location.longitude);

        const motels = [
          {
            name: "Motel Paraíso",
            latitude: lat + 0.02,
            longitude: lon + 0.02,
            rating: "4.5",
          },
          {
            name: "Motel Luxo",
            latitude: lat - 0.015,
            longitude: lon + 0.025,
            rating: "4.2",
          },
          {
            name: "Motel Discreto",
            latitude: lat + 0.01,
            longitude: lon - 0.015,
            rating: "4.7",
          },
        ];

        const motelsWithDistance = motels.map((motel) => ({
          ...motel,
          distance: calculateDistance(lat, lon, motel.latitude, motel.longitude),
        }));

        const closestMotel = motelsWithDistance.reduce((prev, current) =>
          prev.distance < current.distance ? prev : current
        );

        const distance = closestMotel?.distance ?? 1.7;
        const distanceStr = typeof distance === "number" ? distance.toFixed(1) : "1.7";

        setMotelData({
          name: closestMotel?.name || "Motel Discreto",
          distance: distanceStr + " km",
          rating: closestMotel?.rating || "4.7",
          latitude: closestMotel?.latitude || lat,
          longitude: closestMotel?.longitude || lon,
        });
      } catch (error) {
        console.error("Error fetching location:", error);
        setMotelData({
          name: "Motel Discreto",
          distance: "1.7 km",
          rating: "4.7",
          latitude: 37.4224,
          longitude: -122.0842,
        });
        // Fallback para mapa
        setMapCity("São Paulo");
      } finally {
        setLoadingLocation(false);
      }
    };

    fetchLocation();
  }, [phoneNumber]);

  const conversations: Conversation[] = [
    {
      id: "1",
      number: "+55 XX 9XXXX-8392",
      type: "message",
      title: "Mensagem apagada recuperada",
      time: "Ontem",
      messages: [
        { text: "Oi, tudo bem?", time: "14:22", sender: "them" },
        { text: "Tudo sim e você?", time: "14:23", sender: "you" },
        { text: "[Bloqueado]", time: "14:25", sender: "them", blocked: true },
      ],
    },
    {
      id: "2",
      number: "+55 XX 9XXXX-7381",
      type: "audio",
      title: "Áudio suspeito detectado",
      time: "3 dias",
      messages: [
        { text: "Eiiii", time: "09:15", sender: "them" },
        { text: "to aqui amor", time: "09:17", sender: "them" },
        { text: "[Áudio bloqueado]", time: "09:20", sender: "them", blocked: true },
      ],
    },
    {
      id: "3",
      number: "+55 XX 9XXXX-0032",
      type: "photo",
      title: "Fotos suspeitas encontradas",
      time: "1 semana",
      messages: [
        { text: "Cadê você não vai me mandar?", time: "20:05", sender: "them" },
        { text: "Claro, rsrsrs 😏", time: "20:07", sender: "you" },
        { text: "[Foto bloqueada]", time: "20:10", sender: "them", blocked: true },
      ],
    },
  ];

  const handleUnlock = (type: string) => {
    // Link de checkout da Kirvano
    const checkoutLink = "https://pay.kirvano.com/e2b9e430-3a62-4916-bc03-9839198d1570";
    window.location.href = checkoutLink;
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-green-500 border-2 border-black rounded-2xl p-8 text-white text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Relatório de Acesso ao WhatsApp</h1>
          <p className="text-lg">Confira abaixo os principais dados recuperados da análise do número informado.</p>
        </div>

        {/* Análise de Conversas */}
        <div className="bg-white border-2 border-black rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-black mb-4">Análise de Conversas</h2>
          <p className="text-gray-700 mb-6">
            <span className="text-red-600 font-bold">148 conversas suspeitas</span> foram encontradas. O sistema conseguiu recuperar{" "}
            <span className="text-orange-500 font-bold">mensagens apagadas</span>.
          </p>

          <div className="space-y-3 mb-6">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className="w-full text-left p-4 border-2 border-black rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={`/avatar-${conv.id}.png`}
                    alt={`Avatar ${conv.id}`}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{conv.number}</div>
                    <div className="text-sm text-gray-600">
                      {conv.type === "message" && "📝"}
                      {conv.type === "audio" && "🎵"}
                      {conv.type === "photo" && "📷"}
                      {" "}{conv.title}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{conv.time}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mídia Recuperada */}
        <div className="bg-white border-2 border-black rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-black mb-4">Mídia Recuperada</h2>
          <p className="text-gray-700 mb-6">
            <span className="text-red-600 font-bold">3 áudios e 267 fotos apagadas</span> foram encontradas.
          </p>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-200 border-2 border-black">
                <img
                  src={`/media-${i}.png`}
                  alt={`Media ${i}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleUnlock("audios")}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 rounded-xl border-2 border-black transition"
            >
              🔓 DESBLOQUEAR ÁUDIOS
            </button>
            <button
              onClick={() => handleUnlock("fotos")}
              className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 rounded-xl border-2 border-black transition"
            >
              🔓 DESBLOQUEAR FOTOS
            </button>
          </div>
        </div>

        {/* Localização Suspeita */}
        <div className="bg-white border-2 border-black rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-black mb-4">📍 Localização Suspeita</h2>

          {loadingLocation ? (
            <div className="w-full h-96 bg-gray-100 rounded-xl mb-6 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin mb-2 text-2xl">⏳</div>
                <p className="text-sm text-gray-600">Carregando mapa...</p>
              </div>
            </div>
          ) : motelData ? (
            <>
              <p className="text-gray-700 mb-4">
                O número <strong>{phoneNumber}</strong> esteve neste motel em <strong>{mapCity}</strong> nos últimos 7 dias. Abaixo está a localização mais recente registrada.
              </p>
              <div className="w-full rounded-xl mb-6 overflow-hidden border-2 border-black">
                <StaticMap
                  latitude={motelData.latitude}
                  longitude={motelData.longitude}
                  zoom={14}
                />
              </div>
            </>
          ) : (
            <div className="w-full h-96 bg-gray-200 rounded-xl mb-6 flex items-center justify-center text-gray-400">
              🔒
            </div>
          )}

          <button
            onClick={() => handleUnlock("localizacao")}
            className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-3 rounded-xl border-2 border-black transition"
          >
            🔓 VER HISTÓRICO COMPLETO
          </button>
        </div>

        {/* CTA Final - PROMOÇÃO BLACK FRIDAY */}
        <div className="bg-green-500 border-2 border-black rounded-2xl p-8 text-center mb-12">
          <button
            onClick={() => handleUnlock("tudo")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-lg transition border-2 border-black"
          >
            🔓 PROMOÇÃO BLACK FRIDAY: DE R$ 27,90 POR APENAS R$ 19,90
          </button>
        </div>
      </div>

      {/* Dialog para Conversas */}
      {selectedConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-96 overflow-y-auto border-2 border-black">
            <div className="p-6 border-b-2 border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-black">{selectedConversation.number}</h3>
              <button
                onClick={() => setSelectedConversation(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-3">
              {selectedConversation.messages && selectedConversation.messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "you"
                        ? "bg-green-500 text-white"
                        : msg.blocked
                        ? "bg-gray-300 text-gray-600"
                        : "bg-gray-200 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

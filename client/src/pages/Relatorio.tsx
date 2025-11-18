import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Lock, MessageCircle, Music, Image } from "lucide-react";
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

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Usar fallback direto - dados padrão
        const defaultLocation = {
          ip: "8.8.8.8",
          city: "Mountain View",
          region: "CA",
          country_name: "United States",
          latitude: 37.4224,
          longitude: -122.0842
        };
        
        let data = defaultLocation;
        
        try {
          const response = await fetch('https://ipapi.co/json/');
          if (response.ok) {
            const apiData = await response.json();
            if (apiData && apiData.latitude && apiData.longitude) {
              data = apiData;
            }
          }
        } catch (e) {
          console.log('ipapi.co falhou, tentando ip-api.com');
          try {
            const response = await fetch('https://ip-api.com/json/');
            if (response.ok) {
              const apiData = await response.json();
              if (apiData && apiData.lat && apiData.lon) {
                data = {
                  ip: apiData.query || defaultLocation.ip,
                  city: apiData.city || defaultLocation.city,
                  region: apiData.region || defaultLocation.region,
                  country_name: apiData.country || defaultLocation.country_name,
                  latitude: apiData.lat,
                  longitude: apiData.lon
                };
              }
            }
          } catch (e2) {
            console.log('Ambas APIs falharam, usando fallback');
          }
        }
        
        // Garantir que temos latitude e longitude válidas
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
        
        const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
          const R = 6371;
          const dLat = (lat2 - lat1) * Math.PI / 180;
          const dLon = (lon2 - lon1) * Math.PI / 180;
          const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                    Math.sin(dLon/2) * Math.sin(dLon/2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
          return R * c;
        };
        
        const lat = Number(location.latitude);
        const lon = Number(location.longitude);
        
        const motels = [
          { name: "Motel Paraíso", latitude: lat + 0.02, longitude: lon + 0.02, rating: "4.5" },
          { name: "Motel Luxo", latitude: lat - 0.015, longitude: lon + 0.025, rating: "4.2" },
          { name: "Motel Discreto", latitude: lat + 0.01, longitude: lon - 0.015, rating: "4.7" },
        ];
        
        const motelsWithDistance = motels.map(motel => ({
          ...motel,
          distance: calculateDistance(lat, lon, motel.latitude, motel.longitude)
        }));
        
        const closestMotel = motelsWithDistance.reduce((prev, current) => 
          prev.distance < current.distance ? prev : current
        );
        
        // Sempre ter um valor válido
        const distance = closestMotel?.distance ?? 1.7;
        const distanceStr = typeof distance === 'number' ? distance.toFixed(1) : '1.7';
        
        setMotelData({
          name: closestMotel?.name || "Motel Discreto",
          distance: distanceStr + " km",
          rating: closestMotel?.rating || "4.7",
          latitude: closestMotel?.latitude || lat,
          longitude: closestMotel?.longitude || lon
        });
      } catch (error) {
        console.error('Error fetching location:', error);
        // Usar fallback absoluto
        setMotelData({
          name: "Motel Discreto",
          distance: "1.7 km",
          rating: "4.7",
          latitude: 37.4224,
          longitude: -122.0842
        });
      } finally {
        setLoadingLocation(false);
      }
    };
    
    fetchLocation();
  }, []);

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
        { text: "Conteúdo bloqueado", time: "14:25", sender: "them", blocked: true },
      ],
    },
    {
      id: "2",
      number: "+55 XX 9XXXX-7381",
      type: "audio",
      title: "Áudio suspeito detectado",
      time: "3 dias",
      messages: [
        { text: "🎵 Áudio (2:34)", time: "10:15", sender: "them" },
        { text: "Conteúdo bloqueado", time: "10:16", sender: "them", blocked: true },
      ],
    },
    {
      id: "3",
      number: "+55 XX 9XXXX-0032",
      type: "photo",
      title: "Fotos suspeitas encontradas",
      time: "1 semana",
      messages: [
        { text: "📷 Foto", time: "08:45", sender: "them" },
        { text: "Conteúdo bloqueado", time: "08:46", sender: "them", blocked: true },
      ],
    },
  ];

  const handleUnlock = (type: string) => {
    window.location.href = "https://pay.kirvano.com/e2b9e430-3a62-4916-bc03-9839198d1570";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Relatório de Acesso ao WhatsApp
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Confirma abaixo os principais dados recuperados.
          </p>
        </div>

        {/* Análise de Conversas */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <MessageCircle className="w-5 h-5 text-green-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Análise de Conversas</h2>
          </div>
          <p className="text-gray-700 mb-4">
            <span className="text-red-600 font-bold">148 conversas suspeitas</span> foram encontradas. O sistema conseguiu recuperar{" "}
            <span className="text-orange-500 font-bold">mensagens apagadas</span>.
          </p>
          <p className="text-gray-600 text-sm mb-4">Toque em uma conversa abaixo para visualizar os detalhes.</p>

          <div className="space-y-3">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedConversation(conv)}
                className="w-full text-left p-4 border-2 border-red-300 rounded-lg hover:bg-red-50 transition-colors"
              >
                <div className="flex items-start gap-3">
	                    <img
	                      src={`/avatar-${conv.id}.png`}
	                      alt={`Avatar ${conv.id}`}
	                      className="w-10 h-10 rounded-full object-cover flex-shrink-0"
	                    />
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{conv.number}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1">
                      {conv.type === "message" && "📝"}
                      {conv.type === "audio" && "🎵"}
                      {conv.type === "photo" && "📷"}
                      {conv.title}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">{conv.time}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Mídia Recuperada */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Image className="w-5 h-5 text-green-600" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Mídia Recuperada</h2>
          </div>
          <p className="text-gray-700 mb-4">
            <span className="text-red-600 font-bold">3 áudios e 267 fotos apagadas</span> foram encontradas.
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="relative aspect-square rounded-lg overflow-hidden bg-gray-200">
	                <img
	                  src={`/media-${i}.png`}
	                  alt={`Media ${i}`}
	                  className="w-full h-full object-cover"
	                />
{/* <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-70 transition-all">
	                  <div className="text-center">
	                    <Lock className="w-6 h-6 text-white mb-1" />
	                    <p className="text-xs text-white font-semibold">Bloqueado</p>
	                  </div>
	                </div> */}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <Button
              onClick={() => handleUnlock("audios")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-xs sm:text-sm"
            >
              🔓 DESBLOQUEAR ÁUDIOS
            </Button>
            <Button
              onClick={() => handleUnlock("fotos")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-xs sm:text-sm"
            >
              🔓 DESBLOQUEAR FOTOS
            </Button>
          </div>
        </div>

        {/* Palavras-chave Suspeitas */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Palavras-chave Suspeitas</h2>
          <p className="text-gray-700 mb-4">
            O sistema escaneou <span className="font-bold">4.327 mensagens</span> e identificou várias palavras-chave suspeitas.
          </p>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 font-semibold">"Gostosa"</div>
              <div className="text-red-600 text-lg font-bold">13</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 font-semibold">"Amor"</div>
              <div className="text-red-600 text-lg font-bold">9</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 font-semibold">"Segredo"</div>
              <div className="text-red-600 text-lg font-bold">8</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-gray-600 font-semibold">"Escondido"</div>
              <div className="text-red-600 text-lg font-bold">6</div>
            </div>
          </div>

          <Button
            onClick={() => handleUnlock("mensagens")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-sm"
          >
            🔓 VER TODAS AS MENSAGENS
          </Button>
        </div>

        {/* Localização Suspeita */}
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-2xl">📍</div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Localização Suspeita</h2>
          </div>
          <p className="text-gray-700 mb-4">
            O número esteve neste motel nos últimos 7 dias. Abaixo está a localização mais recente registrada.
          </p>

          {loadingLocation ? (
            <div className="w-full h-80 bg-gray-100 rounded-lg mb-3 sm:mb-4 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin mb-2">⏳</div>
                <p className="text-sm">Carregando mapa...</p>
              </div>
            </div>
          ) : locationData ? (
            <div className="w-full rounded-lg mb-3 sm:mb-4 overflow-hidden shadow-md border border-gray-200">
              <StaticMap
                latitude={locationData.latitude}
                longitude={locationData.longitude}
                motelData={motelData ? {
                  name: motelData.name,
                  distance: motelData.distance,
                  rating: motelData.rating,
                  latitude: motelData.latitude,
                  longitude: motelData.longitude,
                } : undefined}
              />
            </div>
          ) : (
            <div className="w-full h-80 bg-gray-200 rounded-lg mb-3 sm:mb-4 flex items-center justify-center text-gray-400">
              <Lock className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
          )}

          <Button
            onClick={() => handleUnlock("localizacao")}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-sm"
          >
            🔓 VER HISTÓRICO COMPLETO
          </Button>
        </div>

        {/* CTA Final */}
        <div className="bg-green-500 rounded-lg shadow-lg p-4 sm:p-6 text-center mb-8">
          <Button
            onClick={() => handleUnlock("tudo")}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-base sm:text-lg"
          >
            🔓 DESBLOQUEAR TUDO POR R$ 27,90
          </Button>
        </div>
      </div>

      {/* Dialog para Conversas */}
      <Dialog open={!!selectedConversation} onOpenChange={() => setSelectedConversation(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedConversation?.number}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {selectedConversation?.messages?.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg ${
                    msg.sender === "you"
                      ? "bg-green-500 text-white"
                      : msg.blocked
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

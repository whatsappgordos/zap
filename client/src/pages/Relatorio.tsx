import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { MessageCircle, X, Lock, MessageSquare, Music, Image as ImageIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import MapView from "@/components/Map";

interface Conversation {
  id: string;
  number: string;
  type: "message" | "audio" | "photo";
  title: string;
  time: string;
  messages?: Array<{ text: string; time: string; sender: "them" | "you"; blocked?: boolean }>;
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
}

export default function Relatorio() {
  const [, setLocation] = useLocation();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [motelData, setMotelData] = useState<MotelData | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        
        const location: LocationData = {
          ip: data.ip,
          city: data.city,
          state: data.region,
          country: data.country_name,
          latitude: data.latitude,
          longitude: data.longitude,
        };
        
        setLocationData(location);
        
        const motels = [
          { name: "Motel Paraíso", distance: "2.3 km", rating: "4.5" },
          { name: "Motel Luxo", distance: "3.1 km", rating: "4.2" },
          { name: "Motel Discreto", distance: "1.8 km", rating: "4.7" },
        ];
        
        setMotelData(motels[Math.floor(Math.random() * motels.length)]);
      } catch (error) {
        console.error('Error fetching location:', error);
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
        { text: "Conteúdo bloqueado", time: "14:26", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "14:28", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "14:30", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "14:32", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "14:33", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "14:35", sender: "them", blocked: true },
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
        { text: "Conteúdo bloqueado", time: "09:20", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "09:22", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "09:25", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "09:26", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "09:30", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "09:32", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "09:35", sender: "them", blocked: true },
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
        { text: "Conteúdo bloqueado", time: "20:10", sender: "them", blocked: true },
        { text: "Imagem bloqueada", time: "20:12", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "20:15", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "20:16", sender: "them", blocked: true },
        { text: "Imagem bloqueada", time: "20:18", sender: "them", blocked: true },
        { text: "Esta mensagem foi apagada", time: "20:20", sender: "them", blocked: true },
        { text: "Conteúdo bloqueado", time: "20:25", sender: "them", blocked: true },
      ],
    },
  ];

  const handleUnlock = (section: string) => {
    window.location.href = "https://checkout.spyappv3.shop/VCCL1O8SCG0D";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600 flex flex-col">
      <header className="bg-green-500 py-4 px-3 sm:py-6 sm:px-4 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-xl sm:text-2xl font-bold">Relatório de Acesso ao WhatsApp</h1>
          <p className="text-green-100 text-xs sm:text-sm mt-1">
            Confira abaixo os principais dados recuperados.
          </p>
        </div>
      </header>

      <main className="flex-1 px-3 py-4 sm:px-4 sm:py-8">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Análise de Conversas</h2>
            </div>
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
              <span className="text-red-600 font-bold">148 conversas suspeitas</span> foram encontradas. O sistema conseguiu recuperar <span className="text-yellow-600 font-bold">mensagens apagadas</span>.
            </p>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Toque em uma conversa abaixo para visualizar os detalhes.</p>

            <div className="space-y-2 sm:space-y-3">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className="w-full p-3 sm:p-4 border-2 border-dashed border-red-300 rounded-lg hover:bg-gray-50 transition text-left active:scale-95"
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <img
                      src={`/avatar-${conv.id}.png`}
                      alt="Avatar"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-800 text-sm sm:text-base">{conv.number}</p>
                      <div className="flex items-center gap-1">
                        {conv.type === "message" && <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />}
                        {conv.type === "audio" && <Music className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />}
                        {conv.type === "photo" && <ImageIcon className="w-3 h-3 sm:w-4 sm:h-4 text-red-500" />}
                        <p className="text-xs sm:text-sm text-gray-600 truncate">{conv.title}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 flex-shrink-0">{conv.time}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Mídia Recuperada</h2>
            </div>
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
              <span className="text-red-600 font-bold">3 áudios</span> e <span className="text-red-600 font-bold">267 fotos apagadas</span> foram encontradas.
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3 sm:mb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 relative overflow-hidden"
                >
                  <img
                    src={`/media-${i}.png`}
                    alt={`Mídia ${i}`}
                    className="w-full h-full object-cover opacity-40"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20">
                    <div className="text-center">
                      <Lock className="w-4 h-4 sm:w-6 sm:h-6 text-white mb-1 mx-auto" />
                      <span className="text-xs font-bold text-white">
                        Bloqueado
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => handleUnlock("audios")}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-sm sm:text-base"
              >
                🔓 DESBLOQUEAR ÁUDIOS
              </Button>
              <Button
                onClick={() => handleUnlock("fotos")}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-sm sm:text-base"
              >
                🔓 DESBLOQUEAR FOTOS
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 sm:mb-4">Palavras-chave Suspeitas</h2>
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
              O sistema escaneou 4.327 mensagens e identificou várias palavras-chave suspeitas.
            </p>

            <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3 sm:mb-4">
              {[
                { word: "Gostosa", count: 13 },
                { word: "Amor", count: 9 },
                { word: "Segredo", count: 8 },
                { word: "Escondido", count: 6 },
              ].map((item, i) => (
                <div key={i} className="p-2 sm:p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-800 text-sm sm:text-base">"{item.word}"</p>
                  <p className="text-red-600 font-bold text-sm">{item.count}</p>
                </div>
              ))}
            </div>

            <Button
              onClick={() => handleUnlock("mensagens")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-sm sm:text-base"
            >
              🔓 VER TODAS AS MENSAGENS
            </Button>
          </div>

          <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
              <h2 className="text-lg sm:text-xl font-bold text-gray-800">Localização Suspeita</h2>
            </div>
            <p className="text-gray-700 mb-3 sm:mb-4 text-sm sm:text-base">
              O número esteve neste motel nos últimos 7 dias. Abaixo está a localização mais recente registrada.
            </p>

            {loadingLocation ? (
              <div className="w-full h-80 bg-gray-200 rounded-lg mb-3 sm:mb-4 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="animate-spin mb-2">⏳</div>
                  <p className="text-sm">Carregando mapa...</p>
                </div>
              </div>
            ) : locationData ? (
              <div className="w-full rounded-lg mb-3 sm:mb-4 overflow-hidden shadow-md border border-gray-200">
                <MapView
                  lat={locationData.latitude}
                  lng={locationData.longitude}
                  zoom={15}
                  motelName={motelData?.name || "Motel Próximo"}
                />
              </div>
            ) : (
              <div className="w-full h-80 bg-gray-200 rounded-lg mb-3 sm:mb-4 flex items-center justify-center text-gray-400">
                <Lock className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
            )}

            <Button
              onClick={() => handleUnlock("localizacao")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-sm sm:text-base"
            >
              🔓 VER HISTÓRICO COMPLETO
            </Button>
          </div>

          <div className="h-20 sm:h-24"></div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 sm:p-4">
        <Button
          onClick={() => handleUnlock("tudo")}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 sm:py-4 rounded-lg text-base sm:text-lg shadow-lg"
        >
          🔓 DESBLOQUEAR TUDO POR R$ 27,90
        </Button>
      </div>

      {selectedConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end sm:items-center justify-center p-0 sm:p-4 z-50">
          <div className="bg-white rounded-t-lg sm:rounded-lg max-w-md w-full max-h-96 flex flex-col sm:max-h-96">
            <div className="flex items-center justify-between p-3 sm:p-4 border-b">
              <div className="min-w-0">
                <p className="font-semibold text-gray-800 text-sm sm:text-base">{selectedConversation.number}</p>
                <p className="text-xs text-gray-500">{selectedConversation.title}</p>
              </div>
              <button
                onClick={() => setSelectedConversation(null)}
                className="text-gray-400 hover:text-gray-600 p-1 flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-2 sm:space-y-3">
              {selectedConversation.messages?.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      msg.blocked
                        ? "bg-gray-300 text-gray-600"
                        : msg.sender === "you"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    {msg.blocked ? (
                      <div className="flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        <span>{msg.text}</span>
                      </div>
                    ) : (
                      msg.text
                    )}
                    <p className="text-xs opacity-70 mt-1">{msg.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t p-3 sm:p-4">
              <Button
                onClick={() => handleUnlock("conversa")}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg text-sm"
              >
                🔓 DESBLOQUEAR CONVERSA COMPLETA
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

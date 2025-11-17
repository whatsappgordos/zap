import { useState } from "react";
import { useLocation } from "wouter";
import { MessageCircle, X, Lock, MessageSquare, Music, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Conversation {
  id: string;
  number: string;
  type: "message" | "audio" | "photo";
  title: string;
  time: string;
  messages?: Array<{ text: string; time: string; sender: "them" | "you"; blocked?: boolean }>;
}

export default function Relatorio() {
  const [, setLocation] = useLocation();
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);

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
    // Redirect to payment page
    window.location.href = "https://checkout.spyappv3.shop/VCCL1O8SCG0D";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-600 flex flex-col">
      {/* Header */}
      <header className="bg-green-500 py-6 px-4 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Relatório de Acesso ao WhatsApp</h1>
          <p className="text-green-100 text-sm mt-1">
            Confira abaixo os principais dados recuperados da análise do número informado.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Análise de Conversas */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-bold text-gray-800">Análise de Conversas</h2>
            </div>
            <p className="text-gray-700 mb-4">
              <span className="text-red-600 font-bold">148 conversas suspeitas</span> foram encontradas durante a análise. O sistema conseguiu recuperar{" "}
              <span className="text-yellow-600 font-bold">mensagens apagadas</span> e algumas foram classificadas como{" "}
              <span className="text-red-600 font-bold">críticas</span> com base no conteúdo.
            </p>
            <p className="text-gray-600 text-sm mb-4">Toque em uma conversa abaixo para visualizar os detalhes.</p>

            <div className="space-y-3">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className="w-full p-4 border-2 border-dashed border-red-300 rounded-lg hover:bg-gray-50 transition text-left"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800">{conv.number}</p>
                      <div className="flex items-center gap-1">
                        {conv.type === "message" && <MessageSquare className="w-4 h-4 text-red-500" />}
                        {conv.type === "audio" && <Music className="w-4 h-4 text-red-500" />}
                        {conv.type === "photo" && <ImageIcon className="w-4 h-4 text-red-500" />}
                        <p className="text-sm text-gray-600">{conv.title}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">{conv.time}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Mídia Recuperada */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <ImageIcon className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-bold text-gray-800">Mídia Recuperada</h2>
            </div>
            <p className="text-gray-700 mb-4">
              <span className="text-red-600 font-bold">3 áudios comprometedores</span> foram recuperados durante a análise. Além disso, o sistema encontrou{" "}
              <span className="text-red-600 font-bold">267 fotos apagadas</span> que podem conter conteúdo sensível.
            </p>

            <div className="grid grid-cols-3 gap-3 mb-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 relative"
                >
                  <Lock className="w-6 h-6" />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-500">
                    Bloqueado
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <Button
                onClick={() => handleUnlock("audios")}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
              >
                🔓 DESBLOQUEAR ÁUDIOS COMPLETOS
              </Button>
              <Button
                onClick={() => handleUnlock("fotos")}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
              >
                🔓 DESBLOQUEAR TODAS AS FOTOS
              </Button>
            </div>
          </div>

          {/* Palavras-chave Suspeitas */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Palavras-chave Suspeitas</h2>
            <p className="text-gray-700 mb-4">
              O sistema escaneou 4.327 mensagens e identificou várias palavras-chave que podem indicar comportamento suspeito.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { word: "Gostosa", count: 13 },
                { word: "Amor", count: 9 },
                { word: "Segredo", count: 8 },
                { word: "Escondido", count: 6 },
                { word: "Não conta", count: 5 },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-800">"{item.word}"</p>
                  <p className="text-red-600 font-bold">{item.count}</p>
                </div>
              ))}
            </div>

            <Button
              onClick={() => handleUnlock("mensagens")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
            >
              🔓 VER TODAS AS MENSAGENS
            </Button>
          </div>

          {/* Localização Suspeita */}
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Localização Suspeita</h2>
            <p className="text-gray-700 mb-4">
              O número esteve neste motel nos últimos 7 dias. Abaixo está a localização mais recente registrada.
            </p>

            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-400">
              <Lock className="w-8 h-8" />
            </div>

            <Button
              onClick={() => handleUnlock("localizacao")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
            >
              🔓 VER HISTÓRICO COMPLETO
            </Button>
          </div>

          {/* Main Unlock Button */}
          <div className="sticky bottom-4 left-0 right-0">
            <Button
              onClick={() => handleUnlock("tudo")}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg text-lg shadow-lg"
            >
              🔓 DESBLOQUEAR TUDO POR R$ 27,90
            </Button>
          </div>
        </div>
      </main>

      {/* Conversation Modal */}
      {selectedConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-96 flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div>
                <p className="font-semibold text-gray-800">{selectedConversation.number}</p>
                <p className="text-xs text-gray-500">{selectedConversation.title}</p>
              </div>
              <button
                onClick={() => setSelectedConversation(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {selectedConversation.messages?.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg ${
                      msg.sender === "you"
                        ? "bg-green-500 text-white"
                        : msg.blocked
                        ? "bg-gray-200 text-gray-500"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === "you" ? "text-green-100" : "text-gray-500"}`}>
                      {msg.time}
                    </p>
                  </div>
                </div>
              ))}
              <div className="text-center py-4">
                <p className="text-sm text-gray-600">
                  Para visualizar a conversa completa, você precisa desbloquear as conversas.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t">
              <Button
                onClick={() => {
                  setSelectedConversation(null);
                  handleUnlock("conversas");
                }}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg"
              >
                🔓 DESBLOQUEAR CONVERSAS COMPLETAS
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

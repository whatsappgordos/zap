import { useState, useEffect, useRef } from "react";
import { detectUserLocation } from "@/services/geolocation";

interface Message {
  id: number;
  text: string;
  time: string;
  isBot: boolean;
  buttons?: { text: string; value: string }[];
  images?: string[];
  showTimer?: boolean;
  video?: string;
}

interface Notification {
  id: number;
  name: string;
  city: string;
  action: string;
}

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userPhone, setUserPhone] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userLocation, setUserLocation] = useState({ city: "São Paulo", state: "SP" });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutos em segundos
  const [showTimer, setShowTimer] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Carregar pixels Utmify
  useEffect(() => {
    const loadPixels = () => {
      // Pixel 1
      window.pixelId = "67fc2ba806eb140157116830";
      const pixel1 = document.createElement("script");
      pixel1.setAttribute("async", "");
      pixel1.setAttribute("defer", "");
      pixel1.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
      document.head.appendChild(pixel1);

      // UTMs 1
      const utms1 = document.createElement("script");
      utms1.setAttribute("src", "https://cdn.utmify.com.br/scripts/utms/latest.js");
      utms1.setAttribute("data-utmify-prevent-xcod-sck", "");
      utms1.setAttribute("data-utmify-prevent-subids", "");
      utms1.setAttribute("async", "");
      utms1.setAttribute("defer", "");
      document.head.appendChild(utms1);

      // Pixel 2
      setTimeout(() => {
        window.pixelId = "692b7dfa7ea9d3ffa76a2269";
        const pixel2 = document.createElement("script");
        pixel2.setAttribute("async", "");
        pixel2.setAttribute("defer", "");
        pixel2.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
        document.head.appendChild(pixel2);
      }, 100);

      // UTMs 2
      const utms2 = document.createElement("script");
      utms2.setAttribute("src", "https://cdn.utmify.com.br/scripts/utms/latest.js");
      utms2.setAttribute("data-utmify-prevent-xcod-sck", "");
      utms2.setAttribute("data-utmify-prevent-subids", "");
      utms2.setAttribute("async", "");
      utms2.setAttribute("defer", "");
      document.head.appendChild(utms2);
    };

    loadPixels();
  }, []);

  // Auto-play videos quando aparecem
  useEffect(() => {
    messages.forEach((msg) => {
      if (msg.video && videoRefs.current[msg.id]) {
        const video = videoRefs.current[msg.id];
        if (video) {
          video.play().catch((error) => {
            console.log("Autoplay bloqueado:", error);
          });
        }
      }
    });
  }, [messages]);

  // Timer countdown
  useEffect(() => {
    if (!showTimer) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [showTimer]);

  // Notificações fake
  useEffect(() => {
    const names = ["Maria", "João", "Ana", "Carlos", "Juliana", "Pedro", "Fernanda", "Lucas"];
    const cities = ["São Paulo", "Rio de Janeiro", "Belo Horizonte", "Brasília", "Salvador", "Curitiba", "Fortaleza"];
    const actions = [
      "acabou de ter acesso à ferramenta",
      "está usando agora",
      "descobriu 23 conversas ocultas",
      "confirmou a traição",
      "acessou o sistema completo",
      "desbloqueou todas as conversas"
    ];

    const showNotification = () => {
      const notification: Notification = {
        id: Date.now(),
        name: names[Math.floor(Math.random() * names.length)],
        city: cities[Math.floor(Math.random() * cities.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
      };

      setNotifications((prev) => [...prev, notification]);

      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
      }, 5000);
    };

    const interval = setInterval(showNotification, 8000);
    showNotification(); // Primeira notificação imediata

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Primeira mensagem de boas-vindas
    setTimeout(() => {
      addBotMessage("Olá! Seja bem-vindo à ferramenta **Whatsapp Espião 2026** 🔎🔧", 1000);
    }, 500);

    setTimeout(() => {
      addBotMessage(
        "Antes de iniciar, veja o relato desse motorista de Uber que usou nossa ferramenta, indicado pelo nosso usuário Thiago!",
        3000
      );
    }, 2500);

    setTimeout(() => {
      addBotMessage(
        "🎥 Graças à nossa ferramenta, o motorista conseguiu se livrar de um relacionamento tóxico e cheio de traições:",
        5000,
        undefined,
        undefined,
        undefined,
        "/motorista-depoimento.mp4"
      );
    }, 5000);

    // Aguardar 15 segundos após o vídeo antes de continuar
    setTimeout(() => {
      addBotMessage(
        "⚠️ ATENÇÃO: Este sistema já ajudou mais de 8.473 pessoas a descobrirem traições!",
        20000
      );
    }, 20000);

    setTimeout(() => {
      addBotMessage(
        "Para começar, me diga: você deseja monitorar seu parceiro ou parceira?",
        23000,
        [
          { text: "👨 Parceiro", value: "masculino" },
          { text: "👩 Parceira", value: "feminino" },
        ]
      );
    }, 23000);
  }, []);

  const addBotMessage = (
    text: string,
    delay: number = 0,
    buttons?: { text: string; value: string }[],
    images?: string[],
    showTimer?: boolean,
    video?: string
  ) => {
    setTimeout(() => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const now = new Date();
        const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            text,
            time,
            isBot: true,
            buttons,
            images,
            showTimer,
            video,
          },
        ]);
        if (showTimer) {
          setShowTimer(true);
        }
      }, 1500);
    }, delay);
  };

  const addUserMessage = (text: string) => {
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        text,
        time,
        isBot: false,
      },
    ]);
  };

  const handleGenderSelect = (gender: string) => {
    setUserGender(gender);
    addUserMessage(gender === "masculino" ? "👨 Parceiro" : "👩 Parceira");
    setCurrentStep(1);

    setTimeout(() => {
      addBotMessage("Perfeito! 👍", 500);
    }, 500);

    setTimeout(() => {
      addBotMessage(
        "Agora preciso que você me informe o número de telefone (com DDD) da pessoa que deseja monitorar:",
        2500
      );
    }, 2500);

    setTimeout(() => {
      addBotMessage(
        "📱 Exemplo: (11) 98765-4321",
        4500
      );
    }, 4500);
  };

  const handlePhoneSubmit = async (phone: string) => {
    if (phone.length < 10) return;

    setUserPhone(phone);
    addUserMessage(phone);
    setCurrentStep(2);

    setTimeout(() => {
      addBotMessage("Ótimo! Número recebido. ✅", 1000);
    }, 1000);

    setTimeout(() => {
      addBotMessage("🔍 Iniciando varredura profunda no dispositivo...", 3500);
    }, 3500);

    setTimeout(() => {
      addBotMessage("📡 Conectando aos servidores de rastreamento...", 6500);
    }, 6500);

    setTimeout(() => {
      addBotMessage("🌐 Ativando GPS e localizando dispositivo...", 9500);
    }, 9500);

    // Detectar localização real ANTES de continuar
    let detectedCity = "São Paulo";
    let detectedState = "SP";

    try {
      const location = await detectUserLocation(phone);
      detectedCity = location.city;
      detectedState = location.state;
      setUserLocation({ city: detectedCity, state: detectedState });
      console.log("📍 Localização detectada:", detectedCity, detectedState);
    } catch (error) {
      console.error("Erro ao detectar localização:", error);
    }

    setTimeout(() => {
      addBotMessage("✅ Dispositivo localizado com sucesso!", 12500);
    }, 12500);

    setTimeout(() => {
      addBotMessage("🔓 Desbloqueando conversas criptografadas...", 15500);
    }, 15500);

    setTimeout(() => {
      addBotMessage("📊 Analisando padrões de comportamento suspeito...", 18500);
    }, 18500);

    setTimeout(() => {
      addBotMessage(
        `🎯 **ANÁLISE PRELIMINAR CONCLUÍDA**\n\n` +
        `📍 Localização Atual: ${detectedCity}, ${detectedState}\n` +
        `📱 Status do Dispositivo: Online agora\n` +
        `💬 Conversas Ativas: 47 chats detectados\n` +
        `🔥 Conversas Suspeitas: 12 com a mesma pessoa\n` +
        `📸 Arquivos de Mídia: 234 fotos/vídeos\n` +
        `🕐 Última Atividade: Há 3 minutos\n` +
        `⚠️ Conversas Apagadas: 18 recuperadas`,
        21500
      );
    }, 21500);

    setTimeout(() => {
      addBotMessage(
        `🚨 **ALERTA DE LOCALIZAÇÃO SUSPEITA!**\n\n` +
        `🏨 Motel detectado na região de ${detectedCity}\n` +
        `📍 Endereço completo disponível no acesso completo\n` +
        `⏰ Última visita: Informação disponível no acesso completo\n` +
        `📊 Frequência: Dados completos no acesso premium\n` +
        `⚠️ Permanência média: Informação bloqueada`,
        25500
      );
    }, 25500);

    setTimeout(() => {
      addBotMessage(
        `💔 **DESCOBRIMOS MAIS INFORMAÇÕES CRÍTICAS:**\n\n` +
        `📱 12 conversas com número não salvo nos contatos\n` +
        `🔥 Mensagens enviadas durante horário de "trabalho"\n` +
        `📸 6 mídias íntimas ocultas/apagadas detectadas\n` +
        `🎙️ 8 áudios de 15+ minutos para pessoa desconhecida\n` +
        `🗑️ Histórico de exclusão: 23:45 (todas as noites)\n` +
        `⚠️ Localização desativada em momentos suspeitos`,
        29500
      );
    }, 29500);

    setTimeout(() => {
      const images = userGender === "masculino" 
        ? [
            "/blocked-media/female-1.png",
            "/blocked-media/female-2.png",
            "/blocked-media/female-3.png",
            "/blocked-media/female-4.png",
            "/blocked-media/female-5.png",
            "/blocked-media/female-6.png",
          ]
        : [
            "/blocked-media/male-1.png",
            "/blocked-media/male-2.png",
            "/blocked-media/male-3.png",
            "/blocked-media/male-4.png",
            "/blocked-media/male-5.png",
            "/blocked-media/male-6.png",
          ];

      addBotMessage(
        `📸 **MÍDIAS OCULTAS/APAGADAS ENCONTRADAS:**\n\n` +
        `Encontramos 6 fotos e vídeos íntimos que ${userGender === "masculino" ? "ela" : "ele"} tentou esconder de você.\n\n` +
        `⬇️ Visualize abaixo (conteúdo bloqueado):`,
        33500,
        undefined,
        images
      );
    }, 33500);

    setTimeout(() => {
      addBotMessage(
        `⚠️ **ATENÇÃO: INFORMAÇÃO CRÍTICA!**\n\n` +
        `O que você acabou de ver é apenas uma PEQUENA AMOSTRA.\n\n` +
        `Para ter acesso completo à ferramenta **Whatsapp Espião 2026**, você terá:\n\n` +
        `✅ Todas as 47 conversas completas (incluindo apagadas)\n` +
        `✅ 234 fotos e vídeos SEM CENSURA\n` +
        `✅ Todos os áudios e chamadas gravadas\n` +
        `✅ Localização em TEMPO REAL 24/7\n` +
        `✅ Histórico completo do motel (datas e horários)\n` +
        `✅ Lista de contatos ocultos\n` +
        `✅ Conversas de WhatsApp, Instagram e Telegram\n` +
        `✅ Acesso VITALÍCIO + Atualizações automáticas`,
        37500
      );
    }, 37500);

    setTimeout(() => {
      addBotMessage(
        `🔥 **OFERTA ESPECIAL - APENAS HOJE!**\n\n` +
        `⚠️ ATENÇÃO: Apenas 3 vagas disponíveis!\n\n` +
        `De ~~R$ 79,90~~ por apenas:\n` +
        `💰 **R$ 19,90** (75% OFF)\n\n` +
        `⏰ Esta oferta expira em 10 MINUTOS!\n\n` +
        `🚨 Depois desse tempo, o preço volta para R$ 79,90\n\n` +
        `⚡ ${userGender === "masculino" ? "Ela" : "Ele"} pode apagar TUDO a qualquer momento!\n` +
        `💔 Não perca a chance de descobrir a VERDADE!`,
        41500,
        undefined,
        undefined,
        true
      );
    }, 41500);

    setTimeout(() => {
      addBotMessage(
        `🔓 Deseja ter acesso à ferramenta **Whatsapp Espião 2026** AGORA e descobrir toda a verdade?`,
        45500,
        [
          { text: "✅ SIM! QUERO TER ACESSO", value: "checkout" },
          { text: "❌ Não, deixar pra depois", value: "cancel" },
        ]
      );
    }, 45500);
  };

  const handleCheckout = (action: string) => {
    if (action === "checkout") {
      addUserMessage("✅ SIM! QUERO TER ACESSO");

      setTimeout(() => {
        addBotMessage("🎉 Perfeito! Você tomou a decisão certa!", 500);
      }, 500);

      setTimeout(() => {
        addBotMessage("🔒 Redirecionando para pagamento 100% seguro...", 2500);
      }, 2500);

      setTimeout(() => {
        addBotMessage("✅ Após a confirmação, você terá acesso IMEDIATO à ferramenta completa!", 4500);
      }, 4500);

      setTimeout(() => {
        window.location.href = "https://pay.kirvano.com/e2b9e430-3a62-4916-bc03-9839198d1570";
      }, 6500);
    } else {
      addUserMessage("❌ Não, deixar pra depois");

      setTimeout(() => {
        addBotMessage(
          "😔 Entendo sua hesitação...",
          1000
        );
      }, 1000);

      setTimeout(() => {
        addBotMessage(
          `⚠️ MAS LEMBRE-SE:\n\n` +
          `💔 A cada minuto que passa, ${userGender === "masculino" ? "ela" : "ele"} pode apagar mais provas\n` +
          `🗑️ Conversas são deletadas PERMANENTEMENTE\n` +
          `📸 Fotos e vídeos somem para sempre\n` +
          `⏰ Você pode NUNCA mais descobrir a verdade\n\n` +
          `🔥 Esta oferta de R$ 19,90 expira em minutos!\n` +
          `💰 Depois volta para R$ 79,90\n\n` +
          `Tem certeza que quer arriscar?`,
          3500
        );
      }, 3500);

      setTimeout(() => {
        addBotMessage(
          `🔓 Última chance! Deseja ter acesso à ferramenta agora?`,
          7500,
          [
            { text: "✅ SIM! TER ACESSO AGORA", value: "checkout" },
            { text: "❌ Não quero saber a verdade", value: "final_no" },
          ]
        );
      }, 7500);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="h-screen flex flex-col bg-[#e5ddd5] relative">
      {/* Notificações Flutuantes */}
      <div className="fixed top-20 right-4 z-50 space-y-2">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="bg-white rounded-lg shadow-lg p-4 min-w-[300px] animate-slide-in-right border-l-4 border-green-500"
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                {notif.name[0]}
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {notif.name} de {notif.city}
                </p>
                <p className="text-xs text-gray-600">{notif.action}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Header */}
      <header className="bg-[#008069] h-[60px] flex items-center px-4 shadow-md">
        <button className="mr-4 text-white hover:bg-[#017561] p-2 rounded-full transition">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>

        <div className="flex items-center flex-1">
          <img
            src="/bot-avatar.png"
            alt="Whatsapp Espião"
            className="w-12 h-12 rounded-full mr-3 object-cover"
          />
          <div className="flex-1">
            <h1 className="text-white font-semibold text-lg">Whatsapp Espião</h1>
            {isTyping && <p className="text-white text-xs opacity-80">digitando...</p>}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-white hover:bg-[#017561] p-2 rounded-full transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </button>
          <button className="text-white hover:bg-[#017561] p-2 rounded-full transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Commercial Account Notice */}
      <div className="bg-[#d1f4cc] border-l-4 border-[#25D366] px-4 py-3 flex items-center gap-3">
        <svg className="w-5 h-5 text-[#008069] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
        </svg>
        <p className="text-[#008069] text-sm font-semibold">
          🔒 Sistema de Rastreamento Profissional - 100% Seguro e Anônimo
        </p>
      </div>

      {/* Chat Area */}
      <div 
        className="flex-1 overflow-y-auto px-4 py-6"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d9d9d9' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      >
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex mb-4 ${msg.isBot ? "" : "justify-end"}`}>
              <div className={`flex items-start max-w-[85%] ${msg.isBot ? "" : "flex-row-reverse"}`}>
                {msg.isBot && (
                  <img
                    src="/bot-avatar.png"
                    alt="Bot"
                    className="w-10 h-10 rounded-full mr-2 flex-shrink-0 object-cover"
                  />
                )}
                <div>
                  <div className={`${msg.isBot ? "bg-white" : "bg-[#d9fdd3]"} rounded-lg shadow-sm px-4 py-2 relative`}>
                    {msg.isBot && (
                      <div className="absolute left-[-8px] top-0 w-0 h-0 border-t-[8px] border-t-white border-r-[8px] border-r-transparent"></div>
                    )}
                    {!msg.isBot && (
                      <div className="absolute right-[-8px] top-0 w-0 h-0 border-t-[8px] border-t-[#d9fdd3] border-l-[8px] border-l-transparent"></div>
                    )}
                    <p className="text-gray-800 text-[15px] leading-relaxed whitespace-pre-wrap">
                      {msg.text}
                    </p>

                    {/* Vídeo de Depoimento */}
                    {msg.video && (
                      <div className="mt-3">
                        <video
                          ref={(el) => {
                            if (el) videoRefs.current[msg.id] = el;
                          }}
                          src={msg.video}
                          controls
                          autoPlay
                          muted={false}
                          playsInline
                          loop={false}
                          className="w-full rounded-lg"
                        />
                      </div>
                    )}

                    {/* Timer de Promoção */}
                    {msg.showTimer && showTimer && (
                      <div className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded-lg">
                        <div className="text-center">
                          <p className="text-red-600 font-bold text-sm mb-2">⏰ OFERTA EXPIRA EM:</p>
                          <div className={`text-4xl font-bold ${timeLeft <= 60 ? 'text-red-600 animate-pulse' : 'text-red-500'}`}>
                            {formatTime(timeLeft)}
                          </div>
                          {timeLeft <= 0 && (
                            <p className="text-red-600 font-semibold mt-2">
                              ❌ Oferta expirada! Preço voltou para R$ 79,90
                            </p>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Grid de Imagens Bloqueadas */}
                    {msg.images && (
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {msg.images.map((img, idx) => (
                          <div key={idx} className="relative aspect-square">
                            <img
                              src={img}
                              alt={`Bloqueado ${idx + 1}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-[11px] text-gray-500">{msg.time}</span>
                      {!msg.isBot && (
                        <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 16 15">
                          <path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" />
                        </svg>
                      )}
                    </div>
                  </div>

                  {msg.buttons && (
                    <div className="flex flex-col gap-2 mt-2">
                      {msg.buttons.map((btn, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            if (currentStep === 0) {
                              handleGenderSelect(btn.value);
                            } else if (currentStep === 2) {
                              handleCheckout(btn.value);
                            }
                          }}
                          className="bg-white hover:bg-gray-50 text-[#008069] font-semibold py-3 px-4 rounded-lg shadow-sm transition border-2 border-[#008069] hover:scale-105"
                        >
                          {btn.text}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex mb-4">
              <div className="flex items-start max-w-[70%]">
                <img
                  src="/bot-avatar.png"
                  alt="Bot"
                  className="w-10 h-10 rounded-full mr-2 flex-shrink-0 object-cover"
                />
                <div className="bg-white rounded-lg shadow-sm px-4 py-3 relative">
                  <div className="absolute left-[-8px] top-0 w-0 h-0 border-t-[8px] border-t-white border-r-[8px] border-r-transparent"></div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      {currentStep === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const phone = formData.get("phone") as string;
            if (phone) {
              handlePhoneSubmit(phone);
              e.currentTarget.reset();
            }
          }}
          className="bg-[#f0f0f0] px-4 py-3 flex items-center gap-3"
        >
          <button type="button" className="text-gray-600 hover:text-gray-800 transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </button>

          <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
            <input
              type="tel"
              name="phone"
              placeholder="(11) 98765-4321"
              className="flex-1 outline-none text-[15px] text-gray-800 placeholder-gray-400"
              autoFocus
            />
          </div>

          <button type="submit" className="bg-[#008069] text-white p-2 rounded-full hover:bg-[#017561] transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      )}

      {currentStep !== 1 && (
        <div className="bg-[#f0f0f0] px-4 py-3 flex items-center gap-3">
          <button className="text-gray-600 hover:text-gray-800 transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
            </svg>
          </button>

          <button className="text-gray-600 hover:text-gray-800 transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
            </svg>
          </button>

          <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center">
            <input
              type="text"
              placeholder="Digite uma mensagem"
              className="flex-1 outline-none text-[15px] text-gray-800 placeholder-gray-400"
              disabled
            />
          </div>

          <button className="text-gray-600 hover:text-gray-800 transition">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

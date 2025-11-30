import { useState, useEffect, useRef } from "react";

interface Message {
  id: number;
  text: string;
  time: string;
  isBot: boolean;
  buttons?: { text: string; value: string }[];
}

export default function ZapNovo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [userPhone, setUserPhone] = useState("");
  const [userGender, setUserGender] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    // Primeira mensagem de boas-vindas
    setTimeout(() => {
      addBotMessage("Olá! Seja bem-vindo(a) ao Sistema WhatSpy 🔎🔧", 1000);
    }, 500);

    setTimeout(() => {
      addBotMessage(
        "Eu sou o assistente virtual e vou te ajudar a monitorar o WhatsApp de forma discreta e profissional.",
        2500
      );
    }, 2000);

    setTimeout(() => {
      addBotMessage(
        "Para começar, me diga: você deseja monitorar seu parceiro ou parceira?",
        4000,
        [
          { text: "👨 Parceiro", value: "masculino" },
          { text: "👩 Parceira", value: "feminino" },
        ]
      );
    }, 4500);
  }, []);

  const addBotMessage = (
    text: string,
    delay: number = 0,
    buttons?: { text: string; value: string }[]
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
          },
        ]);
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
        2000
      );
    }, 2000);

    setTimeout(() => {
      addBotMessage(
        "📱 Exemplo: (11) 98765-4321",
        3500
      );
    }, 3500);
  };

  const handlePhoneSubmit = (phone: string) => {
    if (phone.length < 10) return;
    
    setUserPhone(phone);
    addUserMessage(phone);
    setCurrentStep(2);

    setTimeout(() => {
      addBotMessage("Ótimo! Número recebido. ✅", 500);
    }, 500);

    setTimeout(() => {
      addBotMessage("🔍 Iniciando análise do dispositivo...", 2000);
    }, 2000);

    setTimeout(() => {
      addBotMessage("📡 Conectando aos servidores...", 4000);
    }, 4000);

    setTimeout(() => {
      addBotMessage("🌐 Localizando dispositivo...", 6000);
    }, 6000);

    setTimeout(() => {
      addBotMessage("✅ Dispositivo localizado com sucesso!", 8000);
    }, 8000);

    setTimeout(() => {
      addBotMessage(
        "🎯 **Análise Preliminar Concluída**\n\n" +
        "📍 Localização: Detectada\n" +
        "📱 Dispositivo: Online\n" +
        "💬 Conversas: 47 chats ativos\n" +
        "📸 Mídia: 234 arquivos\n" +
        "🕐 Última atividade: Há 3 minutos",
        10000
      );
    }, 10000);

    setTimeout(() => {
      addBotMessage(
        "⚠️ **IMPORTANTE:**\n\n" +
        "Para acessar o relatório completo com todas as conversas, fotos, vídeos, áudios e localização em tempo real, você precisa ativar o acesso premium.",
        13000
      );
    }, 13000);

    setTimeout(() => {
      addBotMessage(
        "🔓 Deseja liberar o acesso completo agora?",
        15500,
        [
          { text: "✅ Sim, liberar acesso", value: "checkout" },
          { text: "❌ Não, agora não", value: "cancel" },
        ]
      );
    }, 15500);
  };

  const handleCheckout = (action: string) => {
    if (action === "checkout") {
      addUserMessage("✅ Sim, liberar acesso");
      
      setTimeout(() => {
        addBotMessage("Perfeito! Redirecionando para pagamento seguro... 🔒", 500);
      }, 500);

      setTimeout(() => {
        window.location.href = "https://pay.kirvano.com/e2b9e430-3a62-4916-bc03-9839198d1570";
      }, 2500);
    } else {
      addUserMessage("❌ Não, agora não");
      
      setTimeout(() => {
        addBotMessage(
          "Sem problemas! Quando quiser acessar o relatório completo, é só voltar aqui. 😊",
          500
        );
      }, 500);

      setTimeout(() => {
        addBotMessage(
          "Lembre-se: quanto mais rápido você agir, mais informações poderá descobrir! ⏰",
          3000
        );
      }, 3000);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#e5ddd5]">
      {/* Header */}
      <header className="bg-[#008069] h-[60px] flex items-center px-4 shadow-md">
        <button className="mr-4 text-white hover:bg-[#017561] p-2 rounded-full transition">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
        
        <div className="flex items-center flex-1">
          <img
            src="https://ui-avatars.com/api/?name=WhatSpy&background=25D366&color=fff&bold=true"
            alt="WhatSpy"
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-1">
            <h1 className="text-white font-semibold text-lg">WhatSpy</h1>
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
        <p className="text-[#008069] text-sm">
          Esta é uma conta comercial e não recebe ligações
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
              <div className={`flex items-start max-w-[70%] ${msg.isBot ? "" : "flex-row-reverse"}`}>
                {msg.isBot && (
                  <img
                    src="https://ui-avatars.com/api/?name=WhatSpy&background=25D366&color=fff&bold=true"
                    alt="Bot"
                    className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
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
                          className="bg-white hover:bg-gray-50 text-[#008069] font-semibold py-2 px-4 rounded-lg shadow-sm transition border border-gray-200"
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
                  src="https://ui-avatars.com/api/?name=WhatSpy&background=25D366&color=fff&bold=true"
                  alt="Bot"
                  className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
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

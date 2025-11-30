import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "wouter";
import { detectUserLocation } from "@/services/geolocation";

export default function Carregando() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<Array<{ text: string; class?: string }>>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("(XX) XXXXX-XXXX");
  const [city, setCity] = useState("Detectando...");
  const [state, setState] = useState("...");
  const [isp, setIsp] = useState("Carregando...");
  const [ipAddress, setIpAddress] = useState("...");
  const [profileImage, setProfileImage] = useState(1);
  const logsInitialized = useRef(false);

  const getProfileImageNumber = (phone: string) => {
    const cleanNumber = (phone || "").replace(/\D/g, "");
    const lastDigits = parseInt(cleanNumber.slice(-2)) || 1;
    return ((lastDigits % 3) + 1) as 1 | 2 | 3;
  };

  useEffect(() => {
    // Recuperar número do localStorage
    const savedPhone = localStorage.getItem("phoneNumber") || "(XX) XXXXX-XXXX";
    setPhoneNumber(savedPhone);
    
    const imageNum = getProfileImageNumber(savedPhone);
    setProfileImage(imageNum);

    // Detectar localização usando serviço centralizado
    const fetchLocation = async () => {
      try {
        const location = await detectUserLocation(savedPhone);
        setCity(location.city);
        setState(location.state);
        setIsp(location.isp || "Provedor de Internet");
        setIpAddress(location.ip);
      } catch (error) {
        console.error("Erro ao detectar localização:", error);
        // Fallback em caso de erro
        setCity("São Paulo");
        setState("SP");
        setIsp("Provedor de Internet");
        setIpAddress("N/A");
      }
    };

    fetchLocation();
  }, []);



  // Log messages com delays - Memoized para evitar recriação
  const logMessages = useMemo(() => [
    { text: "Iniciando conexão com servidores WhatsApp...", delay: 500 },
    { text: "Localizando servidor mais próximo...", delay: 1200 },
    { text: "Servidor localizado! Estabelecendo conexão segura...", delay: 2000, class: "success" },
    { text: "Verificando número de telefone...", delay: 3000 },
    { text: "Número de telefone válido!", delay: 4000, class: "success" },
    { text: "Analisando base de dados...", delay: 5000 },
    { text: "Buscando informações de perfil...", delay: 6200 },
    { text: "Detectando localização do dispositivo...", delay: 7400 },
    { text: `Localização suspeita encontrada em ${city}, Brasil`, delay: 8500, class: "warning" },
    { text: "Preparando canal privado de leitura...", delay: 9500 },
    { text: "Canal privado estabelecido!", delay: 10500, class: "success" },
    { text: "Acesso concedido com sucesso!", delay: 11500, class: "success" },
  ], [city]);

  // Efeito para adicionar logs
  useEffect(() => {
    // Adiciona logs apenas se a cidade estiver definida e o logMessages for criado
    if (!city) return;

    const timers: NodeJS.Timeout[] = [];
    logMessages.forEach((msg) => {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, { text: msg.text, class: msg.class }]);
      }, msg.delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [logMessages, city]);

  // Efeito para progresso
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Mostrar perfil após 100%
          setTimeout(() => {
            setShowProfile(true);
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 120); // 12 segundos total (100 * 120ms)

    return () => clearInterval(interval);
  }, []);



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded transition">
            <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>

          <div className="flex-1 flex justify-center">
            <img 
              src="/whatsapp_logo_new.png" 
              alt="WhatsApp" 
              className="h-12 object-contain"
            />
          </div>

          <button className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition border border-black">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-black mb-2">
            Processando Acesso ao WhatsApp
          </h1>
          <p className="text-center text-gray-600 text-lg mb-8">
            Aguarde enquanto conectamos aos servidores e preparamos seu acesso.
          </p>

          {/* Video Container - YouTube */}
          <div className="relative w-full max-w-2xl mx-auto mb-8">
            {/* Label superior */}
            <div className="bg-red-600 text-white text-xs sm:text-sm font-bold py-2 px-3 text-center rounded-t-lg">
              MULHER DE PASTOR CONTA COMO DESCOBRIU TRAIÇÃO COM O ESPIÃO
            </div>
            {/* YouTube iframe */}
            <div className="relative" style={{ paddingBottom: '56.25%', height: 0 }}>
              <iframe 
                className="absolute top-0 left-0 w-full h-full rounded-b-lg pointer-events-none"
                src="https://www.youtube.com/embed/XmHFyoVn7dw?autoplay=1&mute=0&loop=1&playlist=XmHFyoVn7dw&controls=0&modestbranding=1&rel=0&showinfo=0&disablekb=1&fs=0&iv_load_policy=3" 
                title="Whatsapp espião" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                referrerPolicy="strict-origin-when-cross-origin"
              ></iframe>
              <div className="absolute inset-0 pointer-events-none"></div>
            </div>
          </div>

          {/* Spinner - Esconde quando o perfil aparece */}
          {!showProfile && (
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Progress Bar - Esconde quando o perfil aparece */}
          {!showProfile && (
            <div className="mb-6">
              <div className="w-full bg-gray-300 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-500 h-full transition-all duration-300 ease-out"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <p className="text-center text-gray-700 font-semibold mt-3">
                Conectando aos servidores... {Math.floor(Math.min(progress, 100))}%
              </p>
            </div>
          )}

          {/* Logs Container - Esconde quando o perfil aparece */}
          {!showProfile && (
            <div className="bg-white rounded-lg p-6 max-h-64 overflow-y-auto border border-gray-200">
              <div className="space-y-2">
                {logs.map((log, index) => (
                  <div
                    key={index}
                    className={`text-sm font-medium transition-all duration-300 ${
                      log.class === "success"
                        ? "text-green-600"
                        : log.class === "warning"
                        ? "text-yellow-600"
                        : "text-gray-700"
                    }`}
                  >
                    {log.class === "success" && "✓ "}
                    {log.class === "warning" && "⚠ "}
                    {log.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Perfil do WhatsApp (Aparece após o carregamento) */}
          <div 
            id="profile-card" 
            className={`bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-300 mt-8 transition-opacity duration-500 ${showProfile ? 'opacity-100 animate-fadeIn' : 'opacity-0 pointer-events-none'}`}
          >
            {/* Profile Header */}
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-blue-500 mb-4"></div>
              <h2 className="text-2xl font-bold text-black">Perfil WhatsApp</h2>
              <p className="text-gray-600 text-lg mt-1">{phoneNumber}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <p className="text-sm text-green-600 font-medium">Online há poucos minutos</p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="border-t border-gray-200 pt-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Localização detectada</span>
                <span className="text-gray-900 font-bold">{city}, {state}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Status do dispositivo</span>
                <span className="text-green-600 font-bold">• Online Agora</span>
              </div>
            </div>

            {/* Access Button */}
            <button
              onClick={() => {
                const selectedProfile = localStorage.getItem("selectedProfile");
                if (selectedProfile === "female") {
                  setLocation("/relatorio-feminino");
                } else {
                  setLocation("/relatorio");
                }
              }}
              className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition border-2 border-black"
            >
              Acessar Relatório
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 mt-auto">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 text-sm transition">
              Suporte por Email
            </a>
          </div>
          <p className="text-center text-gray-500 text-xs">
            © 2024 Proteja Seu Relacionamento. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

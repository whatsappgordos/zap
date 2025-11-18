import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";

export default function Carregando() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<Array<{ text: string; class?: string }>>([]);
  const [showProfile, setShowProfile] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("(XX) XXXXX-XXXX");
  const [city, setCity] = useState("São Paulo");
  const [profileImage, setProfileImage] = useState(1);
  const logsInitialized = useRef(false);

  // Mapeamento de DDD para cidade
  const dddToCity: Record<string, string> = {
    "11": "São Paulo",
    "12": "São José dos Campos",
    "13": "Santos",
    "14": "Bauru",
    "15": "Sorocaba",
    "16": "Ribeirão Preto",
    "17": "São José do Rio Preto",
    "18": "Presidente Prudente",
    "19": "Campinas",
    "21": "Rio de Janeiro",
    "22": "Campos dos Goytacazes",
    "24": "Volta Redonda",
    "27": "Vitória",
    "28": "Cachoeiro de Itapemirim",
    "31": "Belo Horizonte",
    "32": "Juiz de Fora",
    "33": "Governador Valadares",
    "34": "Uberlândia",
    "35": "Poços de Caldas",
    "37": "Divinópolis",
    "38": "Montes Claros",
    "41": "Curitiba",
    "42": "Ponta Grossa",
    "43": "Londrina",
    "44": "Maringá",
    "45": "Foz do Iguaçu",
    "46": "Francisco Beltrão",
    "47": "Joinville",
    "48": "Florianópolis",
    "49": "Chapecó",
    "51": "Porto Alegre",
    "53": "Pelotas",
    "54": "Caxias do Sul",
    "55": "Santa Maria",
    "61": "Brasília",
    "62": "Goiânia",
    "63": "Palmas",
    "64": "Rio Verde",
    "65": "Cuiabá",
    "66": "Rondonópolis",
    "67": "Campo Grande",
    "68": "Rio Branco",
    "69": "Porto Velho",
    "71": "Salvador",
    "73": "Ilhéus",
    "74": "Juazeiro",
    "75": "Feira de Santana",
    "77": "Barreiras",
    "79": "Aracaju",
    "81": "Recife",
    "82": "Maceió",
    "83": "João Pessoa",
    "84": "Natal",
    "85": "Fortaleza",
    "86": "Teresina",
    "87": "Petrolina",
    "88": "Juazeiro do Norte",
    "89": "Picos",
    "91": "Belém",
    "92": "Manaus",
    "93": "Santarém",
    "94": "Marabá",
    "95": "Boa Vista",
    "96": "Macapá",
    "97": "Tefé",
    "98": "São Luís",
    "99": "Imperatriz",
  };

  const getCityFromDDD = (phone: string) => {
    const cleanNumber = (phone || "").replace(/\D/g, "");
    const ddd = cleanNumber.substring(0, 2);
    return dddToCity[ddd] || "São Paulo";
  };

  const getProfileImageNumber = (phone: string) => {
    const cleanNumber = (phone || "").replace(/\D/g, "");
    const lastDigits = parseInt(cleanNumber.slice(-2)) || 1;
    return ((lastDigits % 3) + 1) as 1 | 2 | 3;
  };

  useEffect(() => {
    // Recuperar número do localStorage
    const savedPhone = localStorage.getItem("phoneNumber") || "(XX) XXXXX-XXXX";
    setPhoneNumber(savedPhone);
    
    const determinedCity = getCityFromDDD(savedPhone);
    setCity(determinedCity);
    
    const imageNum = getProfileImageNumber(savedPhone);
    setProfileImage(imageNum);
  }, []);

  // Log messages com delays - Memoized para evitar recriação
  const logMessages = useRef([

    { text: "Iniciando conexão com servidores WhatsApp...", delay: 1000 },
    { text: "Localizando servidor mais próximo...", delay: 2000 },
    { text: "Servidor localizado! Estabelecendo conexão segura...", delay: 3500, class: "success" },
    { text: "Verificando número de telefone...", delay: 5000 },
    { text: "Número de telefone válido!", delay: 6500, class: "success" },
    { text: "Analisando base de dados...", delay: 8000 },
    { text: "Buscando informações de perfil...", delay: 10000 },
    { text: "Detectando localização do dispositivo...", delay: 12000 },
    { text: `Localização suspeita encontrada em ${city}, Brasil`, delay: 14000, class: "warning" },
    { text: "Preparando canal privado de leitura...", delay: 16000 },
    { text: "Canal privado estabelecido!", delay: 18000, class: "success" },
    { text: "Sincronizando mensagens...", delay: 20000 },
    { text: "Sincronização completa!", delay: 22000, class: "success" },
    { text: "Acesso concedido com sucesso!", delay: 24000, class: "success" },
  ]).current;

  // Efeito para adicionar logs
  useEffect(() => {
    if (logsInitialized.current) return;
    logsInitialized.current = true;

    const timers: NodeJS.Timeout[] = [];
    logMessages.current.forEach((msg) => {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, { text: msg.text, class: msg.class }]);
      }, msg.delay);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

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
    }, 250); // 25 segundos total (100 * 250ms)

    return () => clearInterval(interval);
  }, []);

  // Redirecionar para relatório após alguns segundos
  useEffect(() => {
    if (showProfile) {
      const timer = setTimeout(() => {
        setLocation("/relatorio");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showProfile, setLocation]);

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
              className="h-8 object-contain"
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
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {!showProfile ? (
            <>
              {/* Title */}
              <h1 className="text-4xl font-bold text-center text-black mb-2">
                Processando Acesso ao WhatsApp
              </h1>
              <p className="text-center text-gray-600 text-lg mb-8">
                Aguarde enquanto conectamos aos servidores e preparamos seu acesso.
              </p>

              {/* Video Container */}
              <div className="relative w-full bg-black rounded-2xl overflow-hidden mb-8 aspect-video flex items-center justify-center border-2 border-gray-300">
                <video
                  autoPlay
                  loop
                  className="w-full h-full object-cover"
                >
                  <source src="/depoimento.mp4" type="video/mp4" />
                </video>
                {/* Overlay com label */}
                <div className="absolute top-0 left-0 right-0 bg-red-600 text-white text-xs font-bold py-2 px-3 rounded-t-2xl text-center">
                  MULHER DE PASTOR CONTA COMO DESCOBRIU TRAIÇÃO COM O ESPIÃO
                </div>
              </div>

              {/* Spinner */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
              </div>

              {/* Progress Bar */}
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

              {/* Logs Container */}
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
            </>
          ) : (
            <>
              {/* Profile Section */}
              <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-300 animate-fadeIn">
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
                    <span className="text-gray-600 font-medium">Cidade de última conexão</span>
                    <span className="text-gray-900 font-bold">{city}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 font-medium">Status do dispositivo</span>
                    <span className="text-gray-900 font-bold">Ativo</span>
                  </div>
                </div>

                {/* Access Button */}
                <button
                  onClick={() => setLocation("/relatorio")}
                  className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-xl transition border-2 border-black"
                >
                  Acessar Relatório
                </button>
              </div>
            </>
          )}
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

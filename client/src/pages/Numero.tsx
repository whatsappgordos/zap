import { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface Notification {
  id: string;
  phone: string;
  message: string;
  timestamp: number;
}

const PHONE_NOTIFICATIONS = [
  "(17) 92024-xxxx está sob vigilância...",
  "(16) 94415-xxxx foi monitorado...",
  "(90) 92686-xxxx está sendo clonado...",
  "(21) 98765-xxxx acesso obtido...",
  "(11) 99876-xxxx dados sincronizados...",
  "(85) 97654-xxxx mensagens recuperadas...",
  "(47) 96543-xxxx fotos encontradas...",
  "(31) 95432-xxxx áudios extraídos...",
];

export default function Numero() {
  const [, setLocation] = useLocation();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Generate random phone notifications
  useEffect(() => {
    const generateNotifications = () => {
      const newNotifications: Notification[] = [];
      for (let i = 0; i < 3; i++) {
        const randomMessage =
          PHONE_NOTIFICATIONS[
            Math.floor(Math.random() * PHONE_NOTIFICATIONS.length)
          ];
        newNotifications.push({
          id: `notif-${Date.now()}-${i}`,
          phone: randomMessage.split(" ")[0],
          message: randomMessage,
          timestamp: Date.now(),
        });
      }
      setNotifications((prev) => [
        ...newNotifications,
        ...prev.slice(0, Math.max(0, 9 - newNotifications.length)),
      ]);
    };

    const interval = setInterval(generateNotifications, 3000);
    generateNotifications();

    return () => clearInterval(interval);
  }, []);

  const handleStartMonitoring = () => {
    if (phoneNumber.trim()) {
      setIsLoading(true);
      setTimeout(() => {
        localStorage.setItem("phoneNumber", phoneNumber);
        setLocation("/carregando");
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleStartMonitoring();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Menu Button */}
          <button className="p-2 hover:bg-gray-100 rounded transition">
            <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>

          {/* WhatsApp Logo */}
          <div className="flex-1 flex justify-center">
            <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.536.946-2.504 2.404-2.504 4.081 0 2.514 2.162 4.583 5.06 4.583 1.399 0 2.698-.356 3.769-.999l.5.287a8.05 8.05 0 002.995.588c4.563 0 8.27-3.735 8.27-8.353 0-4.619-3.707-8.354-8.27-8.354a8.025 8.025 0 00-3.79.934zm10.896-9.986C19.313 0 10.862 0 8.398.0c-4.868 0-8.843 3.974-8.843 8.843 0 1.477.338 2.876.985 4.122L0 24l5.061-1.711a8.908 8.908 0 004.126 1.029h.004c4.868 0 8.843-3.974 8.843-8.843 0-2.326-.902-4.51-2.568-6.123 1.666-1.612 2.706-3.846 2.706-6.32 0-4.868-3.975-8.843-8.843-8.843z" />
            </svg>
            <span className="ml-2 text-green-500 font-semibold">WhatsApp</span>
          </div>

          {/* Download Button */}
          <button className="w-12 h-12 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition border border-black">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" />
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-black mb-4">
            Parabéns, você ganhou 1 acesso gratuito!
          </h1>

          {/* Subtitle */}
          <p className="text-center text-gray-600 text-lg mb-12">
            Insira o número abaixo e inicie o monitoramento silencioso.
          </p>

          {/* Input */}
          <input
            type="tel"
            placeholder="(99) 99999-9999"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-6 py-4 border-4 border-dashed border-cyan-300 rounded-2xl text-center font-semibold mb-4 focus:outline-none focus:border-cyan-400 transition"
          />

          {/* Button */}
          <button
            onClick={handleStartMonitoring}
            disabled={isLoading || !phoneNumber.trim()}
            className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold py-4 px-6 rounded-2xl transition transform hover:shadow-lg active:scale-95 flex items-center justify-center gap-2 border-0"
          >
            <span>🔐</span>
            <span>{isLoading ? "Processando..." : "Clonar WhatsApp Agora"}</span>
          </button>
        </div>
      </main>

      {/* Notifications Container */}
      <div className="px-4 py-8 max-w-2xl mx-auto w-full">
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className="bg-green-100 border-l-4 border-green-500 rounded-lg p-4 flex items-center gap-3 animate-fadeIn"
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
              </div>
              <span className="text-gray-700 font-medium text-sm">{notif.message}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4 mt-auto">
        <div className="max-w-6xl mx-auto">
          {/* Links */}
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

          {/* Copyright */}
          <p className="text-center text-gray-500 text-xs">
            © 2024 Proteja Seu Relacionamento. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      {/* Cookie Notice */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-4 flex items-center justify-center gap-4 shadow-lg z-50">
        <p className="text-gray-700 text-sm flex-1 text-center">
          Este site utiliza cookies para melhorar sua experiência. Ao continuar, você concorda com nossa política.
        </p>
        <button
          onClick={() => {
            const banner = document.querySelector('[data-cookie-banner]');
            if (banner) banner.remove();
          }}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-full transition whitespace-nowrap border border-black"
          data-cookie-banner
        >
          Aceitar
        </button>
      </div>

      {/* CSS for animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
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

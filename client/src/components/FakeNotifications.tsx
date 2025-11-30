import { useEffect, useState } from "react";

interface Notification {
  id: number;
  name: string;
  action: string;
  time: string;
}

const notifications = [
  { name: "João Silva", action: "descobriu conversas ocultas", time: "agora" },
  { name: "Maria Santos", action: "aprovou o método", time: "2 min atrás" },
  { name: "Carlos Oliveira", action: "monitorou sua parceira", time: "5 min atrás" },
  { name: "Ana Beatriz", action: "descobriu uma traição", time: "8 min atrás" },
  { name: "Pedro Costa", action: "acessou o app invisível", time: "12 min atrás" },
  { name: "Juliana Lima", action: "confirmou suas suspeitas", time: "15 min atrás" },
  { name: "Thiago Rodrigues", action: "monitorou o WhatsApp", time: "18 min atrás" },
  { name: "Fernanda Alves", action: "descobriu mensagens apagadas", time: "22 min atrás" },
  { name: "Roberto Martins", action: "rastreou a localização", time: "25 min atrás" },
  { name: "Camila Souza", action: "teve acesso às conversas", time: "30 min atrás" },
];

export default function FakeNotifications() {
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let currentIndex = 0;

    const showNotification = () => {
      // Mostrar notificação
      setActiveNotification({
        id: Date.now(),
        ...notifications[currentIndex],
      });
      setIsVisible(true);

      // Esconder após 5 segundos
      setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      // Próxima notificação
      currentIndex = (currentIndex + 1) % notifications.length;
    };

    // Primeira notificação após 3 segundos
    const firstTimeout = setTimeout(showNotification, 3000);

    // Notificações subsequentes a cada 8 segundos
    const interval = setInterval(showNotification, 8000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!activeNotification) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-50 transition-all duration-500 transform ${
        isVisible ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
      }`}
    >
      <div className="bg-white rounded-lg shadow-2xl p-4 max-w-sm border-l-4 border-green-500 backdrop-blur-sm">
        <div className="flex items-start gap-3">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white font-bold text-lg">
              {activeNotification.name.charAt(0)}
            </div>
          </div>

          {/* Conteúdo */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {activeNotification.name}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              {activeNotification.action}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {activeNotification.time}
            </p>
          </div>

          {/* Ícone de verificação */}
          <div className="flex-shrink-0">
            <svg
              className="w-5 h-5 text-green-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

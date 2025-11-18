import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Carregando() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [messages, setMessages] = useState<string[]>([]);

  const allMessages = [
    "Conectando ao servidor do WhatsApp...",
    "Simulando IP na região...",
    "Ignorando o firewall...",
    "Injetando consultas SQL...",
    "Buscando informações...",
    "Quebrando senha...",
    "Autenticando...",
    "Acesso concedido, redirecionando...",
  ];

  useEffect(() => {
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      if (messageIndex < allMessages.length) {
        setMessages((prev) => [...prev, allMessages[messageIndex]]);
        messageIndex++;
      }
    }, 2000);

    return () => clearInterval(messageInterval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 250);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setLocation("/relatorio");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [progress, setLocation]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gray-50 border-b border-gray-200 py-4 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button className="p-2 hover:bg-gray-100 rounded transition">
            <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
            </svg>
          </button>

          <div className="flex-1"></div>

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
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden border border-black">
              <div
                className="bg-green-500 h-full transition-all duration-300 ease-out"
                style={{ width: `${Math.min(progress, 100)}%` }}
              ></div>
            </div>
            <p className="text-center text-gray-700 font-semibold mt-4">
              {Math.floor(Math.min(progress, 100))}%
            </p>
          </div>

          {/* Messages List */}
          <div className="bg-white border-2 border-black rounded-xl p-6 min-h-64">
            <ul className="space-y-3">
              {messages.map((message, index) => (
                <li
                  key={index}
                  className={`text-sm font-medium transition-colors ${
                    index === messages.length - 1
                      ? "text-green-600"
                      : "text-gray-600"
                  }`}
                >
                  ✓ {message}
                </li>
              ))}
            </ul>
          </div>

          {/* Status Text */}
          <p className="text-center text-gray-600 text-sm mt-8">
            Por favor, não feche esta página. O processo está em andamento...
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 px-4">
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
    </div>
  );
}

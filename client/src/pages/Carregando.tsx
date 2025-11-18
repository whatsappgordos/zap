import { useEffect, useState, useRef } from "react";
import { useLocation } from "wouter";
import { MessageCircle, CheckCircle2, Phone, Volume2 } from "lucide-react";

const VideoPlayer = () => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLIFrameElement>(null);
  const videoId = "dQw4w9WgXcQ"; // Placeholder ID - assuming a YouTube video is intended

  const handleUnmute = () => {
    setIsMuted(false);
    if (videoRef.current) {
      videoRef.current.src = videoRef.current.src.replace("&mute=1", "&mute=0");
    }
  };

  return (
    <div className="relative aspect-video rounded-lg overflow-hidden shadow-xl">
      <iframe ref={videoRef}
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
      
      {isMuted && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <button
            onClick={handleUnmute}
            className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors flex items-center gap-2"
          >
            <Volume2 className="w-5 h-5" />
            <span className="font-bold">CLIQUE PARA OUVIR</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default function Carregando() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Iniciando conexão com servidores WhatsApp...",
    "Localizando servidor mais próximo...",
    "Servidor localizado! Estabelecendo conexão segura...",
    "Verificando número de telefone...",
    "Número de telefone válido!",
  ];

  useEffect(() => {
    // Simulate progress - takes ~4 seconds to complete
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    return () => clearInterval(progressInterval);
  }, []);

  useEffect(() => {
    // Update step based on progress
    const stepIndex = Math.floor((progress / 100) * (steps.length - 1));
    setCurrentStep(Math.min(stepIndex, steps.length - 1));
  }, [progress]);

  useEffect(() => {
    // Redirect to report when complete
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setLocation("/relatorio");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [progress, setLocation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-3 px-3 sm:py-4 sm:px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500" />
            <span className="font-semibold text-gray-800 text-sm sm:text-base">WhatsApp</span>
          </div>
          <button className="text-green-500 hover:text-green-600 transition text-lg">
            ⬇️
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-3 py-6 sm:px-4 sm:py-12">
        <div className="max-w-md w-full space-y-4 sm:space-y-8">
          {/* Title */}
          <div className="text-center space-y-2 sm:space-y-3">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900">
              Processando Acesso ao WhatsApp
            </h1>
            <p className="text-gray-600 text-xs sm:text-sm">
              Aguarde enquanto conectamos aos servidores e preparamos seu acesso.
            </p>
          </div>

          {/* Video Component, Spinner, Progress, and Steps all wrapped in a single div */}
          <div className="space-y-3 sm:space-y-4">
            <VideoPlayer />

            {/* Loading Spinner */}
            <div className="flex justify-center">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
                <div
                  className="absolute inset-0 border-4 border-transparent border-t-green-500 rounded-full animate-spin"
                  style={{
                    borderTopColor: "#22c55e",
                    animation: "spin 1s linear infinite",
                  }}
                ></div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-green-500 h-full transition-all duration-300"
                  style={{ width: `${Math.min(progress, 100)}%` }}
                ></div>
              </div>
              <p className="text-center text-xs sm:text-sm font-semibold text-gray-700">
                Conectando... {Math.floor(Math.min(progress, 100))}%
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-2 bg-white p-3 sm:p-4 rounded-lg max-h-48 overflow-y-auto">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3">
                  {index < currentStep ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : index === currentStep ? (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-400 border-t-green-500 rounded-full animate-spin flex-shrink-0 mt-0.5"></div>
                  ) : (
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={`text-xs sm:text-sm ${
                      index <= currentStep ? "text-gray-700" : "text-gray-400"
                    }`}
                  >
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-4 px-3 sm:py-6 sm:px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mb-3 sm:mb-4 text-xs sm:text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-700 underline">
              Privacidade
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 underline">
              Termos
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 underline">
              Suporte
            </a>
          </div>
          <p className="text-center text-xs text-gray-500">
            © 2024 Proteja Seu Relacionamento
          </p>
        </div>
      </footer>

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

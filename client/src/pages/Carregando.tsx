import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { MessageCircle, CheckCircle2, Phone } from "lucide-react";

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
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 30;
      });
    }, 500);

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
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-green-500" />
            <span className="font-semibold text-gray-800">WhatsApp</span>
          </div>
          <button className="text-green-500 hover:text-green-600 transition">
            ⬇️
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-md w-full space-y-8">
          {/* Title */}
          <div className="text-center space-y-3">
            <h1 className="text-2xl font-bold text-gray-900">
              Processando Acesso ao WhatsApp
            </h1>
            <p className="text-gray-600 text-sm">
              Aguarde enquanto conectamos aos servidores e preparamos seu acesso.
            </p>
          </div>

          {/* Video/Image Placeholder */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg overflow-hidden aspect-video flex items-center justify-center relative">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
                alt="Loading"
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-white text-xs font-bold mb-2 bg-red-600 px-2 py-1 rounded inline-block">
                    MULHER DE PASTOR CONTA COMO DESCOBRIU TRAIÇÃO COM O ESPIÃO
                  </div>
                </div>
              </div>
            </div>

            {/* Loading Spinner */}
            <div className="flex justify-center">
              <div className="relative w-16 h-16">
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
              <p className="text-center text-sm font-semibold text-gray-700">
                Conectando aos servidores... {Math.floor(Math.min(progress, 100))}%
              </p>
            </div>

            {/* Steps */}
            <div className="space-y-2 bg-white p-4 rounded-lg">
              {steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  {index < currentStep ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  ) : index === currentStep ? (
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-green-500 rounded-full animate-spin flex-shrink-0 mt-0.5"></div>
                  ) : (
                    <Phone className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={`text-sm ${
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
      <footer className="bg-white border-t border-gray-200 py-6 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
            <a href="#" className="text-gray-500 hover:text-gray-700 underline">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 underline">
              Termos de Uso
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 underline">
              Suporte por Email
            </a>
          </div>
          <p className="text-center text-xs text-gray-500">
            © 2024 Proteja Seu Relacionamento. Todos os direitos reservados.
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

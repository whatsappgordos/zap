import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function Carregando() {
  const [, setLocation] = useLocation();
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const steps = [
    { icon: "⚙️", text: "Iniciando conexão com servidores WhatsApp..." },
    { icon: "📍", text: "Localizando servidor mais próximo..." },
    { icon: "✓", text: "Servidor localizado! Estabelecendo conexão segura..." },
    { icon: "✓", text: "Verificando número de telefone..." },
    { icon: "✓", text: "Número de telefone válido!" },
    { icon: "📊", text: "Analisando base de dados..." },
    { icon: "👤", text: "Buscando informações de perfil..." },
    { icon: "📍", text: "Detectando localização do dispositivo..." },
  ];

  useEffect(() => {
    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < steps.length) {
        setCurrentStep(stepIndex);
        setCompletedSteps((prev) => [...prev, stepIndex]);
        stepIndex++;
      }
    }, 2500);

    return () => clearInterval(stepInterval);
  }, []);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);

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
            <svg className="w-6 h-6 text-green-500" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.536.946-2.504 2.404-2.504 4.081 0 2.514 2.162 4.583 5.06 4.583 1.399 0 2.698-.356 3.769-.999l.5.287a8.05 8.05 0 002.995.588c4.563 0 8.27-3.735 8.27-8.353 0-4.619-3.707-8.354-8.27-8.354a8.025 8.025 0 00-3.79.934zm10.896-9.986C19.313 0 10.862 0 8.398.0c-4.868 0-8.843 3.974-8.843 8.843 0 1.477.338 2.876.985 4.122L0 24l5.061-1.711a8.908 8.908 0 004.126 1.029h.004c4.868 0 8.843-3.974 8.843-8.843 0-2.326-.902-4.51-2.568-6.123 1.666-1.612 2.706-3.846 2.706-6.32 0-4.868-3.975-8.843-8.843-8.843z" />
            </svg>
            <span className="ml-2 text-green-500 font-semibold">WhatsApp</span>
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
          {/* Title */}
          <h1 className="text-4xl font-bold text-center text-black mb-2">
            Processando Acesso ao WhatsApp
          </h1>
          <p className="text-center text-gray-600 text-lg mb-8">
            Aguarde enquanto conectamos aos servidores e preparamos seu acesso.
          </p>

          {/* Video Container */}
          <div className="relative w-full bg-black rounded-lg overflow-hidden mb-8 aspect-video flex items-center justify-center">
            <video
              autoPlay
              muted
              loop
              className="w-full h-full object-cover"
              style={{
                background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
              }}
            >
              <source src="https://media.giphy.com/media/xTiTnLuHV2RvME3SQo/giphy.mp4" type="video/mp4" />
            </video>
            {/* Overlay com label */}
            <div className="absolute top-2 left-2 right-2 bg-red-600 text-white text-xs font-bold py-1 px-2 rounded text-center">
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

          {/* Steps List */}
          <div className="bg-white rounded-lg p-6 max-h-64 overflow-y-auto">
            <div className="space-y-3">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-3 transition-all duration-300 ${
                    completedSteps.includes(index)
                      ? "opacity-100"
                      : index === currentStep
                      ? "opacity-100"
                      : "opacity-0"
                  }`}
                >
                  {completedSteps.includes(index) ? (
                    <span className="text-green-500 font-bold flex-shrink-0 mt-0.5">✓</span>
                  ) : index === currentStep ? (
                    <span className="text-gray-400 flex-shrink-0 mt-0.5 animate-spin">⟳</span>
                  ) : (
                    <span className="text-gray-400 flex-shrink-0 mt-0.5">○</span>
                  )}
                  <span
                    className={`text-sm font-medium ${
                      completedSteps.includes(index)
                        ? "text-green-600"
                        : index === currentStep
                        ? "text-gray-700"
                        : "text-gray-500"
                    }`}
                  >
                    {step.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
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

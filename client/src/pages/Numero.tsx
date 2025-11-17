import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageCircle, ArrowLeft } from "lucide-react";

export default function Numero() {
  const [, setLocation] = useLocation();
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    
    // Format as (XX) XXXXX-XXXX
    if (value.length > 0) {
      if (value.length <= 2) {
        value = `(${value}`;
      } else if (value.length <= 7) {
        value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
      } else {
        value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
      }
    }
    
    setPhoneNumber(value);
  };

  const handleStartMonitoring = () => {
    if (phoneNumber.replace(/\D/g, "").length >= 10) {
      // Store phone number in localStorage
      localStorage.setItem("phoneNumber", phoneNumber);
      // Navigate to loading page
      setLocation("/carregando");
    }
  };

  const handleBack = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={handleBack}
            className="text-gray-600 hover:text-gray-800 transition"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
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
          {/* Title and Description */}
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold text-gray-900">
              Parabéns, você ganhou 1 acesso gratuito!
            </h1>
            <p className="text-gray-600 text-sm">
              Insira o número abaixo e inicie o monitoramento silencioso.
            </p>
          </div>

          {/* Phone Input */}
          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="(99) 99999-9999"
                maxLength={15}
                className="w-full px-4 py-3 border-2 border-dashed border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-center font-semibold text-gray-700"
              />
              <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-500">
                📱
              </span>
            </div>

            <Button
              onClick={handleStartMonitoring}
              disabled={phoneNumber.replace(/\D/g, "").length < 10}
              className="w-full h-12 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white font-semibold rounded-lg transition"
            >
              🔒 Clonar WhatsApp Agora
            </Button>
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
    </div>
  );
}

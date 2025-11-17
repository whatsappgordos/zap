import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Users } from "lucide-react";

export default function Index() {
  const [, setLocation] = useLocation();

  const handleSelectProfile = (profile: "male" | "female") => {
    // Store profile selection in localStorage
    localStorage.setItem("selectedProfile", profile);
    // Navigate to number page
    setLocation("/numero");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-green-500" />
            <span className="font-semibold text-gray-800">Proteja Seu Relacionamento</span>
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
              Proteja Seu Relacionamento
            </h1>
            <p className="text-gray-600 text-sm">
              Descubra como manter seu relacionamento seguro e saudável com nossa solução exclusiva.
            </p>
          </div>

          {/* Profile Selection Buttons */}
          <div className="space-y-4">
            <Button
              onClick={() => handleSelectProfile("male")}
              className="w-full h-16 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-2xl border-4 border-dashed border-green-300 transition transform hover:scale-105"
            >
              <span className="mr-3">👤</span>
              Quero Monitorar Meu Parceiro
            </Button>

            <Button
              onClick={() => handleSelectProfile("female")}
              className="w-full h-16 bg-green-500 hover:bg-green-600 text-white text-lg font-semibold rounded-2xl border-4 border-dashed border-green-300 transition transform hover:scale-105"
            >
              <span className="mr-3">👤</span>
              Quero Monitorar Minha Parceira
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

      {/* Cookie Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 flex items-center justify-between gap-4">
        <p className="text-sm flex-1">
          Este site utiliza cookies para melhorar sua experiência. Ao continuar, você concorda com nossa política.
        </p>
        <Button
          onClick={() => {
            const banner = document.querySelector('[data-cookie-banner]');
            if (banner) banner.remove();
          }}
          className="bg-green-500 hover:bg-green-600 text-white whitespace-nowrap"
          data-cookie-banner
        >
          Aceitar
        </Button>
      </div>
    </div>
  );
}

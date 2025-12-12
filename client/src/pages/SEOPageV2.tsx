import { useLocation } from "wouter";
import { CheckCircle, Lock, MessageSquare, Search } from "lucide-react";

// Cores do WhatsApp
const WHATSAPP_GREEN = "bg-[#25D366]";
const WHATSAPP_DARK_GREEN = "bg-[#075E54]";
const WHATSAPP_LIGHT_GREEN = "text-[#25D366]";

export default function SEOPageV2() {
  const [, setLocation] = useLocation();

  // Esta função redireciona para a rota principal (LandingPage)
  const handleRedirectToMain = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header - Estilo WhatsApp */}
      <header className={`${WHATSAPP_DARK_GREEN} py-4 px-4 shadow-lg`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            WhatsApp Spy 2026
          </h1>
          <button 
            onClick={handleRedirectToMain}
            className="text-white border border-white px-3 py-1 rounded-full text-sm hover:bg-white hover:text-gray-800 transition"
          >
            Acessar
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-4 py-12">
        <div className="w-full max-w-4xl">
          {/* Título Principal Otimizado */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-4 leading-tight">
            A Ferramenta Definitiva para <span className={`${WHATSAPP_LIGHT_GREEN} font-extrabold`}>Rastrear WhatsApp</span> e <span className="text-red-600">Descobrir Traição</span>
          </h2>

          {/* Subtítulo */}
          <p className="text-center text-gray-600 text-xl mb-10">
            Seu parceiro(a) está escondendo algo? Use o **Espião WhatsApp** mais seguro e eficaz do Brasil.
          </p>

          {/* Botão de Ação Flutuante - Estilo WhatsApp */}
          <div className="flex justify-center mb-12">
            <button
              onClick={handleRedirectToMain}
              className={`${WHATSAPP_GREEN} text-white font-bold py-4 px-10 rounded-full text-2xl shadow-xl hover:shadow-2xl transition transform hover:scale-105 focus:outline-none flex items-center gap-3 border-4 border-white`}
            >
              <Lock className="w-6 h-6" />
              INICIAR MONITORAMENTO AGORA
            </button>
          </div>

          {/* Seção de Benefícios (Cards) */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-500">
              <Search className="w-8 h-8 text-red-500 mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Descubra a Verdade</h3>
              <p className="text-gray-600">
                Chega de dúvidas. Nossa tecnologia de **Espião WhatsApp** permite que você acesse as informações que precisa para **descobrir traição**.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
              <Lock className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">100% Seguro e Anônimo</h3>
              <p className="text-gray-600">
                Sua privacidade é nossa prioridade. **Rastrear WhatsApp** nunca foi tão discreto. Seu parceiro(a) jamais saberá.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
              <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tecnologia 2026</h3>
              <p className="text-gray-600">
                Usamos a versão mais recente do **Whatsapp Espião 2026** para garantir compatibilidade total com todos os dispositivos.
              </p>
            </div>
          </div>

          {/* Bloco de Conteúdo Otimizado para SEO (Texto Longo) */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-gray-700 space-y-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Por Que Nossa Ferramenta é a Melhor para **Monitorar Parceiro(a)**?
            </h3>
            <p>
              A busca por um **espião WhatsApp** confiável é constante. Muitos sites prometem resultados, mas apenas o nosso oferece uma solução robusta para **rastrear WhatsApp** de forma indetectável. Nosso sistema foi desenvolvido para quem precisa de respostas rápidas e precisas, seja para **descobrir traição** ou apenas para ter paz de espírito.
            </p>
            <p>
              Não perca mais tempo com aplicativos falsos. Clique no botão e comece a **monitorar parceiro(a)** com a tecnologia mais avançada do mercado.
            </p>
          </div>

          {/* Botão de Ação Final */}
          <div className="flex justify-center mt-12">
            <button
              onClick={handleRedirectToMain}
              className={`${WHATSAPP_DARK_GREEN} text-white font-bold py-4 px-10 rounded-xl text-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 focus:outline-none`}
            >
              QUERO **RASTREAR WHATSAPP** AGORA!
            </button>
          </div>

        </div>
      </main>

      {/* Footer - Estilo WhatsApp */}
      <footer className="bg-gray-200 py-6 px-4 mt-auto">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-600 text-xs">
            © 2024 WhatsApp Spy Oficial. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}

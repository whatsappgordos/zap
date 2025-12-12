import { useLocation } from "wouter";
import { CheckCircle, Lock, MessageSquare, Search } from "lucide-react";

// Cores do WhatsApp
const WHATSAPP_GREEN = "bg-[#25D366]";
const WHATSAPP_DARK_GREEN = "bg-[#075E54]";
const WHATSAPP_LIGHT_GREEN = "text-[#25D366]";
const RED_ACCENT = "text-red-600"; // Cor para "Descobrir Traição"

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
            A Ferramenta Definitiva para <span className={`${WHATSAPP_LIGHT_GREEN} font-extrabold`}>Rastrear WhatsApp</span> e <span className={RED_ACCENT}>Descobrir Traição</span>
          </h2>

          {/* Subtítulo - Corrigido */}
          <p className="text-center text-gray-600 text-xl mb-10">
            Seu parceiro(a) está escondendo algo? Use o <span className={WHATSAPP_LIGHT_GREEN}>Espião WhatsApp</span> mais seguro e eficaz do Brasil.
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
                Chega de dúvidas. Nossa tecnologia de <span className={WHATSAPP_LIGHT_GREEN}>Espião WhatsApp</span> permite que você acesse as informações que precisa para <span className={RED_ACCENT}>descobrir traição</span>.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
              <Lock className="w-8 h-8 text-blue-500 mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">100% Seguro e Anônimo</h3>
              <p className="text-gray-600">
                Sua privacidade é nossa prioridade. <span className={WHATSAPP_LIGHT_GREEN}>Rastrear WhatsApp</span> nunca foi tão discreto. Seu parceiro(a) jamais saberá.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
              <CheckCircle className="w-8 h-8 text-green-500 mb-3" />
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tecnologia 2026</h3>
              <p className="text-gray-600">
	                Usamos a versão mais recente do <span className={WHATSAPP_LIGHT_GREEN}>Whatsapp Espião 2026</span> para garantir compatibilidade total com todos os dispositivos.
              </p>
            </div>
          </div>

          {/* Bloco de Conteúdo Otimizado para SEO (Texto Longo) - EXPANDIDO */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 text-gray-700 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              A Verdade por Trás do <span className={RED_ACCENT}>Monitoramento de Parceiro(a)</span>
            </h2>
            <p>
              Em um mundo cada vez mais conectado, as dúvidas e inseguranças nos relacionamentos também migraram para o ambiente digital. A necessidade de saber a verdade levou milhares de pessoas a buscar uma solução eficaz para <span className={WHATSAPP_LIGHT_GREEN}>rastrear WhatsApp</span>. Nossa ferramenta foi desenvolvida para oferecer essa transparência, permitindo que você tenha acesso às informações necessárias para tomar decisões informadas sobre seu relacionamento.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-6">
              Por Que o <span className={WHATSAPP_LIGHT_GREEN}>Espião WhatsApp</span> se Tornou Essencial?
            </h3>
            <p>
              A comunicação via WhatsApp é instantânea e, muitas vezes, sigilosa. É o principal canal onde conversas importantes (e potencialmente comprometedoras) acontecem. Um <span className={WHATSAPP_LIGHT_GREEN}>espião WhatsApp</span> de qualidade não é apenas uma ferramenta de desconfiança, mas um meio de buscar a paz de espírito. Se a confiança foi abalada, o acesso a essa informação pode ser o único caminho para <span className={RED_ACCENT}>descobrir traição</span> ou, o que é igualmente importante, para dissipar suspeitas infundadas.
            </p>
            <p>
              Nossa tecnologia de <span className={WHATSAPP_LIGHT_GREEN}>Whatsapp Espião 2026</span> é a mais avançada do mercado, garantindo que o processo de <span className={RED_ACCENT}>monitorar parceiro(a)</span> seja feito de forma discreta e eficiente. Diferente de soluções amadoras, nosso sistema é indetectável e não compromete a segurança do dispositivo alvo.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-6">
              Como Nossa Tecnologia de <span className={WHATSAPP_LIGHT_GREEN}>Rastrear WhatsApp</span> Funciona
            </h3>
            <p>
              Utilizamos um método de sincronização de dados de ponta que não requer acesso físico constante ao aparelho. Após a ativação inicial (que é simples e guiada), nossa ferramenta começa a <span className={WHATSAPP_LIGHT_GREEN}>rastrear WhatsApp</span> em tempo real, capturando mensagens, mídias (fotos e vídeos) e até mesmo o registro de chamadas.
            </p>
            <p>
              O processo é totalmente seguro e anônimo. Os dados são criptografados e enviados para um painel de control
e privado, acessível apenas por você. Isso garante que, ao tentar <span className={RED_ACCENT}>descobrir traição</span>, sua identidade permaneça protegida e o monitoramento seja mantido em sigilo absoluto.
            </p>

            <h2 className="text-3xl font-bold text-gray-800 mt-8 mb-4">
              <span className={RED_ACCENT}>Descobrir Traição</span>: Um Guia para a Paz de Espírito
            </h2>
            <p>
              A dor da dúvida é um fardo pesado. Nossa ferramenta de <span className={WHATSAPP_LIGHT_GREEN}>espião WhatsApp</span> oferece uma saída para essa incerteza. Ao ter acesso direto às conversas, você elimina o "achismo" e lida com fatos concretos.
            </p>
            <p>
              Seja para confirmar seus temores ou para provar que eles são infundados, o poder da informação é inestimável. Milhares de usuários já utilizaram nosso sistema para <span className={RED_ACCENT}>monitorar parceiro(a)</span> e encontraram a clareza que precisavam para seguir em frente.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-6">
              Segurança e Anonimato: A Prioridade do Nosso <span className={WHATSAPP_LIGHT_GREEN}>Whatsapp Espião 2026</span>
            </h3>
            <p>
              Entendemos que a discrição é fundamental. Por isso, nosso sistema de <span className={WHATSAPP_LIGHT_GREEN}>rastrear WhatsApp</span> foi projetado para ser 100% indetectável. Não há ícones, notificações ou qualquer sinal de que o monitoramento está ativo no dispositivo alvo.
            </p>
            <p>
              Além disso, a segurança dos seus dados é nossa maior preocupação. Utilizamos criptografia de nível militar para proteger todas as informações coletadas, garantindo que apenas você tenha acesso ao painel de controle. Você pode <span className={RED_ACCENT}>monitorar parceiro(a)</span> com total tranquilidade.
            </p>

            <h3 className="text-2xl font-bold text-gray-800 mt-6">
              Perguntas Frequentes sobre <span className={WHATSAPP_LIGHT_GREEN}>Rastrear WhatsApp</span>
            </h3>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                **É legal usar um <span className={WHATSAPP_LIGHT_GREEN}>espião WhatsApp</span>?** Recomendamos que você sempre verifique as leis locais. Nossa ferramenta é destinada ao uso em dispositivos próprios ou com consentimento, ou em casos de monitoramento parental.
              </li>
              <li>
                **Preciso de acesso físico ao celular?** Sim, o acesso físico é necessário apenas para a instalação inicial. Depois disso, o <span className={WHATSAPP_LIGHT_GREEN}>rastrear WhatsApp</span> é feito remotamente.
              </li>
              <li>
                **O <span className={WHATSAPP_LIGHT_GREEN}>Whatsapp Espião 2026</span> funciona em iPhone e Android?** Sim, nossa tecnologia é compatível com os sistemas operacionais mais recentes, garantindo que você possa <span className={RED_ACCENT}>descobrir traição</span> independentemente do aparelho.
              </li>
            </ul>
            <p className="pt-4">
              Não deixe a dúvida consumir seu relacionamento. Clique no botão abaixo e comece hoje mesmo a <span className={WHATSAPP_LIGHT_GREEN}>rastrear WhatsApp</span> com a ferramenta mais confiável do Brasil.
            </p>
          </div>
	
	          {/* Botão de Ação Final - Corrigido */}
          <div className="flex justify-center mt-12">
            <button
              onClick={handleRedirectToMain}
              className={`${WHATSAPP_DARK_GREEN} text-white font-bold py-4 px-10 rounded-xl text-xl shadow-lg hover:shadow-xl transition transform hover:scale-105 focus:outline-none`}
            >
	              QUERO RASTREAR WHATSAPP AGORA!
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

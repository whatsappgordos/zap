import { useEffect, useState } from "react";
import FakeNotifications from "../components/FakeNotifications";
import CountdownTimer from "../components/CountdownTimer";

export default function Invisivel() {
  const [viewersCount, setViewersCount] = useState(47);

  useEffect(() => {
    // Carregar os pixels Utmify
    const loadPixels = () => {
      // Pixel 1
      window.pixelId = "67fc2ba806eb140157116830";
      const pixel1 = document.createElement("script");
      pixel1.setAttribute("async", "");
      pixel1.setAttribute("defer", "");
      pixel1.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
      document.head.appendChild(pixel1);

      // UTMs 1
      const utms1 = document.createElement("script");
      utms1.setAttribute("src", "https://cdn.utmify.com.br/scripts/utms/latest.js");
      utms1.setAttribute("data-utmify-prevent-xcod-sck", "");
      utms1.setAttribute("data-utmify-prevent-subids", "");
      utms1.setAttribute("async", "");
      utms1.setAttribute("defer", "");
      document.head.appendChild(utms1);

      // Pixel 2
      setTimeout(() => {
        window.pixelId = "692b7dfa7ea9d3ffa76a2269";
        const pixel2 = document.createElement("script");
        pixel2.setAttribute("async", "");
        pixel2.setAttribute("defer", "");
        pixel2.setAttribute("src", "https://cdn.utmify.com.br/scripts/pixel/pixel.js");
        document.head.appendChild(pixel2);
      }, 100);

      // UTMs 2
      const utms2 = document.createElement("script");
      utms2.setAttribute("src", "https://cdn.utmify.com.br/scripts/utms/latest.js");
      utms2.setAttribute("data-utmify-prevent-xcod-sck", "");
      utms2.setAttribute("data-utmify-prevent-subids", "");
      utms2.setAttribute("async", "");
      utms2.setAttribute("defer", "");
      document.head.appendChild(utms2);
    };

    loadPixels();

    // Carregar o script do SmartPlayer
    const script = document.createElement("script");
    script.src = "https://scripts.converteai.net/68314012-7f14-4254-9bbc-23686bc7421e/players/691cfcf549412e64e11b14a6/v4/player.js";
    script.async = true;
    document.head.appendChild(script);

    // Variar o número de visualizadores
    const interval = setInterval(() => {
      setViewersCount((prev) => {
        const change = Math.random() > 0.5 ? 1 : -1;
        const newCount = prev + change;
        return Math.max(35, Math.min(65, newCount)); // Entre 35 e 65
      });
    }, 3000);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      clearInterval(interval);
    };
  }, []);

  const handleCheckout = () => {
    window.location.href = "https://pay.kirvano.com/e2b9e430-3a62-4916-bc03-9839198d1570";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Notificações Fake */}
      <FakeNotifications />

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4UzAgOC4wNiAwIDE4czguMDYgMTggMTggMTggMTgtOC4wNiAxOC0xOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>

      <div className="relative z-10">
        {/* Header com Badge */}
        <div className="text-center pt-8 pb-4">
          <div className="inline-flex items-center gap-2 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-full px-6 py-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-green-300 text-sm font-semibold">
              {viewersCount} pessoas visualizando agora
            </span>
          </div>
        </div>

        {/* Container Principal */}
        <div className="max-w-6xl mx-auto px-4 py-8">


          <div className="mb-8 bg-white/5 backdrop-blur-lg rounded-3xl p-4 border border-white/10 shadow-2xl">

            <vturb-smartplayer 
              id="vid-691cfcf549412e64e11b14a6" 
              style={{ 
                display: "block", 
                margin: "0 auto", 
                width: "100%",
                maxWidth: "1000px",
                borderRadius: "1rem"
              }}
            />
          </div>

          {/* Botão de Checkout Principal */}
          <div className="text-center mb-12">
            <button
              onClick={handleCheckout}
              className="group relative bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white font-bold text-xl md:text-2xl px-12 py-6 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-green-500/50"
            >
              <span className="relative z-10">🔓 QUERO TER ACESSO AGORA</span>
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            </button>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-300">
              <span className="flex items-center gap-2">
                ✅ Acesso imediato
              </span>
              <span className="flex items-center gap-2">
                🔒 Pagamento seguro
              </span>
              <span className="flex items-center gap-2">
                ✨ Garantia 7 dias
              </span>
            </div>
          </div>

          {/* Cards de Benefícios com Glassmorphism */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {/* Card 1 */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-xl">
              <div className="text-5xl mb-4">🕵️</div>
              <h3 className="text-xl font-bold text-green-400 mb-4">
                Monitoramento Discreto
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Veja conversas e ligações sem deixar rastros e sem levantar suspeitas.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-xl">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-bold text-green-400 mb-4">
                Localização em Tempo Real
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Saiba exatamente onde seu parceiro(a) está agora mesmo com poucos cliques.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105 shadow-xl">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-green-400 mb-4">
                Provas Claras e Concretas
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Tenha evidências suficientes antes de qualquer confrontação, evitando desculpas ou manipulações.
              </p>
            </div>
          </div>

          {/* Badges de Garantia */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20">
              <div className="text-3xl mb-2">🔒</div>
              <p className="text-xs text-gray-300 font-semibold">100% Seguro</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-xs text-gray-300 font-semibold">Acesso Instantâneo</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20">
              <div className="text-3xl mb-2">🛡️</div>
              <p className="text-xs text-gray-300 font-semibold">Garantia 7 Dias</p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 text-center border border-white/20">
              <div className="text-3xl mb-2">👥</div>
              <p className="text-xs text-gray-300 font-semibold">+2 Mil Usuários</p>
            </div>
          </div>

          {/* Seção Eduardo Furtado */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-16 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Imagem */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-purple-500 rounded-2xl blur-xl opacity-50"></div>
                  <img 
                    src="https://static-media.hotmart.com/0FSDawAjHiwnoXmcwlLo-3e-yzk=/filters:quality(100):format(webp)/klickart-prod/uploads/media/file/4723172/photo_2022-03-14_09-49-33.jpg"
                    alt="Eduardo Furtado"
                    className="relative rounded-2xl shadow-2xl w-full max-w-md border-4 border-white/20"
                  />
                </div>
              </div>

              {/* Texto */}
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Quem é<br />Eduardo Furtado?
                </h2>
                
                <div className="inline-flex items-center gap-2 bg-red-500/20 backdrop-blur-md border-2 border-red-500/50 rounded-full px-4 py-2 mb-6">
                  <span className="text-2xl">⭐</span>
                  <span className="text-sm font-semibold text-red-300">
                    Criador do Método Espião Invisível
                  </span>
                </div>

                <div className="space-y-4 text-gray-300 leading-relaxed">
                  <p>
                    Eduardo Furtado é técnico especialista em celulares, com mais de 9 anos de experiência no ramo. 
                    Ao longo de sua carreira, percebeu que muitos clientes não o procuravam apenas para consertos comuns, 
                    mas sim para resolver uma dor muito mais profunda: descobrir se estavam sendo traídos pelos parceiros.
                  </p>

                  <p>
                    Sensibilizado pela situação, Eduardo dedicou-se a encontrar uma solução eficiente, discreta e segura 
                    para ajudar essas pessoas. Após muita pesquisa e testes rigorosos, desenvolveu o método "Espião Invisível", 
                    que já ajudou mais de 2 mil pessoas a encontrarem respostas definitivas sobre seus relacionamentos, 
                    sem correr riscos ou levantar suspeitas.
                  </p>

                  <p>
                    Hoje, Eduardo Furtado é referência na área de monitoramento digital e ajuda diariamente pessoas a 
                    recuperarem sua paz de espírito, autoestima e controle sobre suas vidas amorosas.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Moderno */}
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 mb-12 border border-white/20 shadow-2xl">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              ❓ Perguntas Frequentes
            </h2>
            
            <div className="space-y-4">
              {/* FAQ 1 */}
              <details className="group bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <summary className="cursor-pointer p-6 font-semibold text-white hover:bg-white/10 transition-colors">
                  É realmente invisível? A pessoa não vai descobrir?
                </summary>
                <div className="p-6 pt-0 text-gray-300">
                  Sim, o método é 100% invisível. A pessoa monitorada não receberá nenhuma notificação e não terá como descobrir que está sendo monitorada.
                </div>
              </details>

              {/* FAQ 2 */}
              <details className="group bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <summary className="cursor-pointer p-6 font-semibold text-white hover:bg-white/10 transition-colors">
                  Funciona em qualquer celular?
                </summary>
                <div className="p-6 pt-0 text-gray-300">
                  Sim, o método funciona tanto em Android quanto em iPhone (iOS). O Eduardo ensina o passo a passo para ambos os sistemas.
                </div>
              </details>

              {/* FAQ 3 */}
              <details className="group bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <summary className="cursor-pointer p-6 font-semibold text-white hover:bg-white/10 transition-colors">
                  Preciso ter acesso físico ao celular?
                </summary>
                <div className="p-6 pt-0 text-gray-300">
                  Sim, você precisará de acesso físico ao celular por alguns minutos para configurar o método. Depois disso, tudo funciona remotamente.
                </div>
              </details>

              {/* FAQ 4 */}
              <details className="group bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <summary className="cursor-pointer p-6 font-semibold text-white hover:bg-white/10 transition-colors">
                  Tem garantia?
                </summary>
                <div className="p-6 pt-0 text-gray-300">
                  Sim! Você tem 7 dias de garantia incondicional. Se não gostar ou não funcionar para você, devolvemos 100% do seu dinheiro.
                </div>
              </details>

              {/* FAQ 5 */}
              <details className="group bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                <summary className="cursor-pointer p-6 font-semibold text-white hover:bg-white/10 transition-colors">
                  É difícil de configurar?
                </summary>
                <div className="p-6 pt-0 text-gray-300">
                  Não! O Eduardo ensina tudo passo a passo em vídeo, de forma simples e didática. Qualquer pessoa consegue seguir as instruções.
                </div>
              </details>
            </div>
          </div>

          {/* Botão de Checkout Final */}
          <div className="text-center mb-12">
            <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-lg rounded-3xl p-8 border border-yellow-500/30 mb-6">
              <p className="text-yellow-300 font-bold text-2xl mb-4">
                🎁 OFERTA ESPECIAL POR TEMPO LIMITADO
              </p>
              <p className="text-gray-300 mb-6">
                Garanta seu acesso agora e descubra a verdade sobre seu relacionamento
              </p>
              
              {/* Contador Regressivo */}
              <CountdownTimer />
              <button
                onClick={handleCheckout}
                className="group relative bg-gradient-to-r from-green-500 via-green-600 to-green-700 hover:from-green-600 hover:via-green-700 hover:to-green-800 text-white font-bold text-xl md:text-2xl px-12 py-6 rounded-full shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-green-500/50 animate-pulse"
              >
                <span className="relative z-10">🔓 QUERO TER ACESSO AGORA</span>
                <div className="absolute inset-0 bg-white/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-300"></div>
              </button>
              <p className="text-gray-400 text-sm mt-4">
                ✅ Acesso imediato após a compra • 🔒 Pagamento 100% seguro • 🛡️ Garantia de 7 dias
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center py-8 border-t border-white/10">
            <a 
              href="https://hotmart.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-gray-300 transition"
            >
              <span className="text-sm">Feito com</span>
              <img 
                src="https://static.hotmart.com/img/hotmart-logo-white.svg"
                alt="Hotmart"
                className="h-5"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

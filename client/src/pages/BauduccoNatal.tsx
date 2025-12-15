import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'wouter';

// Hook para alterar o título da página
const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export default function BauduccoNatal() {
  usePageTitle("Natal Bauducco");

  // Lógica para sobrescrever o pixel ID apenas nesta página
  useEffect(() => {
    const originalPixelId = (window as any).pixelId;
    (window as any).pixelId = "6938e5536b4570432e6c8d5a";

    return () => {
      // Restaura o ID original ao sair da página
      (window as any).pixelId = originalPixelId;
    };
  }, []);
  const [, setLocation] = useLocation();
  const [currentStep, setCurrentStep] = useState(1);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(true);
  const [showWheel, setShowWheel] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [attempts, setAttempts] = useState(5);
  const [spinCount, setSpinCount] = useState(0);
  const [prizeResult, setPrizeResult] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);

  const prizes = ['Nenhum', '90%', '30%', '90%', 'Nenhum', '90%'];

  const quizQuestions = [
    {
      question: '1. O que não pode faltar na sua ceia de Natal?',
      options: ['Chocottone Bauducco', 'Peru Recheado', 'Panettone Bauducco de Frutas', 'Salpicão'],
    },
    {
      question: '2. Qual é a frequência com que você compra produtos da Bauducco?',
      options: ['Semanalmente', 'Mensalmente', 'Somente em datas especiais', 'Ainda não comprei'],
    },
    {
      question: '3. Já conhecia os nossos Kits de Natal?',
      options: ['Sim, e eu adoro.', 'Já ouvi falar, mas nunca comprei', 'Sim, mas não tenho condições', 'Não, mas estou curioso(a)'],
    },
    {
      question: '4. Com quem você pretende compartilhar seu Kit de Natal Bauducco em 2025?',
      options: ['Família', 'Amigos', 'Amigos do trabalho', 'Vou aproveitar sozinho'],
    },
  ];

  const handleQuizOption = (option: string) => {
    const newAnswers = [...quizAnswers, option];
    setQuizAnswers(newAnswers);

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Quiz completo
      setTimeout(() => {
        setShowQuiz(false);
        setShowWheel(true);
      }, 1500);
    }
  };

  const handleSpinWheel = () => {
    if (attempts <= 0 || isSpinning) return;

    setIsSpinning(true);
    let prize: string;
    let rotation: number;

    if (spinCount === 0) {
      prize = 'Nenhum';
      rotation = 360 * 10 + (360 / prizes.length) * prizes.indexOf('Nenhum');
    } else if (spinCount === 1) {
      prize = '90%';
      rotation = 360 * 10 + (360 / prizes.length) * prizes.indexOf('90%');
    } else {
      const randomIndex = Math.floor(Math.random() * prizes.length);
      prize = prizes[randomIndex];
      rotation = 360 * 10 + (360 / prizes.length) * randomIndex;
    }

    if (wheelRef.current) {
      wheelRef.current.style.transition = 'transform 8s cubic-bezier(0.25, 0.1, 0.25, 1)';
      wheelRef.current.style.transform = `rotate(-${rotation}deg)`;
    }

    setTimeout(() => {
      setPrizeResult(prize);
      setShowModal(true);
      setSpinCount(spinCount + 1);
      setAttempts(attempts - 1);
      setIsSpinning(false);

      if (wheelRef.current) {
        wheelRef.current.style.transition = 'none';
        wheelRef.current.style.transform = 'rotate(0deg)';
      }

      if (prize === '90%' || attempts - 1 === 0) {
        setTimeout(() => {
          if (prize === '90%') {
            // Redirecionar para a página de seleção de produtos
            window.location.href = '/bauducco-escolha';
          }
        }, 2000);
      }
    }, 8000);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleRedeem = () => {
    // Redirecionar para checkout
    window.location.href = 'https://pay.natalfortuna.com/bz5KZb5EA5Y37dL';
  };

  const progressPercentage = (currentStep / 4) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-[#fbcb07] py-4 px-4 flex justify-between items-center border-b border-gray-300">
        <button className="text-[#d32e2e] text-3xl">
          <i className="fas fa-bars"></i>
        </button>
        <div className="flex-grow text-center">
          <img alt="Bauducco logo" className="inline-block h-10" src="/bauducco_assets/logo-selo-90-2x.png" />
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 text-2xl">
            <i className="far fa-user-circle"></i>
          </button>
          <button className="text-gray-600 text-2xl">
            <i className="far fa-bookmark"></i>
          </button>
          <div className="relative">
            <button className="text-gray-600 text-2xl">
              <i className="fas fa-shopping-bag"></i>
            </button>
            <span className="absolute -top-2 -right-2 bg-gray-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              0
            </span>
          </div>
        </div>
      </header>

      {/* Quiz Container */}
      {showQuiz && (
        <main className="flex-grow w-full bg-white p-8">
          <h1 className="text-3xl font-bold mb-6 text-center text-[#d32e2e]">Quiz Rápido Bauducco 2025</h1>
          <p className="mb-8 text-center text-gray-600">Responda corretamente as 4 perguntas para resgatar seu prêmio!</p>

          {/* Progress Bar */}
          <div className="mb-8 bg-gray-200 rounded-full max-w-2xl mx-auto">
            <div
              className="bg-[#d32e2e] text-xs font-medium text-white text-center p-0.5 leading-none rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Quiz Questions */}
          <div className="max-w-2xl mx-auto">
            {currentStep <= 4 ? (
              <div className="quiz-step">
                <p className="font-semibold mb-4 text-lg text-gray-800">{quizQuestions[currentStep - 1].question}</p>
                <div className="space-y-4">
                  {quizQuestions[currentStep - 1].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuizOption(option)}
                      className="w-full text-left px-6 py-4 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-300 border-2 border-yellow-400 text-gray-800" style={{borderStyle: 'dashed'}}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center mt-8">
                <i className="fas fa-check-circle text-6xl text-green-500 mb-4"></i>
                <h2 className="text-2xl font-bold mb-4">Parabéns!</h2>
                <p className="mb-4">Você respondeu todas as perguntas corretamente.</p>
                <p className="text-sm text-gray-600 mb-6">Agora você tem direito a girar a roleta de prêmios!</p>
              </div>
            )}
          </div>
        </main>
      )}

      {/* Wheel Container */}
      {showWheel && (
        <main className="flex-grow min-h-screen flex flex-col items-center justify-center text-white px-4 bg-[#fcefc9]">
          <div className="w-full flex flex-col items-center justify-center mb-8">
            <img
              src="/bauducco_assets/HEAD-R-P-PERDI-removebg-preview.png"
              alt="Logo da empresa"
              className="h-32 sm:h-48 md:h-64 lg:h-80 mx-auto animate-pulse"
            />
          </div>

          <div className="text-center relative w-full">
            <h1 className="text-4xl sm:text-6xl font-bold mb-8 sm:mb-12 text-red-600 tracking-wider">Roleta de Prêmios</h1>

            {/* Wheel */}
            <div className="flex justify-center mb-8 sm:mb-12">
              <div className="relative w-96 h-96 sm:w-[500px] sm:h-[500px]">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-12 border-l-transparent border-r-transparent border-t-yellow-400 z-10" style={{borderLeftWidth: '20px', borderRightWidth: '20px', borderTopWidth: '40px'}}></div>
                <div
                  ref={wheelRef}
                  className="w-full h-full rounded-full transition-transform"
                  style={{
                    backgroundImage: `url('/bauducco_assets/download-1.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                      <i className="fas fa-trophy text-2xl text-yellow-700"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleSpinWheel}
              disabled={attempts <= 0 || isSpinning}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-red-800 font-bold py-3 px-8 sm:py-4 sm:px-12 rounded-full text-xl sm:text-2xl transition duration-300 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Girar a Roleta
            </button>
            <p className="mt-4 text-xl font-bold text-gray-800">Chances restantes: {attempts}</p>
          </div>

          {/* Prize Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 px-4">
              <div className="bg-white text-gray-900 p-8 sm:p-16 rounded-3xl text-center shadow-2xl max-w-lg w-full">
                <h2 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8 text-red-600">
                  {prizeResult === 'Nenhum' ? 'Ops!' : 'Parabéns!'}
                </h2>
                <p className="text-2xl sm:text-3xl mb-8 sm:mb-10">
                  <span className="font-bold text-yellow-500">
                    {prizeResult === 'Nenhum'
                      ? 'Você ganhou apenas 10% nessa rodada, Faça um novo giro na roda da sorte e tente um prêmio maior!'
                      : prizeResult === '90%'
                      ? 'Parabéns! Você ganhou 100% de desconto nos kits de natal Bauducco 2025.'
                      : `Você ganhou ${prizeResult} de desconto!`}
                  </span>
                </p>
                <button
                  onClick={() => {
                    if (prizeResult === '90%') {
                      window.location.href = '/bauducco-escolha';
                    } else {
                      handleCloseModal();
                    }
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition duration-300 ease-in-out text-xl sm:text-2xl transform hover:scale-105"
                >
                  {prizeResult === '90%' ? 'RESGATAR MEU KIT' : 'Fechar'}
                </button>
                {prizeResult === '90%' && (
                  <button
                    onClick={handleRedeem}
                    className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 px-6 sm:py-4 sm:px-8 rounded-full transition duration-300 ease-in-out text-xl sm:text-2xl transform hover:scale-105 mt-4"
                  >
                    Resgatar Presente
                  </button>
                )}
              </div>
            </div>
          )}
        </main>
      )}

      {/* Checkout Container */}
      {showCheckout && (
        <main className="flex-grow w-full bg-white p-8">
          <nav className="text-[#d32e2e] text-sm mb-4">
            <a className="hover:underline" href="#">
              Home
            </a>
            <span className="mx-2">&gt;</span>
            <span className="font-bold">Kit Fortuna Bauducco</span>
          </nav>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <img
                alt="Kit Fortuna"
                className="w-full rounded-lg shadow-lg"
                src="https://brf.my.salesforce.com/servlet/servlet.ImageServer?id=015U6000005nIH3&oid=00D410000012TJa&lastMod=1721345332000"
              />
            </div>
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold mb-4">Kit Fortuna Bauducco 8 Itens 9,5 kg</h1>
              <div className="mb-4">
                <span className="text-2xl font-bold text-[#d32e2e]">Grátis (apenas frete)</span>
                <span className="text-lg text-gray-500 line-through ml-2">R$ 575,90</span>
              </div>
              <p className="text-green-600 font-semibold mb-4">Você economizou R$ 575,90 (100% de desconto)</p>
              <a
                href="https://pay.natalfortuna.com/bz5KZb5EA5Y37dL"
                className="block w-full bg-[#d32e2e] text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition duration-300 text-center"
              >
                Comprar Agora
              </a>
              <p className="text-gray-600 mt-4">
                Peso do Kit: 9,520 kg | Serve até 22 pessoas. Inclui Chester Perdigão, Pernil suíno, Costela suína, Lasanha, Tender suíno, Copa fatiada, Presunto parma e Torta de goiaba.
              </p>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  BookOpen, Video, Calendar, CreditCard, User, LogOut, Globe, 
  MessageSquare, CheckCircle, Menu, Star, Clock, Info, 
  Briefcase, Mail, Phone, FileText, Users, HelpCircle, MapPin, 
  Facebook, Twitter, Instagram, Linkedin
} from 'lucide-react';

// --- 1. TEACHER DATA (Global) ---
const TEACHERS = [
  {
    id: 1,
    name: "Anita P A",
    country: "Nigeria",
    flag: "🇳🇬",
    accent: "Clear / Neutral",
    rating: 5.0,
    students: 120,
    specialty: "Business English & Email Drafting",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anita&backgroundColor=c0ade7",
    bio: "University-educated professional. I specialize in helping professionals find the precise vocabulary needed for high-stakes client meetings."
  },
  {
    id: 2,
    name: "Vicky M",
    country: "Nigeria",
    flag: "🇳🇬",
    accent: "Neutral / Professional",
    rating: 4.9,
    students: 95,
    specialty: "IELTS Speaking Prep",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vicky&backgroundColor=ffdfbf",
    bio: "Expert in IELTS strategies. I help you find the exact structure needed to communicate with authority and confidence."
  },
  {
    id: 3,
    name: "Esther A",
    country: "Nigeria",
    flag: "🇳🇬",
    accent: "Articulate / Academic",
    rating: 5.0,
    students: 210,
    specialty: "Academic Writing & Speaking",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Esther&backgroundColor=b6e3f4",
    bio: "Specializing in graduate school preparation. I focus on professional tone and polished clarity for academic success."
  }
];

// --- 2. MARKET CONFIGURATION (The Brains of the Operation) ---
const MARKET_CONFIG = {
  english: {
    label: "English",
    flag: "🇺🇸",
    currency: "$",
    currencyCode: "USD",
    price: 15,
    duration: "45 min",
    platform: "Zoom / Google Meet",
    paymentMethods: "Stripe / PayPal",
    contactMethod: "Email: ScriptPrecision@Gmail.com",
    
    // UI Text
    navHome: "Home", navPricing: "Pricing", navAbout: "About Us", navLogin: "Log In", navSignup: "Sign Up",
    heroTitle: "Master English with Precision",
    heroSubtitle: "Script Precision: Master English with precision and meticulously crafted lessons, where every word is chosen for purpose and every structure builds confidence.",
    ctaButton: "Start Learning Now",
    
    problemTitle: "The Problem",
    problemText: "Students possess a solid foundation in English, but they consistently struggle with finding the precise vocabulary, structure, and professional tone needed to communicate with authority.",
    solutionTitle: "The Solution",
    solutionText: "With Script Precision, you'll practice and perfect the exact language needed for client interactions, giving you the confidence to handle any meeting agenda with polished, professional clarity.",
    uspTitle: "Our USP",
    uspText: "Clear, neutral accents and exceptional university education. Our Nigerian tutors are selected specifically for their articulate teaching style.",
    
    step1: "Sign Up", step2: "Buy Credits", step3: "Book Tutor", step4: "Connect"
  },
  china: {
    label: "China",
    flag: "🇨🇳",
    currency: "¥",
    currencyCode: "RMB",
    price: 100,
    duration: "45 min",
    platform: "VooV Meeting (Tencent)",
    paymentMethods: "WeChat Pay / Alipay",
    contactMethod: "WeChat ID: ScriptPrecision",
    
    // UI Text (Localized)
    navHome: "首页", navPricing: "课程价格", navAbout: "关于我们", navLogin: "登录", navSignup: "注册",
    heroTitle: "精准掌握英语",
    heroSubtitle: "Script Precision：精准掌握英语，精心打造每一堂课，字斟句酌，构建自信。",
    ctaButton: "立即开始学习",
    
    problemTitle: "痛点 (The Problem)",
    problemText: "学生拥有扎实的英语基础，但在高风险的职业或学术场合（如客户会议、演讲）中，往往难以找到精准的词汇和专业的语气来自信地表达。",
    solutionTitle: "解决方案 (The Solution)",
    solutionText: "通过 Script Precision，您将练习并完善客户互动所需的准确语言，从而自信地处理任何会议议程，展现专业清晰度。",
    uspTitle: "我们的优势 (Our USP)",
    uspText: "清晰、中立的口音和卓越的大学教育背景。我们的尼日利亚导师是因其清晰的教学风格而被特别选拔的。",
    
    step1: "注册账号", step2: "购买课时", step3: "预约导师", step4: "开始上课"
  },
  brazil: {
    label: "Brazil",
    flag: "🇧🇷",
    currency: "R$",
    currencyCode: "BRL",
    price: 85,
    duration: "45 min",
    platform: "Google Meet",
    paymentMethods: "Pix / PayPal",
    contactMethod: "WhatsApp / Email",
    
    // UI Text (Localized)
    navHome: "Início", navPricing: "Preços", navAbout: "Sobre Nós", navLogin: "Entrar", navSignup: "Cadastrar",
    heroTitle: "Domine o Inglês com Precisão",
    heroSubtitle: "Script Precision: Domine o inglês com precisão e aulas meticulosamente elaboradas, onde cada palavra é escolhida com propósito e cada estrutura constrói confiança.",
    ctaButton: "Comece Agora",
    
    problemTitle: "O Problema",
    problemText: "Alunos possuem uma base sólida em inglês, mas lutam para encontrar o vocabulário preciso e o tom profissional necessário para se comunicar com autoridade em situações decisivas.",
    solutionTitle: "A Solução",
    solutionText: "Com a Script Precision, você praticará a linguagem exata necessária para interações com clientes, ganhando confiança para lidar com qualquer reunião com clareza profissional.",
    uspTitle: "Nosso Diferencial",
    uspText: "Sotaques claros e neutros e educação universitária excepcional. Nossos tutores nigerianos são selecionados especificamente por seu estilo de ensino articulado.",
    
    step1: "Cadastre-se", step2: "Compre Créditos", step3: "Agende", step4: "Conecte-se"
  }
};

// --- 3. COMPONENTS ---

const Navbar = ({ setPage, market, setMarket }) => {
  const t = MARKET_CONFIG[market];
  
  return (
    <nav className="bg-indigo-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 font-bold text-xl cursor-pointer" 
          onClick={() => setPage('home')}
        >
          <div className="w-8 h-8 bg-teal-400 rounded-lg flex items-center justify-center text-indigo-900">
            <Globe size={20} />
          </div>
          <span className="hidden sm:inline">Script Precision</span>
        </div>

        <div className="flex items-center gap-4">
          {/* Market Toggle */}
          <div className="flex bg-indigo-800 rounded-full p-1 border border-indigo-600">
              <button onClick={() => setMarket('english')} className={`px-3 py-1 text-xs font-bold rounded-full transition ${market === 'english' ? 'bg-white text-indigo-900' : 'text-gray-400'}`}>🇺🇸 EN</button>
              <button onClick={() => setMarket('brazil')} className={`px-3 py-1 text-xs font-bold rounded-full transition ${market === 'brazil' ? 'bg-green-500 text-indigo-900' : 'text-gray-400'}`}>🇧🇷 BR</button>
              <button onClick={() => setMarket('china')} className={`px-3 py-1 text-xs font-bold rounded-full transition ${market === 'china' ? 'bg-teal-500 text-indigo-900' : 'text-gray-400'}`}>🇨🇳 CN</button>
          </div>

          <div className="hidden md:flex gap-4 items-center">
              <button onClick={() => setPage('home')} className="hover:text-teal-300 font-medium text-sm">{t.navHome}</button>
              <button onClick={() => setPage('pricing')} className="hover:text-teal-300 font-medium text-sm">{t.navPricing}</button>
              <button onClick={() => setPage('about')} className="hover:text-teal-300 font-medium text-sm">{t.navAbout}</button>
              <button onClick={() => setPage('connect')} className="hover:text-teal-300 font-medium text-sm">Connect</button>
              
              <button onClick={() => setPage('login')} className="px-4 py-1.5 border border-teal-400 text-teal-400 rounded-full font-bold text-sm hover:bg-teal-900 transition">
                  {t.navLogin}
              </button>
              <button onClick={() => setPage('contact-signup')} className="px-4 py-1.5 bg-teal-500 text-indigo-900 rounded-full font-bold text-sm hover:bg-teal-400 transition">
                  {t.navSignup}
              </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const LandingPage = ({ setPage, config }) => (
  <div className="bg-gray-50 min-h-screen font-sans">
    <header className="relative bg-indigo-900 text-white pt-24 pb-36 px-6 text-center overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight tracking-tight">
          {config.heroTitle}
        </h1>
        <p className="text-xl text-gray-200 mb-10 max-w-3xl mx-auto font-light leading-relaxed italic">
          "{config.heroSubtitle}"
        </p>
        <button 
            onClick={() => setPage('contact-signup')} 
            className="px-8 py-4 bg-teal-500 hover:bg-teal-400 text-indigo-900 font-bold rounded-full text-lg transition shadow-lg transform hover:scale-105"
        >
            {config.ctaButton}
        </button>
      </div>
    </header>

    <section className="py-20 px-6 max-w-7xl mx-auto -mt-24 relative z-20">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-indigo-500">
          <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-6">
            <Info size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">{config.problemTitle}</h3>
          <p className="text-gray-600 leading-relaxed">{config.problemText}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-teal-500">
          <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-6">
            <CheckCircle size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">{config.solutionTitle}</h3>
          <p className="text-gray-600 leading-relaxed">{config.solutionText}</p>
        </div>
        <div className="bg-white p-8 rounded-2xl shadow-xl border-b-4 border-purple-500">
          <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 mb-6">
            <Star size={28} />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-800">{config.uspTitle}</h3>
          <p className="text-gray-600 leading-relaxed">{config.uspText}</p>
        </div>
      </div>
    </section>

    {/* How It Works */}
    <section className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
             <div className="w-12 h-12 bg-indigo-100 text-indigo-800 rounded-full flex items-center justify-center font-bold mb-4">1</div>
             <h4 className="font-bold mb-2">{config.step1}</h4>
             <button onClick={() => setPage('contact-signup')} className="text-sm text-teal-600 hover:underline">Go to Sign Up</button>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-12 h-12 bg-indigo-100 text-indigo-800 rounded-full flex items-center justify-center font-bold mb-4">2</div>
             <h4 className="font-bold mb-2">{config.step2}</h4>
             <button onClick={() => setPage('payment')} className="text-sm text-teal-600 hover:underline">Buy Credits</button>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-12 h-12 bg-indigo-100 text-indigo-800 rounded-full flex items-center justify-center font-bold mb-4">3</div>
             <h4 className="font-bold mb-2">{config.step3}</h4>
             <button onClick={() => setPage('tutors')} className="text-sm text-teal-600 hover:underline">See Tutors</button>
          </div>
          <div className="flex flex-col items-center">
             <div className="w-12 h-12 bg-teal-100 text-teal-800 rounded-full flex items-center justify-center font-bold mb-4">4</div>
             <h4 className="font-bold mb-2">{config.step4}</h4>
             <button onClick={() => setPage('connect')} className="text-sm text-teal-600 hover:underline">Connect Now</button>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const PricingPage = ({ config, setPage }) => (
    <div className="max-w-7xl mx-auto px-4 py-20 bg-gray-50 min-h-screen">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Simple, Transparent Pricing</h1>
            <p className="mt-4 text-xl text-gray-600">
                Tailored for {config.label}. No hidden fees.
            </p>
        </div>
        <div className="flex justify-center">
            <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-4 border-teal-500 w-full max-w-md">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Standard Lesson</h3>
                <div className="text-center">
                    <span className="text-6xl font-extrabold text-indigo-800">{config.currency}{config.price}</span>
                    <span className="text-xl font-medium text-gray-600 ml-1">{config.currencyCode}</span>
                </div>
                <p className="text-center text-gray-500 font-medium mb-6">per {config.duration} lesson</p>
                <ul className="space-y-3 mb-8 text-gray-600">
                    <li className="flex items-center gap-2"><CheckCircle size={18} className="text-teal-500"/> 1-on-1 Native Tutor</li>
                    <li className="flex items-center gap-2"><CheckCircle size={18} className="text-teal-500"/> Platform: <strong>{config.platform}</strong></li>
                    <li className="flex items-center gap-2"><CheckCircle size={18} className="text-teal-500"/> Pay via <strong>{config.paymentMethods}</strong></li>
                </ul>
                <button onClick={() => setPage('payment')} className="w-full py-3 bg-teal-500 text-white rounded-lg font-bold hover:bg-teal-400 transition">
                    Buy Credits Now
                </button>
            </div>
        </div>
    </div>
);

// --- NEW PAGE: Tutors ---
const TutorsPage = ({ config, setPage }) => (
    <div className="max-w-7xl mx-auto px-4 py-20 bg-white min-h-screen">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Meet Your Tutors</h1>
            <p className="text-xl text-gray-600">University-educated professionals from Nigeria.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
            {TEACHERS.map(teacher => (
                <div key={teacher.id} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition">
                    <div className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <img src={teacher.avatar} className="w-16 h-16 rounded-full bg-gray-100"/>
                            <div>
                                <h3 className="font-bold text-lg">{teacher.name} {teacher.flag}</h3>
                                <div className="text-yellow-500 flex items-center text-sm"><Star size={14} fill="currentColor"/> {teacher.rating}</div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="inline-block px-2 py-1 bg-indigo-50 text-indigo-700 text-xs rounded font-bold">{teacher.specialty}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{teacher.bio}</p>
                    </div>
                    <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-between items-center">
                        <span className="font-bold text-gray-900">{config.currency}{config.price} / {config.duration}</span>
                        <button onClick={() => setPage('payment')} className="text-teal-600 font-bold text-sm hover:underline">Book Now</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

// --- NEW PAGE: Contact Sign Up ---
const ContactSignupPage = () => (
    <div className="max-w-2xl mx-auto px-4 py-20 bg-white min-h-screen">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Sign Up via Email</h1>
            <p className="text-xl text-gray-600">To create your account, please send us an email.</p>
        </div>
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-200 shadow-sm text-center">
            <Mail size={48} className="mx-auto text-indigo-600 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">ScriptPrecision@Gmail.com</h3>
            <p className="text-gray-600 mb-6">
                Please include your <strong>Name</strong>, <strong>Preferred Language</strong>, and <strong>Learning Goals</strong>. 
                We will reply with your student ID and next steps within 24 hours.
            </p>
            <a href="mailto:ScriptPrecision@Gmail.com" className="inline-block bg-teal-500 text-white px-8 py-3 rounded-full font-bold hover:bg-teal-400 transition">
                Send Email Now
            </a>
        </div>
    </div>
);

// --- NEW PAGE: Payment ---
const PaymentPage = ({ config }) => (
    <div className="max-w-3xl mx-auto px-4 py-20 bg-white min-h-screen">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Buy Credits</h1>
            <p className="text-xl text-gray-600">Secure your lessons easily.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-indigo-100">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">Payment Details</h3>
                <div className="space-y-4 text-gray-700">
                    <p><strong>Price per Lesson:</strong> {config.currency}{config.price}</p>
                    <p><strong>Duration:</strong> {config.duration}</p>
                    <p><strong>Accepted Methods:</strong> {config.paymentMethods}</p>
                </div>
            </div>
            <div className="bg-indigo-50 p-8 rounded-xl border border-indigo-200">
                <h3 className="text-xl font-bold text-indigo-900 mb-4">How to Pay</h3>
                <p className="text-gray-700 mb-4">
                    We process payments securely based on your region. Please contact us via your preferred method to receive the payment link or QR code.
                </p>
                <div className="bg-white p-4 rounded-lg border border-indigo-100 font-mono text-center font-bold text-indigo-800">
                    {config.contactMethod}
                </div>
            </div>
        </div>
    </div>
);

// --- NEW PAGE: Connect ---
const ConnectPage = ({ config }) => (
    <div className="max-w-4xl mx-auto px-4 py-20 bg-white min-h-screen">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Connect With Us</h1>
            <p className="text-xl text-gray-600">Stay updated and get support.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
            {/* Social Media */}
            <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Social Media</h3>
                <div className="space-y-4">
                    <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 transition">
                        <Instagram size={24} /> Instagram: @ScriptPrecision
                    </a>
                    <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 transition">
                        <Facebook size={24} /> Facebook: Script Precision
                    </a>
                    <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 transition">
                        <Linkedin size={24} /> LinkedIn: Script Precision
                    </a>
                    <a href="#" className="flex items-center gap-3 text-gray-600 hover:text-indigo-600 transition">
                        <Globe size={24} /> Xiaohongshu (Red): ScriptPrecision
                    </a>
                </div>
            </div>
            
            {/* Direct Contact */}
            <div className="bg-indigo-900 text-white p-8 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-6">Direct Support</h3>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Mail size={24} className="text-teal-400" />
                        <span>ScriptPrecision@Gmail.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MessageSquare size={24} className="text-teal-400" />
                        <span>WeChat: ScriptPrecision</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Phone size={24} className="text-teal-400" />
                        <span>+234 8026574515</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const AboutPage = () => (
  <div className="max-w-4xl mx-auto py-20 px-6">
    <h1 className="text-4xl font-bold text-indigo-900 mb-6">About Us</h1>
    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
      Script Precision is founded by the <strong>Zudinah Ventures Group</strong>, dedicated to providing excellence in teaching and bringing a quality service to a field in high demand, all at affordable prices.
    </p>
    <div className="bg-indigo-50 p-8 rounded-xl border-l-4 border-indigo-600 mb-10">
        <h3 className="text-xl font-bold text-indigo-800 mb-2">Our Founders</h3>
        <p className="text-gray-700">
            <strong>Peter Azura</strong> (Lawyer, International Experience) & <strong>Anita Azura</strong> (Expert English Teacher). Together, they created a platform that merges professional standards with educational excellence.
        </p>
    </div>
  </div>
);

// --- MAIN APP ---

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [market, setMarket] = useState('english'); // Default
  const [userType, setUserType] = useState(null); 

  // Auto-scroll top
  useEffect(() => { window.scrollTo(0, 0); }, [currentPage]);

  const config = MARKET_CONFIG[market];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Navbar 
        setPage={setCurrentPage} 
        market={market}
        setMarket={setMarket}
        userType={userType}
        logout={() => setUserType(null)}
      />

      <main className="flex-grow">
        {currentPage === 'home' && <LandingPage setPage={setCurrentPage} config={config} />}
        {currentPage === 'pricing' && <PricingPage config={config} setPage={setCurrentPage} />}
        {currentPage === 'about' && <AboutPage />}
        
        {/* NEW PAGES */}
        {currentPage === 'contact-signup' && <ContactSignupPage />}
        {currentPage === 'payment' && <PaymentPage config={config} />}
        {currentPage === 'tutors' && <TutorsPage config={config} setPage={setCurrentPage} />}
        {currentPage === 'connect' && <ConnectPage config={config} />}
        
        {/* Simple Login Placeholder */}
        {currentPage === 'login' && (
            <div className="flex items-center justify-center h-[60vh]">
                <button onClick={() => setUserType('student')} className="bg-indigo-900 text-white px-8 py-3 rounded-lg font-bold">Simulate Login</button>
            </div>
        )}
        
        {/* Dashboard */}
        {currentPage === 'student-dash' && <TutorsPage config={config} setPage={setCurrentPage} />}
      </main>

      <footer className="bg-indigo-900 text-gray-400 py-12 px-6 border-t border-indigo-800 text-center">
        <p className="text-white font-bold text-lg mb-2">Script Precision</p>
        <p className="text-sm mb-6">Founded by Zudinah Ventures Group.</p>
        <div className="inline-block bg-indigo-800 rounded-lg px-6 py-3 text-white font-mono border border-indigo-600">
            {config.contactMethod}
        </div>
        <p className="mt-4 text-xs">Platform: {config.platform}</p>
      </footer>
    </div>
  );
};

export default App;

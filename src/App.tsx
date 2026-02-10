import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Menu, 
  X, 
  User, 
  CheckCircle, 
  ArrowRight, 
  Zap, 
  Shield, 
  Star,
  Globe,
  Award,
  LogOut,
  TrendingUp,
  Target,
  Megaphone
} from 'lucide-react';

// --- Types ---
interface TrendingCardProps {
  name: string;
  category: string;
  logo: string;
  color: string;
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface BrandLogo {
  name: string;
  icon: string;
}

interface NavbarProps {
  isLoggedIn: boolean;
  userType: string;
  onLogin: () => void;
  onLogout: () => void;
}

interface FooterProps {
  brandLogos: BrandLogo[];
}

// --- Components ---

const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  onClick 
}: { 
  children: React.ReactNode; 
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'; 
  className?: string;
  onClick?: () => void;
}) => {
  const baseStyle = "px-6 py-3 rounded-full font-bold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95";
  
  const variants = {
    primary: "bg-electric text-black hover:bg-[#e5c100] shadow-md hover:shadow-lg", 
    secondary: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    outline: "border-2 border-gray-900 text-gray-900 hover:bg-gray-50",
    ghost: "bg-transparent text-gray-600 hover:text-gray-900"
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-2xl md:text-3xl font-extrabold mb-8 text-gray-900 font-sans text-center md:text-left">
    {title}
  </h2>
);

const FeatureCard = ({ icon, title, desc }: FeatureProps) => (
  <div className="flex flex-col items-start p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow h-full">
    <div className="p-3 bg-blue-50 text-blue-600 rounded-xl mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-bold mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{desc}</p>
  </div>
);

const TrendingCard = ({ name, category, logo, color }: TrendingCardProps) => (
  <div className={`relative overflow-hidden rounded-3xl p-5 md:p-6 aspect-square flex flex-col justify-between text-white shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 group`}>
    {/* Gradient Background */}
    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-90 z-0`}></div>
    
    {/* Abstract Shapes */}
    <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10 blur-xl"></div>
    <div className="absolute bottom-0 left-0 w-24 h-24 bg-black opacity-10 rounded-full -ml-5 -mb-5 blur-lg"></div>

    <div className="relative z-10 bg-white/20 backdrop-blur-md w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center border border-white/30 shadow-inner">
      <i className={`${logo} text-lg md:text-xl`}></i>
    </div>

    <div className="relative z-10 mt-4">
      <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider opacity-80 mb-1">{category}</p>
      <h3 className="text-lg md:text-2xl font-bold leading-tight">{name}</h3>
    </div>
    
    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden md:block">
      <div className="bg-white text-black p-2 rounded-full">
        <ArrowRight size={16} />
      </div>
    </div>
  </div>
);

const NavBar = ({ isLoggedIn, userType, onLogin, onLogout }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: userType === 'organizer' ? 'Organizers' : 'Find Events', href: '#' },
    { name: userType === 'organizer' ? 'Find Brands' : 'Brands', href: '#' },
    { name: 'Success Stories', href: '#' },
    { name: 'About', href: '#' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    onLogin();
    setIsMobileMenuOpen(false);
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-4 md:py-5'}`}>
        <div className="container mx-auto px-5 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-tighter">Sponsor<span className="text-gray-400">Kiya</span><span className="text-electric text-3xl">.</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center gap-4 animate-fade-in-down">
                <div className="flex flex-col items-end mr-2">
                  <span className="text-xs font-bold">Aditya S.</span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider">{userType}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300 cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-black transition-all">
                   <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya" alt="User" />
                </div>
                <button 
                  onClick={onLogout}
                  className="bg-gray-100 hover:bg-gray-200 p-2 rounded-full text-gray-600 transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <button onClick={onLogin} className="text-sm font-bold text-gray-900 hover:underline">Login</button>
                <button onClick={onLogin} className="bg-black text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-800 transition-colors">Sign up</button>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
             {isLoggedIn && (
               <div className="flex items-center gap-2 bg-gray-100 rounded-full px-2 py-1 pr-3 animate-fade-in-down">
                  <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden border border-white">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aditya" alt="User" />
                  </div>
                  {/* Hide name on very small screens if needed, but keeping for now */}
                  <span className="text-xs font-bold">Aditya</span>
               </div>
             )}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-800 hover:bg-gray-100 rounded-full transition-colors">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-[65px] bg-white z-40 p-6 md:hidden flex flex-col gap-6 animate-fade-in-down border-t border-gray-100 h-[calc(100vh-65px)] overflow-y-auto">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-2xl font-bold text-gray-900 border-b pb-4 border-gray-100 hover:text-electric transition-colors">
              {link.name}
            </a>
          ))}
          <div className="mt-auto flex flex-col gap-4 pb-8">
            {isLoggedIn ? (
              <Button variant="outline" className="w-full justify-center text-red-600 border-red-200 hover:bg-red-50" onClick={handleLogoutClick}>
                <LogOut size={18} className="mr-2" /> Logout
              </Button>
            ) : (
              <>
                <Button variant="outline" className="w-full justify-center" onClick={handleLoginClick}>Login</Button>
                <Button className="w-full justify-center text-black" onClick={handleLoginClick}>Sign Up</Button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

const PageFooter = ({ brandLogos }: FooterProps) => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 md:pt-20 md:pb-10">
        <div className="container mx-auto px-5 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
            <div className="md:col-span-1">
              <span className="text-2xl font-black tracking-tighter block mb-4 md:mb-6">Sponsor<span className="text-gray-500">Kiya</span>.</span>
              <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
                Empowering the next generation of creators and organizers by democratizing access to corporate sponsorship.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4 md:mb-6 text-electric text-lg">Quick Links</h4>
              <ul className="space-y-3 md:space-y-4 text-sm text-gray-400">
                <li className="hover:text-white cursor-pointer transition-colors">Organizers</li>
                <li className="hover:text-white cursor-pointer transition-colors">Brands</li>
                <li className="hover:text-white cursor-pointer transition-colors">Success Stories</li>
                <li className="hover:text-white cursor-pointer transition-colors">About Us</li>
              </ul>
            </div>

            <div className="md:col-span-2">
              <h4 className="font-bold mb-4 md:mb-6 text-electric text-lg">Newsletter Signup</h4>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <input 
                  type="email" 
                  placeholder="Type your email..." 
                  className="bg-gray-900 border border-gray-800 rounded-full px-6 py-3 text-white focus:outline-none border-electric-focus flex-grow transition-colors"
                  style={{ borderColor: 'transparent' }}
                  onFocus={(e) => e.target.style.borderColor = '#FFD600'}
                  onBlur={(e) => e.target.style.borderColor = '#1f2937'}
                />
                <button className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-electric transition-colors">
                  Subscribe
                </button>
              </div>
              <div className="flex gap-6 mt-8 opacity-50 grayscale hover:grayscale-0 transition-all flex-wrap">
                 {brandLogos.slice(0,4).map((b,i) => (
                    <i key={i} className={`${b.icon} text-xl hover:text-white transition-colors cursor-pointer`}></i>
                 ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
            <p className="text-center md:text-left">&copy; 2024 SponsorKiya. All rights reserved.</p>
            <div className="flex gap-6">
               <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
               <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
               <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
            </div>
          </div>
        </div>
      </footer>
  );
};


export default function App() {
  const [userType, setUserType] = useState<'organizer' | 'brand'>('organizer');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // --- Data for Brands ---
  const brandLogos = [
    { name: 'Apple', icon: 'fa-brands fa-apple' },
    { name: 'Spotify', icon: 'fa-brands fa-spotify' },
    { name: 'Google', icon: 'fa-brands fa-google' },
    { name: 'Amazon', icon: 'fa-brands fa-amazon' },
    { name: 'Microsoft', icon: 'fa-brands fa-microsoft' },
  ];

  // --- Data for Trending Section ---
  const trendingSponsors = [
    { name: 'Cool Gaming', category: 'Gaming', logo: 'fa-solid fa-gamepad', color: 'from-blue-600 to-indigo-900' },
    { name: 'Greenify', category: 'Eco-Tech', logo: 'fa-solid fa-leaf', color: 'from-emerald-400 to-teal-800' },
    { name: 'BeatBox', category: 'Music', logo: 'fa-solid fa-music', color: 'from-fuchsia-500 to-purple-900' },
    { name: 'FinTech Pro', category: 'Finance', logo: 'fa-solid fa-credit-card', color: 'from-slate-700 to-black' },
  ];

  const trendingEvents = [
    { name: 'TechNova 2025', category: 'Tech Fest', logo: 'fa-solid fa-microchip', color: 'from-blue-600 to-cyan-400' },
    { name: 'Cultural Waves', category: 'Arts & Culture', logo: 'fa-solid fa-masks-theater', color: 'from-pink-500 to-rose-500' },
    { name: 'Hack Delhi', category: 'Hackathon', logo: 'fa-solid fa-code', color: 'from-purple-600 to-indigo-600' },
    { name: 'E-Summit', category: 'Business', logo: 'fa-solid fa-briefcase', color: 'from-amber-500 to-orange-600' },
  ];

  // --- Data for Features Section ---
  const organizerFeatures: FeatureProps[] = [
    {
        icon: <Zap size={24} />,
        title: "AI Matching",
        desc: "Our proprietary algorithm matches your event with brands that align with your demographics and expected footfall."
    },
    {
        icon: <Shield size={24} />,
        title: "Secure Payments",
        desc: "No more chasing checks. Payments are held in escrow and released upon milestone completion."
    },
    {
        icon: <CheckCircle size={24} />,
        title: "Verified Brands",
        desc: "Every brand on our platform is vetted to ensuring legitimate sponsorship opportunities for your events."
    }
  ];

  const brandFeatures: FeatureProps[] = [
    {
        icon: <TrendingUp size={24} />,
        title: "High ROI",
        desc: "Connect directly with Gen Z. Maximize your marketing budget by sponsoring high-impact student events with proven engagement."
    },
    {
        icon: <Target size={24} />,
        title: "Targeted Reach",
        desc: "Filter events by demographics, location, and interest groups to ensure your brand reaches exactly the right audience."
    },
    {
        icon: <Megaphone size={24} />,
        title: "Brand Visibility",
        desc: "Boost brand recall through physical stalls, digital mentions, and speaking slots at premier college festivals."
    }
  ];

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection-electric">
      {/* Import Font Awesome */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

      {/* Custom CSS for reliable styling */}
      <style>{`
        .bg-electric { background-color: #FFD600; }
        .text-electric { color: #FFD600; }
        .border-electric { border-color: #FFD600; }
        .selection-electric ::selection { background-color: #FFD600; color: black; }
        
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out forwards;
        }
      `}</style>
      
      <NavBar 
        isLoggedIn={isLoggedIn} 
        userType={userType} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />

      {/* --- Hero Section --- */}
      <section className="relative pt-28 pb-12 md:pt-48 md:pb-24 px-5 overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-gray-50 to-transparent -z-10 hidden md:block"></div>
        <div className="absolute top-20 right-20 w-64 h-64 bg-electric rounded-full filter blur-[100px] opacity-20 -z-10"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:items-center text-center md:text-center items-start text-left">
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
              {userType === 'organizer' ? (
                <>
                  Get <span className="text-electric md:text-electric">Sponsored</span> <br className="hidden md:block" />
                  by World-Class <br className="md:hidden" />
                  <span className="relative inline-block">
                    Brands.
                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-electric -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                    </svg>
                  </span>
                </>
              ) : (
                <>
                   Reach <span className="text-electric md:text-electric">Engaged</span> <br className="hidden md:block" />
                   Student <br className="md:hidden" />
                   <span className="relative inline-block">
                     Communities.
                     <svg className="absolute w-full h-3 -bottom-1 left-0 text-electric -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                       <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                     </svg>
                   </span>
                </>
              )}
            </h1>

            <p className="text-base md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              {userType === 'organizer' 
                ? "Stop cold emailing. Match with 500+ verified brands for campus events, hackathons, and cultural fests using our AI-driven platform."
                : "Discover high-impact campus events, hackathons, and student communities to amplify your brand presence with targeted sponsorships."
              }
            </p>

            {/* Toggle Switch */}
            <div className="bg-gray-100 p-1.5 rounded-full inline-flex mb-8 self-center">
              <button 
                onClick={() => setUserType('organizer')}
                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all ${userType === 'organizer' ? 'bg-black text-electric shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
              >
                I'm an Organizer
              </button>
              <button 
                onClick={() => setUserType('brand')}
                className={`px-4 md:px-6 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-bold transition-all ${userType === 'brand' ? 'bg-black text-electric shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
              >
                I'm a Brand
              </button>
            </div>

            {/* AI Search Bar */}
            <div className="w-full max-w-2xl mx-auto relative group px-1 md:px-0">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-2xl shadow-xl p-2 flex items-center border border-gray-100">
                <div className="pl-3 md:pl-4 pr-2 md:pr-3 text-gray-400">
                  <Zap size={20} className={userType === 'organizer' ? "text-yellow-500" : "text-blue-500"} fill="currentColor" />
                </div>
                <input 
                  type="text" 
                  placeholder={userType === 'organizer' ? "Ask AI: \"Tech sponsors...\"" : "Ask AI: \"High footfall events...\""}
                  className="flex-grow py-2 md:py-3 px-1 md:px-2 outline-none text-gray-700 font-medium placeholder-gray-400 bg-transparent text-sm md:text-base w-full min-w-0"
                />
                <Button className="hidden md:flex !py-2.5 !px-8">
                  Search <ArrowRight size={18} />
                </Button>
                <button className="md:hidden bg-black text-white p-2.5 rounded-xl shrink-0">
                  <ArrowRight size={18} />
                </button>
              </div>
              <p className="text-[10px] md:text-xs text-gray-400 mt-3 text-center md:text-left ml-2 flex items-center justify-center md:justify-start gap-1">
                <Star size={10} className="text-yellow-500" fill="currentColor" /> 
                AI suggestions powered by Gemini
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- Trusted Brands --- */}
      <section className="py-8 md:py-10 border-y border-gray-100 bg-gray-50/50">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 md:mb-8">Trusted by 500+ Top Brands</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {brandLogos.map((brand) => (
              <div key={brand.name} className="flex items-center gap-2 text-xl md:text-2xl font-bold text-gray-800">
                {/* Updated to use Font Awesome class */}
                <i className={`${brand.icon} text-2xl md:text-3xl`}></i> <span className="hidden sm:inline">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Why SponsorKiya --- */}
      <section className="py-16 md:py-28 bg-white">
        <div className="container mx-auto px-5 md:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-extrabold mb-3 md:mb-4">Why SponsorKiya?</h2>
            <p className="text-sm md:text-base text-gray-500 max-w-2xl mx-auto">
              {userType === 'organizer' 
                ? "We bridge the gap between student organizers and corporate brands with trust and technology." 
                : "The smartest way to discover and sponsor the next big campus event."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {(userType === 'organizer' ? organizerFeatures : brandFeatures).map((feature, idx) => (
               <FeatureCard 
                 key={idx}
                 icon={feature.icon}
                 title={feature.title}
                 desc={feature.desc}
               />
            ))}
          </div>
        </div>
      </section>

      {/* --- Trending Section --- */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-5 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-4">
            <div className="text-center md:text-left w-full md:w-auto">
              <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
                {userType === 'organizer' ? "Trending Sponsors" : "Trending Events"}
              </h2>
              <p className="text-sm md:text-base text-gray-500">
                {userType === 'organizer' 
                  ? "Top brands actively looking for events this week." 
                  : "High-impact events trending in the student community."}
              </p>
            </div>
            <div className="flex gap-2 hidden md:flex">
               <button className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center bg-white hover:bg-gray-100 transition"><ArrowRight className="rotate-180" size={20} /></button>
               <button className="w-10 h-10 rounded-full border border-gray-900 bg-black text-white flex items-center justify-center hover:bg-gray-800 transition"><ArrowRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {(userType === 'organizer' ? trendingSponsors : trendingEvents).map((item, idx) => (
              <TrendingCard key={idx} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* --- Success Stories (Desktop & Mobile) --- */}
      <section className="py-16 md:py-20 bg-white">
         <div className="container mx-auto px-5 md:px-8">
            <SectionHeader title="Success Stories" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 group cursor-pointer shadow-lg">
                    <img src="https://images.unsplash.com/photo-1540575467063-17e6fc8c62d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Hackathon" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                        <span className="bg-electric text-black text-[10px] md:text-xs font-bold px-2 py-1 rounded w-fit mb-2 md:mb-3">Case Study</span>
                        <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">HackMIT 2025</h3>
                        <p className="text-gray-300 text-xs md:text-sm">Secured $50k in sponsorship through SponsorKiya in just 2 weeks.</p>
                    </div>
                </div>
                <div className="relative rounded-3xl overflow-hidden h-64 md:h-80 group cursor-pointer shadow-lg">
                    <img src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Conference" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 md:p-8 text-white">
                        <span className="bg-blue-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded w-fit mb-2 md:mb-3">Case Study</span>
                        <h3 className="text-xl md:text-2xl font-bold mb-1 md:mb-2">Global Tech Summit</h3>
                        <p className="text-gray-300 text-xs md:text-sm">Connected with 15+ Enterprise partners for their annual summit.</p>
                    </div>
                </div>
            </div>
         </div>
      </section>

      <PageFooter brandLogos={brandLogos} />
    </div>
  );
}
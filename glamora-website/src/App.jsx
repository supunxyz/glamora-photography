import React, { useState, useEffect } from 'react';
import { Camera, Instagram, Facebook, Menu, X, ArrowRight, Check } from 'lucide-react';
import Loader from './Loader';
import ScrollReveal from './ScrollReveal';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar transparency on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open or loading
  useEffect(() => {
    if (isMenuOpen || isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen, isLoading]);

  const navLinks = [
    { name: 'ABOUT ME', href: '#about' },
    { name: 'PORTFOLIO', href: '#portfolio' },
    { name: 'PRICING PLANS', href: '#pricing' },
    { name: 'CONTACTS', href: '#contact' },
  ];

  const [portfolioItems, setPortfolioItems] = useState([]);
  const [pricingPlans, setPricingPlans] = useState([]);

  useEffect(() => {
    // Fetch shoots
    fetch('http://localhost:8000/api/shoots')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setPortfolioItems(data.map(item => ({ ...item, img: item.img_url })));
        }
      })
      .catch(err => console.error("Error fetching portfolios:", err));

    // Fetch pricing plans
    fetch('http://localhost:8000/api/pricing-plans')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setPricingPlans(data);
      })
      .catch(err => console.error("Error fetching pricing plans:", err));
  }, []);

  const BracketWrapper = ({ children, className = "" }) => (
    <div className={`relative ${className}`}>
      <div className="absolute -top-1 -left-1 sm:-top-2 sm:-left-2 w-6 h-6 sm:w-8 sm:h-8 border-t-2 border-l-2 border-white/40 pointer-events-none"></div>
      <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 border-b-2 border-r-2 border-white/40 pointer-events-none"></div>
      {children}
    </div>
  );

  return (
    <>
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
        {/* Navigation */}
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || isMenuOpen ? 'bg-black/95 backdrop-blur-md py-4' : 'bg-transparent py-6 md:py-8'}`}>
          <div className="max-w-7xl mx-auto px-5 md:px-10 flex justify-between items-center">
            <div className="text-lg md:text-xl font-bold tracking-[0.2em] z-50">GLAMORA</div>

            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} className="text-[10px] tracking-widest hover:text-orange-500 transition-colors uppercase">
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden z-50 p-2 -mr-2 outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <div className={`fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsMenuOpen(false)}
              className="text-2xl font-light tracking-[0.3em] hover:text-orange-500 transition-colors uppercase"
            >
              {link.name}
            </a>
          ))}
          <div className="flex space-x-8 pt-8 opacity-60">
            <Instagram size={24} />
            <Facebook size={24} />
          </div>
        </div>

        {/* Hero Section */}
        <header className="relative min-h-[90vh] md:min-h-screen flex items-center pt-24 md:pt-0 overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-12 items-center w-full">
            <div className="relative z-10 order-2 md:order-1 text-center md:text-left">
              <h1 className="text-6xl sm:text-7xl md:text-9xl font-bold italic tracking-tighter mb-4 opacity-90 leading-[0.9]">HELLO!</h1>
              <p className="text-[10px] md:text-xs tracking-[0.2em] text-gray-400 mb-8 max-w-xs md:max-w-md mx-auto md:mx-0 leading-relaxed uppercase">
                Professional photographer, <br className="hidden md:block" />
                Immortalizing your stories through the lens.
              </p>
              <button className="bg-orange-600 hover:bg-orange-700 active:scale-95 text-white px-8 md:px-12 py-4 text-[10px] tracking-[0.2em] font-bold transition-all uppercase w-full md:w-auto">
                VIEW MY WORKS
              </button>

              <div className="flex justify-center md:justify-start space-x-6 mt-12 md:mt-16 text-gray-400">
                <Instagram className="cursor-pointer hover:text-white transition-colors" size={20} />
                <Facebook className="cursor-pointer hover:text-white transition-colors" size={20} />
                <Camera className="cursor-pointer hover:text-white transition-colors ml-4" size={24} />
              </div>
            </div>

            <div className="relative order-1 md:order-2 flex justify-center scale-90 md:scale-100">
              <div className="relative w-full max-w-sm md:max-w-md">
                {/* Main Image */}
                <div className="w-[85%] ml-auto aspect-[3/4] overflow-hidden grayscale contrast-125">
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" alt="Photographer" className="w-full h-full object-cover" />
                </div>

                {/* Overlapping Polaroids - Hidden on very small screens for clarity, or kept with lower rotation */}
                <div className="absolute bottom-[-5%] left-0 w-2/5 p-1.5 bg-white rotate-[-5deg] shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="Thumbnail" className="w-full aspect-square object-cover" />
                </div>
                <div className="absolute bottom-[15%] left-[5%] w-1/3 p-1 bg-white rotate-[8deg] shadow-2xl hidden sm:block">
                  <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" alt="Thumbnail" className="w-full aspect-square object-cover" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* About Section */}
        <section id="about" className="py-20 md:py-32 bg-[#0c0c0c] overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-center">
              <ScrollReveal direction="right" className="w-full md:w-1/2 flex justify-center px-4 md:px-0">
                <BracketWrapper className="w-full max-w-xs md:max-w-sm">
                  <img src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=800&q=80" alt="Self portrait" className="w-full aspect-[4/5] object-cover grayscale" />
                </BracketWrapper>
              </ScrollReveal>
              <ScrollReveal direction="left" delay={200} className="w-full md:w-1/2 text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-6 flex items-center justify-center md:justify-start uppercase">
                  ABOUT ME
                  <span className="ml-4 h-px w-12 md:w-24 bg-orange-600 hidden xs:inline-block"></span>
                </h2>
                <div className="space-y-6 text-gray-400 leading-loose text-sm tracking-wide">
                  <p>My name is Victoria and I am a photographer in love with the magic of the moment. To me, photography is storytelling through light and sincerity.</p>
                  <p>Since starting 8 years ago, I've dedicated myself to finding unique angles and natural warmth that gives every shot a soul.</p>
                </div>
                <button className="mt-10 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-[10px] tracking-[0.2em] font-bold transition-all uppercase w-full md:w-auto">
                  GET A CONSULTATION
                </button>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 md:py-32 bg-[#0a0a0a] overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <ScrollReveal direction="up" className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-4">
              <h2 className="text-4xl md:text-5xl font-bold tracking-[0.2em] opacity-80 uppercase">Portfolio</h2>
              <span className="text-[10px] tracking-widest text-gray-500 uppercase">View All Categories</span>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-2">
              {portfolioItems.map((item, index) => (
                <ScrollReveal direction="up" delay={index * 100} key={index} className={`relative group overflow-hidden h-[300px] sm:h-auto ${item.size}`}>
                  <div className="absolute inset-0 bg-black/50 sm:bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10 flex flex-col justify-end p-6 md:p-8">
                    <div className="absolute top-4 left-4 border-t border-l border-white/20 w-6 h-6 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="absolute bottom-4 right-4 border-b border-r border-white/20 w-6 h-6 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <h3 className="text-lg font-bold tracking-[0.1em] transform sm:translate-y-4 group-hover:translate-y-0 transition-all duration-500 uppercase">{item.title}</h3>
                    <p className="text-[9px] tracking-[0.3em] text-gray-300 mt-2 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-all delay-75 duration-500 uppercase">Discover More</p>
                  </div>
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 md:py-32 bg-[#0c0c0c] overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 md:px-10">
            <ScrollReveal direction="up" className="text-3xl md:text-4xl font-bold tracking-[0.2em] mb-12 flex items-center justify-center text-center uppercase">
              <span className="mr-4 h-px w-8 md:w-12 bg-gray-700 hidden xs:block"></span>
              PRICING PLANS
              <span className="ml-4 h-px w-8 md:w-12 bg-orange-600 hidden xs:block"></span>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {pricingPlans.map((plan, index) => (
                <ScrollReveal direction="up" delay={index * 150} key={index} className={`relative p-8 bg-[#141414] border border-white/5 flex flex-col h-full transition-all duration-300 hover:border-orange-600/50 ${plan.popular ? 'ring-1 ring-orange-600' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[9px] tracking-widest font-bold px-4 py-1.5 rounded-full uppercase">
                      Popular
                    </div>
                  )}
                  <div className="text-center mb-8">
                    <span className="text-gray-500 text-[9px] tracking-[0.3em] font-bold uppercase">{plan.name}</span>
                    <div className="text-4xl font-bold mt-2">{plan.price}</div>
                  </div>
                  <div className="flex-grow">
                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start text-[11px] text-gray-400 tracking-wider">
                          <Check size={14} className="text-orange-500 mr-3 shrink-0 mt-0.5" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className={`w-full py-4 text-[9px] font-bold tracking-[0.2em] transition-all uppercase ${plan.popular ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/20' : 'bg-transparent border border-white/10 hover:border-orange-600'}`}>
                    ORDER NOW
                  </button>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer id="contact" className="py-16 bg-black border-t border-white/5 text-center md:text-left overflow-hidden">
          <ScrollReveal direction="up" className="max-w-7xl mx-auto px-5 md:px-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mb-16">
              <div>
                <h4 className="text-xl md:text-2xl font-bold tracking-[0.2em] mb-6">GLAMORA</h4>
                <p className="text-gray-500 text-xs leading-loose max-w-xs mx-auto md:mx-0">Capturing precious moments with elegance and authenticity. Available worldwide.</p>
              </div>
              <div>
                <h5 className="text-[10px] tracking-[0.3em] text-orange-600 font-bold mb-6 uppercase">Quick Links</h5>
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <a key={link.name} href={link.href} className="text-xs text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h5 className="text-[10px] tracking-[0.3em] text-orange-600 font-bold mb-6 uppercase">Contact</h5>
                <p className="text-gray-400 text-xs mb-2 tracking-wide">hello@glamoraphotos.com</p>
                <p className="text-gray-400 text-xs tracking-wide">+44 20 7946 0123</p>
                <div className="flex justify-center md:justify-start space-x-6 mt-8">
                  <Instagram size={18} className="text-gray-500 hover:text-white cursor-pointer" />
                  <Facebook size={18} className="text-gray-500 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>

            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] tracking-widest text-gray-600 gap-4">
              <p>&copy; 2024 GLAMORA PHOTOGRAPHY. ALL RIGHTS RESERVED.</p>
              <p>DESIGNED BY CREATIVE STUDIO</p>
            </div>
          </ScrollReveal>
        </footer>
      </div>
    </>
  );
};

export default App;
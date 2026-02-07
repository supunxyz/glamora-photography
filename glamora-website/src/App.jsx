import React, { useState, useEffect } from 'react';
import { Camera, Instagram, Facebook, Menu, X, ArrowRight, Check } from 'lucide-react';

const App = () => {
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

  const navLinks = [
    { name: 'ABOUT ME', href: '#about' },
    { name: 'PORTFOLIO', href: '#portfolio' },
    { name: 'PRICING PLANS', href: '#pricing' },
    { name: 'TESTIMONIALS', href: '#testimonials' },
    { name: 'CONTACTS', href: '#contact' },
  ];

  const portfolioItems = [
    { title: 'WEDDING DAY', size: 'col-span-1 md:col-span-2 row-span-1', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
    { title: 'MATERNITY', size: 'col-span-1 row-span-1', img: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?auto=format&fit=crop&w=800&q=80' },
    { title: 'FAMILY', size: 'col-span-1 row-span-2', img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80' },
    { title: 'COUPLE', size: 'col-span-1 row-span-1', img: 'https://images.unsplash.com/photo-1475688621402-4257c812d6db?auto=format&fit=crop&w=800&q=80' },
    { title: 'STUDIO', size: 'col-span-1 row-span-1', img: 'https://images.unsplash.com/photo-1520390138845-fd2d229dd553?auto=format&fit=crop&w=800&q=80' },
    { title: 'PORTRAIT', size: 'col-span-1 row-span-1', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80' },
  ];

  const pricingPlans = [
    { name: 'LIGHT', price: '$250', features: ['1 Hour session', '15 Retouched photos', 'Online gallery', 'Personal usage rights'] },
    { name: 'STANDARD', price: '$500', features: ['2 Hour session', '30 Retouched photos', 'Makeup artist included', 'Print-ready files'], popular: true },
    { name: 'PREMIUM', price: '$850', features: ['4 Hour session', '60 Retouched photos', 'Video highlights', 'Physical photo album'] },
    { name: 'ALL INCLUSIVE', price: '$1500', features: ['Full day session', 'Unlimited retouched photos', 'Custom location scouting', 'Express 48h delivery'] },
  ];

  // Custom Bracket Component for images and sections
  const BracketWrapper = ({ children, className = "" }) => (
    <div className={`relative ${className}`}>
      <div className="absolute -top-2 -left-2 w-8 h-8 border-t-2 border-l-2 border-white/40 pointer-events-none"></div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-2 border-r-2 border-white/40 pointer-events-none"></div>
      {children}
    </div>
  );

  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-orange-500 selection:text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-xl font-bold tracking-[0.2em]">GLAMORA PHOTOGRAPHY</div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-xs tracking-widest hover:text-orange-500 transition-colors uppercase">
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 text-2xl tracking-[0.3em]">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="hover:text-orange-500 transition-colors uppercase">
              {link.name}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center w-full">
          <div className="relative z-10 order-2 md:order-1">
            <h1 className="text-7xl md:text-9xl font-bold italic tracking-tighter mb-4 opacity-90">HELLO!</h1>
            <p className="text-sm tracking-[0.25em] text-gray-400 mb-8 max-w-md leading-relaxed">
              I AM A PROFESSIONAL PHOTOGRAPHER, <br />
              IMMORTALIZING YOUR STORIES THROUGH THE LENS.
            </p>
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-10 py-4 text-xs tracking-[0.2em] font-bold transition-all uppercase">
              MY WORKS
            </button>
            
            <div className="flex space-x-6 mt-16 text-gray-400">
              <Instagram className="cursor-pointer hover:text-white transition-colors" size={20} />
              <Facebook className="cursor-pointer hover:text-white transition-colors" size={20} />
              <Camera className="cursor-pointer hover:text-white transition-colors ml-4" size={24} />
            </div>
          </div>

          <div className="relative order-1 md:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Main Image */}
              <div className="w-[85%] ml-auto aspect-[3/4] overflow-hidden grayscale contrast-125">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80" alt="Photographer" className="w-full h-full object-cover" />
              </div>
              
              {/* Overlapping Polaroid Styling */}
              <div className="absolute bottom-[-10%] left-0 w-1/2 p-2 bg-white rotate-[-5deg] shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80" alt="Thumbnail" className="w-full aspect-square object-cover" />
              </div>
              <div className="absolute bottom-[10%] left-[10%] w-1/3 p-1.5 bg-white rotate-[8deg] shadow-2xl">
                 <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" alt="Thumbnail" className="w-full aspect-square object-cover" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="py-32 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-20">
            <div className="md:w-1/2 flex justify-center">
               <BracketWrapper className="w-full max-w-sm">
                  <img src="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?auto=format&fit=crop&w=800&q=80" alt="Self portrait" className="w-full aspect-[4/5] object-cover grayscale" />
               </BracketWrapper>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold tracking-[0.2em] mb-4 flex items-center">
                ABOUT ME
                <span className="ml-4 h-px w-24 bg-orange-600 inline-block"></span>
              </h2>
              <div className="space-y-6 text-gray-400 leading-loose text-sm tracking-wide">
                <p>My name is Victoria and I am a photographer who is in love with the magic of the moment. For me, photography is more than just images; it is the stories told through the lens, the emotions captured in the frame, and the unforgettable moments that stay with you forever.</p>
                <p>My journey into the world of photography began 8 years ago when I first picked up a camera and felt how easy it was to capture the beauty around me. Since then, I have not stopped looking for new corners, interesting angles, and light that makes every moment unique.</p>
                <p>I believe that every person is beautiful in their own way, and my goal is to show this beauty in every picture. My style is a combination of naturalness, sincerity and warmth that gives your story a unique atmosphere.</p>
              </div>
              <button className="mt-12 bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 text-xs tracking-[0.2em] font-bold transition-all uppercase">
                REQUEST A CONSULTATION
              </button>
              
              <div className="mt-12 flex justify-end">
                <img src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?auto=format&fit=crop&w=400&q=80" alt="Camera" className="w-64 h-40 object-cover opacity-50 grayscale hover:opacity-100 transition-opacity" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
             <h2 className="text-5xl font-bold tracking-[0.2em] opacity-80 uppercase">Portfolio</h2>
             <span className="text-xs tracking-widest text-gray-500 uppercase">View All Works / 06 Categories</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[300px]">
            {portfolioItems.map((item, index) => (
              <div key={index} className={`relative group overflow-hidden ${item.size}`}>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500 z-10 flex flex-col justify-end p-8">
                  <div className="absolute top-4 left-4 border-t border-l border-white/20 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-4 right-4 border-b border-r border-white/20 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <h3 className="text-xl font-bold tracking-[0.1em] opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 uppercase">{item.title}</h3>
                  <p className="text-[10px] tracking-[0.3em] text-gray-300 mt-2 opacity-0 group-hover:opacity-100 transition-all delay-75 duration-500">DISCOVER MORE</p>
                </div>
                <img src={item.img} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-[#0c0c0c]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold tracking-[0.2em] mb-16 flex items-center justify-center">
            <span className="mr-4 h-px w-12 bg-gray-700"></span>
            PRICING PLANS
            <span className="ml-4 h-px w-12 bg-orange-600"></span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {pricingPlans.map((plan, index) => (
              <div key={index} className={`relative p-8 bg-[#141414] border border-white/5 flex flex-col h-full transition-all duration-300 hover:border-orange-600/50 hover:-translate-y-2 ${plan.popular ? 'ring-1 ring-orange-600' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[10px] tracking-widest font-bold px-3 py-1 rounded-full">
                    MOST POPULAR
                  </div>
                )}
                <div className="text-center mb-8">
                  <span className="text-gray-500 text-[10px] tracking-[0.3em] font-bold uppercase">{plan.name}</span>
                  <div className="text-4xl font-bold mt-2">{plan.price}</div>
                </div>
                <div className="flex-grow">
                  <ul className="space-y-4 mb-10">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center text-xs text-gray-400 tracking-wider">
                        <Check size={14} className="text-orange-500 mr-3 shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className={`w-full py-4 text-[10px] font-bold tracking-[0.2em] transition-all uppercase ${plan.popular ? 'bg-orange-600 text-white' : 'bg-transparent border border-white/10 hover:border-orange-600'}`}>
                  ORDER A PHOTO SHOOT
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section Footer */}
      <footer id="contact" className="pt-32 pb-16 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-16 mb-20">
            <div>
              <h4 className="text-2xl font-bold tracking-[0.2em] mb-8">GLAMORA</h4>
              <p className="text-gray-500 text-sm leading-loose">Capturing your most precious moments with elegance and authenticity. Based in London, available worldwide for destination sessions.</p>
            </div>
            <div>
              <h5 className="text-[10px] tracking-[0.3em] text-orange-600 font-bold mb-6 uppercase">Quick Links</h5>
              <div className="grid grid-cols-2 gap-4">
                {navLinks.map((link) => (
                  <a key={link.name} href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h5 className="text-[10px] tracking-[0.3em] text-orange-600 font-bold mb-6 uppercase">Contact</h5>
              <p className="text-gray-400 text-sm mb-2">hello@glamoraphotos.com</p>
              <p className="text-gray-400 text-sm">+44 20 7946 0123</p>
              <div className="flex space-x-6 mt-6">
                <Instagram size={18} className="text-gray-500 hover:text-white cursor-pointer" />
                <Facebook size={18} className="text-gray-500 hover:text-white cursor-pointer" />
              </div>
            </div>
          </div>
          
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-widest text-gray-600">
            <p>&copy; 2024 GLAMORA PHOTOGRAPHY. ALL RIGHTS RESERVED.</p>
            <p className="mt-4 md:mt-0">DESIGNED BY CREATIVE STUDIO</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
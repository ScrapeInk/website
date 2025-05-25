import React, { useState, useEffect } from 'react';
import { Mail, Globe, Database, Camera, TrendingUp, Bitcoin, ChevronRight, Zap, ArrowDown } from 'lucide-react';

const ComingSoonPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState({});

  // Mouse tracking for subtle parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: "API Scraping",
      description: "High-performance API endpoints for all your data extraction needs"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Scraping",
      description: "Intelligent data extraction powered by advanced AI algorithms"
    },
    {
      icon: <Database className="w-8 h-8" />,
      title: "Data Delivery",
      description: "SQL, Sheets, and custom dashboards - your data, your way"
    },
    {
      icon: <Camera className="w-8 h-8" />,
      title: "Screenshots API",
      description: "Capture any webpage as high-quality images programmatically"
    }
  ];

  const freeServices = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Global News Feed",
      description: "Real-time news aggregation from sources worldwide"
    },
    {
      icon: <Bitcoin className="w-6 h-6" />,
      title: "Crypto P2P Data",
      description: "Live cryptocurrency peer-to-peer trading data"
    }
  ];

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      setMessage('Please enter a valid email address.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 5000);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage('Thanks for subscribing! We\'ll notify you when we launch.');
        setMessageType('success');
        setEmail('');
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Network error. Please try again later.');
      setMessageType('error');
    }
    
    setIsSubmitting(false);
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-x-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs with mouse parallax */}
        <div 
          className="absolute w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"
          style={{
            top: '-10%',
            right: `-${10 + mousePosition.x * 0.02}%`,
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-cyan-400 rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"
          style={{
            bottom: '-10%',
            left: `-${10 + mousePosition.y * 0.02}%`,
            transform: `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)`,
            transition: 'transform 0.3s ease-out',
            animationDelay: '1s'
          }}
        />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header with subtle entrance animation */}
        <header className="container mx-auto px-6 py-8">
          <div className="flex justify-center">
            <div className="text-3xl font-bold text-white transform hover:scale-105 transition-all duration-300 cursor-default">
              <span className="inline-block hover:rotate-3 transition-transform duration-300">scrape</span>
              <span className="text-purple-400 inline-block hover:-rotate-3 transition-transform duration-300">.ink</span>
            </div>
          </div>
        </header>

        {/* Hero Section with staggered animations */}
        <section className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight relative z-10">
  <span className="inline-block animate-fadeInUp">Web</span>{' '}
  <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0.1s' }}>Scraping</span>{' '}
  <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0.2s' }}>&</span>{' '}
  <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0.3s' }}>Data</span>{' '}
  {/* <span className="inline-block animate-fadeInUp" style={{ animationDelay: '0.4s' }}>Extraction</span> */}
  <span 
    className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 animate-fadeInUp relative z-10 leading-normal" // Added leading-normal
    style={{ animationDelay: '0.6s' }}
  >
    Extraction Reimagined
  </span>
</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed opacity-0 animate-fadeInUp text-shadow-sm" style={{ animationDelay: '0.8s' }}>
              The most powerful and intuitive data scraping platform is coming soon. 
              Get ready to extract, transform, and deliver data like never before.
            </p>
            
            {/* Enhanced Coming Soon Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold mb-16 shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 hover:scale-105 opacity-0 animate-fadeInUp cursor-default backdrop-blur-sm border border-white/10" style={{ animationDelay: '1s' }}>
              <Zap className="w-5 h-5 mr-3 animate-pulse" />
              Coming Soon 2025
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-cyan-400 rounded-full opacity-0 hover:opacity-20 transition-opacity duration-300" />
            </div>

            {/* Scroll indicator */}
            <div className="animate-bounce mt-16 opacity-60">
              <ArrowDown className="w-6 h-6 mx-auto text-white" />
            </div>
          </div>
        </section>

        {/* Services Grid with scroll animations */}
        <section id="services" data-animate className="container mx-auto px-6 py-20">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-4xl font-bold text-white mb-4">Premium Services</h2>
            <p className="text-gray-300 text-lg">Enterprise-grade solutions for all your data needs</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-default shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 ${
                  isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 0.1}s`,
                  animation: isVisible.services ? `slideInUp 0.6s ease-out ${index * 0.1}s both` : 'none'
                }}
              >
                <div className="text-purple-400 mb-6 transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:text-purple-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-purple-300 transition-colors duration-300">{service.title}</h3>
                <p className="text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300 text-sm">{service.description}</p>
                
                {/* Enhanced border animation on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500 -z-10" />
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10" style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'xor' }} />
              </div>
            ))}
          </div>
        </section>

        {/* Free Services with enhanced animations */}
        <section id="free-services" data-animate className="container mx-auto px-6 py-20">
          <div className={`bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl p-12 border border-purple-400/20 transition-all duration-1000 hover:border-purple-400/40 ${
            isVisible['free-services'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Free for Everyone</h2>
              <p className="text-gray-300 text-lg">Community-driven data services at no cost</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {freeServices.map((service, index) => (
                <div 
                  key={index} 
                  className={`flex items-start space-x-4 bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 group cursor-default ${
                    isVisible['free-services'] ? 'opacity-100 translate-x-0' : `opacity-0 ${index === 0 ? '-translate-x-8' : 'translate-x-8'}`
                  }`}
                  style={{ transitionDelay: `${0.2 + index * 0.1}s` }}
                >
                  <div className="text-cyan-400 flex-shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">{service.title}</h3>
                    <p className="text-gray-300 group-hover:text-gray-200 transition-colors duration-300">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup with enhanced interactivity */}
        <section id="newsletter" data-animate className="container mx-auto px-6 py-20">
          <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${
            isVisible.newsletter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-4xl font-bold text-white mb-6">Stay in the Loop</h2>
            <p className="text-gray-300 text-lg mb-8">
              Be the first to know when scrape.ink launches. Get exclusive early access and updates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none group-focus-within:opacity-100" />
              </div>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25 transform active:scale-95 relative overflow-hidden"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">Notify Me</span>
                    <ChevronRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
            
            {message && (
              <div className={`mt-4 p-4 rounded-xl transition-all duration-500 transform ${
                messageType === 'success' 
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30 scale-100' 
                  : 'bg-red-500/20 text-red-300 border border-red-500/30 scale-100'
              } animate-fadeInUp`}>
                {message}
              </div>
            )}
          </div>
        </section>

        {/* Footer with subtle animation */}
        <footer className="container mx-auto px-6 py-12">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-4 hover:scale-105 transition-transform duration-300 cursor-default">
              scrape<span className="text-purple-400">.ink</span>
            </div>
            <p className="text-gray-400 hover:text-gray-300 transition-colors duration-300">
              Revolutionizing data extraction, one scrape at a time.
            </p>
            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-gray-500 text-sm">
                © 2025 scrape.ink. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
      
    </div>
  );
};

export default ComingSoonPage;
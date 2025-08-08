import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ChefHat, Home, Info, Star, Phone, ShoppingCart } from 'lucide-react';

// --- GSAP and Plugins ---
import { gsap } from 'gsap';

const navItems = [
  { id: 'home', label: 'الرئيسية', icon: Home },
  { id: 'about', label: 'عن المطعم', icon: Info },
  { id: 'menu', label: 'القائمة', icon: ChefHat },
  { id: 'testimonials', label: 'آراء العملاء', icon: Star },
  { id: 'contact', label: 'اتصل بنا', icon: Phone },
];

function Header({ scrollToSection, totalCartItems }) {
  const [activeSection, setActiveSection] = useState('home');
  const headerRef = useRef(null);
  const activePillRef = useRef(null);
  const navLinksRef = useRef({});

  // --- Animation 1: On-Load Staggered Entrance ---
  useEffect(() => {
    const headerElement = headerRef.current;
    if (!headerElement) return;

    gsap.set(headerElement, { opacity: 0, y: -100 });
    gsap.set(".nav-item", { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(headerElement, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
      .to(".nav-item", { opacity: 1, y: 0, stagger: 0.1, ease: 'power2.out' }, "-=0.7");
  }, []);

  // --- Animation 2: Active Pill Movement (Flip) ---
  useEffect(() => {
    const activeLinkEl = navLinksRef.current[activeSection];
    if (activeLinkEl && activePillRef.current) {
      const linkRect = activeLinkEl.getBoundingClientRect();
      const containerRect = activeLinkEl.parentElement.getBoundingClientRect();
      
      gsap.to(activePillRef.current, {
        x: linkRect.left - containerRect.left,
        width: linkRect.width,
        duration: 0.6,
        ease: 'power4.inOut'
      });
    }
  }, [activeSection]);

  // --- Logic 3: Simple Active Section Tracking ---
  useEffect(() => {
    // Set initial active section
    setActiveSection('home');
  }, []);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    scrollToSection(sectionId);
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-1/2 -translate-x-1/2 z-50 w-full max-w-max px-4 pt-4"
    >
      <nav className="relative w-full mx-auto">
        <div className="flex items-center justify-center gap-3 bg-black/60 text-white h-16 px-4 rounded-full shadow-2xl border border-white/10 backdrop-blur-xl">
          
          {/* Logo */}
          <div className="nav-item" style={{ opacity: 0 }}>
            <button className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 text-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <ChefHat className="w-6 h-6" />
            </button>
          </div>

          {/* Separator */}
          <div className="nav-item w-px h-8 bg-white/20" style={{ opacity: 0 }}></div>

          {/* Navigation Links */}
          <div className="flex items-center relative">
            {navItems.map((item) => (
              <button
                key={item.id}
                ref={(el) => (navLinksRef.current[item.id] = el)}
                onClick={() => handleNavClick(item.id)}
                className="nav-item relative px-2 py-2 text-sm font-medium rounded-full z-10 flex items-center justify-center gap-2 group"
                style={{ opacity: 0 }}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${activeSection === item.id ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`} />
                {/* Adaptive Text: Hides on smaller screens, appears on hover */}
                <span className="hidden lg:inline-block whitespace-nowrap transition-colors duration-300 group-hover:text-white">
                  {item.label}
                </span>
              </button>
            ))}
            {/* The magic moving pill */}
            <div ref={activePillRef} className="absolute top-0 left-0 h-full bg-gradient-to-r from-red-600 to-orange-500 rounded-full shadow-md" style={{ zIndex: 1 }} />
          </div>

          {/* Separator */}
          <div className="nav-item w-px h-8 bg-white/20" style={{ opacity: 0 }}></div>

          {/* Action Button */}
          <div className="nav-item" style={{ opacity: 0 }}>
            <Button className="btn-primary rounded-full h-10 w-10 lg:w-28 p-0 flex items-center justify-center text-base group transition-all duration-300">
              <ShoppingCart className="w-5 h-5 lg:hidden" />
              <span className="hidden lg:inline-block group-hover:hidden">اطلب الآن</span>
              <ShoppingCart className="w-5 h-5 hidden lg:group-hover:inline-block" />
            </Button>
          </div>

        </div>
      </nav>
    </header>
  );
}

export default Header;

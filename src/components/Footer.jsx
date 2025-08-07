import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChefHat, Twitter, Instagram, Facebook, Code } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = [
  { id: 'home', label: 'الرئيسية' },
  { id: 'about', label: 'عن المطعم' },
  { id: 'menu', label: 'القائمة' },
  { id: 'faq', label: 'الأسئلة الشائعة' },
  { id: 'contact', label: 'اتصل بنا' },
];

const socialLinks = [
  { icon: Twitter, href: '#' },
  { icon: Instagram, href: '#' },
  { icon: Facebook, href: '#' },
];

function Footer({ scrollToSection }) {
  const footerRef = useRef(null);
  const [isDevHovered, setIsDevHovered] = useState(false);

  useEffect(() => {
    const footerEl = footerRef.current;
    if (!footerEl) return;

    // --- Corrected & Decoupled Entrance Animations ---
    // We create separate animations for each group of elements.
    // This is more robust than a single, complex timeline.

    const commonScrollTrigger = {
      trigger: footerEl,
      start: "top 90%",
      toggleActions: "play none none none",
    };

    // 1. Animate the main content columns
    gsap.from(footerEl.querySelectorAll(".footer-col"), {
      scrollTrigger: commonScrollTrigger,
      autoAlpha: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.8,
      ease: 'power2.out',
    });

    // 2. Animate the divider line
    gsap.from(footerEl.querySelector(".footer-divider"), {
      scrollTrigger: {
        ...commonScrollTrigger,
        start: "top 85%", // Trigger slightly later for effect
      },
      scaleX: 0,
      duration: 0.8,
      ease: 'power3.inOut',
    });

    // 3. Animate the bottom content
    gsap.from(footerEl.querySelector(".footer-bottom-content"), {
      scrollTrigger: {
        ...commonScrollTrigger,
        start: "top 80%", // Trigger last
      },
      autoAlpha: 0,
      y: 20,
      duration: 0.6,
    });


    // --- Interactive Glow Effect ---
    const onMouseMove = (e) => {
      const { left, top } = footerEl.getBoundingClientRect();
      gsap.to(footerEl, {
        '--glow-x': `${e.clientX - left}px`,
        '--glow-y': `${e.clientY - top}px`,
        duration: 1,
        ease: 'power3.out'
      });
    };

    footerEl.addEventListener('mousemove', onMouseMove);
    return () => footerEl.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <footer ref={footerRef} className="footer-container relative bg-gray-900 text-white pt-20 pb-8 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-12 gap-y-10 gap-x-8">
          
          <div className="footer-col md:col-span-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white text-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                <ChefHat className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white">شاورما الأصالة</h3>
            </div>
            <p className="text-gray-400 mb-6 max-w-xs">
              تجربة فريدة من النكهات الأصيلة، محضّرة بشغف لتروي قصة من التميز في كل قضمة.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a key={index} href={social.href} className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300">
                  <social.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>

          <div className="footer-col md:col-span-2">
            <h4 className="text-lg font-semibold mb-5 text-white tracking-wider">روابط سريعة</h4>
            <div className="space-y-3">
              {footerLinks.map(link => (
                <button 
                  key={link.id}
                  onClick={() => scrollToSection(link.id)} 
                  className="block text-gray-400 hover:text-white transition-transform duration-200 hover:translate-x-1"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          <div className="footer-col md:col-span-3">
            <h4 className="text-lg font-semibold mb-5 text-white tracking-wider">تواصل معنا</h4>
            <div className="space-y-3 text-gray-400">
              <p className="flex items-start gap-3"><span>📍</span><span>شارع الملك فهد، حي النزهة، الرياض</span></p>
              <p>📞 +966 11 123 4567</p>
              <p>✉️ info@shawarma-asala.com</p>
            </div>
          </div>

          <div className="footer-col md:col-span-3">
            <h4 className="text-lg font-semibold mb-5 text-white tracking-wider">ساعات العمل</h4>
            <div className="space-y-3 text-gray-400">
              <p>السبت - الخميس: 11:00 ص - 12:00 م</p>
              <p>الجمعة: 2:00 م - 12:00 م</p>
            </div>
          </div>

        </div>

        <div className="footer-divider w-full h-px bg-gray-800 my-12"></div>

        <div className="footer-bottom-content flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-500 mb-4 md:mb-0">© {new Date().getFullYear()} شاورما الأصالة. جميع الحقوق محفوظة.</p>
          
          <div 
            onMouseEnter={() => setIsDevHovered(true)}
            onMouseLeave={() => setIsDevHovered(false)}
            className="relative text-gray-500 hover:text-white transition-colors duration-300"
          >
            <a href="#" className="flex items-center gap-2">
              <span className={`transition-opacity duration-300 ${isDevHovered ? 'opacity-0' : 'opacity-100'}`}>
                Developed by Ababil Team
              </span>
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isDevHovered ? 'opacity-100' : 'opacity-0'}`}>
                <Code className="w-5 h-5 mr-2" />
                <span>Ababil Team</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

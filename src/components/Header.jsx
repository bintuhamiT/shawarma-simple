// Header.jsx (النسخة الأكثر سلاسة ودقة باستخدام Flip)

import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ChefHat, Home, Info, Star, Phone, ShoppingCart } from 'lucide-react';

// --- GSAP and Plugins ---
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip'; // ✨ 1. استيراد Flip
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // ✨ 4. استيراد ScrollTrigger

// تسجيل الإضافات مرة واحدة في بداية الملف
gsap.registerPlugin(Flip, ScrollTrigger);

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
  const navContainerRef = useRef(null); // Ref لحاوية الأزرار
  const activePillRef = useRef(null); // Ref للحبة المتحركة

  // --- 1. حركة دخول متكاملة وسلسة ---
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });
    tl.from(headerRef.current, { 
      yPercent: -150, // استخدام yPercent لحركة نسبية
      autoAlpha: 0, 
      duration: 1, 
      ease: 'expo.out' 
    })
    .from(".nav-item", { 
      autoAlpha: 0, 
      y: 20, 
      stagger: 0.08, // فاصل زمني أنعم
      ease: 'power3.out' 
    }, "-=0.7"); // تداخل الحركات
  }, []);

  // --- 2. حركة الحبة المتحركة باستخدام Flip (الحل الأمثل) ---
  useEffect(() => {
    const activeLinkEl = navContainerRef.current.querySelector(`[data-section-id="${activeSection}"]`);
    const pill = activePillRef.current;

    if (activeLinkEl && pill) {
      // 1. حفظ الحالة الحالية للحبة
      const state = Flip.getState(pill);
      // 2. نقل الحبة إلى الزر النشط في شجرة DOM (هذا يضمن تطابق الأبعاد)
      activeLinkEl.appendChild(pill);
      // 3. تحريك الحبة من حالتها القديمة إلى الجديدة بسلاسة
      Flip.from(state, {
        duration: 0.6,
        ease: 'power3.inOut',
        // absolute: true, // مهم للحركة عبر الحاوية
      });
    }
  }, [activeSection]);

  // --- 3. مراقبة التمرير لتحديث القسم النشط تلقائياً ---
  useEffect(() => {
    const triggers = navItems.map(item => {
      return ScrollTrigger.create({
        trigger: `#${item.id}`,
        start: "top center",
        end: "bottom center",
        onToggle: self => {
          if (self.isActive) {
            setActiveSection(item.id);
          }
        }
      });
    });

    return () => {
      triggers.forEach(trigger => trigger.kill()); // تنظيف عند إزالة المكون
    };
  }, []);

  const handleNavClick = (sectionId) => {
    // لا حاجة لـ setActiveSection هنا، ScrollTrigger سيتكفل بذلك
    scrollToSection(sectionId);
  };

  return (
    <header ref={headerRef} className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-max px-4">
      <nav className="flex items-center justify-center gap-3 bg-black/60 text-white h-16 px-4 rounded-full shadow-2xl border border-white/10 backdrop-blur-xl">
        
        {/* Logo */}
        <div className="nav-item">
          <button onClick={() => handleNavClick('home')} className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 text-red-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
            <ChefHat className="w-6 h-6" />
          </button>
        </div>

        <div className="nav-item w-px h-8 bg-white/20"></div>

        {/* Navigation Links */}
        <div ref={navContainerRef} className="flex items-center relative">
          {navItems.map((item) => (
            <button
              key={item.id}
              data-section-id={item.id} // معرّف لتسهيل العثور على الزر
              onClick={() => handleNavClick(item.id)}
              className="nav-item relative px-4 py-2 text-sm font-medium rounded-full z-10 flex items-center justify-center gap-2 group"
            >
              <item.icon className={`w-5 h-5 flex-shrink-0 transition-colors duration-300 ${activeSection === item.id ? 'text-white' : 'text-neutral-300 group-hover:text-white'}`} />
              {/* ✨ تحسين: النص يظهر عند المرور على الشاشات الصغيرة أيضاً */}
              <span className={`absolute lg:static left-1/2 -translate-x-1/2 top-full mt-2 lg:mt-0 lg:translate-x-0 whitespace-nowrap bg-black/80 text-white px-2 py-1 rounded-md text-xs opacity-0 group-hover:opacity-100 lg:opacity-100 lg:bg-transparent lg:p-0 lg:relative transition-opacity duration-300 ${activeSection === item.id ? 'lg:inline-block' : 'lg:hidden lg:group-hover:inline-block'}`}>
                {item.label}
              </span>
              {/* ✨ الحبة المتحركة ستوضع هنا بواسطة GSAP Flip */}
              {activeSection === item.id && (
                <div ref={activePillRef} className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 rounded-full shadow-md -z-10" />
              )}
            </button>
          ))}
        </div>

        <div className="nav-item w-px h-8 bg-white/20"></div>

        {/* Action Button */}
        <div className="nav-item">
          <Button className="btn-primary rounded-full h-10 px-4 flex items-center justify-center text-base transition-all duration-300">
            <ShoppingCart className="w-5 h-5 mr-0 lg:mr-2" />
            <span className="hidden lg:inline-block">اطلب الآن</span>
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-black/60">{totalCartItems}</span>
            )}
          </Button>
        </div>

      </nav>
    </header>
  );
}

export default Header;

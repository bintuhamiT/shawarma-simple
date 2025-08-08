import { useEffect, useRef } from 'react';
import { Button } from './ui/button'; // تأكد من صحة مسار هذا المكون
import { gsap } from 'gsap';
import { Rocket, Phone } from 'lucide-react';

// --- 1. استيراد 4 صور بدون خلفية (PNG) ---
import image1 from '../assets/new-removebg-preview.png';
import image2 from '../assets/neww-removebg-preview.png';
import image3 from '../assets/newww-removebg-preview.png';
import image4 from '../assets/newwww-removebg-preview.png'; // هذه صورة افتراضية، استبدلها بصورتك الرابعة

function HeroSection({ scrollToSection }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const contentEl = contentRef.current;
    const imageEls = imagesRef.current;

    // --- أنيميشن دخول متقن لأربعة عناصر ---
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 1.8 }
    });

    tl.from(contentEl.children, {
        autoAlpha: 0,
        y: 50,
        stagger: 0.15,
      })
      .from(imageEls, {
        autoAlpha: 0,
        scale: 0.3,
        y: (i) => (i % 2 === 0 ? 80 : -80), // حركة من الأعلى والأسفل
        rotation: (i) => (i % 2 === 0 ? -30 : 30), // دوران مختلف
        stagger: 0.2,
      }, "-=0.5");

    // --- حركة Parallax لأربعة عناصر مع إحساس بالعمق ---
    const onMouseMove = (e) => {
      // تجنب تشغيل الأنيميشن على الأجهزة التي لا تدعم hover (مثل الموبايل)
      if (window.matchMedia('(pointer: coarse)').matches) return;

      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = sectionEl;
      
      const moveX = (clientX / offsetWidth - 0.5);
      const moveY = (clientY / offsetHeight - 0.5);

      // كل صورة تتحرك بسرعة ومدة مختلفة لعمق أكبر
      gsap.to(imageEls[0], { x: -moveX * 80, y: -moveY * 50, rotation: -moveX * 4, duration: 2.0, ease: 'power2.out' }); // رئيسي وسريع
      gsap.to(imageEls[1], { x: moveX * 50, y: moveY * 70, rotation: moveX * 3, duration: 2.5, ease: 'power2.out' }); // أبطأ قليلاً
      gsap.to(imageEls[2], { x: -moveX * 30, y: -moveY * 90, rotation: -moveX * 2, duration: 3.0, ease: 'power2.out' }); // أبطأ
      gsap.to(imageEls[3], { x: moveX * 60, y: -moveY * 60, rotation: moveX * 5, duration: 2.2, ease: 'power2.out' }); // سرعة متوسطة
    };

    sectionEl.addEventListener('mousemove', onMouseMove);
    
    // تنظيف الـ event listener عند إزالة المكون
    return () => sectionEl.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="home" 
      className="relative h-screen flex items-center justify-center bg-gray-50 text-gray-800 overflow-hidden"
    >
      {/* حاوية الصور الطائرة */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* --- توزيع رباعي متباعد ومدروس للصور --- */}
        <img 
          ref={el => imagesRef.current[0] = el}
          src={image1} 
          alt="شاورما طائرة 1" 
          // الزاوية السفلية اليسرى، كبيرة وبارزة
          className="absolute bottom-[5%] left-[-10%] md:left-[-5%] w-[45vw] md:w-[35vw] max-w-[420px] drop-shadow-2xl"
        />
        <img 
          ref={el => imagesRef.current[1] = el}
          src={image2} 
          alt="شاورما طائرة 2" 
          // الزاوية العلوية اليمنى، أصغر حجماً
          className="absolute top-[5%] right-[-8%] md:right-[-2%] w-[30vw] md:w-[20vw] max-w-[220px] drop-shadow-xl"
        />
        <img 
          ref={el => imagesRef.current[2] = el}
          src={image3} 
          alt="شاورما طائرة 3" 
          // الزاوية العلوية اليسرى، حجم متوسط
          className="absolute top-[10%] left-[5%] md:left-[15%] w-[28vw] md:w-[18vw] max-w-[200px] drop-shadow-lg"
        />
        {/* الصورة الرابعة المضافة */}
        <img 
          ref={el => imagesRef.current[3] = el}
          src={image4} 
          alt="شاورما طائرة 4" 
          // الزاوية السفلية اليمنى، لتحقيق التوازن
          className="absolute bottom-[15%] right-[5%] md:right-[10%] w-[32vw] md:w-[22vw] max-w-[250px] drop-shadow-xl"
        />
      </div>

      {/* حاوية المحتوى */}
      <div ref={contentRef} className="relative z-10 text-center p-8">
        <h1 
          className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-wider text-gray-900"
        >
          فن الشاورما
        </h1>
        <p 
          className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-gray-600"
        >
          مزيج متقن من المكونات الطازجة والنكهات الأصيلة في كل لفة.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => scrollToSection('menu')}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg shadow-xl shadow-red-500/20 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <Rocket className="ml-2 h-5 w-5" />
            اكتشف القائمة
          </Button>
          <Button 
            onClick={() => scrollToSection('contact')}
            size="lg"
            variant="outline"
            className="border-gray-400 hover:bg-gray-200/70 text-gray-800 font-bold text-lg shadow-lg shadow-gray-500/10 transform hover:scale-105 transition-all duration-300 ease-in-out"
          >
            <Phone className="ml-2 h-5 w-5" />
            تواصل معنا
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

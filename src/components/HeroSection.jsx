// HeroSection.jsx

import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { gsap } from 'gsap';
import { Rocket } from 'lucide-react';

// --- استخدم صور بدون خلفية (PNG) لتظهر "طائرة" ---
import image1 from '../assets/561NAXOamYdP.jpg';
import image2 from '../assets/QkRrgSs54Md7.jpg';
import image3 from '../assets/SINTLs9LRXo4.jpg';

function HeroSection({ scrollToSection } ) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const contentEl = contentRef.current;
    const imageEls = imagesRef.current;

    // نفس الأنيميشن الأصلي الذي أعجبك
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 1.5 }
    });

    tl.from(sectionEl, { autoAlpha: 0 })
      .from(contentEl.children, {
        autoAlpha: 0,
        y: 50,
        stagger: 0.2,
      }, "-=0.5")
      .from(imageEls, {
        autoAlpha: 0,
        scale: 0.5,
        filter: 'blur(20px)',
        stagger: 0.2,
      }, "-=1");

    // نفس حركة الـ Parallax الأصلية
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = sectionEl;
      
      const moveX = (clientX / offsetWidth - 0.5);
      const moveY = (clientY / offsetHeight - 0.5);

      gsap.to(imageEls[0], { x: -moveX * 50, y: -moveY * 30, rotate: -moveX * 5, duration: 1.2, ease: 'power2.out' });
      gsap.to(imageEls[1], { x: moveX * 30, y: moveY * 20, rotate: moveX * 3, duration: 1.2, ease: 'power2.out' });
      gsap.to(imageEls[2], { x: -moveX * 20, y: -moveY * 40, rotate: -moveX * 2, duration: 1.2, ease: 'power2.out' });
    };

    sectionEl.addEventListener('mousemove', onMouseMove);
    return () => sectionEl.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="home" 
      // --- 1. تم تغيير الخلفية إلى الأبيض ---
      // تم تغيير لون النص الأساسي إلى الأسود (text-gray-800)
      className="relative h-screen flex items-center justify-center bg-white text-gray-800 overflow-hidden"
    >
      {/* حاوية الصور الطائرة */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          ref={el => imagesRef.current[0] = el}
          src={image1} 
          alt="شاورما طائرة" 
          // تم تعديل الظل ليكون أنعم ومناسب للخلفية البيضاء
          className="absolute top-[50%] left-[15%] w-[35vw] max-w-[400px] drop-shadow-lg"
        />
        <img 
          ref={el => imagesRef.current[1] = el}
          src={image2} 
          alt="بطاطس طائرة" 
          className="absolute top-[15%] right-[20%] w-[18vw] max-w-[180px] drop-shadow-md"
        />
        <img 
          ref={el => imagesRef.current[2] = el}
          src={image3} 
          alt="خضروات طائرة" 
          className="absolute bottom-[10%] right-[45%] w-[22vw] max-w-[250px] drop-shadow-sm"
        />
      </div>

      {/* حاوية المحتوى */}
      <div ref={contentRef} className="relative z-10 text-center p-8">
        {/* --- 2. تم تغيير ألوان النصوص لتكون واضحة --- */}
        <h1 
          className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-wider text-gray-900"
        >
          مجرّة الشاورما
        </h1>
        <p 
          className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-gray-600"
        >
          انطلق في رحلة نكهات كونية لا مثيل لها، حيث كل قضمة تأخذك إلى عالم آخر.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* --- 3. تم تعديل ألوان الأزرار لتناسب الخلفية البيضاء --- */}
          <Button 
            onClick={() => scrollToSection('menu')}
            size="lg"
            className="bg-red-600 hover:bg-red-700 text-white font-bold text-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <Rocket className="ml-2 h-5 w-5" />
            استكشف القائمة
          </Button>
          <Button 
            onClick={() => scrollToSection('contact')}
            size="lg"
            variant="outline"
            // تم تغيير لون الحدود والنص ليكون واضحاً
            className="border-gray-800 hover:bg-gray-100 text-gray-800 font-bold text-lg shadow-md transform hover:scale-105 transition-transform duration-300"
          >
            تواصل معنا
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

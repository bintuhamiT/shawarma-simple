// HeroSection.jsx

import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { gsap } from 'gsap';
import { Rocket } from 'lucide-react'; // أيقونة للزر

// --- 1. استخدم صور بدون خلفية (PNG) ---
// هذه صور مقترحة، يمكنك استبدالها بصورك الخاصة
import image1 from '../assets/561NAXOamYdP.jpg';
import image2 from '../assets/QkRrgSs54Md7.jpg';
import image3 from '../assets/SINTLs9LRXo4.jpg';

function HeroSection({ scrollToSection } ) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imagesRef = useRef([]); // مصفوفة لتخزين مراجع الصور

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const contentEl = contentRef.current;
    const imageEls = imagesRef.current;

    // --- 2. تحسين الأنيميشن: حركة دخول أكثر سلاسة وتأثيراً ---
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 1.5 }
    });

    tl.from(sectionEl, { autoAlpha: 0 }) // ظهور القسم بالكامل
      .from(contentEl.children, { // ظهور محتوى النص بشكل متتابع
        autoAlpha: 0,
        y: 50,
        stagger: 0.2,
      }, "-=0.5")
      .from(imageEls, { // ظهور الكواكب بحركة جذابة
        autoAlpha: 0,
        scale: 0.5,
        filter: 'blur(20px)',
        stagger: 0.2,
      }, "-=1");

    // --- 3. تحسين حركة الـ Parallax لجعلها طبيعية أكثر ---
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = sectionEl;
      
      // حساب الحركة بنسبة مئوية من -0.5 إلى 0.5
      const moveX = (clientX / offsetWidth - 0.5);
      const moveY = (clientY / offsetHeight - 0.5);

      // تحريك العناصر بسرعات مختلفة لإعطاء إحساس بالعمق
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
      // --- 4. تحسين الخلفية: استخدام تدرج لوني بدلاً من الأسود الصريح ---
      className="relative h-screen flex items-center justify-center bg-gradient-to-b from-[#000000] to-[#12050a] text-white overflow-hidden"
    >
      {/* خلفية نجوم متحركة لإضافة عمق */}
      <div className="stars-background absolute inset-0 opacity-50"></div>
      
      {/* --- 5. فصل الصور عن المحتوى بشكل كامل لحل مشكلة التداخل --- */}
      {/* حاوية الصور (الكواكب) */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img 
          ref={el => imagesRef.current[0] = el}
          src={image1} 
          alt="كوكب الشاورما" 
          className="absolute top-[50%] left-[15%] w-[35vw] max-w-[400px] drop-shadow-2xl"
        />
        <img 
          ref={el => imagesRef.current[1] = el}
          src={image2} 
          alt="قمر البطاطس" 
          className="absolute top-[15%] right-[20%] w-[18vw] max-w-[180px] drop-shadow-xl"
        />
        <img 
          ref={el => imagesRef.current[2] = el}
          src={image3} 
          alt="قمر الخضروات" 
          className="absolute bottom-[10%] right-[45%] w-[22vw] max-w-[220px] drop-shadow-lg"
        />
      </div>

      {/* حاوية المحتوى (النص والأزرار) */}
      <div ref={contentRef} className="relative z-10 text-center p-8">
        {/* --- 6. تحسين وضوح النص: إضافة ظل واضح وتباين أعلى --- */}
        <h1 
          className="text-5xl md:text-7xl font-black mb-4 uppercase tracking-wider"
          style={{ textShadow: '0 4px 15px rgba(0,0,0,0.7)' }}
        >
          مجرّة الشاورما
        </h1>
        <p 
          className="text-lg md:text-xl mb-8 max-w-xl mx-auto text-gray-200"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7)' }}
        >
          انطلق في رحلة نكهات كونية لا مثيل لها، حيث كل قضمة تأخذك إلى عالم آخر.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
            className="border-white/80 hover:bg-white/10 text-white font-bold text-lg shadow-md transform hover:scale-105 transition-transform duration-300"
          >
            تواصل معنا
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

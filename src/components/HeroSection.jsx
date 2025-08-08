// HeroSection.jsx

import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { gsap } from 'gsap';
import { Rocket, Phone } from 'lucide-react'; // أيقونات محدثة

// --- استخدم صور بدون خلفية (PNG) ---
import image1 from '../assets/new.jpg';
import image2 from '../assets/neww.jpg';
import image3 from '../assets/newww.jpg';

function HeroSection({ scrollToSection } ) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const imagesRef = useRef([]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const contentEl = contentRef.current;
    const imageEls = imagesRef.current;

    // --- 1. أنيميشن دخول أكثر إتقاناً ---
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out', duration: 1.8 } // زيادة طفيفة في المدة لنعومة أكبر
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
        rotation: (i) => (i % 2 === 0 ? -30 : 30),
        stagger: 0.2,
      }, "-=0.5");

    // --- 2. حركة Parallax أكثر نعومة وتنوعاً (لمسة الإتقان) ---
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = sectionEl;
      
      const moveX = (clientX / offsetWidth - 0.5);
      const moveY = (clientY / offsetHeight - 0.5);

      // كل عنصر يتحرك ويتفاعل بشكل مختلف قليلاً لإعطاء إحساس بالعمق والواقعية
      gsap.to(imageEls[0], { x: -moveX * 80, y: -moveY * 50, rotation: -moveX * 4, duration: 2, ease: 'power2.out' });
      gsap.to(imageEls[1], { x: moveX * 50, y: moveY * 70, rotation: moveX * 3, duration: 2.5, ease: 'power2.out' });
      gsap.to(imageEls[2], { x: -moveX * 30, y: -moveY * 90, rotation: -moveX * 2, duration: 3, ease: 'power2.out' });
    };

    sectionEl.addEventListener('mousemove', onMouseMove);
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
        {/* --- 3. توزيع متباعد ومدروس للصور --- */}
        <img 
          ref={el => imagesRef.current[0] = el}
          src={image1} 
          alt="شاورما طائرة" 
          // تم دفعه لليسار أكثر وتكبيره قليلاً ليكون العنصر الرئيسي
          className="absolute top-[40%] left-[-5%] md:left-[5%] w-[45vw] md:w-[35vw] max-w-[450px] drop-shadow-2xl"
        />
        <img 
          ref={el => imagesRef.current[1] = el}
          src={image2} 
          alt="بطاطس طائرة" 
          // تم دفعه للأعلى واليمين
          className="absolute top-[5%] right-[-5%] md:right-[8%] w-[25vw] md:w-[18vw] max-w-[200px] drop-shadow-xl"
        />
        <img 
          ref={el => imagesRef.current[2] = el}
          src={image3} 
          alt="خضروات طائرة" 
          // تم دفعه للأسفل والوسط لتحقيق التوازن
          className="absolute bottom-[-5%] right-[30%] md:right-[40%] w-[30vw] md:w-[22vw] max-w-[250px] drop-shadow-lg"
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
          {/* --- 4. تحسينات دقيقة على الأزرار --- */}
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

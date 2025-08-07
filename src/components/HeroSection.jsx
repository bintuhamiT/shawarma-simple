import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { gsap } from 'gsap';

// Import the original hero image
import heroImage from '../assets/QkRrgSs54Md7.jpg';

function HeroSection({ scrollToSection }) {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const buttonsRef = useRef(null);

  // --- Cinematic Entrance & Parallax Effect ---
  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    // --- 1. Entrance Animation ---
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from(sectionEl.querySelector('.image-background'), { opacity: 0, scale: 1.1, duration: 1.5 })
      .from(titleRef.current, { opacity: 0, y: 50, duration: 1 }, "-=0.8")
      .from(textRef.current, { opacity: 0, y: 40, duration: 0.8 }, "-=0.6")
      .from(buttonsRef.current, { opacity: 0, y: 30, duration: 0.6 }, "-=0.5");

    // --- 2. Parallax Mouse Effect ---
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = sectionEl;
      
      const moveX = (clientX / offsetWidth - 0.5) * 2;
      const moveY = (clientY / offsetHeight - 0.5) * 2;

      // Animate elements with different "depths"
      gsap.to(titleRef.current, { x: -moveX * 20, y: -moveY * 10, duration: 1, ease: 'power2.out' });
      gsap.to(textRef.current, { x: -moveX * 15, y: -moveY * 8, duration: 1, ease: 'power2.out' });
      gsap.to(buttonsRef.current, { x: -moveX * 10, y: -moveY * 5, duration: 1, ease: 'power2.out' });
    };

    sectionEl.addEventListener('mousemove', onMouseMove);
    return () => sectionEl.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="home" 
      className="relative h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Image Background */}
      <div className="image-background absolute inset-0 z-0">
        <img 
          src={heroImage}
          alt="شاورما شهية"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 ref={titleRef} className="text-5xl md:text-7xl font-extrabold mb-6 text-shadow-lg">
          فن الشاورما الأصيل
        </h1>
        <p ref={textRef} className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-gray-200 text-shadow-md">
          نقدم لك تجربة تتجاوز التوقعات، حيث تلتقي أجود المكونات بشغف الطهاة لتقديم تحفة فنية في كل طبق.
        </p>
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => scrollToSection('menu')}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-10 py-3 text-lg font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            اكتشف القائمة
          </Button>
          <Button 
            onClick={() => scrollToSection('contact')}
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-10 py-3 text-lg font-semibold shadow-lg backdrop-blur-sm transform hover:scale-105 transition-all duration-300"
          >
            احجز طاولتك
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

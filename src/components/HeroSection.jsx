import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { gsap } from 'gsap';

import image1 from '../assets/561NAXOamYdP.jpg';
import image2 from '../assets/QkRrgSs54Md7.jpg';
import image3 from '../assets/SINTLs9LRXo4.jpg';

function HeroSection({ scrollToSection }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);
  const starsRef = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const images = [image1Ref.current, image2Ref.current, image3Ref.current];
    const content = contentRef.current;
    const stars = starsRef.current;

    // --- 1. "Warp Speed" Entrance Animation ---
    const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 2 } });
    tl.from(stars, { scale: 0.1, opacity: 0, rotation: -180 })
      .from(images, {
        autoAlpha: 0,
        scale: 0,
        filter: 'blur(50px)',
        stagger: 0.3,
      }, "-=1.5")
      .from(content, { autoAlpha: 0, filter: 'blur(20px)', y: 50 }, "-=1.5");

    // --- 2. "Gravitational" Parallax & Warp Effect ---
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = sectionEl;
      
      const moveX = (clientX / offsetWidth - 0.5) * 2;
      const moveY = (clientY / offsetHeight - 0.5) * 2;

      // Animate planets with gravitational pull
      gsap.to(image1Ref.current, { x: moveX * 40, y: moveY * 30, rotate: -moveX * 8, duration: 2, ease: 'power3.out' });
      gsap.to(image2Ref.current, { x: -moveX * 25, y: -moveY * 20, rotate: moveX * 5, duration: 2, ease: 'power3.out' });
      gsap.to(image3Ref.current, { x: moveX * 15, y: moveY * 10, rotate: -moveX * 3, duration: 2, ease: 'power3.out' });
      
      // Animate the content (UI)
      gsap.to(content, { x: -moveX * 50, y: -moveY * 25, duration: 2, ease: 'power3.out' });

      // Warp effect on the starfield
      gsap.to(stars, {
        x: -moveX * 100,
        y: -moveY * 50,
        scale: 1 + Math.abs(moveX) * 0.2, // Stars stretch horizontally
        rotate: -moveX * 10,
        duration: 2,
        ease: 'power3.out'
      });
    };

    sectionEl.addEventListener('mousemove', onMouseMove);
    return () => sectionEl.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="home" 
      className="relative h-screen flex items-center justify-center bg-black text-white overflow-hidden"
    >
      {/* Starfield Background */}
      <div ref={starsRef} className="stars-background absolute inset-[-20%]"></div>
      
      {/* Nebula/Glow effect */}
      <div className="nebula-glow absolute inset-0"></div>

      {/* Planets Container */}
      <div className="absolute inset-0 w-full h-full z-0">
        <div ref={image1Ref} className="planet-container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] max-w-[450px]">
          <img src={image1} alt="كوكب الشاورما الرئيسي" className="planet-image"/>
          <div className="planet-atmosphere atmosphere-1"></div>
        </div>
        <div ref={image2Ref} className="planet-container absolute top-[15%] left-[20%] w-[20vw] max-w-[200px]">
          <img src={image2} alt="قمر الشاورما الأول" className="planet-image"/>
          <div className="planet-atmosphere atmosphere-2"></div>
        </div>
        <div ref={image3Ref} className="planet-container absolute bottom-[12%] right-[18%] w-[25vw] max-w-[250px]">
          <img src={image3} alt="قمر الشاورما الثاني" className="planet-image"/>
          <div className="planet-atmosphere atmosphere-3"></div>
        </div>
      </div>

      {/* HUD / Content Layer */}
      <div ref={contentRef} className="relative z-10 text-center p-8">
        <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-widest text-shadow-glow">
          اكتشف المجرة
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-300 font-light text-shadow-md">
          رحلة إلى قلب النكهات الكونية، حيث كل طبق هو عالم جديد من الإبداع.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => scrollToSection('menu')}
            className="hud-button bg-red-600/80 border-red-500 text-white"
          >
            بدء الرحلة (القائمة)
          </Button>
          <Button 
            onClick={() => scrollToSection('contact')}
            variant="outline"
            className="hud-button border-white/80 text-white"
          >
            التواصل مع القاعدة
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
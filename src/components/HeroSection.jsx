import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { gsap } from 'gsap';

// Import the three images you want to use
import image1 from '../assets/QkRrgSs54Md7.jpg'; // Main image
import image2 from '../assets.Qsbtw2M8iRQq.jpg'; // Secondary image 1
import image3 from '../assets/dag3MS2UpAjk.jpg'; // Secondary image 2

function HeroSection({ scrollToSection }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl) return;

    const images = [image1Ref.current, image2Ref.current, image3Ref.current];
    const content = contentRef.current;

    // --- 1. Harmonized Entrance Animation ---
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1.5 } });
    tl.from(images, {
        autoAlpha: 0,
        scale: 0.8,
        y: 100,
        stagger: 0.2,
      })
      .from(content, { autoAlpha: 0, y: 50 }, "-=1");

    // --- 2. Enhanced 3D Parallax Mouse Effect ---
    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { offsetWidth, offsetHeight } = sectionEl;
      
      const moveX = (clientX / offsetWidth - 0.5) * 2;
      const moveY = (clientY / offsetHeight - 0.5) * 2;

      // Animate each layer with a different "depth" (parallax intensity)
      // The content (text) moves the most, feeling closest.
      gsap.to(content, { x: -moveX * 30, y: -moveY * 15, duration: 1.2, ease: 'power2.out' });
      
      // Image 1 (main) moves a bit.
      gsap.to(image1Ref.current, { x: moveX * 25, y: moveY * 20, rotate: -moveX * 5, duration: 1.2, ease: 'power2.out' });
      
      // Image 2 (secondary) moves less, feeling further away.
      gsap.to(image2Ref.current, { x: -moveX * 15, y: -moveY * 10, rotate: moveX * 3, duration: 1.2, ease: 'power2.out' });
      
      // Image 3 (furthest) moves the least.
      gsap.to(image3Ref.current, { x: moveX * 10, y: moveY * 5, rotate: -moveX * 2, duration: 1.2, ease: 'power2.out' });
    };

    sectionEl.addEventListener('mousemove', onMouseMove);
    return () => sectionEl.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="home" 
      className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden"
    >
      {/* This container will hold our 3D image composition */}
      <div className="absolute inset-0 w-full h-full z-0">
        {/* Image 1: Main, slightly rotated */}
        <img 
          ref={image1Ref}
          src={image1}
          alt="شاورما شهية"
          className="absolute w-[45vw] max-w-[500px] h-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-2xl"
          style={{ transform: 'rotate(-5deg)' }}
        />
        {/* Image 2: Secondary, top-left, different angle */}
        <img 
          ref={image2Ref}
          src={image2}
          alt="طبق شاورما"
          className="absolute w-[25vw] max-w-[250px] h-auto top-[10%] left-[15%] rounded-lg shadow-xl"
          style={{ transform: 'rotate(8deg)' }}
        />
        {/* Image 3: Secondary, bottom-right, another angle */}
        <img 
          ref={image3Ref}
          src={image3}
          alt="تحضير الشاورما"
          className="absolute w-[30vw] max-w-[300px] h-auto bottom-[8%] right-[12%] rounded-lg shadow-xl"
          style={{ transform: 'rotate(-12deg)' }}
        />
      </div>

      {/* Content Layer - with a semi-transparent background for readability */}
      <div ref={contentRef} className="relative z-10 text-center p-8 rounded-2xl bg-black/30 backdrop-blur-md border border-white/10">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-shadow-lg">
          أبعاد جديدة للنكهة
        </h1>
        <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto text-gray-200 text-shadow-md">
          كل صورة تحكي جزءاً من قصتنا. اكتشف عالماً من الطعم الأصيل والإبداع في كل طبق.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => scrollToSection('menu')}
            className="bg-red-600 hover:bg-red-700 text-white rounded-full px-10 py-3 text-lg font-semibold shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            اكتشف القائمة
          </Button>
          <Button 
            onClick={() => scrollToSection('contact')}
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-black rounded-full px-10 py-3 text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            احجز طاولتك
          </Button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

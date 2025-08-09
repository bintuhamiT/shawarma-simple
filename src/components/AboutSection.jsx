// AboutSection.jsx (النسخة المطورة مع عداد مصحح)

import { ChefHat, Award, Users } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AboutSection({ images }) {
  const sectionRef = useRef(null);
  const imagesContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const commonScrollTrigger = {
        trigger: sectionRef.current,
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play reverse play reverse",
      };

      gsap.from(".about-content > *", {
        ...commonScrollTrigger,
        autoAlpha: 0, y: 50, stagger: 0.1, duration: 0.8, ease: 'power3.out',
      });

      gsap.from(".about-image", {
        ...commonScrollTrigger,
        autoAlpha: 0, scale: 0.5, stagger: 0.15, duration: 1, ease: 'expo.out',
      });
      
      gsap.from(".feature-icon", {
        scrollTrigger: {
          trigger: ".feature-icon",
          start: "top 85%",
          toggleActions: "play none none none",
        },
        scale: 0, rotate: -45, stagger: 0.2, duration: 0.7, ease: 'back.out(1.7)',
      });

      // --- ✨ أنيميشن عداد الأرقام (النسخة المصححة) ---
      gsap.utils.toArray(".stat-number").forEach(el => {
        const originalText = el.dataset.original;
        // استخراج الرقم فقط من النص
        const endValue = parseInt(originalText.replace(/\D/g, '')); 
        // استخراج اللاحقة (مثل K+ أو +)
        const suffix = originalText.substring(String(endValue).length);

        let proxy = { value: 0 };

        gsap.to(proxy, {
          value: endValue,
          duration: 2.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            // تحديث النص في كل إطار مع التنسيق الصحيح
            el.textContent = Math.round(proxy.value) + suffix;
          },
        });
      });

      // --- Parallax عند التمرير (Scroll) ---
      const imageElements = gsap.utils.toArray(".about-image");
      gsap.to(imageElements[0], {
        yPercent: -15, // استخدام yPercent لحركة نسبية أفضل
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
      gsap.to(imageElements[1], {
        yPercent: 10,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });

      // --- حركة الماوس باستخدام quickTo ---
      const imagesContainer = imagesContainerRef.current;
      const qToX1 = gsap.quickTo(imageElements[0], "x", { duration: 0.8, ease: "power3" });
      const qToY1 = gsap.quickTo(imageElements[0], "y", { duration: 0.8, ease: "power3" });
      const qToX2 = gsap.quickTo(imageElements[1], "x", { duration: 0.8, ease: "power3" });
      const qToY2 = gsap.quickTo(imageElements[1], "y", { duration: 0.8, ease: "power3" });

      const onMouseMove = (e) => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        const { clientX, clientY } = e;
        const rect = imagesContainer.getBoundingClientRect();
        const moveX = ((clientX - rect.left) / rect.width - 0.5);
        const moveY = ((clientY - rect.top) / rect.height - 0.5);
        qToX1(-moveX * 40);
        qToY1(-moveY * 20);
        qToX2(moveX * 40);
        qToY2(moveY * 20);
      };

      imagesContainer.addEventListener('mousemove', onMouseMove);
      return () => imagesContainer.removeEventListener('mousemove', onMouseMove);

    }, sectionRef);
    return () => ctx.revert();
  }, [images]);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 items-center">
          
          <div className="about-content">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-gray-900">
              حكاية بدأت بشغف... وتستمر بكم
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              منذ أكثر من 20 عاماً، لم نكن نعد الشاورما فقط، بل كنا نصنع لحظات سعيدة. بدأنا بحلم بسيط، واليوم نفخر بأننا جزء من ذكرياتكم، نقدم لكم نفس الطعم الأصيل الذي أحببتموه، بنفس الجودة التي تستحقونها.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              {/* ✨ إضافة class للتحكم في أيقونات الميزات */}
              <div className="flex items-center gap-4"><Award className="feature-icon text-red-600 w-8 h-8 flex-shrink-0" /> <div><h4 className="font-bold">الجودة أولاً</h4><p className="text-sm text-gray-500">نختار أفضل المكونات الطازجة يومياً.</p></div></div>
              <div className="flex items-center gap-4"><Users className="feature-icon text-red-600 w-8 h-8 flex-shrink-0" /> <div><h4 className="font-bold">فريق محترف</h4><p className="text-sm text-gray-500">طهاة بخبرة طويلة وشغف بالطهي.</p></div></div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div><div data-original="20+" className="stat-number text-4xl font-bold text-red-600">0</div><div className="text-gray-500 mt-1">سنة من الأصالة</div></div>
              <div><div data-original="50K+" className="stat-number text-4xl font-bold text-red-600">0</div><div className="text-gray-500 mt-1">عميل وفيّ</div></div>
              <div><div data-original="100+" className="stat-number text-4xl font-bold text-red-600">0</div><div className="text-gray-500 mt-1">طلب كل ساعة</div></div>
            </div>
          </div>

          <div ref={imagesContainerRef} className="relative h-[450px] lg:h-[550px]">
            <img src={images.aboutImage1} alt="داخل المطعم" className="about-image absolute top-0 left-0 w-[70%] h-[60%] object-cover rounded-2xl shadow-2xl transform -rotate-3"/>
            <img src={images.aboutImage2} alt="تحضير الشاورما" className="about-image absolute bottom-0 right-0 w-[60%] h-[55%] object-cover rounded-2xl shadow-2xl transform rotate-2"/>
            <div className="about-image absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-red-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
              <ChefHat className="w-14 h-14 text-white"/>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default AboutSection;

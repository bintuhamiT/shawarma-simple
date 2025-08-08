// AboutSection.jsx (النسخة المبدعة)
import { ChefHat, Leaf, Award, Users } from 'lucide-react'; // أيقونات محدثة وأكثر تعبيراً
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AboutSection({ images }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const commonScrollTrigger = {
        trigger: sectionRef.current,
        start: "top 75%", // تبدأ الأنيميشن عندما يكون القسم في منتصف الشاشة
        toggleActions: "play none none none",
      };

      // 1. أنيميشن ظهور المحتوى النصي بشكل متتابع وأنيق
      gsap.from(".about-content > *", {
        ...commonScrollTrigger,
        autoAlpha: 0,
        y: 50,
        stagger: 0.15,
        duration: 1,
        ease: 'power3.out',
      });

      // 2. أنيميشن ظهور الصور بحركة "كشف" فنية من المركز
      gsap.from(".about-image", {
        ...commonScrollTrigger,
        autoAlpha: 0,
        scale: 0.5,
        stagger: 0.2,
        duration: 1.2,
        ease: 'expo.out',
      });

      // 3. أنيميشن عداد الأرقام التفاعلي لزيادة التأثير
      gsap.utils.toArray(".stat-number").forEach(el => {
        const endValue = parseInt(el.textContent.replace('+', '').replace('K', '000'));
        gsap.from(el, {
          textContent: 0,
          duration: 2.5,
          ease: "power2.inOut",
          snap: { textContent: 1 },
          scrollTrigger: { trigger: el, start: "top 90%" },
          // إعادة كتابة النص الكامل بعد انتهاء العداد لضمان عرض الرموز
          onComplete: () => {
            if (el.dataset.original.includes('K')) {
              el.textContent = `${endValue / 1000}K+`;
            } else if (el.dataset.original.includes('+')) {
              el.textContent = `${endValue}+`;
            } else {
              el.textContent = endValue;
            }
          }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-x-16 gap-y-12 items-center">
          
          {/* المحتوى النصي أولاً لجذب الانتباه للقصة */}
          <div className="about-content">
            <h2 className="text-4xl lg:text-5xl font-black mb-6 text-gray-900">
              حكاية بدأت بشغف... وتستمر بكم
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              منذ أكثر من 20 عاماً، لم نكن نعد الشاورما فقط، بل كنا نصنع لحظات سعيدة. بدأنا بحلم بسيط، واليوم نفخر بأننا جزء من ذكرياتكم، نقدم لكم نفس الطعم الأصيل الذي أحببتموه، بنفس الجودة التي تستحقونها.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-4"><Award className="text-red-600 w-8 h-8 flex-shrink-0" /> <div><h4 className="font-bold">الجودة أولاً</h4><p className="text-sm text-gray-500">نختار أفضل المكونات الطازجة يومياً.</p></div></div>
              <div className="flex items-center gap-4"><Users className="text-red-600 w-8 h-8 flex-shrink-0" /> <div><h4 className="font-bold">فريق محترف</h4><p className="text-sm text-gray-500">طهاة بخبرة طويلة وشغف بالطهي.</p></div></div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div><div data-original="20+" className="stat-number text-4xl font-bold text-red-600">20+</div><div className="text-gray-500 mt-1">سنة من الأصالة</div></div>
              <div><div data-original="50K+" className="stat-number text-4xl font-bold text-red-600">50K+</div><div className="text-gray-500 mt-1">عميل وفيّ</div></div>
              <div><div data-original="100+" className="stat-number text-4xl font-bold text-red-600">100+</div><div className="text-gray-500 mt-1">طلب كل ساعة</div></div>
            </div>
          </div>

          {/* شبكة الصور الفنية على اليمين */}
          <div className="relative h-[450px] lg:h-[550px]">
            <img src={images.aboutImage1} alt="داخل المطعم" className="about-image absolute top-0 left-0 w-[70%] h-[60%] object-cover rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 hover:scale-105 transition-transform duration-300"/>
            <img src={images.aboutImage2} alt="تحضير الشاورما" className="about-image absolute bottom-0 right-0 w-[60%] h-[55%] object-cover rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 hover:scale-105 transition-transform duration-300"/>
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

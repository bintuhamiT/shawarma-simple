// AboutSection.jsx (النسخة المبدعة)
import { ChefHat, Leaf, Zap, Users } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AboutSection({ images }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // أنيميشن ظهور النص والمميزات بشكل متتابع وجذاب
      gsap.from(".about-content > *", {
        scrollTrigger: { trigger: ".about-content", start: "top 80%", toggleActions: "play none none none" },
        autoAlpha: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power2.out'
      });

      // أنيميشن ظهور الصور بحركة "كشف" فنية
      gsap.from(".about-image", {
        scrollTrigger: { trigger: ".about-images-grid", start: "top 80%", toggleActions: "play none none none" },
        autoAlpha: 0, scale: 0.8, stagger: 0.2, duration: 1, ease: 'expo.out'
      });

      // أنيميشن عداد الأرقام لزيادة التفاعل
      gsap.utils.toArray(".stat-number").forEach(el => {
        gsap.from(el, {
          textContent: 0,
          duration: 2,
          ease: "power1.inOut",
          snap: { textContent: 1 },
          scrollTrigger: { trigger: el, start: "top 90%" }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 bg-cream overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* شبكة الصور الفنية */}
          <div className="about-images-grid relative h-[500px]">
            <img src={images.aboutImage1} alt="داخل المطعم" className="about-image absolute top-0 left-0 w-[65%] h-[65%] object-cover rounded-2xl shadow-lg"/>
            <img src={images.aboutImage2} alt="تحضير الشاورما" className="about-image absolute bottom-0 right-0 w-[55%] h-[55%] object-cover rounded-2xl shadow-xl border-4 border-cream"/>
            <div className="about-image absolute top-[60%] left-[60%] w-24 h-24 bg-primary-red rounded-full flex items-center justify-center shadow-lg">
              <ChefHat className="w-12 h-12 text-white"/>
            </div>
          </div>

          {/* المحتوى والنصوص */}
          <div className="about-content">
            <h2 className="text-4xl font-bold mb-6 text-gradient">قصتنا... شغف في كل لفة</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              بدأنا كحلم صغير على ناصية شارع، واليوم أصبحنا جزءاً من حكاياتكم اليومية. كل سيخ شاورما يدور، يروي قصة 20 عاماً من الشغف، الإتقان، والبحث عن اللقمة المثالية التي تجمعنا بكم.
            </p>
            
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-10">
              <div className="flex items-center gap-3"><Leaf className="text-primary-red w-6 h-6" /> <span className="font-semibold">مكونات طبيعية 100%</span></div>
              <div className="flex items-center gap-3"><Zap className="text-primary-red w-6 h-6" /> <span className="font-semibold">خدمة سريعة ونكهة أصيلة</span></div>
            </div>

            <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8">
              <div className="text-center"><div className="stat-number text-4xl font-bold text-primary-red">20</div><div className="text-gray-600 mt-1">عام من الخبرة</div></div>
              <div className="text-center"><div className="stat-number text-4xl font-bold text-primary-red">50000</div><div className="text-gray-600 mt-1">عميل سعيد</div></div>
              <div className="text-center"><div className="stat-number text-4xl font-bold text-primary-red">100</div><div className="text-gray-600 mt-1">ألف لفة شهرياً</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

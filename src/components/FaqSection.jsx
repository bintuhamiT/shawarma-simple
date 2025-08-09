import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion'; // افتراضي: استيراد من مكتبة الواجهة
import { Button } from './ui/button'; // افتراضي: استيراد من مكتبة الواجهة
import { Phone, MessageCircleQuestion, ChevronDown } from 'lucide-react';

// تسجيل إضافة GSAP مرة واحدة
gsap.registerPlugin(ScrollTrigger);

function FaqSection({ faqs, scrollToSection }) {
  const sectionRef = useRef(null);
  // حالة لتتبع العنصر المفتوح حاليًا في الأكورديون
  const [activeItem, setActiveItem] = useState(null);

  // التأثير الخاص بأنيميشن الدخول عند التمرير (يعمل مرة واحدة)
  useEffect(() => {
    // استخدام gsap.context لضمان تنظيف الأنيميشن بشكل آمن
    const ctx = gsap.context(() => {
      const commonScrollTrigger = {
        trigger: sectionRef.current,
        start: "top 80%", // يبدأ الأنيميشن عندما يصل أعلى القسم إلى 80% من الشاشة
        toggleActions: "play none none none",
      };

      // 1. أنيميشن ظهور العنوان الرئيسي
      gsap.from(".faq-header", {
        ...commonScrollTrigger,
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
      });

      // 2. أنيميشن ظهور قائمة الأسئلة مع تأثير متدرج
      gsap.from(".faq-item", {
        ...commonScrollTrigger,
        autoAlpha: 0,
        x: -50, // تأتي من اليسار
        stagger: 0.1, // تأخير بين كل عنصر
        duration: 0.7,
        ease: 'power3.out',
      });
      
      // 3. أنيميشن ظهور البطاقة الجانبية
      gsap.from(".faq-cta-card", {
        ...commonScrollTrigger,
        autoAlpha: 0,
        scale: 0.9,
        duration: 1,
        ease: 'expo.out',
      });

      // 4. أنيميشن Parallax للبطاقة الجانبية (الحركة أثناء التمرير)
      gsap.to(".faq-cta-card", {
        yPercent: -15, // تتحرك للأعلى بنسبة 15% من ارتفاعها
        ease: "none",
        scrollTrigger: {
          trigger: ".grid",
          start: "top center",
          end: "bottom bottom",
          scrub: 1.5, // يجعل الحركة ناعمة ومرتبطة بالتمرير
        }
      });

    }, sectionRef); // ربط السياق بالعنصر الرئيسي للمكون

    // دالة التنظيف عند إزالة المكون
    return () => ctx.revert();
  }, []); // المصفوفة الفارغة تضمن أن هذا التأثير يعمل مرة واحدة فقط

  // التأثير الخاص بأنيميشن فتح وإغلاق عناصر الأكورديون
  useEffect(() => {
    // استهداف جميع العناصر للتحكم في حالتها
    const allItems = gsap.utils.toArray('.faq-item');
    
    allItems.forEach(item => {
      const content = item.querySelector('.accordion-content');
      const icon = item.querySelector('.accordion-icon');
      const isActive = item.getAttribute('data-value') === activeItem;

      if (isActive) {
        // أنيميشن الفتح
        gsap.to(content, {
          height: 'auto', autoAlpha: 1,
          duration: 0.5, ease: 'expo.out', overwrite: 'auto'
        });
        gsap.to(icon, { rotate: 180, duration: 0.4, ease: 'power2.out' });
      } else {
        // أنيميشن الإغلاق
        gsap.to(content, {
          height: 0, autoAlpha: 0,
          duration: 0.4, ease: 'power2.inOut', overwrite: 'auto'
        });
        gsap.to(icon, { rotate: 0, duration: 0.4, ease: 'power2.out' });
      }
    });

  }, [activeItem]); // إعادة تشغيل الأنيميشن فقط عند تغير العنصر النشط

  return (
    <section id="faq" ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="faq-header text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900">
            أسئلة تهمك
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            وجدنا أن هذه الأسئلة تتكرر كثيراً، فجمعنا لك إجاباتها هنا لتجربة أسهل وأسرع.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-x-12 gap-y-8 items-start">
          {/* العمود الأيسر: قائمة الأسئلة */}
          <div className="lg:col-span-2">
            <Accordion 
              type="single" 
              collapsible 
              className="w-full space-y-4"
              onValueChange={setActiveItem} // تحديث الحالة عند تغيير العنصر المفتوح
            >
              {(faqs || []).map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={`item-${faq.id}`}
                  data-value={`item-${faq.id}`} // لتسهيل الاستهداف في GSAP
                  className="faq-item bg-gray-50 border border-transparent rounded-xl shadow-sm overflow-hidden data-[state=open]:bg-white data-[state=open]:shadow-md data-[state=open]:border-gray-200 transition-all duration-300"
                >
                  <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:no-underline hover:text-red-600 text-right w-full px-6 py-5 group transition-colors duration-300">
                    <span className="flex-1 text-right">{faq.question}</span>
                    <ChevronDown className="accordion-icon h-5 w-5 shrink-0 transition-transform duration-300 mr-4" />
                  </AccordionTrigger>
                  <AccordionContent className="accordion-content h-0 overflow-hidden opacity-0 invisible">
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-gray-700 leading-relaxed text-right">
                        {faq.answer}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* العمود الأيمن: بطاقة التواصل */}
          <div className="faq-cta-card hidden lg:block bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-xl text-white text-center sticky top-24">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-white/20">
                <MessageCircleQuestion className="w-10 h-10 text-white"/>
            </div>
            <h3 className="text-2xl font-bold mb-3">هل لديك سؤال آخر؟</h3>
            <p className="text-gray-300 mb-6">
              فريقنا جاهز للإجابة على جميع استفساراتك. لا تتردد بالتواصل معنا!
            </p>
            <Button 
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="w-full bg-red-600 hover:bg-red-700 text-lg font-bold transition-transform hover:scale-105"
            >
              <Phone className="ml-2 w-5 h-5" />
              تواصل معنا
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;

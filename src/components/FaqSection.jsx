// FaqSection.jsx (النسخة المبدعة)

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { Button } from './ui/button'; // لاستخدامه في بطاقة التواصل
import { Phone, MessageCircleQuestion } from 'lucide-react'; // أيقونات معبرة
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function FaqSection({ faqs, images, scrollToSection }) { // إضافة images و scrollToSection
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const commonScrollTrigger = {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none none",
      };

      // 1. أنيميشن ظهور العنوان والمحتوى الرئيسي
      gsap.from(".faq-header", {
        ...commonScrollTrigger,
        autoAlpha: 0,
        y: 40,
        duration: 0.8,
        ease: 'power2.out',
      });

      // 2. أنيميشن ظهور الأسئلة بشكل متتابع وجذاب
      gsap.from(".faq-item", {
        ...commonScrollTrigger,
        autoAlpha: 0,
        x: -50, // تأتي من اليسار
        stagger: 0.1,
        duration: 0.6,
        ease: 'power2.out',
      });
      
      // 3. أنيميشن ظهور البطاقة الجانبية
      gsap.from(".faq-cta-card", {
        ...commonScrollTrigger,
        autoAlpha: 0,
        scale: 0.8,
        duration: 1,
        ease: 'expo.out',
      });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

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
          {/* قائمة الأسئلة على اليمين */}
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {(faqs || []).map(faq => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`} className="faq-item bg-gray-50 border border-gray-200/80 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300 data-[state=open]:bg-white data-[state=open]:shadow-lg">
                  <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-red-600 text-right px-6 py-5 group">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed text-right px-6 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* بطاقة التواصل الجانبية على اليسار */}
          <div className="faq-cta-card hidden lg:block bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl text-white text-center sticky top-24">
            <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-white/20">
                <MessageCircleQuestion className="w-12 h-12 text-white"/>
            </div>
            <h3 className="text-2xl font-bold mb-3">هل لديك سؤال آخر؟</h3>
            <p className="text-gray-300 mb-6">
              فريقنا جاهز للإجابة على جميع استفساراتك. لا تتردد بالتواصل معنا!
            </p>
            <Button 
              onClick={() => scrollToSection('contact')}
              size="lg"
              className="w-full bg-red-600 hover:bg-red-700 text-lg font-bold"
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

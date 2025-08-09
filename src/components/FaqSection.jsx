// FaqSection.jsx (النسخة المصححة التي تحترم دور React)

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// لا حاجة لـ Flip هنا، سنستخدم GSAP الأساسي
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ✨ تأكد من تسجيل الإضافات مرة واحدة فقط في مكان مركزي في تطبيقك
// أفضل مكان هو ملف الدخول الرئيسي مثل App.jsx أو main.jsx
// هذا يضمن أنها مسجلة قبل تنفيذ أي مكون.
// gsap.registerPlugin(ScrollTrigger); // <--- انقله إلى App.jsx أو main.jsx

function FaqSection({ faqs }) {
  const sectionRef = useRef(null);
  const questionsListRef = useRef(null);
  const answerContentRef = useRef(null);
  const indicatorRef = useRef(null); // Ref مخصص للمؤشر

  // تأكد من أن faqs مصفوفة قبل استخدامها
  const validFaqs = Array.isArray(faqs) ? faqs : [];
  const [activeFaq, setActiveFaq] = useState(validFaqs.length > 0 ? validFaqs[0] : null);

  // أنيميشن الدخول الأولي
  useEffect(() => {
    // ✨ تسجيل الإضافة داخل useEffect كحل بديل إذا لم تسجلها مركزياً
    // هذا يضمن أن الإضافة مسجلة قبل تشغيل الأنيميشن
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".faq-header", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        autoAlpha: 0, y: 30, duration: 0.8, ease: 'power2.out'
      });
      gsap.from(".faq-layout-grid > *", {
        scrollTrigger: { trigger: ".faq-layout-grid", start: "top 85%" },
        autoAlpha: 0, y: 40, stagger: 0.15, duration: 0.8, ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ✨ أنيميشن تحريك المؤشر وتغيير المحتوى
  useEffect(() => {
    if (!activeFaq || !questionsListRef.current || !indicatorRef.current) return;

    // العثور على الزر النشط بناءً على ID السؤال النشط
    const activeQuestionElement = questionsListRef.current.querySelector(`[data-faq-id="${activeFaq.id}"]`);
    if (!activeQuestionElement) return;

    // استخدام GSAP لتحريك المؤشر بسلاسة إلى موضع الزر النشط
    // GSAP سيحسب الأبعاد والموقع ويحرك المؤشر إليها
    gsap.to(indicatorRef.current, {
      top: activeQuestionElement.offsetTop,
      height: activeQuestionElement.offsetHeight,
      duration: 0.5,
      ease: 'power2.inOut',
    });

  }, [activeFaq]); // هذا التأثير يعمل كلما تغير السؤال النشط

  const handleQuestionSelect = (faq) => {
    if (activeFaq && activeFaq.id === faq.id) return;

    const answerContent = answerContentRef.current;
    gsap.to(answerContent, {
      autoAlpha: 0,
      y: -10,
      duration: 0.2,
      ease: 'power1.in',
      onComplete: () => {
        setActiveFaq(faq);
        gsap.fromTo(answerContent,
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.3, ease: 'power1.out' }
        );
      }
    });
  };

  if (validFaqs.length === 0) {
    return null;
  }

  return (
    <section id="faq" ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="faq-header text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900">
            أسئلة تهمك
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            وجدنا أن هذه الأسئلة تتكرر كثيراً، فجمعنا لك إجاباتها هنا.
          </p>
        </div>

        <div className="faq-layout-grid grid lg:grid-cols-2 gap-x-12 gap-y-8">
          {/* الجهة اليمنى: قائمة الأسئلة */}
          <div ref={questionsListRef} className="relative space-y-3">
            {/* ✨ المؤشر الآن عنصر مستقل ويتم تحريكه فقط، لا يتم نقله */}
            <div ref={indicatorRef} className="active-indicator absolute left-0 w-full bg-red-50 border-2 border-red-500 rounded-lg -z-10"></div>
            
            {validFaqs.map(faq => (
              <button
                key={faq.id}
                data-faq-id={faq.id} // استخدام data attribute لتحديد الزر
                onClick={() => handleQuestionSelect(faq)}
                className={`relative w-full text-right p-5 rounded-lg transition-colors duration-300 font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2
                  ${activeFaq?.id === faq.id ? 'text-red-600' : 'text-gray-700 hover:text-red-600 bg-gray-50 hover:bg-red-50'}`}
              >
                {faq.question}
              </button>
            ))}
          </div>

          {/* الجهة اليسرى: عرض الإجابة */}
          <div className="sticky top-24 h-fit min-h-[300px] bg-gray-50 rounded-2xl p-8 lg:p-10 border">
            {activeFaq && (
              <div ref={answerContentRef}>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {activeFaq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {activeFaq.answer}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;

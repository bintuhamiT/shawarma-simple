// ContactSection.jsx (النسخة المطورة مع تفاعلات دقيقة)

import { MapPin, Phone, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ContactSection() {
  const { toast } = useToast();
  const sectionRef = useRef(null);
  const formRef = useRef(null); // Ref للنموذج
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // تسجيل الإضافة بشكل آمن
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const commonScrollTrigger = {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      };

      gsap.from(".contact-header", { ...commonScrollTrigger, autoAlpha: 0, y: 40, duration: 0.8 });
      gsap.from(".contact-form-card", { ...commonScrollTrigger, autoAlpha: 0, scale: 0.9, duration: 1, delay: 0.2 });

      // ✨ التحسين رقم 1: تأثيرات تفاعلية لمعلومات التواصل
      const infoItems = gsap.utils.toArray('.contact-info-item');
      infoItems.forEach(item => {
        const icon = item.querySelector('svg');
        const text = item.querySelector('div');
        const hoverTimeline = gsap.timeline({ paused: true })
          .to(item, { backgroundColor: '#F9FAFB', duration: 0.3 }) // bg-gray-50
          .to(icon, { scale: 1.1, rotate: -5, color: '#DC2626', duration: 0.3 }, '<') // text-red-600
          .to(text, { x: 5, duration: 0.3 }, '<');

        item.addEventListener('mouseenter', () => hoverTimeline.play());
        item.addEventListener('mouseleave', () => hoverTimeline.reverse());
      });

      // ✨ التحسين رقم 2: أنيميشن تفاعلي لحقول الإدخال
      const inputs = gsap.utils.toArray('.form-field');
      inputs.forEach(field => {
        const line = field.querySelector('.focus-line');
        gsap.set(line, { scaleX: 0 }); // إخفاء الخط في البداية

        field.addEventListener('focusin', () => {
          gsap.to(line, { scaleX: 1, duration: 0.4, ease: 'power2.out', transformOrigin: 'left' });
        });
        field.addEventListener('focusout', () => {
          gsap.to(line, { scaleX: 0, duration: 0.4, ease: 'power2.inOut', transformOrigin: 'right' });
        });
      });

      // ✨ التحسين رقم 3: تأثير مغناطيسي لزر الإرسال
      const submitButton = document.querySelector('.submit-button');
      const sendIcon = submitButton.querySelector('.send-icon');
      const btnBounds = submitButton.getBoundingClientRect();

      const onMouseMove = (e) => {
        const { clientX, clientY } = e;
        const x = clientX - (btnBounds.left + btnBounds.width / 2);
        const y = clientY - (btnBounds.top + btnBounds.height / 2);
        gsap.to(sendIcon, { x: x * 0.2, y: y * 0.2, duration: 0.7, ease: 'power3.out' });
      };
      const onMouseLeave = () => {
        gsap.to(sendIcon, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      };

      submitButton.addEventListener('mousemove', onMouseMove);
      submitButton.addEventListener('mouseleave', onMouseLeave);

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ✨ التحسين رقم 4: أنيميشن عند إرسال النموذج
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true); // تحديث الحالة لإظهار رسالة النجاح

    const formElements = formRef.current.elements;
    const tl = gsap.timeline({
      onComplete: () => {
        toast({
          title: "🚀 تم الإرسال بنجاح!",
          description: "شكراً لك! رسالتك في طريقها إلينا وسنرد عليك قريباً.",
        });
      }
    });

    tl.to(formElements, {
      autoAlpha: 0,
      y: -20,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power2.in'
    }).fromTo('.success-message',
      { autoAlpha: 0, scale: 0.8 },
      { autoAlpha: 1, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.75)' }
    );
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-50 text-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="contact-header text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900">جاهز لتجربة لا تُنسى؟</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            سواء كان لديك سؤال، أو ترغب في حجز طاولة، أو فقط لتقول مرحباً، نحن هنا من أجلك.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="lg:col-span-2 space-y-4">
            <div className="contact-info-item flex items-start gap-5 p-4 rounded-xl cursor-pointer">
              <MapPin className="w-8 h-8 text-red-500 mt-1 flex-shrink-0"/>
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-900">تفضل بزيارتنا</h3>
                <p className="text-gray-600">شارع الملك فهد، حي النزهة، الرياض</p>
                <a href="#" className="text-red-600 hover:text-red-700 transition-colors text-sm mt-1 inline-block font-semibold">عرض على الخريطة</a>
              </div>
            </div>
            <div className="contact-info-item flex items-start gap-5 p-4 rounded-xl cursor-pointer">
              <Phone className="w-8 h-8 text-red-500 mt-1 flex-shrink-0"/>
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-900">اتصل بنا مباشرة</h3>
                <p className="text-gray-600" dir="ltr">+966 11 123 4567</p>
              </div>
            </div>
            <div className="contact-info-item flex items-start gap-5 p-4 rounded-xl cursor-pointer">
              <Clock className="w-8 h-8 text-red-500 mt-1 flex-shrink-0"/>
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-900">ساعات العمل</h3>
                <p className="text-gray-600">يومياً: 11:00 صباحاً - 1:00 صباحاً</p>
              </div>
            </div>
          </div>

          <div className="contact-form-card lg:col-span-3 bg-white p-8 rounded-2xl shadow-2xl shadow-gray-500/10 border border-gray-200/80 min-h-[480px] flex flex-col justify-center">
            {!isSubmitted ? (
              <>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">أرسل لنا رسالة</h3>
                <form ref={formRef} className="space-y-5" onSubmit={handleFormSubmit}>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* ✨ إضافة حاوية وخط للأنيميشن */}
                    <div className="relative form-field"><Input type="text" name="name" placeholder="الاسم الكامل" required className="bg-gray-100/80 border-0 border-b-2 border-gray-300 text-gray-800 h-12 rounded-lg focus:ring-0 focus:border-b-gray-300"/><div className="focus-line absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div></div>
                    <div className="relative form-field"><Input type="email" name="email" placeholder="البريد الإلكتروني" required className="bg-gray-100/80 border-0 border-b-2 border-gray-300 text-gray-800 h-12 rounded-lg focus:ring-0 focus:border-b-gray-300"/><div className="focus-line absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div></div>
                  </div>
                  <div className="relative form-field"><Textarea name="message" placeholder="كيف يمكننا مساعدتك؟" required className="bg-gray-100/80 border-0 border-b-2 border-gray-300 text-gray-800 rounded-lg focus:ring-0 focus:border-b-gray-300" rows={5}/><div className="focus-line absolute bottom-0 left-0 w-full h-0.5 bg-red-600"></div></div>
                  <Button type="submit" size="lg" className="submit-button w-full bg-red-600 hover:bg-red-700 text-white text-lg h-14 rounded-lg font-bold flex items-center gap-3 transition-all duration-300 transform hover:scale-105 overflow-hidden">
                    <Send className="send-icon w-5 h-5"/>
                    <span>إرسال الرسالة</span>
                  </Button>
                </form>
              </>
            ) : (
              <div className="success-message text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4"/>
                <h3 className="text-2xl font-bold text-gray-900">تم استلام رسالتك!</h3>
                <p className="text-gray-600 mt-2">سنتواصل معك في أقرب وقت ممكن. شكراً لك.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

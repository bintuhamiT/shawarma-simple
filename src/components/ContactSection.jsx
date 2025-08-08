// ContactSection.jsx (النسخة البيضاء المبدعة)

import { MapPin, Phone, Clock, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast'; // تأكد من صحة المسار
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function ContactSection() {
  const { toast } = useToast();
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const commonScrollTrigger = {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none none",
      };

      gsap.from(".contact-header", { ...commonScrollTrigger, autoAlpha: 0, y: 40, duration: 0.8 });
      gsap.from(".contact-info-item", { ...commonScrollTrigger, autoAlpha: 0, x: -40, stagger: 0.15, duration: 0.6 });
      gsap.from(".contact-form-card", { ...commonScrollTrigger, autoAlpha: 0, scale: 0.9, duration: 1 });

    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted');
    
    toast({
      title: "🚀 تم الإرسال بنجاح!",
      description: "شكراً لك! رسالتك في طريقها إلينا وسنرد عليك قريباً.",
    });
    e.target.reset();
  };

  return (
    // --- 1. تغيير الخلفية إلى بيضاء مع تدرج خفيف ---
    <section id="contact" ref={sectionRef} className="py-24 bg-gradient-to-b from-white to-gray-50 text-gray-800 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="contact-header text-center mb-16">
          {/* --- 2. تغيير ألوان النصوص --- */}
          <h2 className="text-4xl lg:text-5xl font-black mb-4 text-gray-900">جاهز لتجربة لا تُنسى؟</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            سواء كان لديك سؤال، أو ترغب في حجز طاولة، أو فقط لتقول مرحباً، نحن هنا من أجلك.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* معلومات التواصل */}
          <div className="lg:col-span-2 space-y-6">
            <div className="contact-info-item flex items-start gap-5 p-4 rounded-xl transition-colors duration-300 hover:bg-gray-100/70">
              <MapPin className="w-8 h-8 text-red-600 mt-1 flex-shrink-0"/>
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-900">تفضل بزيارتنا</h3>
                <p className="text-gray-600">شارع الملك فهد، حي النزهة، الرياض</p>
                <a href="#" className="text-red-600 hover:text-red-700 transition-colors text-sm mt-1 inline-block font-semibold">عرض على الخريطة</a>
              </div>
            </div>
            <div className="contact-info-item flex items-start gap-5 p-4 rounded-xl transition-colors duration-300 hover:bg-gray-100/70">
              <Phone className="w-8 h-8 text-red-600 mt-1 flex-shrink-0"/>
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-900">اتصل بنا مباشرة</h3>
                <p className="text-gray-600" dir="ltr">+966 11 123 4567</p>
              </div>
            </div>
            <div className="contact-info-item flex items-start gap-5 p-4 rounded-xl transition-colors duration-300 hover:bg-gray-100/70">
              <Clock className="w-8 h-8 text-red-600 mt-1 flex-shrink-0"/>
              <div>
                <h3 className="text-xl font-bold mb-1 text-gray-900">ساعات العمل</h3>
                <p className="text-gray-600">يومياً: 11:00 صباحاً - 1:00 صباحاً</p>
              </div>
            </div>
          </div>

          {/* --- 3. تعديل تصميم بطاقة النموذج --- */}
          <div className="contact-form-card lg:col-span-3 bg-white p-8 rounded-2xl shadow-2xl shadow-gray-500/10 border border-gray-200/80">
            <h3 className="text-2xl font-bold mb-6 text-gray-900">أرسل لنا رسالة</h3>
            <form className="space-y-5" onSubmit={handleFormSubmit}>
              <div className="grid sm:grid-cols-2 gap-5">
                {/* --- 4. تعديل تصميم حقول الإدخال --- */}
                <Input type="text" name="name" placeholder="الاسم الكامل" required className="bg-gray-100/80 border-gray-300 text-gray-800 h-12 rounded-lg focus:border-red-500 focus:ring-red-500"/>
                <Input type="email" name="email" placeholder="البريد الإلكتروني" required className="bg-gray-100/80 border-gray-300 text-gray-800 h-12 rounded-lg focus:border-red-500 focus:ring-red-500"/>
              </div>
              <Textarea name="message" placeholder="كيف يمكننا مساعدتك؟" required className="bg-gray-100/80 border-gray-300 text-gray-800 rounded-lg focus:border-red-500 focus:ring-red-500" rows={5}/>
              <Button type="submit" size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white text-lg h-14 rounded-lg font-bold flex items-center gap-2 transition-all duration-300 transform hover:scale-105">
                <Send className="w-5 h-5"/>
                إرسال الرسالة
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

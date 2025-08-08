// ContactSection.jsx (النسخة المبدعة)
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from './ui/use-toast';

function ContactSection() {
  const { toast } = useToast();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // هنا يمكنك إضافة منطق إرسال النموذج الفعلي
    toast({
      title: "تم استلام رسالتك بنجاح!",
      description: "شكراً لتواصلك. فريقنا سيعود إليك في أقرب وقت ممكن.",
    });
    e.target.reset(); // إعادة تعيين الحقول
  };

  return (
    <section id="contact" className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">هل أنت مستعد للتذوق؟</h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">تفضل بزيارتنا أو تواصل معنا. نحن دائماً في انتظارك!</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12">
          {/* معلومات التواصل */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-800 transition-colors">
              <MapPin className="w-7 h-7 text-primary-red mt-1 flex-shrink-0"/>
              <div><h3 className="text-xl font-bold mb-1">موقعنا</h3><p className="text-gray-400">شارع الملك فهد، حي النزهة، الرياض</p></div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-800 transition-colors">
              <Phone className="w-7 h-7 text-primary-red mt-1 flex-shrink-0"/>
              <div><h3 className="text-xl font-bold mb-1">للحجوزات والطلبات</h3><p className="text-gray-400" dir="ltr">+966 11 123 4567</p></div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-800 transition-colors">
              <Clock className="w-7 h-7 text-primary-red mt-1 flex-shrink-0"/>
              <div><h3 className="text-xl font-bold mb-1">ساعات العمل</h3><p className="text-gray-400">يومياً: 11:00 صباحاً - 1:00 صباحاً</p></div>
            </div>
          </div>
          
          {/* نموذج التواصل الأنيق */}
          <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl">
            <h3 className="text-2xl font-bold mb-6">أرسل لنا رسالة مباشرة</h3>
            <form className="space-y-5" onSubmit={handleFormSubmit}>
              <Input type="text" placeholder="الاسم الكامل" required className="bg-gray-700 border-gray-600 text-white h-12"/>
              <Input type="email" placeholder="البريد الإلكتروني" required className="bg-gray-700 border-gray-600 text-white h-12"/>
              <Textarea placeholder="رسالتك..." required className="bg-gray-700 border-gray-600 text-white" rows={5}/>
              <Button type="submit" size="lg" className="w-full bg-primary-red hover:bg-red-700 text-lg h-14">إرسال الآن</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

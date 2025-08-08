import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Alert, AlertTitle, AlertDescription } from './ui/alert';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './ui/alert-dialog';

function ContactSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  useEffect(() => {
    if (isAlertVisible) {
      const timer = setTimeout(() => setIsAlertVisible(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isAlertVisible]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsDialogOpen(true);
  };

  const confirmFormSubmission = () => {
    console.log('Form submitted:', formData);
    setIsDialogOpen(false);
    setIsAlertVisible(true);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-r from-red-600 to-orange-500 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">تواصل معنا</h2>
          <p className="text-lg opacity-90">نحن هنا للإجابة على جميع استفساراتك وتلبية طلباتك</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4"><MapPin className="w-8 h-8" /><div><h3 className="text-xl font-bold mb-2">العنوان</h3><p>شارع الملك فهد، حي النزهة  
الرياض، المملكة العربية السعودية</p></div></div>
            <div className="flex items-center gap-4"><Phone className="w-8 h-8" /><div><h3 className="text-xl font-bold mb-2">الهاتف</h3><p>+966 11 123 4567  
+966 50 123 4567</p></div></div>
            <div className="flex items-center gap-4"><Mail className="w-8 h-8" /><div><h3 className="text-xl font-bold mb-2">البريد الإلكتروني</h3><p>info@shawarma-asala.com  
orders@shawarma-asala.com</p></div></div>
            <div className="flex items-center gap-4"><Clock className="w-8 h-8" /><div><h3 className="text-xl font-bold mb-2">ساعات العمل</h3><p>السبت - الخميس: 11:00 ص - 12:00 م  
الجمعة: 2:00 م - 12:00 م</p></div></div>
          </div>
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4 text-gray-800">أرسل لنا رسالة</h3>
            {isAlertVisible && (<Alert className="mb-4 bg-secondary-beige text-primary-red"><AlertTitle>تم إرسال الرسالة!</AlertTitle><AlertDescription>شكراً لتواصلك معنا. سنرد عليك قريباً.</AlertDescription></Alert>)}
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <input type="text" name="name" value={formData.name} onChange={handleFormChange} placeholder="الاسم الكامل" className="w-full p-3 border rounded-lg text-gray-800" required />
              <input type="email" name="email" value={formData.email} onChange={handleFormChange} placeholder="البريد الإلكتروني" className="w-full p-3 border rounded-lg text-gray-800" required />
              <input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} placeholder="رقم الهاتف" className="w-full p-3 border rounded-lg text-gray-800" />
              <textarea name="message" value={formData.message} onChange={handleFormChange} placeholder="رسالتك..." rows={4} className="w-full p-3 border rounded-lg text-gray-800" required></textarea>
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild><Button type="submit" className="w-full btn-primary">إرسال الرسالة</Button></AlertDialogTrigger>
                <AlertDialogContent className="bg-white"><AlertDialogHeader><AlertDialogTitle className="text-gradient text-xl">تأكيد إرسال الرسالة</AlertDialogTitle><AlertDialogDescription className="text-gray-600">هل أنت متأكد من إرسال هذه الرسالة؟ سنتواصل معك قريباً بناءً على المعلومات المقدمة.</AlertDialogDescription></AlertDialogHeader><AlertDialogFooter><AlertDialogCancel className="border-primary-red text-primary-red hover:bg-gray-100">إلغاء</AlertDialogCancel><AlertDialogAction onClick={confirmFormSubmission} className="btn-primary">تأكيد</AlertDialogAction></AlertDialogFooter></AlertDialogContent>
              </AlertDialog>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;

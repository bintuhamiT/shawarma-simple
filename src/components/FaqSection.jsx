// FaqSection.jsx (النسخة المبدعة)
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { MessageCircleQuestion } from 'lucide-react';

function FaqSection({ faqs }) {
  return (
    <section id="faq" className="py-24 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">لديك سؤال؟ لدينا إجابة!</h2>
          <p className="text-lg text-gray-600">كل ما تحتاج معرفته لتجربة لا تُنسى.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map(faq => (
                <AccordionItem key={faq.id} value={faq.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <AccordionTrigger className="text-lg font-semibold text-gray-800 hover:text-primary-red text-right px-6 py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 leading-relaxed text-right px-6 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          <div className="hidden lg:block bg-white p-8 rounded-2xl shadow-lg border border-gray-200 text-center sticky top-24">
            <MessageCircleQuestion className="w-20 h-20 text-primary-red mx-auto mb-4"/>
            <h3 className="text-xl font-bold mb-2">لم تجد إجابتك؟</h3>
            <p className="text-gray-600 mb-4">لا تتردد في التواصل معنا مباشرة. فريقنا جاهز لمساعدتك!</p>
            <Button className="w-full bg-primary-red hover:bg-red-700">اتصل بنا الآن</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';

function FaqSection({ faqs }) {
  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">الأسئلة الشائعة</h2>
          <p className="text-lg text-gray-600">
            إجابات على أكثر الأسئلة شيوعاً حول مطعمنا وخدماتنا
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map(faq => (
              <AccordionItem key={faq.id} value={faq.id} className="border-border">
                <AccordionTrigger className="text-lg font-semibold text-primary-red hover:text-orange-500 text-right">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed text-right">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default FaqSection;

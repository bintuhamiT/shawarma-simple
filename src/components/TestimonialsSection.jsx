import { useState } from 'react';
import { Card } from './ui/card';
import { Star } from 'lucide-react';

function TestimonialsSection({ testimonials }) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Add a guard clause to prevent errors if testimonials is not passed
  if (!testimonials || testimonials.length === 0) {
    return null; 
  }

  const activeTestimonial = testimonials[currentTestimonial];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">آراء عملائنا</h2>
          <p className="text-lg text-gray-600">
            اكتشف ما يقوله عملاؤنا الكرام عن تجربتهم معنا
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="card-shadow p-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                {/* Use optional chaining just in case */}
                {[...Array(activeTestimonial?.rating || 0)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-lg text-gray-700 mb-6 italic">
                "{activeTestimonial?.text}"
              </p>
              
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  {activeTestimonial?.name?.charAt(0)}
                </div>
                <div>
                  <div className="font-bold">{activeTestimonial?.name}</div>
                  <div className="text-gray-600">{activeTestimonial?.role}</div>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-center mt-6 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentTestimonial === index ? 'bg-red-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;

import { ChefHat, Leaf, Zap, Users } from 'lucide-react';

function AboutSection({ images }) {
  return (
    <section id="about" className="py-20 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-gradient">قصة مطعمنا</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              منذ أكثر من 20 عاماً ونحن نقدم أشهى أنواع الشاورما في المدينة. بدأت رحلتنا بحلم بسيط: 
              تقديم طعام أصيل وشهي يجمع العائلات حول مائدة واحدة. اليوم، نفخر بكوننا الوجهة المفضلة 
              لعشاق الشاورما الأصيلة.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center gap-3"><ChefHat className="text-red-600 w-8 h-8" /> <span className="font-semibold">لحوم طازجة يومياً</span></div>
              <div className="flex items-center gap-3"><Users className="text-red-600 w-8 h-8" /> <span className="font-semibold">طهاة محترفون</span></div>
              <div className="flex items-center gap-3"><Leaf className="text-red-600 w-8 h-8" /> <span className="font-semibold">مكونات طبيعية</span></div>
              <div className="flex items-center gap-3"><Zap className="text-red-600 w-8 h-8" /> <span className="font-semibold">تحضير سريع</span></div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="text-center"><div className="text-3xl font-bold text-red-600">20+</div><div className="text-gray-600">سنة خبرة</div></div>
              <div className="text-center"><div className="text-3xl font-bold text-red-600">50K+</div><div className="text-gray-600">عميل راضي</div></div>
              <div className="text-center"><div className="text-3xl font-bold text-red-600">100+</div><div className="text-gray-600">طلب يومي</div></div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <img src={images.aboutImage1} alt="داخل المطعم" className="w-full h-64 object-cover rounded-lg card-shadow" />
            <img src={images.aboutImage2} alt="تحضير الشاورما" className="w-full h-32 object-cover rounded-lg card-shadow" />
            <img src={images.aboutImage3} alt="أجواء المطعم" className="w-full h-32 object-cover rounded-lg card-shadow col-span-2" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;

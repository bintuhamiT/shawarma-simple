import { Button } from './ui/button';

function HeroSection({ scrollToSection, heroImage }) {
  return (
    <section id="home" className="pt-20 pb-16 bg-gradient-to-r from-red-600 to-orange-500">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in-up">
              أشهى شاورما في المدينة
            </h1>
            <p className="text-xl mb-8 opacity-90">
              نقدم لك أفضل أنواع الشاورما المحضرة بأجود المكونات الطازجة والطعم الأصيل الذي يأسر القلوب
            </p>
            <div className="flex gap-4">
              <Button 
                onClick={() => scrollToSection('menu')}
                className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg"
              >
                شاهد القائمة
              </Button>
              <Button 
                onClick={() => scrollToSection('contact')}
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-red-600 px-8 py-3 text-lg"
              >
                احجز طاولة
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <img
              src={heroImage}
              alt="شاورما لذيذة"
              className="w-full h-auto rounded-lg shadow-2xl animate-fade-in-right"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

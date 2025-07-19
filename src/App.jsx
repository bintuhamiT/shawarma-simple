import { useState, useEffect } from 'react'
import { Button } from './components/ui/button'
import { Card, CardContent } from './components/ui/card'
import { Badge } from './components/ui/badge'
import { Star, MapPin, Phone, Mail, Clock, ChefHat, Leaf, Zap, Users } from 'lucide-react'
import './App.css'

// Import images
import heroImage from './assets/QkRrgSs54Md7.jpg'
import menuImage1 from './assets/Qsbtw2M8iRQq.jpg'
import menuImage2 from './assets/561NAXOamYdP.jpg'
import menuImage3 from './assets/dag3MS2UpAjk.jpg'
import menuImage4 from './assets/z6nqax4OY47U.jpg'
import menuImage5 from './assets/cYse76e8qQQx.jpg'
import menuImage6 from './assets/iMTA74ztqs3H.jpg'
import aboutImage1 from './assets/sDbXwzGQD5Sh.jpg'
import aboutImage2 from './assets/N9vl0n81Hz2P.jpg'
import aboutImage3 from './assets/BenNqBRIr7PP.jpg'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const menuItems = [
    {
      id: 1,
      name: 'شاورما دجاج كلاسيك',
      description: 'شاورما دجاج طازجة مع الخضروات والصلصة الخاصة',
      price: '25 ريال',
      category: 'chicken',
      image: menuImage1,
      badge: 'الأكثر طلباً'
    },
    {
      id: 2,
      name: 'شاورما لحم فاخرة',
      description: 'شاورما لحم طري مع البصل والطماطم والصلصة الحارة',
      price: '30 ريال',
      category: 'meat',
      image: menuImage2,
      badge: 'جديد'
    },
    {
      id: 3,
      name: 'شاورما دجاج سوبر',
      description: 'شاورما دجاج كبيرة مع جبنة وخضروات إضافية',
      price: '35 ريال',
      category: 'chicken',
      image: menuImage3
    },
    {
      id: 4,
      name: 'شاورما مشكلة',
      description: 'خليط من الدجاج واللحم مع الخضروات المتنوعة',
      price: '40 ريال',
      category: 'mixed',
      image: menuImage4,
      badge: 'مميز'
    },
    {
      id: 5,
      name: 'شاورما دجاج حارة',
      description: 'شاورما دجاج مع الفلفل الحار والصلصة الحارة',
      price: '28 ريال',
      category: 'chicken',
      image: menuImage5
    },
    {
      id: 6,
      name: 'شاورما لحم عربية',
      description: 'شاورما لحم على الطريقة العربية الأصيلة',
      price: '32 ريال',
      category: 'meat',
      image: menuImage6
    }
  ]

  const categories = [
    { id: 'all', name: 'الكل' },
    { id: 'chicken', name: 'شاورما دجاج' },
    { id: 'meat', name: 'شاورما لحم' },
    { id: 'mixed', name: 'شاورما مشكلة' }
  ]

  const testimonials = [
    {
      id: 1,
      name: 'أحمد محمد',
      role: 'عميل دائم',
      text: 'أفضل شاورما جربتها في حياتي! الطعم أصيل والخدمة ممتازة. أنصح الجميع بتجربة هذا المطعم الرائع.',
      rating: 5
    },
    {
      id: 2,
      name: 'فاطمة علي',
      role: 'زبونة مميزة',
      text: 'المكان نظيف والطعام طازج دائماً. الأسعار معقولة والطعم لا يُقاوم. مطعمي المفضل للشاورما.',
      rating: 5
    },
    {
      id: 3,
      name: 'محمد السعيد',
      role: 'عميل جديد',
      text: 'تجربة رائعة! الشاورما محضرة بعناية والطعم مميز جداً. سأعود بالتأكيد وأنصح أصدقائي.',
      rating: 5
    }
  ]

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category === activeCategory)

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-gradient">
              شاورما الأصالة
            </div>
            
            <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
              <button 
                onClick={() => scrollToSection('home')}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                الرئيسية
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                عن المطعم
              </button>
              <button 
                onClick={() => scrollToSection('menu')}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                القائمة
              </button>
              <button 
                onClick={() => scrollToSection('testimonials')}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                آراء العملاء
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-gray-700 hover:text-red-600 transition-colors"
              >
                اتصل بنا
              </button>
              <Button className="btn-primary">
                اطلب الآن
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
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

      {/* About Section */}
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
                <div className="flex items-center gap-3">
                  <ChefHat className="text-red-600 w-8 h-8" />
                  <span className="font-semibold">لحوم طازجة يومياً</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="text-red-600 w-8 h-8" />
                  <span className="font-semibold">طهاة محترفون</span>
                </div>
                <div className="flex items-center gap-3">
                  <Leaf className="text-red-600 w-8 h-8" />
                  <span className="font-semibold">مكونات طبيعية</span>
                </div>
                <div className="flex items-center gap-3">
                  <Zap className="text-red-600 w-8 h-8" />
                  <span className="font-semibold">تحضير سريع</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">20+</div>
                  <div className="text-gray-600">سنة خبرة</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">50K+</div>
                  <div className="text-gray-600">عميل راضي</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">100+</div>
                  <div className="text-gray-600">طلب يومي</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src={aboutImage1}
                alt="داخل المطعم"
                className="w-full h-64 object-cover rounded-lg card-shadow"
              />
              <img
                src={aboutImage2}
                alt="تحضير الشاورما"
                className="w-full h-32 object-cover rounded-lg card-shadow"
              />
              <img
                src={aboutImage3}
                alt="أجواء المطعم"
                className="w-full h-32 object-cover rounded-lg card-shadow col-span-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-gradient">قائمة الطعام</h2>
            <p className="text-lg text-gray-600">
              اكتشف مجموعتنا المتنوعة من أشهى أنواع الشاورما المحضرة بعناية فائقة
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="flex gap-2 bg-gray-100 p-2 rounded-lg">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-md transition-all ${
                    activeCategory === category.id
                      ? 'bg-red-600 text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => (
              <Card key={item.id} className="card-shadow overflow-hidden">
                <div className="relative">
                  {item.badge && (
                    <Badge className="absolute top-4 right-4 z-10 bg-red-600">
                      {item.badge}
                    </Badge>
                  )}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover"
                  />
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-red-600">{item.price}</span>
                    <Button className="btn-primary">
                      أضف للطلب
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-lg text-gray-700 mb-6 italic">
                  "{testimonials[currentTestimonial].text}"
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonials[currentTestimonial].name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold">{testimonials[currentTestimonial].name}</div>
                    <div className="text-gray-600">{testimonials[currentTestimonial].role}</div>
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

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-r from-red-600 to-orange-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">تواصل معنا</h2>
            <p className="text-lg opacity-90">
              نحن هنا للإجابة على جميع استفساراتك وتلبية طلباتك
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <MapPin className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-bold mb-2">العنوان</h3>
                  <p>شارع الملك فهد، حي النزهة<br />الرياض، المملكة العربية السعودية</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Phone className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-bold mb-2">الهاتف</h3>
                  <p>+966 11 123 4567<br />+966 50 123 4567</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Mail className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-bold mb-2">البريد الإلكتروني</h3>
                  <p>info@shawarma-asala.com<br />orders@shawarma-asala.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Clock className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-bold mb-2">ساعات العمل</h3>
                  <p>السبت - الخميس: 11:00 ص - 12:00 م<br />الجمعة: 2:00 م - 12:00 م</p>
                </div>
              </div>
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-800">أرسل لنا رسالة</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="الاسم الكامل"
                  className="w-full p-3 border rounded-lg text-gray-800"
                />
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  className="w-full p-3 border rounded-lg text-gray-800"
                />
                <input
                  type="tel"
                  placeholder="رقم الهاتف"
                  className="w-full p-3 border rounded-lg text-gray-800"
                />
                <textarea
                  placeholder="رسالتك..."
                  rows={4}
                  className="w-full p-3 border rounded-lg text-gray-800"
                ></textarea>
                <Button className="w-full btn-primary">
                  إرسال الرسالة
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gradient">شاورما الأصالة</h3>
              <p className="text-gray-400">
                نقدم أشهى أنواع الشاورما المحضرة بأجود المكونات والطعم الأصيل منذ أكثر من 20 عاماً
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">روابط سريعة</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('home')} className="block text-gray-400 hover:text-white">الرئيسية</button>
                <button onClick={() => scrollToSection('about')} className="block text-gray-400 hover:text-white">عن المطعم</button>
                <button onClick={() => scrollToSection('menu')} className="block text-gray-400 hover:text-white">القائمة</button>
                <button onClick={() => scrollToSection('contact')} className="block text-gray-400 hover:text-white">اتصل بنا</button>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">معلومات الاتصال</h4>
              <div className="space-y-2 text-gray-400">
                <p>📍 شارع الملك فهد، حي النزهة، الرياض</p>
                <p>📞 +966 11 123 4567</p>
                <p>✉️ info@shawarma-asala.com</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-4">ساعات العمل</h4>
              <div className="space-y-2 text-gray-400">
                <p>السبت - الخميس: 11:00 ص - 12:00 م</p>
                <p>الجمعة: 2:00 م - 12:00 م</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2025 شاورما الأصالة. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App


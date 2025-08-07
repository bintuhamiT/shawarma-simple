import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import MenuSection from './components/MenuSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// --- Data and Assets ---
// (Keep all your image and data imports here as before)
import menuImage1 from './assets/Qsbtw2M8iRQq.jpg';
import menuImage2 from './assets/561NAXOamYdP.jpg';
import menuImage3 from './assets/dag3MS2UpAjk.jpg';
import menuImage4 from './assets/z6nqax4OY47U.jpg';
import menuImage5 from './assets/cYse76e8qQQx.jpg';
import menuImage6 from './assets/iMTA74ztqs3H.jpg';
import aboutImage1 from './assets/sDbXwzGQD5Sh.jpg';
import aboutImage2 from './assets/N9vl0n81Hz2P.jpg';
import aboutImage3 from './assets/BenNqBRIr7PP.jpg';
import heroImage from './assets/QkRrgSs54Md7.jpg';

import './App.css';

gsap.registerPlugin(ScrollToPlugin);

// Data definitions (keep them here)
const menuItems = [
    { id: 1, name: 'شاورما دجاج كلاسيك', description: 'شاورما دجاج طازجة مع الخضروات والصلصة الخاصة', price: '25 ريال', category: 'chicken', image: menuImage1, badge: 'الأكثر طلباً' },
    { id: 2, name: 'شاورما لحم فاخرة', description: 'شاورما لحم طري مع البصل والطماطم والصلصة الحارة', price: '30 ريال', category: 'meat', image: menuImage2, badge: 'جديد' },
    { id: 3, name: 'شاورما دجاج سوبر', description: 'شاورما دجاج كبيرة مع جبنة وخضروات إضافية', price: '35 ريال', category: 'chicken', image: menuImage3 },
    { id: 4, name: 'شاورما مشكلة', description: 'خليط من الدجاج واللحم مع الخضروات المتنوعة', price: '40 ريال', category: 'mixed', image: menuImage4, badge: 'مميز' },
    { id: 5, name: 'شاورما دجاج حارة', description: 'شاورما دجاج مع الفلفل الحار والصلصة الحارة', price: '28 ريال', category: 'chicken', image: menuImage5 },
    { id: 6, name: 'شاورما لحم عربية', description: 'شاورما لحم على الطريقة العربية الأصيلة', price: '32 ريال', category: 'meat', image: menuImage6 }
];
const testimonials = [
    { id: 1, name: 'أحمد محمد', role: 'عميل دائم', text: 'أفضل شاورما جربتها في حياتي! الطعم أصيل والخدمة ممتازة. أنصح الجميع بتجربة هذا المطعم الرائع.', rating: 5 },
    { id: 2, name: 'فاطمة علي', role: 'زبونة مميزة', text: 'المكان نظيف والطعام طازج دائماً. الأسعار معقولة والطعم لا يُقاوم. مطعمي المفضل للشاورما.', rating: 5 },
    { id: 3, name: 'محمد السعيد', role: 'عميل جديد', text: 'تجربة رائعة! الشاورما محضرة بعناية والطعم مميز جداً. سأعود بالتأكيد وأنصح أصدقائي.', rating: 5 }
];
const faqs = [
    { id: 'faq1', question: 'ما هي المكونات المستخدمة في شاورما الأصالة؟', answer: 'نستخدم لحوم طازجة يومياً، خضروات محلية، وصلصات خاصة محضرة بعناية لضمان الطعم الأصيل والجودة العالية.' },
    { id: 'faq2', question: 'هل تقدمون خدمة التوصيل؟', answer: 'نعم، نقدم خدمة التوصيل داخل مدينة الرياض. يمكنك الطلب عبر موقعنا الإلكتروني أو الاتصال بنا مباشرة.' },
    { id: 'faq3', question: 'هل يمكن تخصيص الطلبات (مثل إزالة مكون معين)؟', answer: 'بالتأكيد! يمكنك تخصيص طلبك بإزالة أو إضافة أي مكون حسب رغبتك. فقط أخبرنا عند الطلب.' },
    { id: 'faq4', question: 'ما هي ساعات العمل؟', answer: 'نعمل من السبت إلى الخميس من 11:00 صباحاً حتى 12:00 منتصف الليل، والجمعة من 2:00 ظهراً حتى 12:00 منتصف الليل.' }
];
const aboutImages = { aboutImage1, aboutImage2, aboutImage3 };


function App() {
  const [cartItems, setCartItems] = useState([]);

  const scrollToSection = (sectionId) => {
    gsap.to(window, {
      duration: 1.5,
      scrollTo: { y: `#${sectionId}`, offsetY: 100 },
      ease: 'power4.inOut',
    });
  };

  const handleAddToCart = (item, imageElement) => {
    // 1. Get positions
    const cartIcon = document.querySelector('#cart-icon');
    if (!cartIcon) return;

    const startRect = imageElement.getBoundingClientRect();
    const endRect = cartIcon.getBoundingClientRect();

    // 2. Create a flying image clone
    const flyingImage = imageElement.cloneNode(true);
    gsap.set(flyingImage, {
      position: 'fixed',
      left: startRect.left,
      top: startRect.top,
      width: startRect.width,
      height: startRect.height,
      zIndex: 1000,
      borderRadius: '1rem',
    });
    document.body.appendChild(flyingImage);

    // 3. Animate the clone
    gsap.timeline({
      onComplete: () => {
        document.body.removeChild(flyingImage);
        setCartItems(prevItems => [...prevItems, item]);
        // Cart icon feedback animation
        gsap.fromTo(cartIcon, { scale: 1.5 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      }
    })
    .to(flyingImage, {
      left: endRect.left + (endRect.width / 2),
      top: endRect.top + (endRect.height / 2),
      width: 20,
      height: 20,
      rotation: 360,
      duration: 1.2,
      ease: 'power3.inOut'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Header scrollToSection={scrollToSection} totalCartItems={cartItems.length} />
      <main>
        <HeroSection scrollToSection={scrollToSection} heroImage={heroImage} />
        <AboutSection images={aboutImages} />
        <MenuSection menuItems={menuItems} onAddToCart={handleAddToCart} />
        <TestimonialsSection testimonials={testimonials} />
        <FaqSection faqs={faqs} />
        <ContactSection />
      </main>
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
}

export default App;

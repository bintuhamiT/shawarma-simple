// MenuSection.jsx (النسخة المطورة مع حركات متقدمة)

import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ShoppingCart } from 'lucide-react';

// --- GSAP and Plugins ---
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(Flip, ScrollTrigger);

const categories = [
  { id: 'all', name: 'الكل' },
  { id: 'chicken', name: 'شاورما دجاج' },
  { id: 'meat', name: 'شاورما لحم' },
  { id: 'mixed', name: 'شاورما مشكلة' }
];

// --- مكون بطاقة المنتج (مع تحسينات طفيفة) ---
function MenuItemCard({ item, handleAddToCart }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  // تأثير الرفع عند المرور (Hover) - يبقى كما هو لأنه فعال وجميل
  useEffect(() => {
    const card = cardRef.current;
    const hoverTimeline = gsap.timeline({ paused: true, defaults: { duration: 0.4, ease: 'power2.out' } })
      .to(card, { y: -8, boxShadow: '0 10px 20px -5px rgba(0,0,0,0.1)' })
      .to(imageRef.current, { scale: 1.05 }, '<'); // تكبير الصورة مع البطاقة

    card.addEventListener('mouseenter', () => hoverTimeline.play());
    card.addEventListener('mouseleave', () => hoverTimeline.reverse());

    return () => {
      // يجب التأكد من إزالة المستمعات بنفس الدالة
      const playFunc = () => hoverTimeline.play();
      const reverseFunc = () => hoverTimeline.reverse();
      card.removeEventListener('mouseenter', playFunc);
      card.removeEventListener('mouseleave', reverseFunc);
    };
  }, []);

  return (
    <div ref={cardRef} className="menu-card-container flex flex-col">
      <Card className="group overflow-hidden bg-white border h-full flex flex-col rounded-lg shadow-sm transition-shadow duration-300">
        <div className="relative overflow-hidden">
          <img
            ref={imageRef}
            data-flip-id={`image-${item.id}`} // ✨ إضافة flip-id للأنيميشن
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover"
          />
          {item.badge && (
            <Badge className="absolute top-3 right-3 z-10 bg-red-600 text-white border-none">
              {item.badge}
            </Badge>
          )}
        </div>
        
        <CardContent className="p-5 flex-grow flex flex-col">
          <h3 className="text-lg font-semibold mb-2 text-gray-900">{item.name}</h3>
          <p className="text-sm text-gray-600 mb-4 flex-grow">{item.description}</p>
          
          <div className="flex items-center justify-between mt-auto pt-3">
            <span className="text-xl font-bold text-red-600">{item.price}</span>
            {/* ✨ تمرير العنصر وصورة المرجع للدالة */}
            <Button onClick={() => handleAddToCart(item, imageRef.current)} className="bg-red-50 text-red-700 hover:bg-red-100 h-9 px-4 rounded-full">
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span>إضافة</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- المكون الرئيسي لقسم القائمة ---
function MenuSection({ menuItems }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useRef(null);
  const filterContainerRef = useRef(null); // Ref لحاوية أزرار الفلتر
  const [filteredItems, setFilteredItems] = useState(menuItems);

  // ✨ التحسين رقم 2: حركة دخول محسّنة للبطاقات
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current.children, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        autoAlpha: 0,
        y: 40,
        rotationX: -10, // إضافة دوران خفيف
        stagger: {
          amount: 0.4, // توزيع الحركة على مدى 0.4 ثانية
          from: "start", // البدء من أول عنصر
        },
        duration: 0.8,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // ✨ التحسين رقم 1 و 3: فلترة مع حركة مؤشر وتحسين حركة البطاقات
  const handleFilter = (category, e) => {
    if (activeCategory === category) return;
    setActiveCategory(category);

    const container = containerRef.current;
    const state = Flip.getState(container.children, { props: "filter" }); // حفظ حالة البطاقات
    
    // ✨ التحسين رقم 1: حركة المؤشر
    const activePill = e.currentTarget;
    const indicator = filterContainerRef.current.querySelector('.active-pill-indicator');
    Flip.fit(indicator, activePill, { duration: 0.4, ease: "power2.inOut" });

    const newItems = category === 'all' 
      ? menuItems 
      : menuItems.filter(item => item.category === category);
    setFilteredItems(newItems);

    // ✨ التحسين رقم 3: تحسين حركة Flip
    Flip.from(state, {
      duration: 0.6,
      ease: "power3.inOut",
      stagger: 0.05,
      absolute: true,
      onEnter: elements => gsap.from(elements, { autoAlpha: 0, scale: 0.8, duration: 0.3 }),
      onLeave: elements => gsap.to(elements, { autoAlpha: 0, scale: 1.2, duration: 0.3 }),
    });
  };

  // ✨ التحسين رقم 4: أنيميشن "إضافة إلى السلة"
  const handleAddToCart = (item, imageElement) => {
    const cartIcon = document.querySelector('#main-cart-icon'); // يجب أن يكون لديك أيقونة سلة في الهيدر بهذا الـ ID
    if (!cartIcon) {
      console.warn("Cart icon with ID #main-cart-icon not found.");
      return;
    }

    // 1. الحصول على حالة الصورة
    const state = Flip.getState(imageElement, { props: "transform, objectFit" });

    // 2. إنشاء نسخة وهمية من الصورة ووضعها فوق كل شيء
    const flyingImage = imageElement.cloneNode(true);
    flyingImage.classList.add('flying-image'); // كلاس للتحكم بالـ z-index والمظهر
    document.body.appendChild(flyingImage);

    // 3. تحريك النسخة الوهمية إلى أيقونة السلة باستخدام Flip
    Flip.from(state, {
      targets: flyingImage,
      duration: 0.8,
      ease: 'power2.in', // التسارع نحو الهدف
      scale: true, // السماح بتغيير الحجم
      onComplete: () => {
        // 4. إخفاء النسخة الوهمية وإزالتها
        gsap.to(flyingImage, {
          autoAlpha: 0,
          duration: 0.2,
          onComplete: () => flyingImage.remove(),
        });
        // 5. إضافة تأثير لأيقونة السلة (اهتزاز بسيط)
        gsap.fromTo(cartIcon, { scale: 1.2 }, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
      }
    });
  };

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-gradient">قائمة طعامنا</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            أطباق محضّرة بشغف، ومكونات طازجة تروي قصة من النكهات الأصيلة.
          </p>
        </div>

        {/* ✨ التحسين رقم 1: حاوية الفلتر مع المؤشر */}
        <div ref={filterContainerRef} className="flex justify-center mb-10">
          <div className="relative flex gap-2 bg-white p-1.5 rounded-full shadow-sm border">
            {/* هذا هو المؤشر الذي سيتحرك */}
            <div className="active-pill-indicator absolute top-1.5 left-1.5 h-[calc(100%-12px)] bg-gray-800 rounded-full"></div>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={(e) => handleFilter(category.id, e)}
                className={`relative px-5 py-1.5 rounded-full transition-colors duration-300 text-sm font-medium z-10 ${
                  activeCategory === category.id ? 'text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <MenuItemCard key={item.id} item={item} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuSection;

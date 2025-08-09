import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Eye, ShoppingCart } from 'lucide-react';

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

// --- The Natural & Comfortable Menu Card Component ---
function MenuItemCard({ item, onAddToCart }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  // A very subtle and natural hover effect.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // We only animate the 'y' transform and box-shadow for a clean "lift" effect.
    const hoverTimeline = gsap.timeline({ paused: true, defaults: { duration: 0.3, ease: 'power2.out' } })
      .to(card, { 
        y: -6, 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' 
      });

    card.addEventListener('mouseenter', () => hoverTimeline.play());
    card.addEventListener('mouseleave', () => hoverTimeline.reverse());

    return () => {
      card.removeEventListener('mouseenter', () => hoverTimeline.play());
      card.removeEventListener('mouseleave', () => hoverTimeline.reverse());
    };
  }, []);

  return (
    <div ref={cardRef} className="menu-card-container">
      <Card className="group overflow-hidden bg-white border h-full flex flex-col rounded-lg shadow-sm transition-shadow duration-300">
        <div className="relative overflow-hidden">
          <img
            ref={imageRef}
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
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
            <Button onClick={() => onAddToCart(item, imageRef.current)} className="bg-red-50 text-red-700 hover:bg-red-100 h-9 px-4 rounded-full">
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span>إضافة</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- The Main Menu Section Component ---
function MenuSection({ menuItems, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useRef(null);
  const [filteredItems, setFilteredItems] = useState(menuItems);

  // Natural entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current.children, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%", // Start a bit earlier for a smoother feel
          toggleActions: "play none none none",
        },
        autoAlpha: 0, // Fades in and handles visibility
        y: 30,
        stagger: 0.05, // Very fast stagger
        duration: 0.5,
        ease: 'power2.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  // Handle filtering with a fast and non-intrusive Flip animation
  const handleFilter = (category) => {
    if (activeCategory === category) return; // Prevent re-running on the same category
    setActiveCategory(category);

    const container = containerRef.current;
    if (!container) return;

    const state = Flip.getState(container.children);

    const newItems = category === 'all' 
      ? menuItems 
      : menuItems.filter(item => item.category === category);
    setFilteredItems(newItems);

    Flip.from(state, {
      duration: 0.5, // Fast and responsive
      ease: "power2.inOut",
      stagger: 0.04,
      absolute: true,
      // A simple fade is the most natural transition
      onEnter: elements => gsap.from(elements, { autoAlpha: 0, duration: 0.3 }),
      onLeave: elements => gsap.to(elements, { autoAlpha: 0, duration: 0.3 }),
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

        <div className="flex justify-center mb-10">
          <div className="flex gap-2 bg-white p-1.5 rounded-full shadow-sm border">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleFilter(category.id)}
                className={`px-5 py-1.5 rounded-full transition-colors duration-300 text-sm font-medium ${
                  activeCategory === category.id
                    ? 'bg-gray-800 text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div ref={containerRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map(item => (
            <MenuItemCard key={item.id} item={item} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuSection;

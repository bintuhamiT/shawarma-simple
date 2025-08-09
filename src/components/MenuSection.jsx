import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Eye, ShoppingCart } from 'lucide-react';

// --- GSAP and Plugins ---
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(Flip, ScrollTrigger, TextPlugin);

const categories = [
  { id: 'all', name: 'الكل' },
  { id: 'chicken', name: 'شاورما دجاج' },
  { id: 'meat', name: 'شاورما لحم' },
  { id: 'mixed', name: 'شاورما مشكلة' }
];

// --- Enhanced Menu Card Component with Advanced GSAP Animations ---
function MenuItemCard({ item, onAddToCart, index }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const priceRef = useRef(null);
  const buttonRef = useRef(null);
  const badgeRef = useRef(null);

  // Advanced hover animations with multiple elements
  useEffect(() => {
    const card = cardRef.current;
    const image = imageRef.current;
    const content = contentRef.current;
    const price = priceRef.current;
    const button = buttonRef.current;
    const badge = badgeRef.current;

    if (!card) return;

    // Create a master timeline for hover effects
    const hoverTimeline = gsap.timeline({ 
      paused: true, 
      defaults: { duration: 0.4, ease: 'power2.out' } 
    });

    // Card lift and shadow enhancement
    hoverTimeline.to(card, { 
      y: -12, 
      rotationX: 2,
      rotationY: 1,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)',
      scale: 1.02
    }, 0);

    // Image zoom and brightness
    hoverTimeline.to(image, { 
      scale: 1.1, 
      brightness: 1.1,
      filter: 'brightness(1.1) contrast(1.05)'
    }, 0);

    // Content slide up animation
    hoverTimeline.to(content, { 
      y: -5,
      opacity: 1
    }, 0.1);

    // Price glow effect
    hoverTimeline.to(price, { 
      scale: 1.05,
      color: '#dc2626',
      textShadow: '0 0 10px rgba(220, 38, 38, 0.3)'
    }, 0.1);

    // Button enhancement
    hoverTimeline.to(button, { 
      scale: 1.05,
      backgroundColor: '#fef2f2',
      boxShadow: '0 4px 12px rgba(220, 38, 38, 0.2)'
    }, 0.1);

    // Badge pulse effect if exists
    if (badge) {
      hoverTimeline.to(badge, { 
        scale: 1.1,
        rotation: 2
      }, 0.1);
    }

    // Mouse enter/leave events
    const handleMouseEnter = () => hoverTimeline.play();
    const handleMouseLeave = () => hoverTimeline.reverse();

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Initial entrance animation
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    gsap.fromTo(card, 
      { 
        opacity: 0, 
        y: 50, 
        rotationX: -15,
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0, 
        rotationX: 0,
        scale: 1,
        duration: 0.8, 
        ease: 'back.out(1.7)',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, [index]);

  return (
    <div ref={cardRef} className="menu-card-container perspective-1000">
      <Card className="group overflow-hidden bg-white border h-full flex flex-col rounded-xl shadow-lg transition-all duration-300 transform-gpu">
        <div className="relative overflow-hidden rounded-t-xl">
          <img
            ref={imageRef}
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover transition-all duration-500"
          />
          {item.badge && (
            <Badge 
              ref={badgeRef}
              className="absolute top-3 right-3 z-10 bg-red-600 text-white border-none shadow-lg"
            >
              {item.badge}
            </Badge>
          )}
          {/* Overlay gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        
        <CardContent ref={contentRef} className="p-6 flex-grow flex flex-col">
          <h3 className="text-lg font-bold mb-3 text-gray-900 leading-tight">{item.name}</h3>
          <p className="text-sm text-gray-600 mb-4 flex-grow leading-relaxed">{item.description}</p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
            <span 
              ref={priceRef}
              className="text-xl font-bold text-red-600 transition-all duration-300"
            >
              {item.price}
            </span>
            <Button 
              ref={buttonRef}
              onClick={() => onAddToCart(item, imageRef.current)} 
              className="bg-red-50 text-red-700 hover:bg-red-100 h-10 px-5 rounded-full transition-all duration-300 shadow-sm"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              <span className="font-medium">إضافة</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Enhanced Main Menu Section Component ---
function MenuSection({ menuItems, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const categoriesRef = useRef(null);
  const [filteredItems, setFilteredItems] = useState(menuItems);

  // Enhanced section entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Title animation with text reveal effect
      tl.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 30,
          scale: 0.9
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.8, 
          ease: 'back.out(1.7)'
        }
      );

      // Subtitle with typewriter effect
      tl.fromTo(subtitleRef.current, 
        { 
          opacity: 0, 
          y: 20
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.6, 
          ease: 'power2.out'
        }, 
        "-=0.4"
      );

      // Categories buttons with stagger
      tl.fromTo(categoriesRef.current.children, 
        { 
          opacity: 0, 
          y: 20,
          scale: 0.8
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 0.5, 
          ease: 'back.out(1.7)',
          stagger: 0.1
        }, 
        "-=0.3"
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Enhanced filtering with sophisticated Flip animation
  const handleFilter = (category) => {
    if (activeCategory === category) return;
    
    const container = containerRef.current;
    if (!container) return;

    // Get current state before DOM changes
    const state = Flip.getState(".menu-card-container");

    // Update active category with button animation
    setActiveCategory(category);
    
    // Animate category button
    const buttons = categoriesRef.current.children;
    Array.from(buttons).forEach((button, index) => {
      const categoryId = categories[index].id;
      if (categoryId === category) {
        gsap.to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: 'back.out(1.7)',
          yoyo: true,
          repeat: 1
        });
      }
    });

    // Filter items
    const newItems = category === 'all' 
      ? menuItems 
      : menuItems.filter(item => item.category === category);
    setFilteredItems(newItems);

    // Advanced Flip animation with custom effects
    Flip.from(state, {
      duration: 0.7,
      ease: "power2.inOut",
      stagger: 0.05,
      absolute: true,
      
      // Enhanced enter animation
      onEnter: elements => {
        gsap.fromTo(elements, 
          { 
            opacity: 0, 
            scale: 0.8,
            rotationY: -90,
            transformOrigin: "center center"
          },
          { 
            opacity: 1, 
            scale: 1,
            rotationY: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
            stagger: 0.05
          }
        );
      },
      
      // Enhanced leave animation
      onLeave: elements => {
        gsap.to(elements, { 
          opacity: 0, 
          scale: 0.8,
          rotationY: 90,
          duration: 0.4,
          ease: 'power2.in'
        });
      },

      // Smooth position transitions
      onUpdate: () => {
        // Add any custom update logic here
      }
    });
  };

  return (
    <section id="menu" className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-orange-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10" ref={containerRef}>
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-5xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"
          >
            قائمة طعامنا
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            أطباق محضّرة بشغف، ومكونات طازجة تروي قصة من النكهات الأصيلة والتقاليد العريقة.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div 
            ref={categoriesRef}
            className="flex gap-3 bg-white p-2 rounded-2xl shadow-lg border border-gray-100"
          >
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleFilter(category.id)}
                className={`px-6 py-3 rounded-xl transition-all duration-300 text-sm font-semibold transform hover:scale-105 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-200'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <MenuItemCard 
              key={item.id} 
              item={item} 
              onAddToCart={onAddToCart}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuSection;

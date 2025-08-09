import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';
import { Button } from './ui/button';
import { Phone, MessageCircleQuestion, ChevronDown, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin, MorphSVGPlugin);

// Enhanced FAQ Item Component with advanced animations
function EnhancedFaqItem({ faq, index }) {
  const itemRef = useRef(null);
  const triggerRef = useRef(null);
  const contentRef = useRef(null);
  const iconRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const item = itemRef.current;
    const trigger = triggerRef.current;
    const content = contentRef.current;
    const icon = iconRef.current;

    if (!item) return;

    // Initial entrance animation
    gsap.fromTo(item, 
      { 
        opacity: 0, 
        x: -60,
        rotationY: -15,
        scale: 0.95
      },
      { 
        opacity: 1, 
        x: 0,
        rotationY: 0,
        scale: 1,
        duration: 0.8, 
        ease: 'back.out(1.7)',
        delay: index * 0.1,
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Hover animations
    const hoverTimeline = gsap.timeline({ paused: true });
    
    hoverTimeline
      .to(item, { 
        scale: 1.02,
        y: -5,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        duration: 0.3,
        ease: 'power2.out'
      }, 0)
      .to(trigger, {
        color: '#dc2626',
        duration: 0.3
      }, 0);

    const handleMouseEnter = () => hoverTimeline.play();
    const handleMouseLeave = () => hoverTimeline.reverse();

    item.addEventListener('mouseenter', handleMouseEnter);
    item.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      item.removeEventListener('mouseenter', handleMouseEnter);
      item.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [index]);

  const handleToggle = (value) => {
    const isOpening = value === `item-${faq.id}`;
    setIsOpen(isOpening);
    
    // Animate the chevron icon
    gsap.to(iconRef.current, {
      rotation: isOpening ? 180 : 0,
      duration: 0.3,
      ease: 'power2.out'
    });

    // Add a subtle pulse effect when opening
    if (isOpening) {
      gsap.fromTo(itemRef.current, 
        { scale: 1 },
        { 
          scale: 1.01,
          duration: 0.2,
          ease: 'power2.out',
          yoyo: true,
          repeat: 1
        }
      );
    }
  };

  return (
    <AccordionItem 
      ref={itemRef}
      value={`item-${faq.id}`} 
      className="faq-item bg-gradient-to-r from-gray-50 to-white border border-gray-200/80 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300 data-[state=open]:bg-white data-[state=open]:shadow-xl data-[state=open]:border-red-200"
      onValueChange={handleToggle}
    >
      <AccordionTrigger 
        ref={triggerRef}
        className="text-lg font-bold text-gray-800 hover:text-red-600 text-right px-8 py-6 group transition-all duration-300 [&[data-state=open]>svg]:rotate-180"
      >
        <div className="flex items-center justify-between w-full">
          <ChevronDown 
            ref={iconRef}
            className="h-5 w-5 shrink-0 transition-transform duration-300 text-red-500" 
          />
          <span className="flex-1 text-right mr-4">{faq.question}</span>
        </div>
      </AccordionTrigger>
      <AccordionContent 
        ref={contentRef}
        className="text-gray-700 leading-relaxed text-right px-8 pb-6 pt-2"
      >
        <div className="border-t border-gray-100 pt-4">
          {faq.answer}
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// Enhanced CTA Card Component
function EnhancedCtaCard({ scrollToSection }) {
  const cardRef = useRef(null);
  const iconRef = useRef(null);
  const sparklesRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    const sparkles = sparklesRef.current;

    if (!card) return;

    // Entrance animation
    gsap.fromTo(card, 
      { 
        opacity: 0, 
        scale: 0.8,
        rotationY: 20,
        y: 50
      },
      { 
        opacity: 1, 
        scale: 1,
        rotationY: 0,
        y: 0,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // Floating animation for the icon
    gsap.to(icon, {
      y: -10,
      duration: 2,
      ease: 'power2.inOut',
      yoyo: true,
      repeat: -1
    });

    // Sparkles animation
    gsap.to(sparkles, {
      rotation: 360,
      duration: 8,
      ease: 'none',
      repeat: -1
    });

    // Hover effect
    const hoverTimeline = gsap.timeline({ paused: true });
    hoverTimeline
      .to(card, {
        scale: 1.05,
        y: -10,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        duration: 0.3,
        ease: 'power2.out'
      })
      .to(icon, {
        scale: 1.2,
        rotation: 10,
        duration: 0.3
      }, 0);

    const handleMouseEnter = () => hoverTimeline.play();
    const handleMouseLeave = () => hoverTimeline.reverse();

    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className="faq-cta-card hidden lg:block bg-gradient-to-br from-gray-800 via-gray-900 to-black p-8 rounded-3xl shadow-2xl text-white text-center sticky top-24 border border-gray-700 overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 w-16 h-16 bg-red-500 rounded-full blur-2xl"></div>
        <div className="absolute bottom-4 left-4 w-20 h-20 bg-orange-500 rounded-full blur-2xl"></div>
      </div>

      {/* Sparkles decoration */}
      <Sparkles 
        ref={sparklesRef}
        className="absolute top-6 right-6 w-6 h-6 text-yellow-400 opacity-70"
      />

      <div className="relative z-10">
        <div className="w-24 h-24 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white/20 shadow-lg">
          <MessageCircleQuestion 
            ref={iconRef}
            className="w-12 h-12 text-white"
          />
        </div>
        
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
          هل لديك سؤال آخر؟
        </h3>
        
        <p className="text-gray-300 mb-8 leading-relaxed">
          فريقنا جاهز للإجابة على جميع استفساراتك. لا تتردد بالتواصل معنا!
        </p>
        
        <Button 
          onClick={() => scrollToSection && scrollToSection('contact')}
          size="lg"
          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-lg font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-red-500/20"
        >
          <Phone className="ml-2 w-5 h-5" />
          تواصل معنا
        </Button>
      </div>
    </div>
  );
}

// Main Enhanced FAQ Section Component
function FaqSection({ faqs, scrollToSection }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Enhanced section entrance animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      // Title animation with morphing effect
      tl.fromTo(titleRef.current, 
        { 
          opacity: 0, 
          y: 50,
          scale: 0.8,
          rotationX: -20
        },
        { 
          opacity: 1, 
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 1, 
          ease: 'back.out(1.7)'
        }
      );

      // Subtitle with typewriter effect
      tl.fromTo(subtitleRef.current, 
        { 
          opacity: 0, 
          y: 30
        },
        { 
          opacity: 1, 
          y: 0,
          duration: 0.8, 
          ease: 'power2.out'
        }, 
        "-=0.5"
      );

      // Background gradient animation
      tl.fromTo(sectionRef.current, 
        { 
          background: 'linear-gradient(135deg, #ffffff 0%, #ffffff 100%)'
        },
        { 
          background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 50%, #ffffff 100%)',
          duration: 2,
          ease: 'power2.inOut'
        }, 
        0
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="faq" 
      ref={sectionRef} 
      className="py-28 bg-gradient-to-br from-white via-gray-50 to-white overflow-hidden relative"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-40 h-40 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={headerRef} className="faq-header text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-5xl lg:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-red-600 to-gray-900 bg-clip-text text-transparent"
          >
            أسئلة تهمك
          </h2>
          <p 
            ref={subtitleRef}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            وجدنا أن هذه الأسئلة تتكرر كثيراً، فجمعنا لك إجاباتها هنا لتجربة أسهل وأسرع.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-x-16 gap-y-12 items-start">
          {/* Enhanced FAQ List */}
          <div className="lg:col-span-2">
            <Accordion type="single" collapsible className="w-full space-y-6">
              {(faqs || []).map((faq, index) => (
                <EnhancedFaqItem 
                  key={faq.id} 
                  faq={faq} 
                  index={index}
                />
              ))}
            </Accordion>
          </div>

          {/* Enhanced CTA Card */}
          <EnhancedCtaCard scrollToSection={scrollToSection} />
        </div>
      </div>
    </section>
  );
}

export default FaqSection;

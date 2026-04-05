import { AnimatePresence, motion } from 'motion/react';
import { 
  ArrowRight, Video, Palette, Zap, Trophy, Globe, Layout, LayoutGrid, Mail, Phone, Search, Rocket, Users, TrendingUp, Clock3
} from 'lucide-react';
import { Fragment, useEffect, useRef, useState, type ReactElement } from 'react';
import heroVisualImage from '../../Hero image/Hero 1.png';
import heroAboutImage from '../../Hero image/Hero medium 2.png';
import heroBgImage1 from '../../Hero bg image/image 1.jpg';
import heroBgImage2 from '../../Hero bg image/image 2.jpg';
import heroBgImage3 from '../../Hero bg image/image 3.jpg';
import heroBgImage4 from '../../Hero bg image/image 4.jpg';
import heroBgImage5 from '../../Hero bg image/image 5.jpg';
import heroBgImage6 from '../../Hero bg image/image 6.png';
import heroBgImage7 from '../../Hero bg image/image 7.png';
import heroBgImage8 from '../../Hero bg image/image 8.png';
import heroBgImage9 from '../../Hero bg image/image 9.png';
import { cn } from '../utils/cn';


const springTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20
};

const services = [
  { title: 'Premium Video Editing', description: 'Cinematic storytelling with professional color grading and sound design.', icon: <Video size={32} /> },
  { title: 'Motion Graphics', description: 'Dynamic 2D/3D animations that bring your brand to life.', icon: <Zap size={32} /> },
  { title: 'Graphic Design', description: 'Stunning visuals for social media, print, and digital platforms.', icon: <Palette size={32} /> },
  { title: 'Web Development', description: 'High-performance, responsive websites built for conversion.', icon: <Globe size={32} /> },
  { title: 'Brand Identity', description: 'Complete branding solutions from logo design to brand strategy.', icon: <Layout size={32} /> },
  { title: 'YouTube Thumbnail Design', description: 'High-CTR thumbnails designed to maximize views and engagement.', icon: <LayoutGrid size={32} /> }
];

const toolLogos = [
  {
    name: 'Adobe Premiere Pro',
    src: 'https://cdn-icons-png.flaticon.com/512/5968/5968525.png'
  },
  {
    name: 'Adobe After Effects',
    src: 'https://cdn-icons-png.flaticon.com/512/5968/5968428.png'
  },
  {
    name: 'Adobe Illustrator',
    src: 'https://cdn-icons-png.flaticon.com/512/5968/5968472.png'
  },
  {
    name: 'Photoshop',
    src: 'https://cdn-icons-png.flaticon.com/512/5968/5968520.png'
  },
  {
    name: 'ChatGPT',
    src: 'https://cdn-icons-png.flaticon.com/512/11865/11865326.png'
  },
  {
    name: 'Visual Studio Code',
    src: 'https://cdn.worldvectorlogo.com/logos/visual-studio-code-1.svg'
  }
];

const founderProfiles = [
  {
    id: 'arman',
    name: 'Arman Ali',
    role: 'Founder & Creative Director',
    phone: '+91 7705090700',
    email: 'contact@graphitoagency.com',
    image: 'https://framerusercontent.com/images/kqv3sTb1FdwKJhQbeBRiQBo2HQ.png?width=863&height=998'
  },
  {
    id: 'editor',
    name: 'Editor Nishant',
    role: 'Co-Founder & Technical / Editing Lead',
    phone: '+91 9277072409',
    email: 'arvind90782@gmail.com',
    image: 'https://lh3.googleusercontent.com/d/1e_jpmmyBMp9GT7aKE3_mFVQ5amBxhCZ-'
  }
];

const featuredReels = [
  {
    id: '12Wyc9ygpzV0pYwBzWiTFGftUdmpcvces',
    label: 'All Type Work',
    embedUrl: 'https://www.youtube.com/embed/Trmo2APuJdQ?rel=0&modestbranding=1&playsinline=1'
  }
];

const heroBackgroundImages = [
  heroBgImage1,
  heroBgImage2,
  heroBgImage3,
  heroBgImage4,
  heroBgImage5,
  heroBgImage6,
  heroBgImage7,
  heroBgImage8,
  heroBgImage9,
];

const websiteThemeInquiryLink = `https://wa.me/919277072409?text=${encodeURIComponent('I want a website')}`;

const graphicsCategories = [
  'All',
  'Thumbnail Images',
  'Promo Ads',
  'Ads Poster',
  'Packet Ads',
  'Others',
] as const;

type GraphicsCategory = (typeof graphicsCategories)[number];

const graphicsProjects: Array<{
  id: string;
  category: Exclude<GraphicsCategory, 'All'>;
  image: string;
  aspectRatio: string;
}> = [
  { id: 'image-1', category: 'Thumbnail Images', image: heroBgImage1, aspectRatio: '1040 / 585' },
  { id: 'image-2', category: 'Thumbnail Images', image: heroBgImage2, aspectRatio: '1280 / 720' },
  { id: 'image-3', category: 'Ads Poster', image: heroBgImage3, aspectRatio: '1279 / 1600' },
  { id: 'image-4', category: 'Packet Ads', image: heroBgImage4, aspectRatio: '889 / 1343' },
  { id: 'image-5', category: 'Thumbnail Images', image: heroBgImage5, aspectRatio: '1600 / 900' },
  { id: 'image-6', category: 'Promo Ads', image: heroBgImage6, aspectRatio: '1080 / 1080' },
  { id: 'image-7', category: 'Others', image: heroBgImage7, aspectRatio: '1587 / 2245' },
  { id: 'image-8', category: 'Promo Ads', image: heroBgImage8, aspectRatio: '1024 / 1024' },
  { id: 'image-9', category: 'Promo Ads', image: heroBgImage9, aspectRatio: '3780 / 1890' },
];

const websiteThemes = [
  {
    name: 'BUSINESS',
    description: 'Professional layouts for corporate brands and service businesses.',
    image: 'https://res.cloudinary.com/upwork-cloud/image/upload/c_scale%2Cw_1000/v1697751559/catalog/1715114392149532672/osyl7hpunx55am6f8k6h.jpg',
  },
  {
    name: 'PORTFOLIO',
    description: 'Showcase your work with a clean, visual-first presentation.',
    image: 'https://cdn.dribbble.com/userupload/34778552/file/original-0465b09dfd39d44b5088e112235b41b9.jpg',
  },
  {
    name: 'AGENCY',
    description: 'Premium agency-style layouts designed to build trust fast.',
    image: 'https://cdn.dribbble.com/userupload/38651611/file/original-c90803d4fa08a1724420efd6fa540188.png?resize=752x&vertical=center',
  },
  {
    name: 'RESTAURANT',
    description: 'Elegant layouts for food, menus, bookings, and hospitality.',
    image: 'https://cdn.prod.website-files.com/64da807a9aa000087e97b92d/6527c30162c135c18bbe9f5b_6421ecd649c5e784bd99f077_thumbnail560x720.png',
  },
  {
    name: 'PERSONAL BRAND',
    description: 'A sharp identity-led layout for creators and professionals.',
    image: 'https://cdn.dribbble.com/userupload/46677862/file/ef2e2340dc447860772bce69ec0b9a34.jpg?resize=752x&vertical=center',
  },
  {
    name: 'STARTUP',
    description: 'Fast, modern landing pages built for launch and growth.',
    image: 'https://cdn.dribbble.com/userupload/44857614/file/still-cc85b39c7e2e0732df7e52881ea5a568.png?format=webp&resize=400x300&vertical=center',
  },
] as const;

const trustStats = [
  {
    target: 150,
    suffix: '+',
    label: 'Projects Completed',
    icon: <Trophy size={22} />,
  },
  {
    target: 80,
    suffix: '+',
    label: 'Happy Clients',
    icon: <Users size={22} />,
  },
  {
    target: 10,
    suffix: 'M+',
    label: 'Content Reach',
    icon: <TrendingUp size={22} />,
  },
  {
    target: 3,
    suffix: '+',
    label: 'Years Experience',
    icon: <Clock3 size={22} />,
  },
] as const;

const testimonials = [
  {
    quote: 'They turned our ideas into a clean, premium identity that actually performs on social and web.',
    name: 'Aarav Sharma',
    role: 'Brand Owner',
  },
  {
    quote: 'The team understood our style quickly and delivered edits that felt polished from the first draft.',
    name: 'Ritika Verma',
    role: 'Content Creator',
  },
  {
    quote: 'Fast communication, strong creative direction, and visuals that made our campaigns stand out.',
    name: 'Nikhil Mehta',
    role: 'Marketing Lead',
  },
] as const;

const processSteps = [
  {
    step: '01',
    title: 'Discover',
    description: 'We understand your brand, audience, and exact visual goals before we design anything.',
    icon: <Search size={20} />,
  },
  {
    step: '02',
    title: 'Design',
    description: 'Mood, layout, and content direction come together in a clean visual system.',
    icon: <Palette size={20} />,
  },
  {
    step: '03',
    title: 'Refine',
    description: 'We polish the details, tighten spacing, and make sure every asset feels premium.',
    icon: <Layout size={20} />,
  },
  {
    step: '04',
    title: 'Launch',
    description: 'Final files are delivered ready for use across web, social, and campaigns.',
    icon: <Rocket size={20} />,
  },
] as const;

const pricingPlans = [
  {
    name: 'Starter',
    price: '₹9,999',
    description: 'Best for one-time graphics and thumbnail packs.',
    features: ['3 creative directions', '2 revision rounds', 'Quick delivery'],
    featured: false,
  },
  {
    name: 'Growth',
    price: '₹24,999',
    description: 'A balanced plan for regular content and brand support.',
    features: ['Monthly design support', 'Priority communication', 'Multi-format export'],
    featured: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    description: 'Full creative support for brands that need everything in one place.',
    features: ['Website and graphics', 'Video + motion support', 'Dedicated creative direction'],
    featured: false,
  },
] as const;

type TrustStat = (typeof trustStats)[number];

interface AnimatedTrustStatProps {
  target: number;
  suffix: string;
  label: string;
  icon: ReactElement;
  delayMs?: number;
}

function AnimatedTrustStatCard({
  target,
  suffix,
  label,
  icon,
  delayMs = 0,
}: AnimatedTrustStatProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const numberRef = useRef<HTMLDivElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const cardNode = cardRef.current;
    const numberNode = numberRef.current;

    if (!cardNode || !numberNode || hasAnimated) {
      return;
    }

    let rafId = 0;
    let timeoutId = 0;

    const startAnimation = () => {
      const rawTarget = Number(numberNode.dataset.target || target);
      const duration = 2000;
      const animationStart = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - animationStart) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setDisplayValue(Math.round(rawTarget * eased));

        if (progress < 1) {
          rafId = window.requestAnimationFrame(tick);
        } else {
          setDisplayValue(rawTarget);
        }
      };

      setHasAnimated(true);
      rafId = window.requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === 'undefined') {
      timeoutId = window.setTimeout(startAnimation, delayMs);
      return () => {
        window.clearTimeout(timeoutId);
        if (rafId) {
          window.cancelAnimationFrame(rafId);
        }
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        timeoutId = window.setTimeout(startAnimation, delayMs);
        observer.disconnect();
      },
      {
        threshold: 0.55,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(cardNode);

    return () => {
      observer.disconnect();
      window.clearTimeout(timeoutId);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [delayMs, hasAnimated, target]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.55 }}
      className="flex min-h-[250px] flex-col items-center justify-between rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(18,23,31,0.98),rgba(10,13,18,0.98))] px-6 py-8 text-center shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-brand-accent/25 bg-brand-accent/10 text-brand-accent shadow-[0_0_24px_rgba(0,122,255,0.18)]">
        {icon}
      </div>
      <div
        ref={numberRef}
        data-target={target}
        data-suffix={suffix}
        className="pt-4 whitespace-nowrap tabular-nums text-6xl sm:text-[4.9rem] font-display font-normal uppercase tracking-[0.01em] leading-none text-white drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]"
      >
        {displayValue}
        {suffix}
      </div>
      <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-white/42">
        {label}
      </p>
    </motion.div>
  );
}

export default function Home() {
  const [heroBackgroundIndex, setHeroBackgroundIndex] = useState(0);
  const [selectedGraphicsCategory, setSelectedGraphicsCategory] = useState<GraphicsCategory>('All');

  const features = [
    {
      title: 'Strategic Design',
      description: 'We don\'t just make it look good; we make it work for your brand goals.',
      icon: <Zap className="text-brand-accent" size={24} />
    },
    {
      title: 'Creative Excellence',
      description: 'Our team of experts pushes the boundaries of visual storytelling.',
      icon: <Trophy className="text-brand-accent" size={24} />
    },
    {
      title: 'Fast Workflow',
      description: 'Reliable delivery times without compromising on premium quality.',
      icon: <Zap className="text-brand-accent" size={24} />
    }
  ];

  const visibleGraphicsProjects =
    selectedGraphicsCategory === 'All'
      ? graphicsProjects
      : graphicsProjects.filter((project) => project.category === selectedGraphicsCategory);

  useEffect(() => {
    heroBackgroundImages.forEach((src) => {
      const image = new Image();
      image.src = src;
    });

    const intervalId = window.setInterval(() => {
      setHeroBackgroundIndex((current) => (current + 1) % heroBackgroundImages.length);
    }, 4500);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div id="home" className="pt-20 relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-transparent">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <AnimatePresence mode="wait">
            <motion.img
              key={heroBackgroundImages[heroBackgroundIndex]}
              src={heroBackgroundImages[heroBackgroundIndex]}
              alt=""
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover object-center"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 1.1, ease: 'easeInOut' }}
              draggable={false}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/80" />
        </div>
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-16 sm:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -120, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
              transition={{ ...springTransition, duration: 1.2 }}
              className="flex justify-center lg:justify-end"
            >
              <div className="relative w-full max-w-sm mx-auto">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[46px] border border-white/20 bg-slate-900 shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
                  <img
                    src={heroVisualImage}
                    alt="Creative studio mood"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
                  <div className="absolute bottom-6 left-6 rounded-full bg-white/90 px-4 py-2 text-[0.65rem] font-semibold text-black/70 shadow-lg tracking-[0.22em]">
                    Story Driven
                  </div>
                </div>
                <div className="absolute -bottom-10 left-1/2 w-[85%] -translate-x-1/2 rounded-[32px] glass border border-white/30 px-6 py-4 text-xs uppercase tracking-[0.18em] text-white/80 shadow-2xl">
                  120+ cinematic projects - 24h turnaround
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...springTransition, duration: 1.1 }}
              className="space-y-8 max-w-2xl mx-auto lg:mx-0"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent font-semibold text-sm mb-2 tracking-[0.18em] shadow-[0_0_24px_rgba(0,122,255,0.18)]"
              >
                <Zap size={16} />
                <span>Premium Creative Agency</span>
              </motion.div>
              <h1 className="hero-title text-6xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-normal uppercase leading-none tracking-[0.01em]">
                <span className="inline-flex flex-wrap items-baseline gap-x-4 sm:gap-x-5 gap-y-2">
                <motion.span 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="block whitespace-nowrap text-[var(--text-primary)]/95 tracking-[0.01em] drop-shadow-[0_8px_18px_rgba(0,0,0,0.35)]"
                >
                  DESIGN THAT
                </motion.span>
                <motion.span 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="block whitespace-nowrap hero-gradient-text tracking-[0.01em]"
                >
                  INSPIRES
                </motion.span>
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-brand-text/60 leading-relaxed">
                We are a premium digital agency crafting cinematic videos, stunning graphics, and high-performance web experiences for global brands.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                <motion.a 
                  href="#portfolio"
                  whileHover={{ scale: 1.1, rotate: -2, boxShadow: "0 20px 40px rgba(0,122,255,0.3)" }}
                  whileTap={{ scale: 0.9 }}
                  className="px-8 py-4 rounded-full bg-brand-accent text-white font-bold text-lg flex items-center justify-center space-x-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-accent/20"
                >
                  <span>View Our Work</span>
                  <ArrowRight size={20} />
                </motion.a>
                <motion.a 
                  href="#contact"
                  whileHover={{ scale: 1.1, rotate: 2, backgroundColor: "rgba(0,122,255,0.1)" }}
                  whileTap={{ scale: 0.9 }}
                  className="px-8 py-4 rounded-full glass text-[var(--text-primary)] font-bold text-lg flex items-center justify-center space-x-2 hover:bg-white transition-all"
                >
                  <span>Start a Project</span>
                </motion.a>
              </div>
            </motion.div>

          </div>
        </div>
      </section>


      {/* Tools We Master Section */}
      <section className="py-16 sm:py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center font-display font-normal uppercase tracking-[0.18em] text-[1.4rem] sm:text-[1.7rem] text-[var(--text-primary)]/80 mb-12">
            Software We Use
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 lg:gap-8 items-stretch justify-items-center">
            {toolLogos.map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                className="flex h-full w-full max-w-[150px] flex-col items-center gap-4 cursor-default text-center"
              >
                <div className="flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center overflow-hidden rounded-[32px] border border-white/30 bg-white/0 p-3 sm:p-4 shadow-[0_25px_45px_rgba(15,23,42,0.25)]">
                  <img
                    src={tool.src}
                    alt={`${tool.name} icon`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="font-display font-normal uppercase tracking-[0.05em] leading-[0.95] text-[1.1rem] sm:text-[1.25rem] text-brand-text/80 min-h-[3.6rem] flex items-start justify-center">
                  {tool.name}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 sm:py-24 lg:py-28 bg-brand-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex flex-wrap items-baseline justify-center gap-x-4 sm:gap-x-5 gap-y-2 text-5xl md:text-7xl font-display font-normal uppercase leading-none tracking-[0.01em] mb-6"
            >
              <span className="text-[var(--text-primary)]">OUR</span>
              <span className="hero-gradient-text">EXPERTISE</span>
            </motion.h2>
            <p className="text-xl text-brand-text/50 max-w-2xl mx-auto">
              We provide end-to-end creative solutions to help your brand stand out in the digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 10,
                  boxShadow: "0 20px 40px rgba(0,122,255,0.2)"
                }}
                viewport={{ once: true }}
                transition={{ ...springTransition, delay: index * 0.1 }}
                className="p-6 sm:p-8 lg:p-10 ios-card glass-hover group perspective-1000 min-h-[310px] sm:min-h-[330px]"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-8 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-3xl font-display font-normal uppercase tracking-[0.04em] leading-[0.92] mb-4">
                  {service.title}
                </h3>
                <p className="text-brand-text/50 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Theme Section */}
      <section id="themes" className="py-20 sm:py-24 bg-[linear-gradient(180deg,var(--bg-primary),var(--bg-secondary))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14 sm:mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase mb-5">
              Website Themes
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal uppercase tracking-[0.02em] leading-none mb-6">
              Choose Your <span className="hero-gradient-text">Website Design Theme</span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--text-primary)]/65 max-w-3xl mx-auto">
              A few visual directions to show how your brand can look across landing pages, campaigns, and content systems.
            </p>
          </motion.div>

          <div className="columns-1 sm:columns-2 xl:columns-3 [column-gap:2rem]">
            {websiteThemes.map((theme, index) => (
              <motion.a
                key={theme.name}
                href={websiteThemeInquiryLink}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -6, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="group relative mb-8 inline-block w-full overflow-hidden rounded-[32px] ios-card bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-[0_25px_70px_rgba(0,0,0,0.16)] cursor-pointer break-inside-avoid"
                aria-label={`Open WhatsApp for ${theme.name} theme`}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={theme.image}
                    alt={`${theme.name} website theme preview`}
                    className="block h-auto w-full object-contain object-center transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                  <div className="absolute top-4 left-4 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-white/75 backdrop-blur-md">
                    THEME {index + 1}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <p className="mb-3 text-[0.62rem] uppercase tracking-[0.26em] text-white/70">
                      Click to WhatsApp
                    </p>
                    <h3 className="text-3xl font-display font-normal uppercase tracking-[0.04em] leading-none text-white">
                      {theme.name}
                    </h3>
                    <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed">
                      {theme.description}
                    </p>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section id="portfolio" className="py-16 sm:py-20 bg-brand-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-display font-bold tracking-[0.01em] leading-[1.02] text-brand-text mb-4">
              Featured Work
            </h2>
            <p className="text-lg text-brand-text/60 max-w-2xl mx-auto">
              Our latest reels, edited for social and optimized for mobile viewing.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 justify-items-center">
            {featuredReels.map((reel, index) => (
              <motion.div
                key={reel.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, delay: 0.1 + index * 0.08 }}
                className="relative w-full max-w-5xl"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-[32px] bg-black shadow-[0_25px_60px_rgba(0,0,0,0.4)] border border-white/10">
                  <iframe
                    src={reel.embedUrl}
                    title={reel.label}
                    className="absolute inset-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                  <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/70" />
                    <div className="absolute top-4 left-4 rounded-full bg-white/90 px-4 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-black/70 shadow-sm">
                      {reel.label}
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-sm uppercase tracking-[0.18em] text-brand-text/60">
                  {reel.label} - YouTube long video frame
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Graphics Project Section */}
      <section
        id="graphics-project"
        className="relative overflow-hidden py-20 sm:py-24 bg-[radial-gradient(circle_at_top,rgba(0,122,255,0.18),transparent_50%),linear-gradient(180deg,var(--bg-secondary),var(--bg-primary))]"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[-8%] right-[-6%] w-72 h-72 rounded-full bg-brand-accent/10 blur-3xl" />
          <div className="absolute bottom-[-10%] left-[-8%] w-80 h-80 rounded-full bg-cyan-300/10 blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 sm:mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase mb-5">
              Graphics Project
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-[0.01em] leading-[0.96] mb-6">
              Creative Work <span className="text-brand-accent">By Category</span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--text-primary)]/70 max-w-3xl mx-auto">
              Thumbnail images, promo ads, posters, packet ads, and others from the same hero image library.
            </p>
          </motion.div>

              <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-12 sm:mb-14">
            {graphicsCategories.map((category) => {
              const isActive = selectedGraphicsCategory === category;

              return (
                <motion.button
                  key={category}
                  type="button"
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedGraphicsCategory(category)}
                  className={cn(
                    'rounded-full px-5 sm:px-6 py-3 text-sm font-semibold transition-all duration-300 border backdrop-blur-xl',
                    isActive
                      ? 'bg-brand-accent text-white border-brand-accent shadow-lg shadow-brand-accent/20'
                      : 'bg-white/[0.06] text-[var(--text-primary)]/90 border-white/10 hover:text-white hover:border-brand-accent/40 hover:bg-white/10'
                  )}
                >
                  {category}
                </motion.button>
              );
            })}
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={selectedGraphicsCategory}
              className="columns-1 sm:columns-2 xl:columns-3 [column-gap:2rem]"
            >
              {visibleGraphicsProjects.map((project, index) => (
                <motion.article
                  key={project.id}
                  className="mb-8 break-inside-avoid inline-block w-full"
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 18, scale: 0.96 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div
                    className="relative w-full overflow-hidden rounded-[32px] bg-black shadow-[0_30px_70px_rgba(0,0,0,0.18)] border border-[var(--border-color)]"
                    style={{ aspectRatio: project.aspectRatio }}
                  >
                    <img
                      src={project.image}
                      alt={`${project.category} creative asset`}
                      className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 sm:py-24 bg-brand-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14 sm:mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase mb-5">
              Client Feedback
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal uppercase tracking-[0.02em] leading-none mb-6">
              Client <span className="hero-gradient-text">Testimonials</span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--text-primary)]/65 max-w-3xl mx-auto">
              A few words from brands and creators who trusted us with their visuals.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => {
              const initials = testimonial.name
                .split(' ')
                .map((part) => part[0])
                .join('');

              return (
                <motion.article
                  key={testimonial.name}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="relative overflow-hidden rounded-[32px] ios-card glass p-6 sm:p-8"
                >
                  <div className="absolute top-5 right-5 text-6xl font-display leading-none text-brand-accent/10">“</div>
                  <div className="flex items-center gap-1 text-brand-accent mb-5">
                    {[0, 1, 2, 3, 4].map((star) => (
                      <span key={star} className="text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-[var(--text-primary)]/70 leading-relaxed text-lg mb-8">
                    {testimonial.quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 shrink-0 rounded-full bg-brand-accent/10 text-brand-accent flex items-center justify-center font-display text-xl">
                      {initials}
                    </div>
                    <div>
                      <p className="text-[var(--text-primary)] font-semibold">{testimonial.name}</p>
                      <p className="text-[var(--text-primary)]/50 text-sm uppercase tracking-[0.16em]">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14 sm:mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase mb-5">
              Our Workflow
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal uppercase tracking-[0.02em] leading-none mb-6">
              Our Proven <span className="text-brand-accent">Process</span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--text-primary)]/65 max-w-3xl mx-auto">
              A simple, fast process that keeps the work focused and the feedback loop clear.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <motion.article
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className="ios-card glass-hover p-6 sm:p-8"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-accent/10 text-brand-accent flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-primary)]/40 mb-3">{step.step}</p>
                <h3 className="text-3xl font-display font-normal uppercase tracking-[0.04em] leading-none mb-4">
                  {step.title}
                </h3>
                <p className="text-[var(--text-primary)]/55 leading-relaxed">
                  {step.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section
        id="trust"
        className="py-20 sm:py-24 bg-[radial-gradient(circle_at_top,rgba(0,122,255,0.12),transparent_50%),linear-gradient(180deg,var(--bg-secondary),var(--bg-primary))]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase mb-5">
              Global Reach
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal uppercase tracking-[0.02em] leading-none mb-6">
              Trusted by <span className="hero-gradient-text">Global Brands</span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--text-primary)]/65 max-w-3xl mx-auto">
              Our work is built for consistency, speed, and clear creative direction across every channel.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6">
            {trustStats.map((stat, index) => (
              <Fragment key={stat.label}>
                <AnimatedTrustStatCard
                  target={stat.target}
                  suffix={stat.suffix}
                  label={stat.label}
                  icon={stat.icon}
                  delayMs={index * 120}
                />
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 sm:py-24 bg-brand-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14 sm:mb-16"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase mb-5">
              Plans
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal uppercase tracking-[0.02em] leading-none mb-6">
              Simple, Transparent <span className="text-brand-accent">Pricing</span>
            </h2>
            <p className="text-lg sm:text-xl text-[var(--text-primary)]/65 max-w-3xl mx-auto">
              Flexible packages for one-off visuals, monthly support, or full creative partnerships.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                className={cn(
                  'relative overflow-hidden rounded-[34px] border p-8 sm:p-10 shadow-[0_25px_70px_rgba(0,0,0,0.12)]',
                  plan.featured
                    ? 'bg-brand-accent text-white border-brand-accent shadow-brand-accent/20'
                    : 'ios-card glass-hover bg-[var(--bg-secondary)] border-[var(--border-color)]'
                )}
              >
                <div
                  className={cn(
                    'inline-flex items-center rounded-full px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] mb-6',
                    plan.featured ? 'bg-white/10 text-white' : 'bg-brand-accent/10 text-brand-accent'
                  )}
                >
                  {plan.name}
                </div>
                <div
                  className={cn(
                    'text-5xl sm:text-6xl font-display font-normal uppercase tracking-[0.02em] leading-none mb-4',
                    plan.featured ? 'text-white' : 'text-[var(--text-primary)]'
                  )}
                >
                  {plan.price}
                </div>
                <p className={cn('leading-relaxed mb-8', plan.featured ? 'text-white/75' : 'text-[var(--text-primary)]/60')}>
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        'flex items-start gap-3 text-sm sm:text-base',
                        plan.featured ? 'text-white/85' : 'text-[var(--text-primary)]/70'
                      )}
                    >
                      <span className={cn('mt-2 h-2 w-2 rounded-full shrink-0', plan.featured ? 'bg-white' : 'bg-brand-accent')} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all',
                    plan.featured
                      ? 'bg-white text-brand-accent hover:bg-white/90'
                      : 'bg-brand-accent text-white hover:bg-brand-accent/90'
                  )}
                >
                  Get Started
                </motion.a>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="cta" className="py-20 sm:py-24 bg-brand-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[40px] border border-brand-accent/20 bg-[linear-gradient(135deg,rgba(0,122,255,0.2),rgba(15,23,42,0.96))] p-8 sm:p-12 lg:p-16 shadow-[0_30px_90px_rgba(0,0,0,0.24)]">
            <div className="absolute -top-10 right-0 h-40 w-40 rounded-full bg-brand-accent/20 blur-3xl" />
            <div className="absolute -bottom-12 left-0 h-44 w-44 rounded-full bg-cyan-300/15 blur-3xl" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-10 items-center">
              <div>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white font-semibold text-xs sm:text-sm tracking-[0.22em] uppercase mb-5">
                  Final Step
                </span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-normal uppercase tracking-[0.02em] leading-none text-white mb-6">
                  Let&apos;s Build Something <span className="hero-gradient-text">Extraordinary</span>
                </h2>
                <p className="text-white/75 text-lg sm:text-xl leading-relaxed max-w-2xl">
                  Need graphics, video editing, web design, or a full creative rollout? Let&apos;s shape the next version of your brand together.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-col gap-4 lg:items-end lg:justify-self-end">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center space-x-2 rounded-full bg-brand-accent px-7 py-4 text-white font-semibold shadow-xl shadow-brand-accent/25"
                >
                  <span>Start a Project</span>
                  <ArrowRight size={18} />
                </motion.a>
                <motion.a
                  href="#pricing"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-4 text-white font-semibold backdrop-blur-md"
                >
                  View Pricing
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 sm:py-28 bg-brand-secondary/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28 sm:mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-[0.01em] leading-[0.96] mb-8">
                Crafting Digital <br />
                <span className="text-brand-accent">Masterpieces.</span>
              </h2>
              <p className="text-xl text-brand-text/60 leading-relaxed mb-10">
                Graphito is a collective of creative minds dedicated to pushing the boundaries of visual communication. We blend strategy with artistry to deliver results that matter.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                {features.map((feature, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                      {feature.icon}
                    </div>
                    <h4 className="font-bold text-lg">{feature.title}</h4>
                    <p className="text-brand-text/50 text-sm">{feature.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="ios-card overflow-hidden reflection">
                <img 
                  src={heroAboutImage} 
                  alt="Our Agency" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -top-10 -right-10 p-8 glass rounded-[32px] shadow-2xl z-10 hidden sm:block">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center text-white font-bold text-xl">
                    3+
                  </div>
                  <div>
                    <p className="font-bold text-brand-text">Years of</p>
                    <p className="text-brand-text/50 text-sm">Experience</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Founders Subsection */}
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-[0.01em] leading-[0.98] mb-6">Meet the <span className="text-brand-accent">Visionaries</span></h2>
            <p className="text-brand-text/50 max-w-xl mx-auto">The creative and technical leads behind Graphito's success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mb-24 sm:mb-32">
            {founderProfiles.map((founder, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100, rotate: index % 2 === 0 ? -10 : 10 }}
                whileInView={{ opacity: 1, x: 0, rotate: 0 }}
                whileHover={{ 
                  scale: 1.02,
                  rotate: index % 2 === 0 ? 1 : -1,
                  transition: { type: "spring", stiffness: 400 }
                }}
                viewport={{ once: true }}
                transition={{ ...springTransition, delay: index * 0.2 }}
                className="p-6 sm:p-8 lg:p-10 ios-card glass-hover relative overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start relative z-10">
                  <div className="reflection">
                    <div className="w-48 h-48 rounded-full overflow-hidden flex-shrink-0 border-4 border-brand-accent/20">
                      <img src={founder.image} alt={founder.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                    </div>
                  </div>
                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-3xl font-display font-bold mb-2">{founder.name}</h3>
                    <p className="text-brand-accent font-semibold mb-6 uppercase tracking-widest text-sm">{founder.role}</p>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-center md:justify-start space-x-3 text-brand-text/50">
                        <Phone size={18} className="text-brand-accent" />
                        <span>{founder.phone}</span>
                      </div>
                      <div className="flex items-center justify-center md:justify-start space-x-3 text-brand-text/50">
                        <Mail size={18} className="text-brand-accent" />
                        <span>{founder.email}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-accent/5 rounded-full blur-3xl group-hover:bg-brand-accent/10 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 sm:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-[0.01em] leading-[0.98] mb-8"
              >
                Let's <span className="text-brand-accent">Collaborate</span>
              </motion.h2>
              <p className="text-lg sm:text-xl text-brand-text/50 leading-relaxed mb-12">
                Ready to take your brand to the next level? Fill out the form and we'll get back to you within 24 hours to discuss your project.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Phone size={24} />
                  </div>
                    <div>
                      <p className="text-sm uppercase tracking-widest font-bold text-[var(--text-primary)]/80">Call Us</p>
                      <p className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]">+91 7705090700</p>
                      <p className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]">+91 9277072409</p>
                    </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Mail size={24} />
                  </div>
                    <div>
                      <p className="text-sm uppercase tracking-widest font-bold text-[var(--text-primary)]/80">Email Us</p>
                      <p className="text-lg sm:text-xl font-semibold text-[var(--text-primary)]">contact@graphitoagency.com</p>
                    </div>
                </div>
              </div>
            </div>

              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="p-10 rounded-[36px] ios-card space-y-6 shadow-2xl shadow-black/5">
                  <h3 className="text-3xl font-display font-bold tracking-[0.01em]">Ready to collaborate?</h3>
                  <p className="text-lg text-brand-text/60 leading-relaxed">
                    Humari team aapke liye hamesha available hai — ek call ya email se hi start karo and we will get back within 24 hours.
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    {founderProfiles.map((founder) => (
                      <div key={founder.id} className="flex flex-col gap-2 rounded-2xl border border-[var(--border-color)] p-4 bg-[var(--glass-bg)]">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm uppercase tracking-widest text-brand-text/40">{founder.role}</p>
                            <p className="text-xl font-semibold text-brand-text">{founder.name}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-brand-text/70">
                          <Phone size={16} className="text-brand-accent" />
                          <a href={`tel:${founder.phone.replace(/\\s+/g, '')}`} className="hover:text-brand-accent">{founder.phone}</a>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-brand-text/70">
                          <Mail size={16} className="text-brand-accent" />
                          <a href={`mailto:${founder.email}`} className="hover:text-brand-accent">{founder.email}</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
}

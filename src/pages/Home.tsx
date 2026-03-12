import React, { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, Play, Video, Palette, Zap, Users, Trophy, 
  Image as ImageIcon, Globe, Layout, UserCircle, Monitor, 
  LayoutGrid, ExternalLink, X, Mail, Phone, MapPin, 
  Send, CheckCircle2 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { cn } from '../utils/cn';

const portfolioItems = [
  {
    id: 1,
    title: 'Modern Brand Identity',
    category: 'Branding',
    image: 'https://picsum.photos/seed/brand1/800/600',
    description: 'A complete visual identity system for a tech startup.'
  },
  {
    id: 2,
    title: 'Cinematic Travel Reel',
    category: 'Video Editing',
    image: 'https://picsum.photos/seed/video1/800/600',
    description: 'High-energy travel montage with professional color grading.'
  },
  {
    id: 3,
    title: '3D Product Animation',
    category: 'Motion Graphics',
    image: 'https://picsum.photos/seed/motion1/800/600',
    description: 'Dynamic product showcase with complex motion graphics.'
  },
  {
    id: 4,
    title: 'E-commerce Platform',
    category: 'Web Development',
    image: 'https://picsum.photos/seed/web1/800/600',
    description: 'Responsive and high-converting online store.'
  },
  {
    id: 5,
    title: 'Social Media Campaign',
    category: 'Graphic Design',
    image: 'https://picsum.photos/seed/design1/800/600',
    description: 'Engaging social media assets for a global brand.'
  },
  {
    id: 6,
    title: 'Corporate Documentary',
    category: 'Video Editing',
    image: 'https://picsum.photos/seed/video2/800/600',
    description: 'Professional storytelling for a corporate anniversary.'
  }
];

const categories = ['All', 'Video Editing', 'Motion Graphics', 'Graphic Design', 'Branding', 'Web Development'];

const springTransition = {
  type: "spring",
  stiffness: 260,
  damping: 20
};

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const filteredItems = activeCategory === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    try {
      await addDoc(collection(db, 'leads'), {
        ...data,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

const services = [
  { title: 'Premium Video Editing', description: 'Cinematic storytelling with professional color grading and sound design.', icon: <Video size={32} /> },
  { title: 'Motion Graphics', description: 'Dynamic 2D/3D animations that bring your brand to life.', icon: <Zap size={32} /> },
  { title: 'Graphic Design', description: 'Stunning visuals for social media, print, and digital platforms.', icon: <Palette size={32} /> },
  { title: 'Web Development', description: 'High-performance, responsive websites built for conversion.', icon: <Globe size={32} /> },
  { title: 'Brand Identity', description: 'Complete branding solutions from logo design to brand strategy.', icon: <Layout size={32} /> },
  { title: 'YouTube Thumbnail Design', description: 'High-CTR thumbnails designed to maximize views and engagement.', icon: <LayoutGrid size={32} /> }
];

type ToolLogo = {
  name: string;
  Icon: (props: { className?: string }) => ReactNode;
};

const toolLogos: ToolLogo[] = [
  {
    name: 'Premiere Pro',
    Icon: ({ className }) => (
      <AdobeLogo letters="Pr" colors={['#5E2395', '#1E0A3F']} className={className} />
    )
  },
  {
    name: 'After Effects',
    Icon: ({ className }) => (
      <AdobeLogo letters="Ae" colors={['#6434B2', '#0C1A3D']} className={className} />
    )
  },
  {
    name: 'Photoshop',
    Icon: ({ className }) => (
      <AdobeLogo letters="Ps" colors={['#0073DA', '#021F53']} className={className} />
    )
  },
  {
    name: 'Illustrator',
    Icon: ({ className }) => (
      <AdobeLogo letters="Ai" colors={['#FF7A00', '#6C3900']} className={className} />
    )
  },
  {
    name: 'ChatGPT',
    Icon: ({ className }) => (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png"
        alt="ChatGPT icon"
        className={cn('w-full h-full object-contain', className)}
        referrerPolicy="no-referrer"
        loading="lazy"
      />
    )
  }
];

  const founders = [
    {
      name: 'Arman Ali',
      role: 'Founder & Creative Director',
      phone: '+91 7705090700',
      email: 'contact@graphitoagency.com',
      image: 'https://framerusercontent.com/images/kqv3sTb1FdwKJhQbeBRiQBo2HQ.png?width=863&height=998'
    },
    {
      name: 'Editor Nishant',
      role: 'Co-Founder & Technical / Editing Lead',
      phone: '+91 9277072409',
      email: 'arvind90782@gmail.com',
      image: 'https://lh3.googleusercontent.com/d/1e_jpmmyBMp9GT7aKE3_mFVQ5amBxhCZ-'
    }
  ];

  return (
    <div id="home" className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-accent/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100, rotate: -5 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ ...springTransition, duration: 1 }}
            >
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-brand-accent/10 text-brand-accent font-semibold text-sm mb-8 animate-pulse-crazy"
              >
                <Zap size={16} />
                <span>Premium Creative Agency</span>
              </motion.div>
              <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tighter leading-[0.9] mb-8">
                <motion.span 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="block gradient-text"
                >
                  Design that
                </motion.span>
                <motion.span 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="block text-brand-accent italic"
                >
                  Inspires.
                </motion.span>
              </h1>
              <p className="text-xl text-brand-text/60 leading-relaxed mb-10 max-w-lg">
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

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ ...springTransition, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl reflection animate-float-crazy"
              >
                <img 
                  src="https://picsum.photos/seed/creative/800/1000" 
                  alt="Creative Showcase" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-accent/20 to-transparent" />
              </motion.div>
              
              {/* Floating Elements */}
              <FloatingIcon 
                src="https://cdn.worldvectorlogo.com/logos/adobe-premiere-pro-cc.svg" 
                delay={0} 
                className="top-10 -left-10 w-20 h-20 animate-sticker" 
              />
              <FloatingIcon 
                src="https://cdn.worldvectorlogo.com/logos/adobe-after-effects-cc.svg" 
                delay={1} 
                className="bottom-20 -left-16 w-24 h-24 animate-sticker" 
              />
              <FloatingIcon 
                src="https://cdn.worldvectorlogo.com/logos/adobe-photoshop-2.svg" 
                delay={0.5} 
                className="top-20 -right-12 w-20 h-20 animate-sticker" 
              />
              <FloatingIcon 
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" 
                delay={1.5} 
                className="bottom-10 -right-16 w-24 h-24 animate-sticker" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tools We Master Section */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-brand-text/30 font-bold uppercase tracking-[0.3em] text-sm mb-12">Tools We Master</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {toolLogos.map((tool, idx) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.08, rotate: idx % 2 === 0 ? 1.5 : -1.5 }}
                transition={{ type: "spring", stiffness: 260, delay: idx * 0.05 }}
                className="w-32 flex flex-col items-center gap-4 cursor-default group"
              >
                <div className="w-32 h-32 rounded-[32px] border border-white/30 bg-white/0 p-3 flex items-center justify-center overflow-hidden shadow-[0_25px_45px_rgba(15,23,42,0.25)] transition-all duration-300 group-hover:shadow-[0_30px_60px_rgba(0,122,255,0.35)]">
                  <tool.Icon className="w-full h-full" />
                </div>
                <p className="text-sm font-display text-brand-text/80 uppercase tracking-[0.4em]">{tool.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 bg-brand-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6"
            >
              Our <span className="text-brand-accent">Expertise</span>
            </motion.h2>
            <p className="text-xl text-brand-text/50 max-w-2xl mx-auto">
              We provide end-to-end creative solutions to help your brand stand out in the digital landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="p-10 ios-card glass-hover group perspective-1000"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent mb-8 group-hover:scale-110 transition-transform duration-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-display font-bold mb-4">{service.title}</h3>
                <p className="text-brand-text/50 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-6"
              >
                Selected <span className="text-brand-accent">Works</span>
              </motion.h2>
              <p className="text-xl text-brand-text/50 max-w-xl">
                A showcase of our best projects across different creative disciplines.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-6 py-2 rounded-full text-sm font-semibold transition-all",
                    activeCategory === category 
                      ? "bg-brand-accent text-white shadow-lg shadow-brand-accent/20" 
                      : "bg-brand-secondary text-brand-text/60 hover:bg-brand-secondary/80"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.5, rotate: 15 }}
                  whileHover={{ 
                    scale: 1.02,
                    y: -10,
                    transition: { duration: 0.2 }
                  }}
                  transition={springTransition}
                  className="group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-6 ios-card">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                        <Play fill="white" size={24} />
                      </div>
                    </div>
                  </div>
                  <p className="text-brand-accent font-bold uppercase tracking-widest text-xs mb-2">{item.category}</p>
                  <h3 className="text-2xl font-display font-bold group-hover:text-brand-accent transition-colors">{item.title}</h3>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-brand-secondary/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8 leading-tight">
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
                  src="https://picsum.photos/seed/agency/800/800" 
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
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-6">Meet the <span className="text-brand-accent">Visionaries</span></h2>
            <p className="text-brand-text/50 max-w-xl mx-auto">The creative and technical leads behind Graphito's success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
            {founders.map((founder, index) => (
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
                className="p-10 ios-card glass-hover relative overflow-hidden group"
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
      <section id="contact" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-5xl md:text-7xl font-display font-bold tracking-tighter mb-8"
              >
                Let's <span className="text-brand-accent">Collaborate</span>
              </motion.h2>
              <p className="text-xl text-brand-text/50 leading-relaxed mb-12">
                Ready to take your brand to the next level? Fill out the form and we'll get back to you within 24 hours to discuss your project.
              </p>

              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-brand-text/30 text-sm uppercase tracking-widest font-bold">Call Us</p>
                    <p className="text-xl font-semibold">+91 7705090700</p>
                    <p className="text-xl font-semibold">+91 9277072409</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="w-14 h-14 rounded-2xl bg-brand-accent/10 flex items-center justify-center text-brand-accent">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-brand-text/30 text-sm uppercase tracking-widest font-bold">Email Us</p>
                    <p className="text-xl font-semibold">contact@graphitoagency.com</p>
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
                {submitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, rotateY: 180 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    className="p-12 rounded-[40px] ios-card text-center h-full flex flex-col items-center justify-center"
                  >
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 rounded-full bg-brand-accent/20 flex items-center justify-center text-brand-accent mb-8"
                    >
                      <CheckCircle2 size={40} />
                    </motion.div>
                    <h2 className="text-3xl font-display font-bold mb-4">Message Sent!</h2>
                    <p className="text-brand-text/50 text-lg">
                      Thank you for reaching out. Our team will contact you shortly.
                    </p>
                    <button 
                      onClick={() => setSubmitted(false)}
                      className="mt-8 text-brand-accent font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form 
                    onSubmit={handleSubmit} 
                    whileHover={{ scale: 1.01 }}
                    className="p-10 rounded-[40px] ios-card space-y-6 shadow-2xl shadow-black/5"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-text/50 ml-1">Full Name</label>
                        <motion.input 
                          whileFocus={{ scale: 1.02 }}
                          type="text" name="name" required className="w-full bg-brand-secondary/50 border border-black/[0.05] rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-accent transition-colors" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-text/50 ml-1">Email Address</label>
                        <motion.input 
                          whileFocus={{ scale: 1.02 }}
                          type="email" name="email" required className="w-full bg-brand-secondary/50 border border-black/[0.05] rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-accent transition-colors" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-text/50 ml-1">Phone Number</label>
                        <motion.input 
                          whileFocus={{ scale: 1.02 }}
                          type="tel" name="phone" className="w-full bg-brand-secondary/50 border border-black/[0.05] rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-accent transition-colors" placeholder="+91 00000 00000" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-brand-text/50 ml-1">Project Type</label>
                        <motion.select 
                          whileFocus={{ scale: 1.02 }}
                          name="projectType" className="w-full bg-brand-secondary/50 border border-black/[0.05] rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-accent transition-colors appearance-none">
                          <option value="video-editing">Video Editing</option>
                          <option value="motion-graphics">Motion Graphics</option>
                          <option value="graphic-design">Graphic Design</option>
                          <option value="web-development">Web Development</option>
                          <option value="branding">Branding</option>
                        </motion.select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-brand-text/50 ml-1">Message</label>
                      <motion.textarea 
                        whileFocus={{ scale: 1.02 }}
                        name="message" required rows={5} className="w-full bg-brand-secondary/50 border border-black/[0.05] rounded-2xl px-5 py-4 focus:outline-none focus:border-brand-accent transition-colors" placeholder="Tell us about your project goals..." />
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05, rotate: 1 }}
                      whileTap={{ scale: 0.95 }}
                      type="submit" disabled={loading} className="w-full py-5 rounded-full bg-brand-accent text-white font-bold text-lg flex items-center justify-center space-x-3 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 shadow-xl shadow-brand-accent/20"
                    >
                      {loading ? <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><span>Send Message</span><Send size={20} /></>}
                    </motion.button>
                  </motion.form>
                )}
              </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setSelectedItem(null)} />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={springTransition}
              className="relative w-full max-w-5xl bg-white rounded-[40px] overflow-hidden z-10 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 p-2 rounded-full glass hover:bg-black/5 transition-colors z-20"
              >
                <X size={24} />
              </button>
              
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="aspect-video lg:aspect-square">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-12 flex flex-col justify-center">
                  <p className="text-brand-accent font-bold uppercase tracking-widest text-sm mb-4">{selectedItem.category}</p>
                  <h2 className="text-4xl font-display font-bold mb-6">{selectedItem.title}</h2>
                  <p className="text-xl text-brand-text/60 mb-10 leading-relaxed">{selectedItem.description}</p>
                  <div className="flex space-x-4">
                    <button className="px-8 py-4 rounded-full bg-brand-accent text-white font-bold flex items-center space-x-2 hover:scale-105 transition-transform shadow-lg shadow-brand-accent/20">
                      <Play size={18} className="fill-white" />
                      <span>Watch Reel</span>
                    </button>
                    <button className="px-8 py-4 rounded-full glass text-brand-text font-bold hover:bg-black/5 transition-colors">
                      View Case Study
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FloatingIcon({ src, delay, className }: { src: string, delay: number, className: string }) {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: [0, -20, 0] }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      }}
      className={`absolute ${className} reflection-strong`}
    >
      <img 
        src={src} 
        alt="App Icon" 
        className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(0,122,255,0.2)]"
        referrerPolicy="no-referrer"
      />
    </motion.div>
  );
}

function AdobeLogo({ letters, colors, className }: { letters: string; colors: [string, string]; className?: string }) {
  const gradientId = `adobe-gradient-${letters.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  return (
    <svg
      viewBox="0 0 140 140"
      role="img"
      aria-label={`${letters} logo`}
      className={cn('w-full h-full', className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <rect width="140" height="140" rx="32" fill={`url(#${gradientId})`} />
      <text
        x="50%"
        y="62%"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ffffff"
        fontSize="48"
        fontWeight="600"
        fontFamily="var(--font-display, 'SF Pro Display', 'Inter', sans-serif)"
        letterSpacing="0.1em"
      >
        {letters}
      </text>
    </svg>
  );
}

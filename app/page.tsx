'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Code2, Github, Instagram, Linkedin, Mail, Menu, MoveRight, Sparkles, Twitter, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import dynamic from 'next/dynamic';

const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false });
const SplineScene = dynamic(() => import('@/components/SplineScene'), { ssr: false });

const projects = [
  {
    number: '01',
    title: 'ASMITA — IEC College Event Website',
    type: 'Web · Frontend · Event Platform',
    description: 'A modern event website built for ASMITA at IEC College of Engineering and Technology, with responsive UI, event information, registration flow, and a Firebase-backed registration system.',
    tags: ['React', 'Vite', 'Firebase', 'GSAP'],
    tone: 'blue',
    link: 'https://asmita-iec.vercel.app/',
  },
  {
    number: '02',
    title: 'ResQFlow',
    type: 'AI · Emergency Response · Web',
    description: 'An emergency-response focused platform designed around faster coordination, real-time information, and intelligent workflow support for disaster and rescue scenarios.',
    tags: ['React', 'AI', 'Maps', 'Web'],
    tone: 'violet',
    link: 'https://github.com/viplovk',
  },
  {
    number: '03',
    title: 'Interactive DSA Visualizer',
    type: 'Computer Science · Algorithms · Visualization',
    description: 'An interactive learning tool for visualizing data structures and algorithms, with a focus on understanding algorithm behavior, operations, and complexity.',
    tags: ['Rust', 'Algorithms', 'Data Structures', 'Visualization'],
    tone: 'orange',
    link: 'https://github.com/viplovk',
  },
];

const skills = [
  'JavaScript',
  'React',
  'Next.js',
  'HTML / CSS',
  'Tailwind',
  'GSAP',
  'Three.js',
  'Firebase',
  'C',
  'Rust',
  'Git & GitHub',
  'AI Tools',
];

function MagneticLink({ children, className = '', href = '#' }: { children: React.ReactNode; className?: string; href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const move = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const box = ref.current?.getBoundingClientRect();
    if (box) gsap.to(ref.current, { x: (e.clientX - box.left - box.width / 2) * .18, y: (e.clientY - box.top - box.height / 2) * .18, duration: .25 });
  };
  return (
    <a
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={() => gsap.to(ref.current, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,.35)' })}
      className={className}
    >
      {children}
    </a>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [menu, setMenu] = useState(false);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ lerp: .09, smoothWheel: true });
    const frame = (time: number) => { lenis.raf(time); requestAnimationFrame(frame); };
    requestAnimationFrame(frame);
    const onMove = (e: MouseEvent) => gsap.to(cursor.current, { x: e.clientX, y: e.clientY, duration: .45, ease: 'power3.out' });
    window.addEventListener('mousemove', onMove);
    const timer = window.setTimeout(() => setLoaded(true), 1200);
    gsap.utils.toArray<HTMLElement>('.reveal').forEach(el => gsap.fromTo(el, { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 86%' } }));
    return () => {
      lenis.destroy();
      window.removeEventListener('mousemove', onMove);
      window.clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  const closeMenu = () => setMenu(false);

  return (
    <main>
      <div ref={cursor} className="cursor" aria-hidden="true" />
      <div className={`loader ${loaded ? 'loader--done' : ''}`}><span>V</span><div className="loader-line" /></div>
      <div className="grain" />
      <nav className="nav">
        <a href="#top" className="logo" onClick={closeMenu}>V<span>.</span></a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Toggle navigation">
          {menu ? <X/> : <Menu/>}
        </button>
      </nav>
      <div className={`mobile-menu ${menu ? 'open' : ''}`}>
        <a onClick={closeMenu} href="#work">Work</a>
        <a onClick={closeMenu} href="#about">About</a>
        <a onClick={closeMenu} href="#contact">Contact</a>
      </div>

      <section id="top" className="hero">
        <SplineScene />
        <HeroScene />
        <div className="hero-copy">
          <p className="eyebrow hero-kicker"><span /> Viplov Kashyap · Delhi, IN</p>
          <h1><span>Crafting</span><span>digital <em>futures.</em></span></h1>
          <div className="hero-bottom">
            <p>A Computer Science student exploring the intersection of thoughtful interfaces, intelligent systems, and real-world impact.</p>
            <MagneticLink href="#work" className="round-link">Explore work <ArrowDownRight /></MagneticLink>
          </div>
        </div>
        <p className="scroll-note">SCROLL TO EXPLORE <MoveRight /></p>
      </section>

      <section id="work" className="projects section">
        <div className="section-head reveal">
          <p className="eyebrow">Selected work <span>01 — 03</span></p>
          <h2>Ideas made<br/><em>tangible.</em></h2>
        </div>
        <div className="project-list">
          {projects.map(project => (
            <a
              key={project.number}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`project-card project-card--${project.tone} reveal`}
              aria-label={`View ${project.title}`}
            >
              <div className="project-art">
                <div className="orb" />
                <span>{project.number}</span>
                <Code2 />
              </div>
              <div className="project-info">
                <p className="project-type">{project.type}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tags">
                  {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <span className="project-open" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="about section">
        <div className="about-visual reveal">
          <div className="portrait-placeholder">
            <span>VK</span>
            <p>YOUR PHOTO<br/>GOES HERE</p>
          </div>
          <div className="orbit-text">CURIOUS · DELIBERATE · BUILDING · </div>
        </div>
        <div className="about-copy reveal">
          <p className="eyebrow">A little about me <span>02</span></p>
          <h2>Learning in public.<br/><em>Building with intent.</em></h2>
          <p className="lede">I’m Viplov — a B.Tech Computer Science Engineering student in Delhi, interested in building modern web experiences, experimenting with AI-assisted development, and turning ideas into working software.</p>
          <div className="timeline">
            <div><b>Now</b><span>Studying Computer Science Engineering</span></div>
            <div><b>Building</b><span>Modern web interfaces, AI experiments & student projects</span></div>
            <div><b>Next</b><span>Growing into a strong software engineer</span></div>
          </div>
        </div>
      </section>

      <section className="skills section">
        <div className="section-head reveal">
          <p className="eyebrow">Tools I reach for <span>03</span></p>
          <h2>Always<br/><em>in motion.</em></h2>
        </div>
        <div className="skill-cloud reveal">
          {skills.map((skill, i) => (
            <span key={skill} style={{ '--i': i } as React.CSSProperties}>
              {skill}<Sparkles size={14}/>
            </span>
          ))}
        </div>
      </section>

      <section className="education section reveal">
        <p className="eyebrow">Education <span>04</span></p>
        <div>
          <h2>Computer Science<br/><em>& Engineering</em></h2>
          <p>Bachelor of Technology · Current student<br/>Delhi, India</p>
        </div>
        <div className="education-mark">B.TECH<br/><span>CSE</span></div>
      </section>

      <section id="contact" className="contact">
        <div className="contact-glow" />
        <p className="eyebrow">Have an idea? <span>05</span></p>
        <h2>Let’s build<br/><em>something good.</em></h2>
        <MagneticLink className="email" href="mailto:viplov7@icloud.com">
          viplov7@icloud.com <ArrowUpRight />
        </MagneticLink>
        <div className="socials">
          <a href="https://github.com/viplovk" target="_blank" rel="noopener noreferrer">
            <Github /> GitHub
          </a>
          <a href="https://linkedin.com/in/viplov7" target="_blank" rel="noopener noreferrer">
            <Linkedin /> LinkedIn
          </a>
          <a href="https://x.com/vishuk30" target="_blank" rel="noopener noreferrer">
            <Twitter /> X / Twitter
          </a>
          <a href="https://instagram.com/studymaterialboy" target="_blank" rel="noopener noreferrer">
            <Instagram /> Instagram
          </a>
          <a href="mailto:viplov7@icloud.com">
            <Mail /> Email
          </a>
        </div>
      </section>
      <footer>
        <span>© {new Date().getFullYear()} Viplov Kashyap</span>
        <span>Designed & built with curiosity.</span>
      </footer>
    </main>
  );
}

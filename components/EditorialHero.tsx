'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ArrowDown, ArrowUpRight, Compass, Terminal, Shield, Cpu } from 'lucide-react';

interface EditorialHeroProps {
  onNavigate?: (id: string) => void;
}

export default function EditorialHero({ onNavigate }: EditorialHeroProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const imageBlock1Ref = useRef<HTMLDivElement>(null);
  const imageBlock2Ref = useRef<HTMLDivElement>(null);
  const imageBlock3Ref = useRef<HTMLDivElement>(null);
  const metaGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial State
      gsap.set('.editorial-reveal', { y: 24, opacity: 0 });
      gsap.set('.editorial-img-reveal', { scale: 1.08, opacity: 0 });
      gsap.set('.editorial-title-1', { y: 70, opacity: 0 });
      gsap.set('.editorial-title-2', { y: 70, opacity: 0 });

      // 2. Editorial Entrance Timeline
      const tl = gsap.timeline({ delay: 0.2 });

      tl.to('.editorial-reveal', {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power3.out',
      })
      .to('.editorial-title-1', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
      }, '-=0.4')
      .to('.editorial-title-2', {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power4.out',
      }, '-=0.7')
      .to('.editorial-img-reveal', {
        scale: 1,
        opacity: 1,
        duration: 1.1,
        stagger: 0.12,
        ease: 'power3.out',
      }, '-=0.8');

      // 3. Subtle Parallax on Mouse Move (restrained, high-end feel)
      const handleMouseMove = (e: MouseEvent) => {
        if (!heroRef.current) return;
        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const deltaX = (clientX - centerX) / centerX;
        const deltaY = (clientY - centerY) / centerY;

        gsap.to(imageBlock1Ref.current, {
          x: deltaX * 12,
          y: deltaY * 10,
          duration: 1.2,
          ease: 'power2.out',
        });
        gsap.to(imageBlock2Ref.current, {
          x: deltaX * -14,
          y: deltaY * -12,
          duration: 1.2,
          ease: 'power2.out',
        });
        gsap.to(imageBlock3Ref.current, {
          x: deltaX * 8,
          y: deltaY * 6,
          duration: 1.4,
          ease: 'power2.out',
        });
        gsap.to(title2Ref.current, {
          x: deltaX * -6,
          duration: 1.2,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToWork = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('work');
    } else {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative min-h-[100svh] w-full bg-[#0A0A0A] text-[#F1F0EB] flex flex-col justify-between pt-24 sm:pt-28 md:pt-24 pb-10 px-4 sm:px-6 md:px-10 lg:px-12 border-b border-[#222226] overflow-hidden select-none"
    >
      {/* ── TOP EDITORIAL SUB-BAR ── */}
      <div className="editorial-reveal w-full pb-3 border-b border-[#26262a] grid grid-cols-2 md:grid-cols-4 items-end gap-2 text-[0.62rem] sm:text-[0.68rem] font-mono tracking-widest text-[#9e9ea4] uppercase">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f1f0eb] inline-block animate-pulse" />
          <span>/INDEX — ARCHIVE</span>
        </div>
        <div className="text-right md:text-center">
          <span>VIPLOV KASHYAP · [2026]</span>
        </div>
        <div className="hidden md:block text-left text-[#808086]">
          <span>DELHI, IN · 28.6139° N</span>
        </div>
        <div className="text-right">
          <span className="text-[#f1f0eb] font-semibold">VK.001 // EDITORIAL</span>
        </div>
      </div>

      {/* ── MAIN MONUMENTAL TYPOGRAPHY & MANIFESTO ── */}
      <div className="w-full pt-4 md:pt-6 pb-4">
        {/* LINE 1: VIPLOV */}
        <div className="overflow-hidden leading-[0.82]">
          <h1
            ref={title1Ref}
            className="editorial-title-1 font-black text-[clamp(4.2rem,13.2vw,13.5rem)] tracking-[-0.06em] text-[#F1F0EB] uppercase m-0 p-0 select-none"
          >
            VIPLOV
          </h1>
        </div>

        {/* LINE 2: ASYMMETRIC / OFFSET KASHYAP + EDITORIAL COLLAGE INTERSECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 items-baseline gap-4 md:gap-6 mt-1 md:mt-2">
          {/* Editorial manifesto summary paragraph (like the text below EDOARDO in the reference) */}
          <div className="editorial-reveal md:col-span-4 order-2 md:order-1 pt-1 md:pt-3">
            <p className="font-mono text-[0.68rem] sm:text-[0.74rem] uppercase tracking-wider text-[#A0A0A0] leading-[1.65] max-w-[420px] m-0 border-l border-[#333338] pl-3">
              Computer Science & Engineering student in Delhi. Building thoughtful digital
              interfaces, autonomous workflow systems, and experimental algorithms with intent.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[0.6rem] font-mono tracking-widest text-[#888890] uppercase">
              <span className="px-2 py-0.5 bg-[#141416] border border-[#26262a]">/WEB</span>
              <span className="px-2 py-0.5 bg-[#141416] border border-[#26262a]">/AI</span>
              <span className="px-2 py-0.5 bg-[#141416] border border-[#26262a]">/EXPERIMENTS</span>
              <span className="px-2 py-0.5 bg-[#141416] border border-[#26262a] text-[#F1F0EB]">[BUILDING]</span>
            </div>
          </div>

          {/* SECOND WORD: KASHYAP (Staggered rightward) */}
          <div className="overflow-hidden leading-[0.82] md:col-span-8 order-1 md:order-2 text-left md:text-right">
            <h1
              ref={title2Ref}
              className="editorial-title-2 font-black text-[clamp(4.2rem,13.2vw,13.5rem)] tracking-[-0.06em] text-[#F1F0EB] uppercase m-0 p-0 select-none"
            >
              KASHYAP.
            </h1>
          </div>
        </div>
      </div>

      {/* ── BROKEN ASYMMETRIC IMAGE COLLAGE & DATA SHEET ── */}
      <div className="w-full mt-4 md:mt-6 mb-4 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-stretch">
        {/* BLOCK 1: ARCHITECTURAL BRUTALISM (LEFT) */}
        <div
          ref={imageBlock1Ref}
          className="editorial-img-reveal md:col-span-4 border border-[#242428] bg-[#111114] relative group overflow-hidden min-h-[220px] sm:min-h-[260px] md:min-h-[290px] flex flex-col justify-between p-3.5"
        >
          {/* Background Monochrome Image with Grayscale & High Contrast */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
              alt="Brutalist architectural cantilever"
              fill
              sizes="(max-width: 768px) 100vw, 35vw"
              className="object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
          </div>

          {/* Editorial Micro-Annotations (Overlay) */}
          <div className="relative z-10 flex justify-between items-start text-[0.58rem] sm:text-[0.62rem] font-mono tracking-widest uppercase text-[#F1F0EB]">
            <span className="bg-black/80 px-2 py-0.5 border border-[#333338] backdrop-blur-sm">
              /01.RAW_ARCH
            </span>
            <span className="bg-black/80 px-2 py-0.5 border border-[#333338] backdrop-blur-sm">
              VK.01
            </span>
          </div>

          <div className="relative z-10 flex justify-between items-end text-[0.58rem] sm:text-[0.62rem] font-mono tracking-widest uppercase text-[#F1F0EB]">
            <div className="bg-black/80 px-2 py-1 border border-[#333338] backdrop-blur-sm">
              <span className="block text-[#A0A0A0]">01 // PROJECT REF</span>
              <span className="font-semibold text-white">ASMITA · EVENT PLATFORM</span>
            </div>
            <span className="bg-black/80 px-2 py-0.5 border border-[#333338] text-[#A0A0A0]">
              2026
            </span>
          </div>
        </div>

        {/* BLOCK 2: ASYMMETRIC TECHNICAL SPECIFICATION SHEET (CENTER) */}
        <div
          ref={metaGridRef}
          className="editorial-reveal md:col-span-4 border border-[#242428] bg-[#0c0c0e] p-4 sm:p-5 flex flex-col justify-between relative"
        >
          <div className="flex justify-between items-center pb-3 border-b border-[#222226] text-[0.6rem] font-mono tracking-widest text-[#909098] uppercase">
            <span>/METADATA.SPEC</span>
            <span>CORE PROTOCOL</span>
          </div>

          <div className="space-y-3.5 my-3 text-[0.7rem] sm:text-[0.74rem] font-mono uppercase text-[#c0c0c6]">
            <div className="flex justify-between border-b border-[#1c1c20] pb-1.5">
              <span className="text-[#727278]">ROLE</span>
              <span className="text-white font-medium">CSE STUDENT & DEVELOPER</span>
            </div>
            <div className="flex justify-between border-b border-[#1c1c20] pb-1.5">
              <span className="text-[#727278]">LOCATION</span>
              <span className="text-white font-medium">DELHI, INDIA</span>
            </div>
            <div className="flex justify-between border-b border-[#1c1c20] pb-1.5">
              <span className="text-[#727278]">PRIMARY LAB</span>
              <span className="text-[#A0A0A0]">REACT · NEXT · TS · RUST</span>
            </div>
            <div className="flex justify-between items-baseline pt-1">
              <span className="text-[#727278]">SELECTED REFS</span>
              <div className="text-right text-[0.62rem] space-y-0.5 text-[#888892]">
                <p className="m-0 hover:text-white transition-colors">01. ASMITA IEC</p>
                <p className="m-0 hover:text-white transition-colors">02. RESQFLOW</p>
                <p className="m-0 hover:text-white transition-colors">03. DSA VISUALIZER</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-[#222226] flex justify-between items-center text-[0.58rem] font-mono text-[#808086] tracking-wider uppercase">
            <span>DISCIPLINE / INTENT</span>
            <span className="text-[#F1F0EB]">CURIOUS · DELIBERATE</span>
          </div>
        </div>

        {/* BLOCK 3: SILICON & HARDWARE ARCHITECTURE (RIGHT) */}
        <div
          ref={imageBlock2Ref}
          className="editorial-img-reveal md:col-span-4 border border-[#242428] bg-[#111114] relative group overflow-hidden min-h-[220px] sm:min-h-[260px] md:min-h-[290px] flex flex-col justify-between p-3.5"
        >
          {/* Background Monochrome Image */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
              alt="Macro processor and cybernetic hardware traces"
              fill
              sizes="(max-width: 768px) 100vw, 35vw"
              className="object-cover grayscale contrast-125 brightness-90 transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-black/45 group-hover:bg-black/25 transition-colors duration-500" />
          </div>

          {/* Editorial Micro-Annotations */}
          <div className="relative z-10 flex justify-between items-start text-[0.58rem] sm:text-[0.62rem] font-mono tracking-widest uppercase text-[#F1F0EB]">
            <span className="bg-black/80 px-2 py-0.5 border border-[#333338] backdrop-blur-sm">
              /02.SYS_FLOW
            </span>
            <span className="bg-black/80 px-2 py-0.5 border border-[#333338] backdrop-blur-sm">
              X.02
            </span>
          </div>

          <div className="relative z-10 flex justify-between items-end text-[0.58rem] sm:text-[0.62rem] font-mono tracking-widest uppercase text-[#F1F0EB]">
            <div className="bg-black/80 px-2 py-1 border border-[#333338] backdrop-blur-sm">
              <span className="block text-[#A0A0A0]">02 // PROJECT REF</span>
              <span className="font-semibold text-white">RESQFLOW · EMERGENCY AI</span>
            </div>
            <span className="bg-black/80 px-2 py-0.5 border border-[#333338] text-[#A0A0A0]">
              LIVE
            </span>
          </div>
        </div>
      </div>

      {/* ── BLOCK 4: PANORAMIC HORIZONTAL GEOMETRIC STRIP (Like the center wide louver shot in reference) ── */}
      <div
        ref={imageBlock3Ref}
        className="editorial-img-reveal w-full border border-[#242428] bg-[#0f0f12] relative group overflow-hidden h-[120px] sm:h-[140px] md:h-[160px] flex flex-col justify-between p-3.5 mb-2"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80"
            alt="Towering modernist architectural linear facade"
            fill
            sizes="100vw"
            className="object-cover grayscale contrast-130 brightness-85 transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
        </div>

        <div className="relative z-10 flex justify-between items-start text-[0.58rem] sm:text-[0.62rem] font-mono tracking-widest uppercase text-[#F1F0EB]">
          <span className="bg-black/80 px-2 py-0.5 border border-[#333338] backdrop-blur-sm">
            /03.ALGO_GEOMETRY
          </span>
          <span className="bg-black/80 px-2 py-0.5 border border-[#333338] backdrop-blur-sm">
            VK.ARCHIVE.03
          </span>
        </div>

        <div className="relative z-10 flex justify-between items-end text-[0.58rem] sm:text-[0.62rem] font-mono tracking-widest uppercase text-[#F1F0EB]">
          <div className="bg-black/80 px-2 py-1 border border-[#333338] backdrop-blur-sm">
            <span className="block text-[#A0A0A0]">03 // PROJECT REF</span>
            <span className="font-semibold text-white">DSA VISUALIZER · ALGORITHM COMPLEXITY</span>
          </div>
          <a
            href="#work"
            onClick={scrollToWork}
            className="bg-black/80 px-2.5 py-1 border border-[#333338] text-white hover:bg-white hover:text-black transition-colors flex items-center gap-1.5"
          >
            <span>VIEW WORK</span>
            <ArrowUpRight size={11} />
          </a>
        </div>
      </div>

      {/* ── EDITORIAL BOTTOM META STRIP & SCROLL PROMPT ── */}
      <div className="editorial-reveal w-full pt-4 border-t border-[#26262a] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-[0.62rem] sm:text-[0.68rem] font-mono uppercase tracking-widest text-[#94949a]">
        <div className="flex items-center gap-4">
          <span>/EDITORIAL COVER</span>
          <span className="hidden md:inline text-[#555]">•</span>
          <span className="hidden md:inline text-[#b0b0b8]">
            EXPERIMENTAL DESIGN MAGAZINE SPREAD
          </span>
        </div>

        <a
          href="#work"
          onClick={scrollToWork}
          className="group inline-flex items-center gap-3 text-[#F1F0EB] hover:text-[#A0A0A0] transition-colors py-1"
        >
          <span className="font-semibold tracking-widest">SCROLL TO DISCOVER</span>
          <span className="w-6 h-6 rounded-full border border-[#444] group-hover:border-white flex items-center justify-center transition-colors">
            <ArrowDown size={11} className="group-hover:translate-y-0.5 transition-transform" />
          </span>
          <span className="text-[#777]">01 / 05</span>
        </a>
      </div>
    </section>
  );
}

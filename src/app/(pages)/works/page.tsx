"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Works from "@/app/components/Works";

const Page = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const worksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const works = worksRef.current;
    if (!works) return;

    const worksLetters = works.querySelectorAll("span");
    
    // Initial state
    gsap.set(worksLetters, {
      y: "100%",
      opacity: 1,
    });

    gsap.set(works, {
      x: "-50%",
      left: "50%",
    });

    const tl = gsap.timeline({ delay: 0.5 });
    
    // letters in Mayank
    tl.to(
      [worksLetters[1], worksLetters[3]], // "y" and "W"
      {
        y: "0%", 
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05,
      },
      "reveal"
    )
    .to(
      [worksLetters[0], worksLetters[4]], // "M" and "o"
      {
        y: "0%",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05,
      },
      "reveal+=0.15"
    )
    .to(
      [worksLetters[5], worksLetters[6]], // "r" and "k"
      {
        y: "0%",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.05,
      },
      "reveal+=0.3"
    )
    .to(
      worksLetters[7], // "s"
      {
        y: "0%",
        duration: 0.8,
        ease: "power3.out",
      },
      "reveal+=0.45"
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen flex items-center justify-center overflow-hidden bg-[#EBEBEB] relative"
    >
      <div
        className="w-full absolute overflow-hidden"
        style={{
          top: "20%",
          left: "50%",
          transform: "translate(-50%, 0%)",
          height: "100px",
          zIndex: 10,
        }}
      >
        <div
          ref={worksRef}
          className="text-[68px] text-black font-medium text-center select-none whitespace-nowrap tracking-tight relative"
          style={{
            fontFamily: "'Roxborough'",
          }}
        >
          <span className="inline-block">M</span>
          <span className="inline-block">y</span>
          <span className="inline-block"> </span>
          <span className="inline-block">W</span>
          <span className="inline-block">o</span>
          <span className="inline-block">r</span>
          <span className="inline-block">k</span>
          <span className="inline-block">s</span>
        </div>
      </div>

      <div className="absolute w-full bottom-10 z-[1000]">
        <Works />
      </div>
    </div>
  );
};

export default Page;
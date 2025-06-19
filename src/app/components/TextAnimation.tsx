"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import LowerText from "./LowerText";

export default function TextAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const mayankRef = useRef<HTMLDivElement>(null);
  const lowerTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const leftText = leftTextRef.current;
    const rightText = rightTextRef.current;
    const mayank = mayankRef.current;
    const lowerText = lowerTextRef.current;

    const navbar = document.querySelector('[data-navbar]') as HTMLElement;
    const header = document.querySelector('[data-header]') as HTMLElement;

    if (!container || !leftText || !rightText || !mayank || !navbar || !header || !lowerText)
      return;

    const tl = gsap.timeline();

    const calculateSafeDistances = () => {
      const containerWidth = container.offsetWidth;
      const leftTextRect = leftText.getBoundingClientRect();
      const rightTextRect = rightText.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      const leftSafeDistance = Math.min(
        30,
        ((leftTextRect.left - containerRect.left) / containerWidth) * 100 - 5
      );

      const rightSafeDistance = Math.min(
        35,
        ((containerRect.right - rightTextRect.right) / containerWidth) * 100 - 5
      );

      return {
        leftDistance: Math.max(leftSafeDistance, 10),
        rightDistance: Math.max(rightSafeDistance, 10),
      };
    };

    // Initial state
    gsap.set(leftText, {
      opacity: 1,
      x: "0%",
      y: 0,
      transformOrigin: "right center",
    });

    gsap.set(rightText, {
      opacity: 1,
      x: "0%",
      y: 0,
      transformOrigin: "left center",
    });

    const mayankLetters = mayank.querySelectorAll("span");
    gsap.set(mayankLetters, {
      y: "100%", 
      opacity: 1, 
    });

    gsap.set(mayank, {
      x: "-50%",
      left: "50%",
    });

    gsap.set(navbar, {
      opacity: 0,
      y: "-30px",
      scale: 0.8,
    });

    gsap.set(header, {
      opacity: 0,
    });

    gsap.set(lowerText, {
      opacity: 0,
    });

    // Animation timeline
    setTimeout(() => {
      const safeDistances = calculateSafeDistances();

      tl.to({}, { duration: 1 })
        .to(
          leftText,
          {
            x: `-${safeDistances.leftDistance}vw`,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "split"
        )
        .to(
          rightText,
          {
            x: `${safeDistances.rightDistance}vw`,
            duration: 0.5,
            ease: "power2.inOut",
          },
          "split"
        )
        .to({}, { duration: 1 })
        .to(
          leftText,
          {
            y: "40vh",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "moveDown"
        )
        .to(
          rightText,
          {
            y: "40vh",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "moveDown"
        )
        .to({}, { duration: 1 })
        .to(
          leftText,
          {
            x: "0vw",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "comeback"
        )
        .to(
          rightText,
          {
            x: "0vw",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "comeback"
        )
        .to({}, { duration: 0.5 })
        .to(
          [mayankLetters[2], mayankLetters[3]],
          {
            y: "-10%", 
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.05,
          },
          "reveal"
        )
        .to(
          [mayankLetters[1], mayankLetters[4]],
          {
            y: "-10%",
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.05,
          },
          "reveal+=0.15"
        )
        .to(
          [mayankLetters[0], mayankLetters[5]],
          {
            y: "-10%",
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.05,
          },
          "reveal+=0.3"
        )
        .to(
          navbar,
          {
            opacity: 1,
            y: "0px",
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.4)",
          },
          "reveal+=0.6"
        )
        .to(
          header,
          {
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
          },
          "reveal+=0.8"
        )
        .to(
          lowerText,
          {
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
          },
          "reveal+=0.8"
        );

    }, 100);

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="h-screen flex items-center justify-center overflow-hidden bg-[#EBEBEB] relative"
      >
        {/* Left text */}
        <div className="w-[50%] h-full relative flex items-center justify-end">
          <div
            ref={leftTextRef}
            className="absolute text-xs text-black text-center select-none whitespace-nowrap tracking-tighter"
            style={{ fontFamily: "'Roobert Medium'" }}
          >
            Just an ordinary frontend engineer.
          </div>
        </div>

        {/* Right text */}
        <div className="w-[50%] h-full relative flex items-center justify-start">
          <div
            ref={rightTextRef}
            className="absolute text-xs text-black text-center select-none whitespace-nowrap tracking-tighter"
            style={{ fontFamily: "'Roobert Medium'" }}
          >
            With love from Thailand
          </div>
        </div>

        <div
          className="w-full absolute overflow-hidden"
          style={{
            top: "10%",
            left: "50%",
            transform: "translate(-50%, 0%)",
            height: "250px", 
            zIndex: 10,
          }}
        >
          <div
            ref={mayankRef}
            className="text-[193px] text-black font-medium text-center select-none whitespace-nowrap tracking-tight relative"
            style={{
              fontFamily: "'Roxborough'",
            }}
          >
            <span className="inline-block">M</span>
            <span className="inline-block">a</span>
            <span className="inline-block">y</span>
            <span className="inline-block">a</span>
            <span className="inline-block">n</span>
            <span className="inline-block">k</span>
          </div>
        </div>
      </div>
      <div>
        <LowerText ref={lowerTextRef}/>
      </div>
    </>
  );
}
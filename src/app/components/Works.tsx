"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import work1 from "../../../public/assets/projects/NextAppGenerator.png";

const Works = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  const projects = [
    {
      id: 1,
      title: "Next App Generator",
      description:
        "Next App Generator is a tool that helps you create a Next.js app with a custom domain and a custom logo.",
      images: [
        { src: work1, width: 300, height: 200 },
        { src: work1, width: 180, height: 150 },
      ],
    },
    {
        id: 2,
        title: "E-commerce Platform",
        description:
          "Full-stack e-commerce solution with payment integration and admin dashboard.",
        images: [
          { src: work1, width: 250, height: 180 },
          { src: work1, width: 180, height: 130 },
          { src: work1, width: 200, height: 150 },
        ],
      },
    {
      id: 3,
      title: "Portfolio Website",
      description:
        "A modern portfolio website built with Next.js, featuring smooth animations and responsive design.",
      images: [
        { src: work1, width: 350, height: 230 },
      ],
    },
   
    {
      id: 4,
      title: "Mobile App UI",
      description:
        "Modern mobile application interface design with interactive components and animations.",
      images: [
        { src: work1, width: 320, height: 240 },
        { src: work1, width: 220, height: 160 },
      ],
    },
  ];

  useEffect(() => {
    const projects = projectRefs.current.filter(Boolean) as HTMLDivElement[];
    if (projects.length === 0) return;

    const masterTl = gsap.timeline({ delay: 0.3 });
    
    projects.forEach((project, projectIndex) => {
      const imageContainers = project.querySelectorAll('.image-container');
      
      if (imageContainers.length === 0) return;
      
      const projectTl = gsap.timeline();
      
      imageContainers.forEach((container, imageIndex) => {
        const grayBg = container.querySelector('.gray-bg');
        const imageWrapper = container.querySelector('.image-wrapper');
        
        if (grayBg && imageWrapper) {
          gsap.set(grayBg, { 
            scaleY: 0, 
            transformOrigin: "top center" 
          });
          
          gsap.set(imageWrapper, { 
            clipPath: "inset(0 0 100% 0)"
          });
          
          projectTl
            .to(grayBg, {
              scaleY: 1,
              duration: 0.8,
              ease: "power1.inOut",
            }, imageIndex * 0.25)
            
            .to(imageWrapper, {
              clipPath: "inset(0 0 0% 0)",
              duration: 0.7,
              ease: "power2.inOut",
            }, imageIndex * 0.25 + 0.4);
        }
      });
      
      masterTl.add(projectTl, projectIndex * 0.3);
    });

    return () => {
      masterTl.kill();
    };
  }, []);

  return (
    <div className="w-full">
      <div
        ref={scrollRef}
        className="flex px-4 gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide"
        style={{
          scrollBehavior: "smooth",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => {
              projectRefs.current[index] = el;
            }}
            className="flex flex-row items-center cursor-pointer group flex-shrink-0"
          >
            <div
              className="w-full flex flex-row items-start justify-start gap-6"
              style={{ fontFamily: "'Roobert'" }}
            >
              <h1 className="text-[15px] text-black font-medium min-w-[100px] group-hover:text-gray-600 transition-colors duration-300">
                {project.title.split(" ").map((word, i) => (
                  <React.Fragment key={i}>
                    {word}
                    {i < project.title.split(" ").length - 1 && <br />}
                  </React.Fragment>
                ))}
              </h1>

              <div className="flex flex-row gap-4">
                {project.images.map((image, imageIndex) => (
                  <div 
                    key={`${project.id}-image-${imageIndex}`} 
                    className="image-container relative overflow-hidden" 
                    style={{ width: `${image.width}px`, height: `${image.height}px` }}
                  >
                    <div className="gray-bg absolute inset-0 bg-gray-300 z-10"></div>
                    
                    <div className="relative z-20 h-full image-wrapper">
                      <Image
                        src={image.src}
                        alt={`${project.title} image ${imageIndex + 1}`}
                        width={image.width}
                        height={image.height}
                        className="project-image w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="max-w-[200px] h-[200px] text-[10px] flex text-black font-medium items-end group-hover:text-gray-600 transition-colors duration-300 leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Works;

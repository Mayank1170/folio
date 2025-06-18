"use client";
import { forwardRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const Navbar = forwardRef<HTMLDivElement>((props, ref) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [clickedItem, setClickedItem] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== "undefined") {
      const style = document.createElement("style");
      style.textContent = `
        @keyframes slideUpBackground {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(style);

      return () => {
        if (document.head.contains(style)) {
          document.head.removeChild(style);
        }
      };
    }
  }, []);

  const handleMouseEnter = (item: string) => {
    if (!isAnimating) {
      setHoveredItem(item);
    }
  };

  const handleClick = (item: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setClickedItem(item);
    setHoveredItem(item);
    
    setTimeout(() => {
      router.push(`/${item.toLowerCase()}`);
    }, 1200);
  };

  const handleMouseLeave = () => {
    if (!isAnimating) {
      setHoveredItem(null);
    }
  };

  const AnimatedText = ({
    text,
    isHovered,
  }: {
    text: string;
    isHovered: boolean;
  }) => {
    return (
      <span className="inline-block">
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`inline-block transition-transform duration-300 ease-out ${
              isHovered ? "transform -translate-y-1" : ""
            }`}
            style={{
              transitionDelay: isHovered
                ? `${index * 50}ms`
                : `${(text.length - index - 1) * 30}ms`,
            }}
          >
            {char}
          </span>
        ))}
      </span>
    );
  };

  const BackgroundText = ({ text }: { text: string }) => {
    return (
      <div className="absolute w-full h-full flex items-center justify-center pointer-events-none">
        <span
          className={`text-[200px] font-harmond select-none transition-colors duration-1000 ease-out ${
            clickedItem ? "text-white" : "text-white/20"
          }`}
          style={{ fontFamily: "'Harmond'" }}
        >
          {text.split("").map((char, index) => (
            <span
              key={`${text}-${index}`}
              className="inline-block mt-10"
              style={{
                opacity: clickedItem ? 1 : 0,
                animation: clickedItem ? 'none' : `slideUpBackground 0.5s ease-out forwards`,
                animationDelay: clickedItem ? '0ms' : `${index * 80}ms`,
              }}
            >
              {char}
            </span>
          ))}
        </span>
      </div>
    );
  };

  return (
    <nav
      ref={ref}
      data-navbar
      className="fixed h-full flex items-center left-0 right-0 transform z-20"
      style={{
        opacity: 0, 
      }}
    >
        <div
          className={`absolute bg-black transition-all duration-1000 ease-out ${
            hoveredItem || clickedItem ? "opacity-100" : "opacity-0"
          } ${
            clickedItem 
              ? "scale-y-100" 
              : hoveredItem 
              ? "scale-y-100" 
              : "scale-y-0"
          }`}
          style={{ 
            height: clickedItem ? "100vh" : "150px",
            width: "100%",
            left: "0",
            transformOrigin: "center center" 
          }}
        >
          {(hoveredItem || clickedItem) && <BackgroundText text={hoveredItem || clickedItem || ""} />}
        </div>

        {/* Navbar content */}
        <div
          className={`relative flex items-center justify-between w-full px-16 py-4 transition-all duration-1000 ${
            clickedItem ? "z-50" : "z-10"
          }`}
          style={{ height: "150px" }}
        >
          {/* Works section */}
          <div
            className={`flex flex-col items-start cursor-pointer group ${clickedItem ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            onMouseEnter={() => handleMouseEnter("Works")}
            onClick={() => handleClick("Works")}
            onMouseLeave={handleMouseLeave}

          >
            <span
              className={`text-xs font-normal mb-1 transition-colors duration-500 ${
                hoveredItem || clickedItem ? "text-gray-300" : "text-gray-500"
              }`}
            >
              01
            </span>
            <button
              className={`text-xs font-normal transition-colors duration-300 ${
                hoveredItem || clickedItem ? "text-white" : "text-black"
              }`}
              style={{ fontFamily: "'Roobert Medium'" }}
            >
              <AnimatedText text="Works" isHovered={hoveredItem === "Works" || clickedItem === "Works"} />
            </button>
          </div>

          {/* About section */}
          <div
            className={`flex flex-col items-start cursor-pointer group ${clickedItem ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            onMouseEnter={() => handleMouseEnter("About")}
            onClick={() => handleClick("About")}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className={`text-xs font-normal mb-1 transition-colors duration-300 ${
                hoveredItem || clickedItem ? "text-gray-300" : "text-gray-500"
              }`}
            >
              02
            </span>
            <button
              className={`text-xs font-normal transition-colors duration-300 ${
                hoveredItem || clickedItem ? "text-white" : "text-black"
              }`}
            >
              <AnimatedText text="About" isHovered={hoveredItem === "About" || clickedItem === "About"} />
            </button>
          </div>

          {/* Playground section */}
          <div
            className={`flex flex-col items-start cursor-pointer group ${clickedItem ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            onMouseEnter={() => handleMouseEnter("Playground")}
            onClick={() => handleClick("Playground")}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className={`text-xs font-normal mb-1 transition-colors duration-300 ${
                hoveredItem || clickedItem ? "text-gray-300" : "text-gray-500"
              }`}
            >
              03
            </span>
            <button
              className={`text-xs font-normal transition-colors duration-300 ${
                hoveredItem || clickedItem ? "text-white" : "text-black"
              }`}
            >
              <AnimatedText
                text="Playground"
                isHovered={hoveredItem === "Playground" || clickedItem === "Playground"}
              />
            </button>
          </div>

          {/* Contact section */}
          <div
            className={`flex flex-col items-start cursor-pointer group ${clickedItem ? "opacity-0 pointer-events-none" : "opacity-100"}`}
            onMouseEnter={() => handleMouseEnter("Contact")}
            onClick={() => handleClick("Contact")}
            onMouseLeave={handleMouseLeave}
          >
            <span
              className={`text-xs font-normal mb-1 transition-colors duration-300 ${
                hoveredItem || clickedItem ? "text-gray-300" : "text-gray-500"
              }`}
            >
              04
            </span>
            <button
              className={`text-xs font-normal transition-colors duration-300 ${
                hoveredItem || clickedItem ? "text-white" : "text-black"
              }`}
            >
              <AnimatedText
                text="Contact"
                isHovered={hoveredItem === "Contact" || clickedItem === "Contact"}
              />
            </button>
          </div>
        </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
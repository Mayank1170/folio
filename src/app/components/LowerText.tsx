import React, { forwardRef } from "react";

const LowerText = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="fixed w-[80%] flex mt-10 flex-row items-center justify-between bottom-52 mx-[150px] z-50 text-black text-[15px] text-center font-normal mb-1 transition-colors duration-300 leading-3 uppercase">
      <p className="text-[15px] w-[230px]">
        Mayank (he/him) is an independent Frontend Developer from Thailand
      </p>
      <p className="text-[15px] w-[230px]">
        passionate about creating unforgettable and beautiful digital
        experiences.
      </p>
    </div>
  );
});

LowerText.displayName = "LowerText";

export default LowerText;

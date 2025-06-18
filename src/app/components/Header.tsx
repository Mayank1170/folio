import React, { forwardRef } from "react";

const Header = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      data-header
      className="fixed w-full flex mt-10 mx-5 flex-row items-center justify-between top-0 left-0 z-50 text-black"
      style={{
        opacity: 0,
      }}
    >
      <h3 className="text-[10px] flex flex-col font-normal mb-1 transition-colors duration-300">
        Open for any{" "}
        <span className="text-[10px]">collaboration and offers </span>
      </h3>
      <p className="text-[10px] flex flex-col font-normal mb-1 mr-10 transition-colors duration-300">
        Folio <span className="text-[10px] -ml-5">Vol.1 —</span>
      </p>
    </div>
  );
});

Header.displayName = "Header";

export default Header;

import React from "react";
import Image from "next/image";
import Pulse from "@/public/pulse.png";

const Nav = () => {
  return (
    <div>
      <nav className="w-full bg-white border-2 border-gray-200 shadow-2xl py-5 fixed top-0 left-0 z-50">
        <div className="px-32">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center">
              <Image src={Pulse} alt="" width={30} height={30} />
            </div>

            <div className="flex flex-col space-y-2">
              <div className="text-xl font-bold text-blue-800">
                DiabetesPredict
              </div>
              <div className="text-sm text-gray-500 -mt-1">
                AI-Powered Risk Assessment
              </div>
            </div>
          </div>
        </div>
      </nav>
      {/* To prevent content from hiding behind navbar */}
      <div className="h-20"></div>
    </div>
  );
};

export default Nav;

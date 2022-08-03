import React from "react";

export default function Navbar() {
  return (
    <div className="p-4 bg-black text-white transition-all duration-200 ease-in-out">
      <div className="flex justify-between">
        {/* Navbar Title */}
        <div className="bg-gradient-to-tr from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent w-min font-bold text-2xl">
          Dodzs.dev
        </div>
      </div>
    </div>
  );
}

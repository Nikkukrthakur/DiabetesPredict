import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-4xl">
          <div>
            <div className="text-white text-lg font-semibold flex justify-center items-center space-x-2">
              <span>⚡</span>
              <span>DiabetesPredict</span>
            </div>
            <ul className="mt-4 text-sm space-y-2">
              <li>About Us</li>
              <li>Contact</li>
              <li>Terms of Service</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="text-sm space-y-2">
              <li>FAQ</li>
              <li>Help Center</li>
              <li>Community Forum</li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="text-sm space-y-2">
              <li>Medical Articles</li>
              <li>Research Papers</li>
              <li>Download App</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-6 w-full text-center text-gray-500 text-sm">
          © 2025 <span className="text-white">DiabetesPredict</span> AI. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

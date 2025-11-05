import React from "react";

const footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 py-10 px-6 text-center">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-40">
          <div >
            <div className="text-white text-lg font-semibold flex items-center">
              <div>⚡</div> DiabetesPredict
            </div>
            <ul className="mt-4 text-sm space-y-2">
              <li>About Us</li>
              <li>Contact</li>

              <li>Terms of Service</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-3">Support</h3>
            <ul className="text-sm space-y-2">
              <li>FAQ</li>
              <li>Help Center</li>
              <li>Community Forum</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-3">Resources</h3>
            <ul className="text-sm space-y-2">
              <li>Medical Articles</li>
              <li>Research Papers</li>
              <li>Download App</li>
            </ul>
          </div>

          {/* Bottom Line */}
          <div className="text-center text-gray-500 text-md ">
            © 2025 DiabetesPredict AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default footer;

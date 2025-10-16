import React from "react";

const FarmerFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-center text-white py-3 mt-5"
      style={{
        background: "linear-gradient(90deg, #004d00, #228B22)",
      }}
    >
      <div className="container">
        <p className="mb-1">
          &copy; {currentYear} Farmer Panel. All rights reserved.
        </p>
        <div>
          <a href="/terms" className="text-white me-3 text-decoration-none">
            Terms
          </a>
          <a href="/privacy" className="text-white me-3 text-decoration-none">
            Privacy
          </a>
          <a href="/contact" className="text-white text-decoration-none">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FarmerFooter;

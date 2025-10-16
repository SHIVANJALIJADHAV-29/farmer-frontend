import React from "react";

const CustomerFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-white py-4 mt-5"
      style={{ background: "linear-gradient(90deg, #023e8a, #0096c7)" }}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        <p className="mb-2 mb-md-0">
          &copy; {currentYear} Customer Portal. All rights reserved.
        </p>
        <div>
          <a href="/customer/terms" className="text-warning me-3">
            Terms
          </a>
          <a href="/customer/privacy" className="text-warning me-3">
            Privacy
          </a>
          <a href="/customer/help" className="text-warning">
            Help
          </a>
        </div>
      </div>
    </footer>
  );
};

export default CustomerFooter;

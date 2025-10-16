import React from "react";

const AdminFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="text-white mt-5 shadow-lg"
      style={{
        background: "linear-gradient(90deg,#1e3c72, #2a5298, #4b6cb7)",
        padding: "1.5rem 0",
      }}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center text-warning">
        <p className="mb-2 mb-md-0 fw-medium">
          &copy; {currentYear} 🌿 Admin Panel. All rights reserved.
        </p>
        <div className="d-flex gap-3">
          <a
            href="/terms"
            className="text-warning text-decoration-none fw-semibold hover-effect"
          >
            Terms
          </a>
          <a
            href="/privacy"
            className="text-warning text-decoration-none fw-semibold hover-effect"
          >
            Privacy
          </a>
          <a
            href="/contact"
            className="text-warning text-decoration-none fw-semibold hover-effect"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default AdminFooter;

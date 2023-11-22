import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div className="container d-flex justify-content-center pt-1 pb-2 text-center">
      <div className="row">
        <div className="col-12">
          <div className="text-dark text-center pt-4 pb-2">
          © {currentYear} BPCL. All rights reserved | Designed, Developed &
            Maintained by 
            <a href="https://tdtl.world" style={{ textDecoration: "none" }}>
               The DataTech Labs Inc
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

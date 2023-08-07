import React from "react";
import "./Header.css";
import Logo from "../../images/header-logo.png";

function Header() {
  return (
    <header className="header">
      <div className="header--div">
        <div className="logo">
          <img src={Logo} height={65} alt="Logo" />
        </div>
        <h2 className="header--title">Ghibli Universe</h2>
      </div>
    </header>
  );
}

export default Header;

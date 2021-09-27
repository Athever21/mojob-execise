import React from "react";
import "@/styles/Header.scss";
//@ts-ignore
import Logo from "@/assets/mojob_logo_on_white.png";

const Header = () => {
  return(
    <header>
      <img src={Logo} alt="logo" className="logo"/>
    </header>
  )
}

export default Header;
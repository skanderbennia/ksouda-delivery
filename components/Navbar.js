import Image from "next/image";
import React from "react";
import Logo from "../assets/images/logo.png";
export default function Navbar(props) {
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <a href="#" style={{ position: "absolute", top: -40, left: 30 }}>
                <Image src={Logo} width={160} height={160} />
              </a>

              <ul className="nav">
                <li>
                  <a href="#welcome" className="active">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#features">About</a>
                </li>
                <li>
                  <a href="#testimonials">Testimonials</a>
                </li>
                <li>
                  <a href="#contact-us">Contact Us</a>
                </li>
                <li>
                  <a
                    className="login-button"
                    onClick={() => {
                      props.setShowModal(true);
                    }}
                  >
                    Login
                  </a>
                </li>
              </ul>
              <a className="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

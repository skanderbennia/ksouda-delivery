import Image from "next/image";
import React from "react";
import Logo from "../assets/images/logo.png";
export default function Navbar(props) {
  return (
    <header class="header-area header-sticky">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <nav class="main-nav">
              <a href="#" class="logo">
                <Image src={Logo} alt="Softy Pinko" />
              </a>

              <ul class="nav">
                <li>
                  <a href="#welcome" class="active">
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
                    class="login-button"
                    onClick={() => {
                      props.setShowModal(true);
                    }}
                  >
                    Login
                  </a>
                </li>
              </ul>
              <a class="menu-trigger">
                <span>Menu</span>
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

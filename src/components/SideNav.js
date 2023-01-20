import logo from "../assets/img/profile.jpg";

// import {
//   Container,
//   Row,
//   Col,
//   Form,
//   Input,
//   Button,
//   Navbar,
//   Nav,
//   NavbarBrand,
//   NavLink,
//   NavItem,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";

const AVATAR =
  "https://www.gravatar.com/avatar/429e504af19fc3e1cfa5c4326ef3394c?s=240&d=mm&r=pg";

const SideNav = () => (
  <nav
    className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
    id="sideNav"
  >
    <a className="navbar-brand js-scroll-trigger" href="#page-top">
      <span className="d-block d-lg-none">Brittany Johns</span>
      <span className="d-none d-lg-block">
        <img
          className="img-fluid img-profile rounded-circle mx-auto mb-2"
          src={logo}
          alt="..."
        />
      </span>
    </a>
    <button
      id="sideNav-btn"
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarResponsive"
      aria-controls="navbarResponsive"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarResponsivex">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" href="#about">
            About
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" href="#experience">
            Experience
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" href="#education">
            Education
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" href="#skills">
            Skills
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link js-scroll-trigger" href="#projects">
            Projects
          </a>
        </li>
      </ul>
    </div>
  </nav>
);

export default SideNav;

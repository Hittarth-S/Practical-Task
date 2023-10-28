import { Nav, Navbar, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <header className="header-3-desktop">
        <div className="container">
          <div className="header-wrap">
            <div className="left-section">
              <Link to='/account' className="link-item">ACCOUNT</Link>
            </div>
            <div className="center-section">
              <Link to='/' className="link-item" >HOME</Link>
            </div>
            <div className="right-section">
              <Link to='/shop' className="link-item" >SHOP</Link>
            </div>
          </div>
        </div>
      </header>

      {/* MOBIE HEADER */}
      <header className="header-3-mobile">
        <div className="container">
          <div className="header-links">
            <div className="logo-box">
              LOGO
            </div>
            <div className="navigation-links">
              <Navbar expand="lg">
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Offcanvas id="offcanvas-expand-lg" placement="end">
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id="offcanvas-expand-lg">
                      <Link to="/" className="text-decoration-none">
                        <div className="logo-box text-black">
                          LOGO
                        </div>
                      </Link>
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="main-menu">
                      <Nav.Link href='/' className="menu-link">HOME</Nav.Link>
                      <Nav.Link href='/account' className="menu-link">ACCOUNT</Nav.Link>
                      <Nav.Link href='/shop' className="menu-link">SHOP</Nav.Link>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Navbar>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

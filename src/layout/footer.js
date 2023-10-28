/* ICONS */
import { BsFacebook } from "react-icons/bs";
import { AiFillInstagram, AiFillLinkedin, AiOutlineInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="footer-3">
      <div className="container">
        <div className="row footer-main">
          <div className="col-xl-12 col-sm-12">
            <h4 className="user-name">WEBSITE.</h4>
          </div>
          <div className="col-xl-12 col-sm-12">
            <div className="user-details">
              <div className="details-box">
                <h5>HITTARTH V. SOLANKI</h5>
                <p><AiOutlineInstagram color="#323232" size="18" /> #hittarth911</p>
              </div>
              <div className="details-box">
                <h5>EMAIL ADDRESS</h5>
                <a href="mailto:hittarth.work@gmail.com">
                  hittarth.work@gmail.com
                </a>
              </div>
              <div className="details-box">
                <h5>PHONE</h5>
                <a href="tel:+917265849365">(726) 584-9365</a>
              </div>
              <div className="details-box">
                <h5>ADDRESS</h5>
                <a
                  href="https://goo.gl/maps/dGB7bR1pBhzRCYjX6"
                  target="_blank"
                  rel="noreferrer"
                >
                  Vadodara, Gujarat - 390016
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-main">
          <h5>
            © 2023 . ALL RIGHTS RESERVERD.

          </h5>
          <div className="links">
            <a
              href="https://www.facebook.com/hittarth.solanki.911/"
              target="_blank"
              rel="noreferrer"
              className="social-media-box"
            >
              <BsFacebook color="#323232" size="18" />
            </a>
            <a
              href="https://www.instagram.com/hittarth911"
              target="_blank"
              rel="noreferrer"
              className="social-media-box"
            >
              <AiFillInstagram color="#323232" size="18" />
            </a>
            <a
              href="www.linkedin.com/in/hittarthsolanki911"
              target="_blank"
              rel="noreferrer"
              className="social-media-box"
            >
              <AiFillLinkedin color="#323232" size="18" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

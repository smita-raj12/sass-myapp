import React from "react";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Subscribe from "../subscribe/Subscribe";
import Menu from "./Menu";
import SubMenu from "./SubMenu";
import Image from "../Image/Image";
import ImageContain from "../Image/ImageContain";

function Footer(props) {
  const Year = new Date().getFullYear();

  const background = {
    position: 'relative',
  };
  const bgOverlay = {
    // backgroundColor: "rgba(151, 166, 141, .3)",
    position: 'relative',
    zIndex: 1
  };

  const socialLogo = {
    height: 60,
    width: 60,
    display: "inline-block",
    position: "relative",
  };
  const imgBlur = {
    filter: "blur(8px)"
  }
  const logoStyle = {
    height: '100%', 
    width: '100%', 
    position: "relative" ,
    boxShadow: "4px 4px 4px grey",
    borderRadius: 50,
    backgroundColor: "#FFFFFF65" ,
    hover: {
      backgroundColor: "#0D47A1 !important"
    },
  }
  return (
    <div className="bg-primary" style={background}>
    <div style={imgBlur}>
      <Image
        className="object-center object-cover pointer-events-none"
        src={"https://api.element-storm-cart.viewmynew.com/media/6205811e49be6_green-with-blur.jpg"}
        alt={"Green With Blur"}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>
      <div style={bgOverlay}>
        <div className="h-100 w-100 px-5 pb-2 pt-4">
          <Row id="footer">
            <Col sm={12} md={9} className="d-flex">
              <Row>
                <Col sm={12} className="d-flex justify-content-center">
                  <Menu menu={props.menu} />
                </Col>
                <Col sm={12} md={4}>
                  <div style={logoStyle}>
                    <ImageContain
                      src="https://api.element-storm-cart.viewmynew.com/media/6205a1e7e959b_Shay-logo-dark.png"
                      alt="Shay And Company Logo"
                    />
                  </div>
                </Col>
                <Col
                  sm={12}
                  md={8}
                  className="d-flex justify-content-center align-items-center"
                >
                  <SubMenu menu={props.subMenu} />
                </Col>
              </Row>
            </Col>
            <Col sm={12} md={3} className="d-flex flex-column align-items-end">
            <div className="bg-dark">

              <p className=" d-flex flex-wrap align-items-center fs- 6 pt-3 text-start m-0 w-100 text-white">
                Sign up to receive exclusive offers
              </p>
              <div className="d-flex pt-3 pb-0">
                <Subscribe buttonColor="warning" />
              </div>
              <br />
              <br />
            </div>
              <a
                className="text-decoration-none text-dark text-capitalize"
                rel="noreferrer"
                target="_blank"
                href="https://goo.gl/maps/nEuCTFu7ySUpUcWK7"
              >
                10639 SE Fuller Rd
                <br />
                Portland, OR 97222
              </a>
              <br />
              <a
                className="text-decoration-none text-dark"
                href="tel:(503) 653-1155"
              >
                (503) 653-1155
              </a>
              <a
                className="text-decoration-none text-dark"
                href="mailto:orders@shayandcompany.com"
              >
                orders@shayandcompany.com
              </a>
              <br />
              <br />
              <div>
                <a target="_blank" rel="noreferrer" href="https://www.facebook.com/ShayandCompany/">
                  <div style={socialLogo}>
                    <Image
                      alt="Facebook"
                      src="https://api.element-storm-cart.viewmynew.com/media/620162be32f73_ig.png"
                    />
                  </div>
                </a>
                <a target="_blank" rel="noreferrer" href="https://www.instagram.com/shayandcompany/">
                  <div style={socialLogo}>
                    <Image
                      alt="Instagram"
                      src="https://api.element-storm-cart.viewmynew.com/media/62015fa0b4d7e_facebook-logo-png-38360.png"
                    />
                  </div>
                </a>
              </div>
            </Col>
          </Row>
          <div className="d-flex justify-content-between">
            <div className="pt-3">
              <p className="bg-light">
                ©{Year} Shay And Company, .Inc - All Rights Reserved
              </p>
            </div>
            <div>
              <div className="mx-2 bg-light">
                <a
                  href="https://www.neturf.com"
                  rel="noreferrer"
                  target="_blank"
                  title="Website Application Powered by: Neturf"
                >
                  Powered by: Neturf
                </a>{" "}
                |{" "}
                <a
                  href="https://www.advertisingsolutions.agency"
                  rel="noreferrer"
                  target="_blank"
                  title="Website Application Managed by: Advertising Solutions"
                >
                  Managed by: Ad Sol
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

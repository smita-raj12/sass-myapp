import React, { useState } from "react";
import { useRouter } from "next/router";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import CallToAction from "../callToAction/CallToAction";
import UserBubble from "../userBubble/UserBubble";
import NavCart from "../navCart/NavCart";
import Menu from "./Menu";

function Header(props) {
  const router = useRouter();
  const [fSearch, setfSearch] = useState("");

  const headerBg = {
    backgroundImage:
      "url('https://api.cloudapi.viewmynew.com/media/620172b976c53_weathered%20-wood.webp')",
    backgroundPosition: "bottom",
    backgroundSize: "100% auto",
  };
  const bgOverlay = {
    backgroundColor: "#FFFFFFA4",
  };
  const logoBg = {
    height: "100%",
    borderRadius: 50,
    boxShadow: "0 0 30px #FFFFFFF6",
    backgroundColor: "#FFFFFF65",
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (fSearch) {
      router.push(`/search?search=${fSearch}`);
    }
  }

  return (
    <header>
      <div className="headerLogoContainer" style={headerBg}>
        <div className="py-2" style={bgOverlay}>
          <Container className="d-flex justify-content-between align-items-center">
            <div style={logoBg}>
            <a href={"/"}>
              <img
                src="https://api.cloudapi.viewmynew.com/media/61cc83b886fa6_Shay-and-company-logo.svg"
                alt="Shay And Company Logo"
                className="HeaderLogo"
              />
              </a>
              </div>
            <p
              className="headerText test-uppercase fw-bold text-center"
              style={{ width: 350 }}
            >
              <CallToAction />
            </p>
          </Container>
        </div>
      </div>

      <Navbar bg="info" variant="shay" expand="md" className="py-0">
        <Container>
          <Navbar.Toggle aria-controls="shay-navbar-nav" />
          <Navbar.Collapse className="shay-navbar-nav" id="main_nav">
            <Menu menu={props.menu} />
          </Navbar.Collapse>
          <Nav className="d-flex flex-row align-items-center">
            <Form
              onSubmit={(e) => handleSubmit(e)}
              className="input-group d-flex align-items-center"
            >
              <Form.Control
                type="search"
                size="sm"
                placeholder="Search"
                aria-label="Search"
                value={fSearch}
                onChange={(e) => setfSearch(e.target.value)}
              />
              <span className="input-group-append">
                <Button
                  variant="outline-warning"
                  size="sm"
                  type="submit"
                  className="ms-n5 text-light border-0"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </Button>
              </span>
            </Form>
            <NavCart />
            <UserBubble />
          </Nav>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;

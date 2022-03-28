import React, { useState } from 'react';
import Title from '../Title/Title'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Dropdown from 'react-bootstrap/Dropdown'
import NavItem from 'react-bootstrap/NavItem'
import NavLink from 'react-bootstrap/NavLink'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import useWindowDimensions from '../../utilities/useWindowDimensions'


const Menu = ({ menu }) => {
    let listItems = null;
    if (menu) {
        listItems = <NavLoop links={menu.data.menu.data.links} />
    }
    return (
        <Nav className="me-auto">
            {listItems}
        </Nav>
    );
};

export default Menu;

function NavLoop(props) {
    let listItems = props.links.map((Item) => {
        return <First key={Item.id} Item={Item} />
    });
    return listItems;
}

function First(props) {
    if (props.Item.type === "link") {
        return (<NavLinkFun key={props.Item.id} id={props.Item.id} url={props.Item.url} title={props.Item.title} />);
    } else if (props.Item.type === "dropdown") {
        return (<FirstDropDown Item={props.Item} Icon={false} />)
    }
}

function FirstDropDown(props) {
    const listItemsDrop = props.Item.links.map((Item) => {
        if (Item.type === "link") {
            return (<NavDropdownItem color={Item.color} sm={Item.sm ? Item.sm : null} md={Item.md ? Item.md : null} lg={Item.lg ? Item.lg : null} key={Item.id} id={Item.id} url={Item.url} title={Item.title} />);
        } else if (Item.type === "dropdown") {
            return (<SecondDropDown Item={Item} Icon={true} />);
        }
    });
    return (<DropdownFuntion Icon={props.Icon} Item={props.Item} listItemsDrop={listItemsDrop} />);
}

function SecondDropDown(props) {
    const listItemsDrop = props.Item.links.map((Item) => {
        if (Item.type === "link") {
            return (<NavDropdownItem color={Item.color} sm={Item.sm ? Item.sm : null} md={Item.md ? Item.md : null} lg={Item.lg ? Item.lg : null} key={Item.id} id={Item.id} url={Item.url} title={Item.title} />);
        } else if (Item.type === "dropdown") {
            return (<SecondDropDown Item={Item} Icon={true} />);
        }
    });
    return (
        <Col sm={12} md={6} lg={4}>
            <DropdownFuntion Icon={props.Icon} Item={props.Item} listItemsDrop={listItemsDrop} />
        </Col>
    );
}

function NavLinkFun(props) {
    return (
        <Nav.Link key={props.id} href={props.url}>
            {props.title}
        </Nav.Link>
    );
}

function NavDropdownItem(props) {
    return (
        <Col sm={props.sm ? props.sm : 12} md={props.md ? props.md : 6} lg={props.lg ? props.lg : 4}>
            <NavDropdown.Item key={props.id} href={props.url} className={props.color ? 'bg-warning text-white' : null}>
                <Title as={'span'} Size={"m-0 p-0"} Width={"15"} Name={props.title} />
            </NavDropdown.Item>
        </Col>
    );
}

function NavDropdownTitle(props) {
    return (<Title as={'span'} Size={"m-0 p-0"} Width={"15"} Name={props.title} SpanClass={"shay-nav-dropdown"} />);
}


function DropdownFuntion(props) {
    const [isShown, setIsShown] = useState(false);
    const { width } = useWindowDimensions();
    if(width >= 767) {
        return (
            <Dropdown show={isShown} as={NavItem} navbar={true} style={!props.Icon ? { position: "unset" } : null}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            >
                <Dropdown.Toggle as={NavLink} className={props.Icon ? "d-flex justify-content-center align-items-center" : null}>
                    {props.Icon ?
                        <NavDropdownTitle title={props.Item.title} /> : props.Item.title}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "100%", paddingTop: 0, marginTop: 0 }}>
                    <Row>
                        {props.listItemsDrop}
                    </Row>
                </Dropdown.Menu>
            </Dropdown>
        );
    } else {
        return (
            <Dropdown as={NavItem} navbar={true} style={!props.Icon ? { position: "unset" } : null}
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}
            >
                <Dropdown.Toggle as={NavLink} className={props.Icon ? "d-flex justify-content-center align-items-center" : null}>
                    {props.Icon ?
                        <NavDropdownTitle title={props.Item.title} /> : props.Item.title}
                </Dropdown.Toggle>
                <Dropdown.Menu style={{ width: "100%", paddingTop: 0, marginTop: 0 }}>
                    <Row>
                        {props.listItemsDrop}
                    </Row>
                </Dropdown.Menu>
            </Dropdown>
        );
    }
}
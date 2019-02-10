import React, { Component } from 'react'
import { Navbar, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

export default class OldHeader extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNavOpen: false
        };
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav() {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    renderDietLinks = () =>{
        return (
            this.props.diets.map((diets) => (
                <DropdownItem>
                    <NavLink className="nav-link" to={`/woe/${diets.id}`}>
                        <span>{diets.name}</span>
                    </NavLink>
                </DropdownItem>
            ))
        )
    }

    render() {
        return (
            <div>
                <Navbar light expand="md">
                    <div className="container">
                        <NavbarToggler onClick={this.toggleNav} />
                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem>
                                <NavLink className="nav-link" to="/">
                                            <span className="fa fa-home fa-lg"></span> Home
                                        </NavLink>
                                </NavItem>
                                <UncontrolledDropdown nav inNavbar>
                                    <DropdownToggle nav caret>
                                        Dietary Restrictions
                                    </DropdownToggle>
                                    <DropdownMenu>
                                        {this.renderDietLinks()}
                                        <DropdownItem>
                                        <NavLink className="nav-link" to="/woe">
                                            <span className="fa fa-home fa-lg"></span> View
                                        </NavLink>
                                        </DropdownItem>
                                    </DropdownMenu>
                                </UncontrolledDropdown>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>
            </div>
        )
    }
}
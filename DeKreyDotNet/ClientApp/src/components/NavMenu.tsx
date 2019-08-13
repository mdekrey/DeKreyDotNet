import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component<{}, { collapsed: boolean }> {
  static displayName = NavMenu.name;

  constructor(props: {}) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render() {
    return (
      <header>
        <Link to="/">DeKreyDotNet</Link>
        <ul className="navbar-nav flex-grow">
          <li>
            <Link className="text-dark" to="/">Home</Link>
          </li>
        </ul>
      </header>
    );
  }
}

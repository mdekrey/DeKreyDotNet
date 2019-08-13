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
      <header className="NavMenu">
        {/*  */}
        <Link to="/">DeKrey.Net</Link>
        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul> */}
      </header>
    );
  }
}

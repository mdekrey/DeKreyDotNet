import React from 'react';
import { NavMenu } from './NavMenu';
import './Layout.css';

export function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="Layout">
      <NavMenu />
      <section className="content">
        {children}
      </section>
    </div>
  );
}

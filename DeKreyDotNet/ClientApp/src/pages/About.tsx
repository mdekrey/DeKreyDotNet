import React from 'react';
import './About.css';


export function About() {
    return (
      <div className="About">

        <img src={require("../images/headshot.jpg")} className="profile-photo" alt="Matt DeKrey headshot" />

        <h1>About Matt DeKrey</h1>

        <p>Hello, World! I'm a software developer, architect, and gamer. I enjoy learning and sharing what I've discovered. </p>

        <h2>Other sites</h2>
        <ul>
          <li><a href="https://medium.com/@matt.dekrey">Matt DeKrey's Medium</a></li>
          <li><a href="https://github.com/mdekrey">Matt DeKrey's GitHub</a></li>
          <li><a href="https://twitter.com/mdekrey">Matt DeKrey's Twitter Profile</a></li>
          <li><a href="https://www.linkedin.com/in/mattdekrey/">Matt DeKrey's LinkedIn</a></li>

        </ul>
      </div>
    );
}

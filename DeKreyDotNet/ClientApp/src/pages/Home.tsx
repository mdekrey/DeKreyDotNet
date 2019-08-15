import React from 'react';
import './Home.css';
import { MediumWidget } from '../components/MediumWidget';


export function Home() {
    return (
      <div className="Home">
        <img src={require("../images/headshot.jpg")} className="profile-photo" />

        <h1>About Matt DeKrey</h1>

        <p>Hello, World! I'm a software developer, architect, and gamer. I enjoy learning and sharing what I've discovered. </p>

        <section className="content">
          <section className="content-main">
            <h2>Recent articles</h2>

            <MediumWidget url="https://medium.com/@matt.dekrey/a-better-git-branching-model-b3bc8b73e472"/>
          </section>

          <section className="content-secondary">
          <h2>Other sites</h2>
            <ul>
              <li><a href="https://medium.com/@matt.dekrey">Matt DeKrey's Medium</a></li>
              <li><a href="https://github.com/mdekrey">Matt DeKrey's GitHub</a></li>
              <li><a href="https://twitter.com/mdekrey">Matt DeKrey's Twitter Profile</a></li>
              <li><a href="https://www.linkedin.com/in/mattdekrey/">Matt DeKrey's LinkedIn</a></li>

            </ul>
          </section>
        </section>
      </div>
    );
}

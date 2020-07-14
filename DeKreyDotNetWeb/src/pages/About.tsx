import React from 'react';
import './About.css';

export function About() {
    return (
      <div className="About">

        <img src={require("../images/headshot.jpg")} className="profile-photo" alt="Matt DeKrey headshot" />

        <h1>About Matt DeKrey</h1>

        <p>Hello, World! I'm a software developer, architect, and gamer. I enjoy learning and sharing what I've discovered. </p>

        <p>
            I've worked in a large number of industries, including game development, advertising, eDiscovery,
            e-commerce, robotics, and more. Applying old patterns in new ways is exciting, and leads to innovations
            or surprise flexibility for products and teams I work with.
        </p>

        <p>
            Software engineering itself is a craft that we, as developers, are still learning. It's too new of an
            industry for anyone to have learned the right way to solve even the tasks they're familiar with, let alone
            all of the problems that could be encountered. I try to remember this as I work with other developers,
            as everyone has to learn the "common knowledge" at some point.
            Learning is an exciting thing, whether you're the one doing the learning or merely being the catalyst.
            Understanding how computers work and the study of the patterns that arise in development can be treated as
            a science, and it is beneficial to do so, but most companies approach it more like hiring expert and
            apprentice craftsmen. As a result, the impostor syndrome is inherent with this young industry. And, of
            course, I'm still learning, too. So don't be surprised when I am so ready to admit that I don't know.
        </p>

        <h2>Other sites</h2>
        <ul>
          <li><a href="https://www.linkedin.com/in/mattdekrey/">Matt DeKrey's LinkedIn</a></li>
          <li><a href="https://medium.com/@matt.dekrey">Matt DeKrey's Medium</a></li>
          <li><a href="https://github.com/mdekrey">Matt DeKrey's GitHub</a></li>
          <li><a href="https://twitter.com/mdekrey">Matt DeKrey's Twitter Profile</a></li>

        </ul>
      </div>
    );
}

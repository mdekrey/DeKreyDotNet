import React from 'react';
import headshotUrl from 'src/images/headshot.jpg';
import Layout from '../components/layout';
import SEO from '../components/seo';

const AboutPage = () => {
	return (
		<Layout>
			<SEO title="About Matt DeKrey" image={headshotUrl.src} />

			<img
				src={headshotUrl.src}
				className="rounded-full w-20 h-20 inline-flex items-center justify-center float-left m-2"
				alt="Matt DeKrey headshot"
			/>

			<h1 className="font-bold mb-4 text-4xl">About Matt DeKrey</h1>

			<p className="my-4">
				Hello, World! I'm a software developer, architect, and gamer. I enjoy learning and sharing what I've discovered.{' '}
			</p>

			<p className="my-4">
				My teams tell me that I do things about 10° off from the rest of the industry. I say that if our use-case was
				the exact same as everyone else's, we wouldn't be the ones asked to do it.
			</p>

			<p className="my-4">
				I've worked in a large number of industries, including game development, advertising, eDiscovery, e-commerce,
				robotics, and more. Applying old patterns in new ways is exciting, and leads to innovations or surprise
				flexibility for products and teams I work with.
			</p>

			<p className="my-4">
				I believe that software engineering itself is a craft that we, as developers, are still learning. It's too new
				of an industry for anyone to have learned the right way to solve even the tasks they're familiar with, let alone
				all of the problems that could be encountered. I try to remember this as I work with other developers, as
				everyone has to learn the "common knowledge" at some point. Learning is an exciting thing, whether you're the
				one doing the learning or merely being the catalyst. Understanding how computers work and the study of the
				patterns that arise in development can be treated as a science, and it is beneficial to do so, but most
				companies approach it more like hiring expert and apprentice craftsmen. As a result, the impostor syndrome is
				inherent with this young industry. And, of course, I'm still learning, too. So don't be surprised when I am so
				ready to admit that I don't know.
			</p>

			<h2 className="font-bold mb-4 text-3xl">Other sites</h2>
			<ul className="my-4">
				<li className="my-4">
					<a className="underline font-bold" href="https://www.linkedin.com/in/mattdekrey/">
						Matt DeKrey's LinkedIn
					</a>
				</li>
				{/* <li className="my-4"><a className="underline font-bold" href="https://medium.com/@matt.dekrey">Matt DeKrey's Medium</a></li> */}
				<li className="my-4">
					<a className="underline font-bold" href="https://github.com/mdekrey">
						Matt DeKrey's GitHub
					</a>
				</li>
				<li className="my-4">
					<a className="underline font-bold" href="https://twitter.com/mdekrey">
						Matt DeKrey's Twitter Profile
					</a>
				</li>
			</ul>
		</Layout>
	);
};

export default AboutPage;

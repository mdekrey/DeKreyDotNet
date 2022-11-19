import React from 'react';
import { linkClassName } from 'src/components/styles';
import headshotUrl from 'src/images/headshot.jpg';
import { twMerge } from 'tailwind-merge';
import Layout from '../components/layout';
import SEO from '../components/seo';

const Emphasis = ({ className, ...props }: JSX.IntrinsicElements['span']) => (
	<span className={twMerge('font-bold text-lg font-serif', className)} {...props} />
);

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
				Hello, World! I'm a software developer, architect, and gamer. I enjoy learning and sharing what I've discovered.
			</p>

			<p className="my-4">
				Before anything more, you should know I believe in the{' '}
				<a href="https://en.wikipedia.org/wiki/Paradox_of_tolerance" className={linkClassName}>
					paradox of tolerance
				</a>
				. I believe <Emphasis>Black Lives Matter</Emphasis>. I believe <Emphasis>trans women are women</Emphasis>, and{' '}
				<Emphasis>trans men are men</Emphasis>. I believe that <Emphasis>love is love</Emphasis>. I believe that
				abortion is a hard enough decision without the government getting involved, and that{' '}
				<Emphasis>abortion is a private right</Emphasis>. I believe <Emphasis>workers rights are civil rights</Emphasis>{' '}
				and <Emphasis>civil rights are more important than property rights</Emphasis>. I do my best to support my fellow
				neurodivergent people in my life (and at work), and I know I have a lot to learn and try to keep an open mind
				and constantly do better than yesterday.
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
			<p className="my-4">
				<span className="font-bold text-red-700">Notice: </span>It has come to my attention that at least once I have
				been impersonated on freelancing sites. Please be aware that, if I am freelancing, the link will be posted
				above. I am currently not available for freelancing work (unless I know you personally, and then we will talk
				verbally before making any arrangements.) However, I am very proud of the team I've helped build and lead at{' '}
				<a href="https://principlestudios.com" className={linkClassName}>
					Principle Studios
				</a>
				; if you are interested in working with me, please contact them or let me know that you're interested in being
				put in touch!
			</p>
		</Layout>
	);
};

export default AboutPage;

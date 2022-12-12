import React from 'react';
import { ExplosionScene } from 'src/3d/explosion-scene';
import Layout from '../components/layout';
import Content2 from '../articles/automated-git-refactorings/index.mdx';

const CanvasPage = () => {
	return (
		<Layout>
			<ExplosionScene />
			<Content2 />
		</Layout>
	);
};

export default CanvasPage;

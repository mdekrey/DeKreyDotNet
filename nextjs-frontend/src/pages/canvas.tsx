import React, { useMemo } from 'react';
import { ThreeCanvas } from 'src/components/animation-container';
import * as THREE from 'three';
import Layout from '../components/layout';

const CanvasPage = () => {
	const { scene, onFrame } = useMemo(() => {
		const scene = new THREE.Scene();

		const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
		const material = new THREE.MeshNormalMaterial();

		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);

		return {
			scene,
			onFrame: (time: number) => {
				mesh.rotation.x = time / 2000;
				mesh.rotation.y = time / 1000;
			},
		};
	}, []);

	return (
		<Layout>
			<div className="bg-black">
				<ThreeCanvas className="w-full" scene={scene} onFrame={onFrame} />
			</div>
		</Layout>
	);
};

export default CanvasPage;

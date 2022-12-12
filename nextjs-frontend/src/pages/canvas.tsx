import React, { useMemo } from 'react';
import { ThreeCanvas } from 'src/components/animation-container';
import * as THREE from 'three';
import Layout from '../components/layout';
import fireballUrl from 'src/3d/fireball.png';
import fireballEmissionUrl from 'src/3d/fireball-emission.png';

import vertexShader from 'src/3d/particles-vertex-shader.glsl';
import fragmentShader from 'src/3d/particles-fragment-shader.glsl';
import { ParticleSystem } from 'src/3d/particle-system';

const CanvasPage = () => {
	const { onFrame } = useMemo(() => {
		if (typeof window === 'undefined') {
			return { scene: null, onFrame: null };
		}

		const camera = new THREE.PerspectiveCamera(75, 0.75, 1, 2000);
		camera.position.z = 10;

		const textureLoader = new THREE.TextureLoader();

		const particleSystem = new ParticleSystem({
			emissionRate: 20,
			material: new THREE.RawShaderMaterial({
				uniforms: {
					pointTexture: { value: textureLoader.load(fireballUrl.src) },
					emissionTexture: { value: textureLoader.load(fireballEmissionUrl.src) },
					emissionColor: { value: new THREE.Color(23.9686279, 7.78039217, 0.376470596) },
					horizontalSprites: { value: 7 },
					verticalSprites: { value: 7 },
				},
				vertexShader: vertexShader,
				fragmentShader: fragmentShader,

				blending: THREE.AdditiveBlending,
				depthTest: false,

				glslVersion: THREE.GLSL3,
			}),
			geometry: new THREE.PlaneGeometry(1, 1, 1, 1),
			particleCount: 20,
			particleLifetime: 1,
			particleStructure: ['time', 'translate', 'translate', 'translate', 'rotation', 'size'],
			initializeParticle() {
				const xyz = Array(3)
					.fill(0)
					.map(() => (Math.random() - 0.5) * 3);

				return [0, ...xyz, Math.PI * 2 * Math.random(), 5];
			},
			updateParticle(particleVertexBuffer, { time, isActive }, deltaSeconds) {
				particleVertexBuffer[time] = particleVertexBuffer[time] + deltaSeconds;
				if (particleVertexBuffer[time] > 1) particleVertexBuffer[isActive] = 0;
			},
		});

		const scene = new THREE.Scene();
		scene.add(particleSystem);

		let lastTime = performance.now();

		return {
			onFrame({ canvas }: { canvas: HTMLCanvasElement; time: number }) {
				const time = performance.now();
				const deltaTime = time - lastTime;
				lastTime = time;

				const deltaSeconds = deltaTime / 1000;
				particleSystem.update(deltaSeconds);

				camera.aspect = canvas.clientWidth / canvas.clientHeight;
				camera.updateProjectionMatrix();

				return { scene, camera };
			},
		};
	}, []);

	return <Layout>{onFrame && <ThreeCanvas className="w-full h-96" onFrame={onFrame} />}</Layout>;
};

export default CanvasPage;

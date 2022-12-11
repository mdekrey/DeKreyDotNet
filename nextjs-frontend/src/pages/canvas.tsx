import React, { useMemo } from 'react';
import { ThreeCanvas } from 'src/components/animation-container';
import * as THREE from 'three';
import Layout from '../components/layout';
import fireballUrl from 'src/3d/fireball.png';
import fireballEmissionUrl from 'src/3d/fireball-emission.png';

import vertexShader from 'src/3d/particles-vertex-shader.glsl';
import fragmentShader from 'src/3d/particles-fragment-shader.glsl';

const CanvasPage = () => {
	const { onFrame } = useMemo(() => {
		if (typeof window === 'undefined') {
			return { scene: null, onFrame: null };
		}

		const camera = new THREE.PerspectiveCamera(75, 0.75, 1, 2000);
		camera.position.z = 10;

		const scene = new THREE.Scene();

		const offsetSize = 9;
		type Vector3 = [x: number, y: number, z: number];
		type ParticleStructure = [active: number, ...position: Vector3, rotation: number, size: number, time: number];
		const positionOffset = 1;
		const rotationOffset = positionOffset + 3;
		const sizeOffset = rotationOffset + 1;
		const timeOffset = sizeOffset + 1;

		const spriteCount = 10;
		const particleVertexBuffer = new Float32Array(spriteCount * offsetSize);

		const textureLoader = new THREE.TextureLoader();

		const sprite = textureLoader.load(fireballUrl.src);
		const spriteEmission = textureLoader.load(fireballEmissionUrl.src);

		const fireballMaterial = new THREE.ShaderMaterial({
			uniforms: {
				color: { value: new THREE.Color(0xffffff) },
				pointTexture: { value: sprite },
				emissionTexture: { value: spriteEmission },
				emissionColor: { value: new THREE.Color(23.9686279, 7.78039217, 0.376470596) },
				horizontalSprites: { value: 7 },
				verticalSprites: { value: 7 },
			},
			vertexShader,
			fragmentShader,

			blending: THREE.AdditiveBlending,
			depthTest: false,
			transparent: true,
		});

		const oldGeometry = new THREE.BufferGeometry();
		const geometry = oldGeometry;
		const particles = new THREE.Points(oldGeometry, fireballMaterial);
		scene.add(particles);

		// const spriteGeometry = new THREE.CircleGeometry(1, 6);
		// const newGeometry = new THREE.InstancedBufferGeometry();
		// newGeometry.index = spriteGeometry.index;
		// newGeometry.attributes = spriteGeometry.attributes;
		// const geometry = newGeometry;
		// const mesh = new THREE.Mesh(newGeometry, fireballMaterial);
		// scene.add(mesh);

		for (let i = 0; i < spriteCount; i++) {
			const xyz: Vector3 = Array(3)
				.fill(0)
				.map(() => (Math.random() - 0.5) * 2) as Vector3;

			const target: ParticleStructure = [1, ...xyz, Math.PI * 2 * Math.random(), 10, Math.random()];
			if (target.length > offsetSize)
				throw new Error(`Incorrect offset, expected ${offsetSize} but got ${target.length}`);
			particleVertexBuffer.set(target, i * offsetSize);
		}

		const particleBuffer = new THREE.InterleavedBuffer(particleVertexBuffer, offsetSize);

		geometry.setAttribute('position', new THREE.InterleavedBufferAttribute(particleBuffer, 3, positionOffset));
		geometry.setAttribute('rotation', new THREE.InterleavedBufferAttribute(particleBuffer, 1, rotationOffset));
		geometry.setAttribute('size', new THREE.InterleavedBufferAttribute(particleBuffer, 1, sizeOffset));
		geometry.setAttribute('time', new THREE.InterleavedBufferAttribute(particleBuffer, 1, timeOffset));

		let lastTime = 0;

		return {
			onFrame({ canvas, time }: { canvas: HTMLCanvasElement; time: number }) {
				camera.lookAt(0, 0, 0);
				const deltaTime = time - lastTime;
				lastTime = time;

				const deltaSeconds = deltaTime / 1000;

				for (let i = 0; i < spriteCount; i++) {
					const idx = i * offsetSize;
					particleVertexBuffer[idx + timeOffset] = (particleVertexBuffer[idx + timeOffset] + deltaSeconds) % 1;
				}
				particleBuffer.set(particleVertexBuffer, 0);
				particleBuffer.needsUpdate = true;

				camera.aspect = canvas.clientWidth / canvas.clientHeight;
				camera.lookAt(scene.position);

				return { scene, camera };
			},
		};
	}, []);

	return <Layout>{onFrame && <ThreeCanvas className="w-full h-96" onFrame={onFrame} />}</Layout>;
};

export default CanvasPage;

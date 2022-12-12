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
		const activeOffset = 0;
		const positionOffset = activeOffset + 1;
		const rotationOffset = positionOffset + 3;
		const sizeOffset = rotationOffset + 1;
		const timeOffset = sizeOffset + 1;

		const spriteCount = 100;
		const particleVertexBuffer = new Float32Array(spriteCount * offsetSize);

		const textureLoader = new THREE.TextureLoader();

		const sprite = textureLoader.load(fireballUrl.src);
		const spriteEmission = textureLoader.load(fireballEmissionUrl.src);

		const fireballMaterial = new THREE.RawShaderMaterial({
			uniforms: {
				pointTexture: { value: sprite },
				emissionTexture: { value: spriteEmission },
				emissionColor: { value: new THREE.Color(23.9686279, 7.78039217, 0.376470596) },
				horizontalSprites: { value: 7 },
				verticalSprites: { value: 7 },
			},
			vertexShader: vertexShader,
			fragmentShader: fragmentShader,

			blending: THREE.AdditiveBlending,
			depthTest: false,

			glslVersion: THREE.GLSL3,
		});

		const planeGeometry = new THREE.PlaneGeometry(1, 1, 1, 1);
		const geometry = new THREE.InstancedBufferGeometry();
		geometry.index = planeGeometry.index;
		geometry.attributes = planeGeometry.attributes;
		const mesh = new THREE.InstancedMesh(planeGeometry, fireballMaterial, spriteCount);
		scene.add(mesh);

		for (let i = 0; i < spriteCount; i++) {
			particleVertexBuffer.set(Array(offsetSize).fill(0), i * offsetSize);
		}

		const particleBuffer = new THREE.InstancedInterleavedBuffer(particleVertexBuffer, offsetSize);

		geometry.setAttribute('translate', new THREE.InterleavedBufferAttribute(particleBuffer, 3, positionOffset));
		geometry.setAttribute('rotation', new THREE.InterleavedBufferAttribute(particleBuffer, 1, rotationOffset));
		geometry.setAttribute('size', new THREE.InterleavedBufferAttribute(particleBuffer, 1, sizeOffset));
		geometry.setAttribute('time', new THREE.InterleavedBufferAttribute(particleBuffer, 1, timeOffset));
		geometry.setAttribute('isActive', new THREE.InterleavedBufferAttribute(particleBuffer, 1, activeOffset));

		let lastTime = performance.now();
		let nextEmission = 0;
		const emmissionTime = 0.05;

		return {
			onFrame({ canvas }: { canvas: HTMLCanvasElement; time: number }) {
				const time = performance.now();
				const deltaTime = time - lastTime;
				lastTime = time;

				const deltaSeconds = deltaTime / 1000;
				let toEmit = Math.floor(nextEmission / emmissionTime);
				nextEmission = (nextEmission % emmissionTime) + deltaSeconds;

				for (let i = 0; i < spriteCount; i++) {
					const idx = i * offsetSize;
					if (particleVertexBuffer[idx + activeOffset]) {
						particleVertexBuffer[idx + timeOffset] = particleVertexBuffer[idx + timeOffset] + deltaSeconds;
						if (particleVertexBuffer[idx + timeOffset] > 1) particleVertexBuffer[idx + activeOffset] = 0;
					}
					if (toEmit && !particleVertexBuffer[idx + activeOffset]) {
						toEmit -= 1;
						setActiveParticle(i);
					}
				}
				particleBuffer.set(particleVertexBuffer, 0);
				particleBuffer.needsUpdate = true;

				camera.aspect = canvas.clientWidth / canvas.clientHeight;
				camera.updateProjectionMatrix();

				return { scene, camera };
			},
		};

		function setActiveParticle(index: number) {
			const xyz: Vector3 = Array(3)
				.fill(0)
				.map(() => (Math.random() - 0.5) * 5) as Vector3;

			const target: ParticleStructure = [1, ...xyz, Math.PI * 2 * Math.random(), 10, 0];
			if (target.length > offsetSize)
				throw new Error(`Incorrect offset, expected ${offsetSize} but got ${target.length}`);
			particleVertexBuffer.set(target, index * offsetSize);
		}
	}, []);

	return <Layout>{onFrame && <ThreeCanvas className="w-full h-96" onFrame={onFrame} />}</Layout>;
};

export default CanvasPage;

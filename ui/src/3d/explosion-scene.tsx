import { useMemo, useReducer } from 'react';
import { ThreeCanvas } from './animation-container';
import * as THREE from 'three';
import fireballUrl from './fireball.png';
import fireballEmissionUrl from './fireball-emission.png';
import vertexShader from './particles-vertex-shader.glsl';
import fragmentShader from './particles-fragment-shader.glsl';
import { ParticleSystem } from './particle-system';
import screenshotUrl from './explosion-screenshot.png';
import { twMerge } from 'tailwind-merge';

export function ExplosionScene({ className }: { className?: string }) {
	const [isPlaying, setPlaying] = useReducer(() => true, false);
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
					emissionTexture: {
						value: textureLoader.load(fireballEmissionUrl.src),
					},
					emissionColor: {
						value: new THREE.Color(23.9686279, 7.78039217, 0.376470596),
					},
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
			particleStructure: [
				'time',
				'translate',
				'translate',
				'translate',
				'rotation',
				'size',
			],
			initializeParticle() {
				const xyz = Array(3)
					.fill(0)
					.map(() => (Math.random() - 0.5) * 3);

				return [0, ...xyz, Math.PI * 2 * Math.random(), 5];
			},
			updateParticle(particleVertexBuffer, { time, isActive }, deltaSeconds) {
				// We know the size of the buffer, this is fine.
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				particleVertexBuffer[time] = particleVertexBuffer[time]! + deltaSeconds;
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				if (particleVertexBuffer[time]! > 1) particleVertexBuffer[isActive] = 0;
			},
		});

		const scene = new THREE.Scene();
		scene.add(particleSystem);

		return {
			onFrame({
				canvas,
				deltaTime,
			}: {
				canvas: HTMLCanvasElement;
				time: number;
				deltaTime: number;
			}) {
				const deltaSeconds = deltaTime / 1000;
				particleSystem.update(deltaSeconds);

				camera.aspect = canvas.clientWidth / canvas.clientHeight;
				camera.updateProjectionMatrix();

				return { scene, camera };
			},
		};
	}, []);

	return (
		<>
			{isPlaying && onFrame ? (
				<ThreeCanvas
					className={twMerge('w-full h-96', className)}
					onFrame={onFrame}
				/>
			) : (
				<button
					className={twMerge(
						'w-full h-96 bg-black bg-no-repeat text-center text-blue-900 text-3xl font-bold',
						className
					)}
					style={{
						backgroundImage: `url(${screenshotUrl.src})`,
						backgroundSize: 'contain',
						backgroundPosition: '50% 50%',
					}}
					onClick={(onFrame && setPlaying) ?? undefined}
					title="Click to Play visual effect"
				>
					<svg
						stroke="currentColor"
						fill="currentColor"
						strokeWidth="0"
						viewBox="0 0 24 24"
						className="inline-block w-40 h-40"
						height="1em"
						width="1em"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path fill="none" d="M0 0h24v24H0z"></path>
						<path d="M8 5v14l11-7z"></path>
					</svg>
				</button>
			)}
		</>
	);
}

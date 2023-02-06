import {
	DependencyList,
	EffectCallback,
	LegacyRef,
	useEffect,
	useState,
} from 'react';
import * as THREE from 'three';
import uniqueId from 'lodash/fp/uniqueId';

import {
	EffectComposer,
	RenderPass,
	EffectPass,
	BloomEffect,
} from 'postprocessing/module';

const canvasId = uniqueId('three');

function useMountedRef<T extends Element>(
	effect: (element: T) => ReturnType<EffectCallback>,
	deps?: DependencyList
): LegacyRef<T> {
	const [currentElement, setCurrentElement] = useState<T | null>(null);
	useEffect(() => {
		console.log({ mounting: canvasId, currentElement, window });
		if (currentElement && typeof window !== 'undefined') {
			const dispose = effect(currentElement);
			return dispose;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentElement, ...(deps ?? [])]);

	return (canvas) => {
		setCurrentElement(canvas);
	};
}

function useThreeJs({
	onFrame,
}: Omit<Parameters<typeof renderThreeJs>[0], 'canvas'>) {
	return useMountedRef<HTMLCanvasElement>(
		(canvas) => renderThreeJs({ canvas, onFrame }),
		[onFrame]
	);
}

// init
function renderThreeJs({
	canvas,
	onFrame,
}: {
	canvas: HTMLCanvasElement;
	onFrame: (params: {
		canvas: HTMLCanvasElement;
		time: number;
		deltaTime: number;
	}) => {
		scene: THREE.Scene;
		camera: THREE.Camera;
	};
}): ReturnType<EffectCallback> {
	fixResolution(canvas);

	const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.toneMapping = THREE.ReinhardToneMapping;
	renderer.setAnimationLoop(animation);
	renderer.autoClear = false;
	renderer.outputEncoding = THREE.sRGBEncoding;

	const composer = new EffectComposer(renderer);
	const renderPass = new RenderPass();
	composer.addPass(renderPass);
	const bloomEffect = new BloomEffect({ intensity: 1, luminanceThreshold: 0 });
	// This will get set by the composer, I believe
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	composer.addPass(new EffectPass(null!, bloomEffect));

	// animation

	let lastTime = performance.now();

	function animation() {
		const time = performance.now();
		const deltaTime = time - lastTime;
		lastTime = time;

		// renderer.setSize(canvas.clientWidth, canvas.clientHeight);
		// composer.setSize(canvas.clientWidth, canvas.clientHeight);

		const { scene, camera } = onFrame({ canvas, time, deltaTime });
		// renderer.render(scene, camera);
		composer.setMainScene(scene);
		composer.setMainCamera(camera);
		// renderPass.mainScene = scene;
		// renderPass.mainCamera = camera;
		composer.render(deltaTime);
	}

	return () => {
		console.log({ disposing: canvasId });
		renderer.dispose();
		composer.dispose();
	};
}

function fixResolution(canvas: HTMLCanvasElement) {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}

export function ThreeCanvas({
	onFrame,
	...props
}: JSX.IntrinsicElements['canvas'] &
	Omit<Parameters<typeof renderThreeJs>[0], 'canvas'>) {
	const canvasRef = useThreeJs({
		onFrame,
	});
	return <canvas key={canvasId} ref={canvasRef} {...props} />;
}

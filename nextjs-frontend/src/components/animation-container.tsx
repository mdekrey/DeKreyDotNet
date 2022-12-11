import { DependencyList, EffectCallback, LegacyRef, useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';
import uniqueId from 'lodash/fp/uniqueId';

console.warn('new', 2);

const canvasId = uniqueId('three');

function useMountedRef<T extends Element>(
	effect: (element: T) => ReturnType<EffectCallback>,
	deps?: DependencyList
): LegacyRef<T> {
	const [currentElement, setCurrentElement] = useState<T | undefined>(undefined);
	useEffect(() => {
		console.log({ mounting: canvasId });
		if (currentElement) {
			const dispose = effect(currentElement);
			return dispose;
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentElement, ...deps]);

	return (canvas) => {
		setCurrentElement(canvas);
	};
}

function useThreeJs({ scene, onFrame }: Omit<Parameters<typeof renderThreeJs>[0], 'canvas'>) {
	return useMountedRef<HTMLCanvasElement>((canvas) => renderThreeJs({ canvas, scene, onFrame }), [scene, onFrame]);
}

// init
function renderThreeJs({
	canvas,
	scene,
	onFrame,
}: {
	canvas: HTMLCanvasElement;
	scene: THREE.Scene;
	onFrame?: (time: number) => void;
}): ReturnType<EffectCallback> {
	fixResolution(canvas);

	const camera = new THREE.PerspectiveCamera(70, canvas.clientWidth / canvas.clientHeight, 0.01, 10);
	camera.position.z = 1;

	const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
	renderer.setAnimationLoop(animation);

	// animation

	function animation(time: number) {
		camera.aspect = canvas.clientWidth / canvas.clientHeight;
		onFrame?.(time);

		renderer.render(scene, camera);
	}

	return () => {
		console.log({ disposing: canvasId });
		renderer.dispose();
	};
}

function fixResolution(canvas: HTMLCanvasElement) {
	canvas.width = canvas.clientWidth;
	canvas.height = canvas.clientHeight;
}

export function ThreeCanvas({
	scene,
	onFrame,
	...props
}: JSX.IntrinsicElements['canvas'] & Omit<Parameters<typeof renderThreeJs>[0], 'canvas'>) {
	const canvasRef = useThreeJs({
		scene,
		onFrame,
	});
	return <canvas key={canvasId} ref={canvasRef} {...props} />;
}

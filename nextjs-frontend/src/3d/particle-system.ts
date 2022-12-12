import * as THREE from 'three';

export type ParticleSystemOptions<TStructureKey extends string> = {
	particleCount: number;
	emissionRate: number;
	particleLifetime: number;

	particleStructure: readonly TStructureKey[];
	initializeParticle: () => readonly number[];
	updateParticle: (
		particleVertexBuffer: Float32Array,
		index: Record<TStructureKey, number>,
		deltaSeconds: number
	) => void;
	material: THREE.ShaderMaterial;
	geometry: THREE.BufferGeometry;
};

type ParticleStructureEntry = {
	offset: number;
	size: number;
};

export class ParticleSystem<TStructureKey extends string = string> extends THREE.Object3D {
	private readonly options: Readonly<ParticleSystemOptions<TStructureKey | 'isActive'>>;
	private nextEmission = 0;
	private readonly emissionTime: number;
	private readonly offsetSize: number;
	private readonly particleStructure: Readonly<Record<string, ParticleStructureEntry>>;
	private readonly particleVertexBuffer: Float32Array;
	private readonly particleBuffer: THREE.InstancedInterleavedBuffer;

	constructor(options: ParticleSystemOptions<TStructureKey | 'isActive'>) {
		super();

		this.options = {
			...options,
			particleStructure: ['isActive', ...options.particleStructure],
		};
		this.emissionTime = 1 / options.emissionRate;
		this.offsetSize = this.options.particleStructure.length;

		this.particleStructure = this.options.particleStructure.reduce<Record<string, ParticleStructureEntry>>(
			(record, structureName, index, arr) => {
				if (index > 0 && arr[index - 1] !== structureName && record[structureName])
					throw new Error(`Particle structure invalid. All instances of '${structureName}' must be adjacent.`);
				if (arr[index - 1] === structureName) record[structureName].size++;
				else record[structureName] = { offset: index, size: 1 };
				return record;
			},
			{}
		);

		this.particleVertexBuffer = new Float32Array(this.options.particleCount * this.offsetSize);

		for (let i = 0; i < this.options.particleCount; i++) {
			this.particleVertexBuffer.set(Array(this.offsetSize).fill(0), i * this.offsetSize);
		}

		this.particleBuffer = new THREE.InstancedInterleavedBuffer(this.particleVertexBuffer, this.offsetSize);

		const geometry = new THREE.InstancedBufferGeometry();
		geometry.index = this.options.geometry.index;
		geometry.attributes = this.options.geometry.attributes;

		for (const [entryName, details] of Object.entries(this.particleStructure)) {
			geometry.setAttribute(
				entryName,
				new THREE.InterleavedBufferAttribute(this.particleBuffer, details.size, details.offset)
			);
			console.log('initialize ' + entryName);
		}

		const mesh = new THREE.InstancedMesh(geometry, this.options.material, this.options.particleCount);
		this.add(mesh);
	}

	update(deltaSeconds: number) {
		let toEmit = Math.floor(this.nextEmission / this.emissionTime);
		this.nextEmission = (this.nextEmission % this.emissionTime) + deltaSeconds;

		const activeOffset = this.particleStructure['isActive'].offset;
		// let activeCount = 0;
		for (let i = 0; i < this.options.particleCount; i++) {
			const idx = i * this.offsetSize;
			const activeIndex = idx + activeOffset;

			if (this.particleVertexBuffer[activeIndex]) {
				// activeCount++;
				this.options.updateParticle(
					this.particleVertexBuffer,
					mapObjectValues(this.particleStructure, (key, v) => v.offset + idx),
					deltaSeconds
				);
			}
			if (toEmit && !this.particleVertexBuffer[activeIndex]) {
				toEmit -= 1;

				const target = [1, ...this.options.initializeParticle()];
				if (target.length > this.offsetSize)
					throw new Error(`Incorrect offset, expected ${this.offsetSize} but got ${target.length}`);
				this.particleVertexBuffer.set(target, i * this.offsetSize);
			}
		}
		// console.log('active particles', activeCount);
		this.particleBuffer.set(this.particleVertexBuffer, 0);
		this.particleBuffer.needsUpdate = true;
	}

	toBufferIndex(index: number, structureKey: TStructureKey | 'isActive') {
		return index * this.offsetSize + this.particleStructure[structureKey].offset;
	}
}

function mapObjectValues<T extends Record<string, unknown>, TResult extends Record<keyof T, unknown>>(
	someObj: T,
	map: <K extends keyof T>(key: K, value: T[K]) => TResult[K]
): TResult {
	return Object.fromEntries(
		Object.entries(someObj).map(([key, value]) => [key, map(key, value as T[string])])
	) as TResult;
}

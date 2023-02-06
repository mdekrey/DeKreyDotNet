import { useSyncExternalStore } from 'react';

export type Subscribable = {
	trigger(): void;
	subscribe(callback: () => void): () => void;
};

export function createSubscribable(): Subscribable {
	const subscribers: (() => void)[] = [];
	return {
		trigger() {
			subscribers.forEach((subscription) => subscription());
		},
		subscribe(callback: () => void) {
			subscribers.push(callback);
			return () => {
				const idx = subscribers.indexOf(callback);
				if (idx >= 0) subscribers.splice(idx, 1);
			};
		},
	};
}

export type SubscribableValue<T> = {
	get(): T;
	set(value: T): void;
	subscribe(callback: () => void): () => void;
};

export function createSubscribableValue<T>(initial: T): SubscribableValue<T> {
	let value = initial;
	const subscribable = createSubscribable();
	return {
		get() {
			return value;
		},
		set(newValue: T) {
			value = newValue;
			subscribable.trigger();
		},
		subscribe: subscribable.subscribe.bind(subscribable),
	};
}

export function createSubscribableList<T>() {
	const value: T[] = [];
	const subscribable = createSubscribable();
	return {
		get(): readonly T[] {
			return value;
		},
		add(newItem: T) {
			if (value.includes(newItem)) return value.indexOf(newItem);
			const result = value.length;
			value.push(newItem);
			subscribable.trigger();
			return result;
		},
		subscribe: subscribable.subscribe.bind(subscribable),
	};
}

export function useSubscribable<T>(subscribable: SubscribableValue<T>) {
	const current = useSyncExternalStore(
		(cb) => subscribable.subscribe(cb),
		() => subscribable.get(),
		() => null
	);
	return [current, subscribable.set] as const;
}

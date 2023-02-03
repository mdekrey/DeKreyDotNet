export function createSubscribable() {
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

export function createSubscribableValue<T>(initial: T) {
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

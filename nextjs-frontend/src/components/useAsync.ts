import React, { useEffect, useState } from 'react';

export function useAsync<T>(promiseFactory: () => Promise<T>, initial: T, deps: React.DependencyList) {
	const [state, setResult] = useState(initial);
	useEffect(() => {
		(async function () {
			const result = await promiseFactory();
			setResult(result);
		})();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);

	return state;
}

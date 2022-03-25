import { AppProps } from 'next/app';
import '../style/tailwind.css';
import 'highlight.js/styles/vs2015.css';

function MyApp({ Component, pageProps }: Pick<AppProps, 'Component' | 'pageProps'>) {
	return <Component {...pageProps} />;
}

export default MyApp;

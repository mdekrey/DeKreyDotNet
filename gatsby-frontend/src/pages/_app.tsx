import { AppProps } from 'next/app';
import "../style/tailwind.css";

function MyApp({ Component, pageProps }: Pick<AppProps, 'Component' | 'pageProps'>) {
    return <Component {...pageProps} />;
  }

export default MyApp;
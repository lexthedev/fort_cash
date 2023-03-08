import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { setupStore } from '../redux/index'
import { Provider } from 'react-redux'

export default function App({ Component, pageProps }: AppProps) {

  const store = setupStore();

  return <Provider store={store}>
    <Component {...pageProps} />
  </Provider>

  // return <Component {...pageProps} />
}

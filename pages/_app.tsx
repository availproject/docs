/* eslint-disable react-hooks/exhaustive-deps */
//@ts-nocheck


import '../styles/globals.css';
import Head from 'next/head';
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
        loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') posthog.debug()
        }
    })
}

export default function App({ Component, pageProps }) {

const router = useRouter();

    useEffect(() => {
        const handleRouteChange = () => posthog?.capture('$pageview')
        router.events.on('routeChangeComplete', handleRouteChange)

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, []);

  return (
    <>
    <PostHogProvider client={posthog}>
     <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Avail Developer Docs</title>
      </Head>
  <Component {...pageProps} />
 </PostHogProvider>
  </>
  );

}

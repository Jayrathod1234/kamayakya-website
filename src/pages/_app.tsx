import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { useSSR } from "@nextui-org/react";
import { AuthProvider } from "@/components/AuthContext";
import Head from "next/head";
import Script from "next/script";
import { PlanProvider } from "@/components/PlanContext";
import { Toaster } from "@/components.v2/ui/toaster";

function MyApp({ Component, pageProps }: AppProps) {
  const { isBrowser } = useSSR();
  return (
    isBrowser && (
      <NextUIProvider>
        <AuthProvider>
          <PlanProvider>
            <Component {...pageProps} />
            <Head>
              <title>KamayaKya - SEBI Registered Research Analyst | Expert Microcap & Smallcap Stock Picks</title>
              <meta
                name="og:title"
                content="KamayaKya - SEBI Registered Research Analyst | Expert Microcap &
              Smallcap Stock Picks"
              />
              <meta
                name="description"
                content="KamayaKya is your friendly investment guru who will assist you in finding the best SME, MicroCap and SmallCap stocks to invest, backed by solid research."
              />
              <meta
                name="og:description"
                content="KamayaKya is your friendly investment guru who will assist you in finding the best SME, MicroCap and SmallCap stocks to invest, backed by solid research."
              />
              <meta
                name="keywords"
                content="stock market advisory, share market advisory, stock market advisory services, stock market advisory company, best stock market advisor, investment advisor, stock investment advisor, best trading advisory services, sebi registered stock market advisory company, top stock advisory services, share market investment advisor"
              />
              <link
                rel="icon"
                // type="image/png"
                href="/kamayaKya-website-favicon-white-bordered.ico"
                sizes="any"
              />
              {/*<link*/}
              {/*  rel="icon"*/}
              {/*  type="image/svg+xml"*/}
              {/*  href="/kamayaKya-website-favicon-white-bordered.svg"*/}
              {/*  sizes="any"*/}
              {/*/>*/}

              {/*<link rel="preload" href="/src/styles/globals.css" as="style" />*/}
              {/*<link rel="stylesheet" href="/src/styles/globals.css" />*/}

              {/*Hotjar */}
              {/*<Script>*/}
              {/*  (function(h,o,t,j,a,r){*/}
              {/*  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};*/}
              {/*  h._hjSettings={hjid:3565907,hjsv:6};*/}
              {/*  a=o.getElementsByTagName('head')[0];*/}
              {/*  r=o.createElement('script');r.async=1;*/}
              {/*  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;*/}
              {/*  a.appendChild(r);*/}
              {/*})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');*/}
              {/*</Script>*/}

              {/* Google Tag Manager */}
              {/*<Script*/}
              {/*  src="https://www.googletagmanager.com/gtag/js?id=G-PBMR9CBK3J"*/}
              {/*  data-nscript="afterInteractive"*/}
              {/*/>*/}
            </Head>
            <Toaster/>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=G-4R949GS408`} />

            <Script id="google-analytics">
              {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-4R949GS408');
                `}
            </Script>

            <Script>
              {`
                    (function(h,o,t,j,a,r){
                      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                      h._hjSettings={hjid:3565907,hjsv:6};
                      a=o.getElementsByTagName('head')[0];
                      r=o.createElement('script');r.async=1;
                      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                      a.appendChild(r);
                    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
                `}
            </Script>

            <Script>
              {`
                  (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                  })(window, document, "clarity", "script", "lfy66vz48l");
            `}
            </Script>
          </PlanProvider>
        </AuthProvider>
      </NextUIProvider>
    )
  );
}

export default MyApp;

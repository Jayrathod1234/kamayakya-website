import "../styles/globals.css";
import type { AppProps } from "next/app";
import { NextUIProvider, createTheme } from "@nextui-org/react";
import { useSSR } from "@nextui-org/react";
import { AuthProvider } from "@/components/AuthContext";
import Head from "next/head";
import Script from "next/script";
import { PlanProvider } from "@/components/PlanContext";
import { Toaster } from "@/components.v2/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { NavBarProvider } from "@/contexts/NavBarContext.js";
import { TooltipProvider } from "@/components.v2/ui/tooltip";
import LoginPrompt from "@/components.v3/common/LoginPrompt";
import { DowntimeChecker } from "@/components.v2/ui/downtime-checker";

function MyApp({ Component, pageProps }: AppProps) {
  const { isBrowser } = useSSR();
  const queryClient = new QueryClient();

  return (
    isBrowser && (
      <QueryClientProvider client={queryClient}>
        <Suspense fallback>
          <NextUIProvider>
            <TooltipProvider>
              <NavBarProvider>
                <AuthProvider>
                  <PlanProvider>
                    <Component {...pageProps} />
                    <LoginPrompt />
                    {/* <DowntimeChecker
                      healthCheckUrl="/api/health"
                      checkInterval={300000000000000} // Check every 30 seconds
                      autoShow={true} // Automatically show modal when downtime detected
                      title="Service Temporarily Unavailable"
                      message="We're currently experiencing technical difficulties. Our team is working to resolve this."
                      estimatedTime="1-2 hours"
                    /> */}
                    <Head>
                      <title>
                        KamayaKya - SEBI Registered Research Analyst | Expert Microcap & Smallcap Stock Picks
                      </title>

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
                      <script src="%PUBLIC_URL%/assets/js/mutiple-dropdown.js"></script>
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
                    <Toaster />
                    {/* Facebook Pixel */}
                    <Script
                      id="facebook-pixel"
                      strategy="afterInteractive"
                      dangerouslySetInnerHTML={{
                        __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1179690674320602');
            fbq('track', 'PageView');
          `,
                      }}
                    />

                    {/* Noscript fallback */}
                    <noscript>
                      <img
                        height="1"
                        width="1"
                        style={{ display: "none" }}
                        src="https://www.facebook.com/tr?id=1179690674320602&ev=PageView&noscript=1"
                      />
                    </noscript>
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
                    <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
                    <Script src={`${process.env.NEXT_PUBLIC_DIGIO_SCRIPT}`}></Script>
                  </PlanProvider>
                </AuthProvider>
              </NavBarProvider>
            </TooltipProvider>
          </NextUIProvider>
        </Suspense>
      </QueryClientProvider>
    )
  );
}

export default MyApp;

"use client";
import { getRazorpayPayload } from "@/api/payment";
import { axiosApi } from "@/utils/axios";
import { Home, Loader2, XCircle } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface DocumentSigningFailedProps {
  errorMessage?: string;
  redirectDelay?: number;
  onRetry?: () => void;
}

interface LoadingPaymentGatewayProps {
  amount?: number;
  planName?: string;
}

export function LoadingPaymentGateway({ amount = 2999, planName = "Premium Plan" }: LoadingPaymentGatewayProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-200 open_sans min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] mx-auto">
        <div className="bg-white rounded-xl p-8 relative overflow-visible shadow-lg">
          {/* Loading Icon */}
          <div className="!h-[56px] !w-[56px] flex items-center justify-center bg-white rounded-full absolute top-[-28px] left-1/2 transform -translate-x-1/2 shadow-[0px_6px_16px_0px_#7A7A7A1F] z-50">
            <Loader2 className="h-8 w-8 animate-spin text-[#23A26D]" />
          </div>

          <div className="text-center mt-6 mb-8">
            <p className="text-sm text-[#474747] mb-2">Processing Payment</p>
            {/* <h3 className="text-[28px] font-semibold text-[#121212] mb-4">₹{amount.toLocaleString("hi")}</h3> */}
            <div className="px-3 py-1 rounded-full bg-[#DFFAEC] mx-auto w-fit mb-6">
              {/* <p className="text-2xs text-[#128454]">{planName}</p> */}
            </div>
            <h2 className="text-xl font-bold text-[#23A26D] mb-2">Processing your payment{dots}</h2>
            <p className="text-sm text-[#667085]">Please wait while we securely process your payment</p>
          </div>

          {/* Progress Steps */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-[#23A26D] rounded-full animate-pulse"></div>
              <p className="text-sm text-[#667085]">Connecting to payment gateway</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <p className="text-sm text-[#667085]">Verifying payment details</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
              <p className="text-sm text-[#667085]">Confirming transaction</p>
            </div>
          </div>

          {/* Security Info */}
          {/* <div className="bg-[#F9FAFB] rounded-lg p-4 border border-[#E5E7EB] mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-6 h-6 bg-[#23A26D] rounded flex items-center justify-center">
                <span className="text-white text-xs font-bold">SSL</span>
              </div>
              <span className="text-xs text-[#667085]">256-bit secure encryption</span>
            </div>
          </div> */}

          {/* Important Notice */}
          <div className="bg-[#FEF3C7] rounded-lg p-4 border border-[#FDE68A]">
            <p className="text-xs text-[#92400E] font-medium mb-2">Important:</p>
            <ul className="text-xs text-[#92400E] space-y-1">
              <li>• Do not close this window</li>
              <li>• Do not refresh the page</li>
              <li>• You will be redirected automatically</li>
            </ul>
          </div>

          {/* Receipt Bottom */}
          <div className="absolute w-full h-[30px] -bottom-4 left-0 z-[1]">
            <svg width="100%" height="30" viewBox="0 0 400 30" fill="none">
              <path d="M0 0L400 0L380 30L20 30Z" fill="white" />
              <path
                d="M20 30L40 20L60 30L80 20L100 30L120 20L140 30L160 20L180 30L200 20L220 30L240 20L260 30L280 20L300 30L320 20L340 30L360 20L380 30"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center mt-8">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-[#23A26D] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#23A26D] rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-[#23A26D] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DocumentSigningFailed({
  errorMessage = "Document signing failed due to a technical error. Please try again.",
  redirectDelay = 10,
  onRetry,
}: DocumentSigningFailedProps) {
  const [countdown, setCountdown] = useState(redirectDelay);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.replace("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="bg-gray-200 open_sans min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-[400px] mx-auto">
        <div className="bg-white rounded-xl p-8 relative overflow-visible shadow-lg">
          {/* Error Icon */}
          <div className="!h-[56px] !w-[56px] flex items-center justify-center bg-white rounded-full absolute top-[-28px] left-1/2 transform -translate-x-1/2 shadow-[0px_6px_16px_0px_#7A7A7A1F] z-50">
            <XCircle className="h-8 w-8 text-[#DC2626]" />
          </div>

          <div className="text-center mt-6 mb-8">
            <p className="text-sm text-[#474747] mb-2">Document Signing</p>
            <h3 className="text-[28px] font-semibold text-[#DC2626] mb-4">Failed</h3>
            <div className="px-3 py-1 rounded-full bg-[#FEE2E2] mx-auto w-fit mb-6">
              <p className="text-2xs text-[#991B1B]">Signing Unsuccessful</p>
            </div>
            <h2 className="text-xl font-bold text-[#DC2626] mb-2">Oops! Something went wrong</h2>
            <p className="text-sm text-[#667085]">{errorMessage}</p>
          </div>

          {/* Error Details */}
          <div className="space-y-4 mb-8">
            <div className="p-4 border border-[#FECACA] rounded-md bg-[#FEF2F2]">
              <p className="text-[#7F1D1D] text-xs mb-1 font-medium">What happened?</p>
              <p className="text-[#991B1B] text-xs">The document signing process was interrupted</p>
            </div>

            <div className="p-4 border border-[#BAE6FD] rounded-md bg-[#F0F9FF]">
              <p className="text-[#0C4A6E] text-xs mb-1 font-medium">What can you do?</p>
              <p className="text-[#164E63] text-xs">Check your connection and try again</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="bg-[#F3F4F6] rounded-lg p-4 text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Home className="h-4 w-4 text-[#6B7280]" />
              <p className="text-sm font-medium text-[#374151]">Auto Redirect</p>
            </div>
            <p className="text-xs text-[#6B7280] mb-2">Redirecting to home page in</p>
            <div className="text-3xl font-bold text-[#DC2626] mb-3">{countdown}s</div>
            <div className="w-full bg-[#E5E7EB] rounded-full h-2">
              <div
                className="bg-[#DC2626] h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((redirectDelay - countdown) / redirectDelay) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex gap-3">
            {onRetry && (
              <Button onClick={onRetry} className="flex-1 bg-[#DC2626] hover:bg-[#B91C1C] text-white">
                <RefreshCw className="h-4 w-4 mr-2" />
                <span className="text-sm font-semibold">Try Again</span>
              </Button>
            )}
            <Button onClick={handleGoHome} variant="outline" className="flex-1 border-[#0000001A] text-[#02425B]">
              <Home className="h-4 w-4 mr-2" />
              <span className="text-sm font-semibold">Go Home</span>
            </Button>
          </div> */}

          {/* Receipt Bottom */}
          <div className="absolute w-full h-[30px] -bottom-4 left-0 z-[1]">
            <svg width="100%" height="30" viewBox="0 0 400 30" fill="none">
              <path d="M0 0L400 0L380 30L20 30Z" fill="white" />
              <path
                d="M20 30L40 20L60 30L80 20L100 30L120 20L140 30L160 20L180 30L200 20L220 30L240 20L260 30L280 20L300 30L320 20L340 30L360 20L380 30"
                stroke="#E5E7EB"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [loading, setLoading] = useState(true);
  const [signingStatus, setSigningStatus] = useState("");
  const [orderDetails, setOrderDetails] = useState({});
  const router = useRouter();
  const params = useSearchParams();

  // const loadRazorpayScript = () => {
  //   return new Promise((resolve, reject) => {
  //     if (typeof window === "undefined") return reject("Not in browser");

  //     if (document.getElementById("razorpay-script")) {
  //       return resolve(true); // Already loaded
  //     }
  //     const script = document.createElement("script");
  //     script.id = "razorpay-script";
  //     script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //     script.onload = () => resolve(true);
  //     script.onerror = () => reject("Razorpay SDK failed to load");
  //     document.body.appendChild(script);
  //   });
  // };

  const loadRazorpayScript = (retryCount = 0) => {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") return reject("Not in browser");
    
    if (window.Razorpay) return resolve(true);
    
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    
    const timeout = setTimeout(() => {
      script.remove();
      if (retryCount < 2) {
        loadRazorpayScript(retryCount + 1).then(resolve).catch(reject);
      } else {
        reject("Razorpay SDK load timeout after retries");
      }
    }, 10000); // 10 second timeout
    
    script.onload = () => {
      clearTimeout(timeout);
      if (window.Razorpay) {
        resolve(true);
      } else {
        reject("Razorpay object not available");
      }
    };
    
    script.onerror = () => {
      clearTimeout(timeout);
      script.remove();
      if (retryCount < 2) {
        loadRazorpayScript(retryCount + 1).then(resolve).catch(reject);
      } else {
        reject("Razorpay SDK failed to load after retries");
      }
    };
    
    document.head.appendChild(script);
  });
};

  const handleRazorpayScreen = (options: any) => {
    const paymentObject = new window.Razorpay(options);
    let paymentFailed = false;

    paymentObject.on("payment.failed", function (response: any) {
      console.log(response)
      if (!paymentFailed) {
        paymentFailed = true;
        alert(response.error.description);

        setTimeout(() => {
          paymentFailed = false;
        }, 5000);
      }
    });

    paymentObject.open();
  };

  const makePayment = (name: string, email: string, phone: string, orderId: string, amount: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: amount,
      currency: "INR",
      name: "KamayaKya",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: orderId,
      handler: function (response: unknown) {
        console.log("RZP RESPONSE ",response);
         localStorage.removeItem("razorpayData");
        router.push("/payments/successful");
      },
      prefill: {
        name,
        email,
        contact: phone,
      },
      notes: {
        address: "Your business address",
      },
      theme: {
        color: "#0b3a36",
        backdrop_color: "#fff",
      },
      modal:{
        ondismiss:()=>{
          router.replace("/pricing")
        }
      }
    };

    handleRazorpayScreen(options);
  };
const getStorageData = () => {
  try {
    const rawData = sessionStorage.getItem("razorpayData");
    return rawData ? JSON.parse(rawData) : null;
  } catch (error) {
    console.error("SessionStorage error:", error);
    return null;
  }
};
  // useEffect(() => {
  //   const rawData = sessionStorage.getItem("razorpayData");
  //   const status = params.get("status");
  //   if (status) {
  //     setLoading(false);
  //     setSigningStatus(status);
  //   }
  //   if (rawData && status === "success") {
  //     const { name, email, phone, order_id, amount } = JSON.parse(rawData);
  //     setOrderDetails({ name, email, phone, order_id, amount });
  //     loadRazorpayScript()
  //       .then(() => {
  //         if (typeof window !== "undefined" && window.Razorpay) {
  //           makePayment(name, email, phone, order_id, amount);
  //         } else {
  //           alert("Razorpay SDK not available");
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Razorpay SDK load error:", err);
  //         alert("Failed to load Razorpay SDK");
  //       });
  //   }
  // }, [params, router]);

  const getPayload = async(digioId)=>{
    try{
      const res = await getRazorpayPayload(digioId);
      console.log("RESPONSE PAYLOAD",res )
      return res
    }catch(e){
      console.error(e)
      throw new Error("Unable to fetch payment details. Please try again.");
    }
  }

  useEffect(() => {
  const initializePayment = async () => {
    try {
      // const rawData = getStorageData();
      const status = params?.get("status");
      const digioId = params?.get("digio_doc_id")
      let response
      if (status && digioId) {
        setLoading(false);
        setSigningStatus(status);
       response = await getPayload(digioId)    
      }
      
      if (response && status === "success") {
        const { name, email, phone, order_id, amount } = response;
        setOrderDetails({ name, email, phone, order_id, amount });
        
        await loadRazorpayScript();
        
        if (typeof window !== "undefined" && window.Razorpay) {
          makePayment(name, email, phone, order_id, amount);
        } else {
          throw new Error("Razorpay SDK not available after loading");
        }
      }
    } catch (error) {
      console.error("Payment initialization error:", error);
      // Show user-friendly error message
      alert("Unable to load payment gateway. Please try again or contact support.");
      // Optionally redirect to error page
      router.push("/pricing")
    }
  };
  
  initializePayment();
}, [params, router]);

  if (signingStatus === "success" || loading) {
    return <LoadingPaymentGateway amount={orderDetails.amount} />;
  }

  if (signingStatus !== "success" && signingStatus.length !== 0 && !loading) return <DocumentSigningFailed />;
}

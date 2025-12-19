"use client";

import React, { useEffect, useState } from "react";
import { DowntimeModal } from "./downtime-modal";

interface DowntimeCheckerProps {
  healthCheckUrl?: string;
  checkInterval?: number; // in milliseconds
  onHealthCheck?: (isHealthy: boolean) => void;
  autoShow?: boolean; // Automatically show modal on downtime detection
  title?: string;
  message?: string;
  estimatedTime?: string;
}

export function DowntimeChecker({
  healthCheckUrl = "/api/health",
  checkInterval = 30000, // 30 seconds default
  onHealthCheck,
  autoShow = true,
  title,
  message,
  estimatedTime,
}: DowntimeCheckerProps) {
  const [isDown, setIsDown] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  // const checkHealth = async () => {
  //   try {
  //     const response = await fetch(healthCheckUrl, {
  //       method: "GET",
  //       cache: "no-store",
  //       signal: AbortSignal.timeout(5000), // 5 second timeout
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       if (data.status === "healthy") {
  //         setIsDown(false);
  //         setShowModal(false);
  //         setRetryCount(0);
  //         onHealthCheck?.(true);
  //         return;
  //       }
  //     }
  //     // If we get here, service is down
  //     setIsDown(true);
  //     if (autoShow) {
  //       setShowModal(true);
  //     }
  //     onHealthCheck?.(false);
  //   } catch (error) {
  //     // Network error or timeout - service is likely down
  //     setIsDown(true);
  //     if (autoShow) {
  //       setShowModal(true);
  //     }
  //     onHealthCheck?.(false);
  //   }
  // };

  // const handleRetry = async () => {
  //   setRetryCount((prev) => prev + 1);
  //   await checkHealth();
  // };

  // useEffect(() => {
  //   // Initial check
  //   checkHealth();

  //   // Set up interval for periodic checks
  //   const interval = setInterval(checkHealth, checkInterval);

  //   return () => clearInterval(interval);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [healthCheckUrl, checkInterval, autoShow]);

  return (
    <DowntimeModal
      open={showModal}
      onOpenChange={setShowModal}
      title={title}
      message={message}
      estimatedTime={estimatedTime}
      showRetryButton={false}
      // onRetry={handleRetry}e
    />
  );
}

/**
 * Example usage of DowntimeModal and DowntimeChecker components
 * 
 * Option 1: Manual DowntimeModal (for manual control)
 */
import React, { useState } from "react";
import { DowntimeModal } from "./downtime-modal";
import { Button } from "../button";
import { ButtonVariant } from "../button/button";

export function ManualDowntimeExample() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        variant={ButtonVariant.primary}
      >
        Show Downtime Modal
      </Button>
      <DowntimeModal
        open={showModal}
        onOpenChange={setShowModal}
        title="Scheduled Maintenance"
        message="We're performing scheduled maintenance to improve your experience. The service will be back online shortly."
        estimatedTime="30 minutes"
        showRetryButton={true}
        onRetry={() => {
          console.log("Retry clicked");
          setShowModal(false);
        }}
      />
    </>
  );
}

/**
 * Option 2: Automatic DowntimeChecker (for automatic health monitoring)
 * 
 * Add this to your _app.tsx:
 * 
 * import { DowntimeChecker } from "@/components.v2/ui/downtime-checker";
 * 
 * // Inside your App component:
 * <DowntimeChecker
 *   healthCheckUrl="/api/health"
 *   checkInterval={30000} // Check every 30 seconds
 *   autoShow={true} // Automatically show modal when downtime detected
 *   title="Service Temporarily Unavailable"
 *   message="We're currently experiencing technical difficulties. Our team is working to resolve this."
 *   estimatedTime="15-30 minutes"
 * />
 */


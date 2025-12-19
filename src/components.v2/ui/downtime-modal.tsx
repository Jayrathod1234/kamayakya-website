import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./dialog";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../button";
import { ButtonVariant } from "../button/button";

interface DowntimeModalProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  message?: string;
  estimatedTime?: string;
  showRetryButton?: boolean;
  onRetry?: () => void;
}

export function DowntimeModal({
  open,
  onOpenChange,
  title = "Service Temporarily Unavailable",
  message = "We're updating our servers Please try again in a few moments.",
  estimatedTime,
  showRetryButton = true,
  onRetry,
}: DowntimeModalProps) {
  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    } else {
      // Default retry behavior - reload the page
      window.location.reload();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        closeClassName="hidden"
        className="!max-w-md !rounded-[20px] open_sans"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 rounded-full bg-[#FEF3C7] flex items-center justify-center">
              <AlertTriangle className="h-8 w-8 text-[#F59E0B]" />
            </div>
          </div>
          <DialogTitle className="text-xl font-bold text-[#101828] mb-2">{title}</DialogTitle>
          <DialogDescription className="text-sm text-[#667085] mt-2">{message}</DialogDescription>
          {estimatedTime && (
            <div className="mt-4 p-3 bg-[#F9FAFB] rounded-lg border border-[#E4E7EC]">
              <p className="text-xs text-[#475467] font-medium">Estimated Resolution Time</p>
              <p className="text-sm text-[#101828] font-semibold mt-1">{estimatedTime}</p>
            </div>
          )}
        </DialogHeader>
        <div className="mt-6 flex flex-col gap-3">
          {showRetryButton && (
            <Button onClick={handleRetry} variant={ButtonVariant.primary} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          )}
          <div className="text-center">
            <p className="text-xs text-[#667085]">
              Need immediate assistance?{" "}
              <a href="tel:+919175939641" className="text-brand-500 font-medium hover:underline">
                Call us at +91 9175939641
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

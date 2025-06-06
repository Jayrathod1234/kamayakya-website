import { useEffect, useState } from "react";

export const useResend = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(15);
  const [resendOtp, setResendOtp] = useState(false);

  const reset = () => {
    setResendOtp(true);
  };

  useEffect(() => {
    if (resendOtp) {
      setSecondsRemaining(30); // Start the countdown timer when the modal is shown
    }
  }, [resendOtp]);

  useEffect(() => {
    let timer: NodeJS.Timer;
    if (secondsRemaining > 0) {
      timer = setTimeout(() => {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      setResendOtp(false);
    }
    return () => clearTimeout(timer);
  }, [secondsRemaining]);

  return { secondsRemaining, resendOtp, reset };
};

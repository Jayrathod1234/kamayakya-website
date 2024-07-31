import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components.v2/ui/toast";
import { useToast } from "@/components.v2/ui/use-toast";
import Image from "next/image";
import { Separator } from "./separator";

const WarnIcon = () => {
  return (
    <div className=" h-[28px] aspect-square before:left-[-18%] before:top-[-70%] before:h-[212px] before:w-[212px] before:absolute before:bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,210,30,0.12)_0%,rgba(255,210,30,0)_100%)]">
      <div className=" h-full w-full">
        <Image src={"/warn_icon.svg"} alt="warn" height={28} width={28} />
      </div>
    </div>
  );
};

const SuccessIcon = () => {
  return (
    <div className=" h-[28px] aspect-square before:left-[-18%] before:top-[-70%] before:h-[212px] before:w-[212px] before:absolute before:bg-[radial-gradient(50%_50%_at_50%_50%,rgba(0,237,81,0.12)_0%,rgba(0,237,123,0)_100%)]">
      <div className=" h-full w-full">
        <Image src={"/success_icon.svg"} alt="warn" height={28} width={28} />
      </div>
    </div>
  );
};

const DangerIcon = () => {
  return (
    <div className=" h-[28px] aspect-square before:left-[-18%] before:top-[-70%] before:h-[212px] before:w-[212px] before:absolute before:bg-[radial-gradient(50%_50%_at_50%_50%,rgba(240,66,72,0.13)_0%,rgba(240,66,72,0)_100%)]">
      <div className=" h-full w-full">
        <Image src={"/danger.svg"} alt="warn" height={28} width={28} />
      </div>
    </div>
  );
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        const icon =
          props.variant === "warn" ? (
            <WarnIcon />
          ) : props.variant === "success" ? (
            <SuccessIcon />
          ) : props.variant === "danger" ? (
            <DangerIcon />
          ) : null;
        return (
          <Toast
            className=" bg-gray-800 text-white flex items-center relative max-w-fit  md:max-w-[380px] pricing"
            key={id}
            {...props}
          >
            {icon && <div className=" mr-[10px]">{icon}</div>}
            <div className="grid gap-1 ">
              {title && (
                <ToastTitle className={` text-sm font-semibold ${action ? "truncate" : ""}`}>{title}</ToastTitle>
              )}
              {description && (
                <ToastDescription className={` text-xs  ${action ? "truncate" : ""}`}>{description}</ToastDescription>
              )}
            </div>
            {action && <Separator className=" h-[39px] mx-4 bg-gray-700" orientation="vertical" />}
            <div className=" flex space-x-4">{action}</div>
            {props.close && <ToastClose />}
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}

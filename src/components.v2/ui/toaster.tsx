import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components.v2/ui/toast"
import { useToast } from "@/components.v2/ui/use-toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast className=" p-0 px-5 bg-gray-800 border-gray-800 text-white flex items-center justify-center" key={id} {...props}>
             { props.startIcon && <div className=" h-full mr-[10px]">{props.startIcon}</div>}
            <div className="grid gap-1 py-[9px]">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}

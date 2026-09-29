import toast, { type Toast } from "react-hot-toast";

type ToastOpts = Partial<Pick<Toast, "icon" | "duration">>;

export function notifySuccess(message: string, opts?: ToastOpts) {
  return toast.success(message, opts);
}

export function notifyError(message: string, opts?: ToastOpts) {
  return toast.error(message, opts);
}

export function notifyWarning(message: string, opts?: ToastOpts) {
  return toast(message, {
    icon: "⚠️",
    duration: 5000,
    ...opts,
    style: {
      background: "#f4b400",
      color: "#1a1a1a",
      fontWeight: 600,
    },
  });
}

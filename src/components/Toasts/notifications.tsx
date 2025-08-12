import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export const notifications = {
  errorForm: "⚠️ Error al llenar el formulario. Por favor, modifica los campos solicitados.",
};

export type NotificationType = keyof typeof notifications;

export function showNotification(type: NotificationType) {
  const content = notifications[type] || "Tienes un error";
  toast(<div>{content}</div>, {
    autoClose: 3000,
    pauseOnHover: true,
  });
}

export const NotificationsContainer = ToastContainer;

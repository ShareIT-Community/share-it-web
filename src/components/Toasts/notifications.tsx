import React from "react";
import { toast } from "react-toastify";

export const notifications = {
  loginSuccess: "✅ ¡Bienvenido! Has iniciado sesión con éxito.",
  errorNetwork: "⚠️ Error de red, por favor intenta de nuevo.",
  infoUpdate: "ℹ️ Hay una actualización disponible.",
};

export type NotificationType = keyof typeof notifications;

export function showNotification(type: NotificationType) {
  const content = notifications[type] || "Tienes un error";
  toast(<div>{content}</div>, {
    autoClose: 3000,
    pauseOnHover: true,
  });
}


import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

export const ToastProvider = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000}
    pauseOnHover
    toastClassName="custom-toast"//los estilos estan en globals.css abajo del todo
    theme={undefined}
  />
);

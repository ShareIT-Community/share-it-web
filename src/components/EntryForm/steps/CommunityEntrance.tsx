import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const CommunityEntrance = () => {
  const [seconds, setSeconds] = useState(7);
  const [visible, setVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { height: "5px", opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    }
  }, []);

  useEffect(() => {
    if (seconds <= 0) {
      setVisible(false);
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className="2xl:w-auto rounded-2xl p-15 z-50 gap-5 border-2 border-[#94e7f8] mb-5 flex flex-col justify-center items-center backdrop-blur-3xl text-xl text-red-500 overflow-hidden"
    >
      <h2 className="font-bold">¡¡Tu Formulario fue enviado!!</h2>
      <h3 className="font-semibold">Haz click en el botón para ingresar</h3>
      <a
        href="https://chat.whatsapp.com/KG92LRrXZHo7GHyCtDDlQF"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-6 py-2 btn-gradient flex justify-center items-center rounded transition"
      >
        INGRESA
      </a>
      <p className="text-sm text-gray-300">
        El enlace se cerrará en{" "}
        <span className="font-bold">{seconds}</span> segundos
      </p>
    </div>
  );
};

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

export const CommunityEntrance = () => {

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



  return (
    <div
      ref={containerRef}
      className="2xl:w-auto rounded-2xl p-15 z-50 gap-5 border-2 border-[#94e7f8] mb-5 flex flex-col justify-center items-center backdrop-blur-3xl text-xl text-red-500 overflow-hidden"
    >
      <h2 className="text-2xl font-bold text-white">¡Bienvenido a la comunidad!</h2>
      <h3 className="font-semibold">Haz click en el botón para ingresar</h3>
      <a
        href="https://discord.gg/G54pYpjp6U"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-6 py-2 btn-gradient flex justify-center items-center rounded transition"
      >
        INGRESA
      </a>

    </div>
  );
};

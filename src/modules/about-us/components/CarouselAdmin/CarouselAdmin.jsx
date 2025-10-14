import React from "react";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { SocialLinks } from "./CustomLinks";
import "./styles.css";



const EmblaCarouselAdmin = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <section className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((item, i) => (
            <div className="embla__slide" key={i}>
              <div className="embla__slide__number bg-gray-800 rounded-lg text-center px-2">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-[#83D6E7]"
                />
                <div className="flex flex-col items-center mb-2">
                  <p className="text-lg font-bold text-white">{item.name}</p>
                  <span className="text-sm font-bold text-secondary">
                    {item.role}
                  </span>
                  <span className="text-gray-400 text-sm">{item.about}</span>
                </div>
                <SocialLinks
                  github={item.github}
                  linkedin={item.linkedin}
                  website={item.website}
                  twitter={item.twitter}
                  instagram={item.instagram}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default EmblaCarouselAdmin;

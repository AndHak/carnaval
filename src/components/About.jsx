import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=500 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        className: "mb-2"
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-36 flex flex-col items-center gap-5">
        <p className="font-general text-sm uppercase md:text-[10px]">
          Propuesta por Plan B(its)
        </p>

        <AnimatedTitle
          title="Protege el carnaval carnaval de p<b>a</b>sto"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="about-subtext">
           <p className="">
        Nuestra propuesta impulsa un <span className="font-bold">carnaval sostenible</span>, donde cada carroza,
        cada comparsa y cada sonrisa aporten al cuidado del medio ambiente. 
        Queremos reducir los desechos, promover el reciclaje creativo y rescatar
        la esencia cultural que nos hace únicos.
      </p>

      <p className="text-gray-500 mt-3 italic">
        Únete a este movimiento y demuestra que celebrar también es cuidar.  
        ¡Apóyanos con tus ideas, tu energía o tus recursos!
      </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <img
            src="img/about.png"
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;

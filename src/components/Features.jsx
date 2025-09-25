import { useState, useRef, useEffect } from "react";
import { TiLocationArrow, TiTime } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;
    const { left, top, width, height } = itemRef.current.getBoundingClientRect();
    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();
    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black/90 px-5 py-3 text-xs uppercase text-white/90"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(50px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #000, #F8FA6B90)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">Mas informacion</p>
          </div>
        )}
      </div>
    </div>
  );
};

function useCountdown() {
  const getNextCarnaval = () => {
    const now = new Date();
    const year = now.getFullYear();
    let target = new Date(`${year}-01-06T00:00:00`);
    if (target.getTime() <= now.getTime()) {
      target = new Date(`${year + 1}-01-06T00:00:00`);
    }
    return target.getTime();
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = getNextCarnaval();
    const interval = setInterval(() => {
      const now = Date.now();
      const difference = targetDate - now;
      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return timeLeft;
}

const Features = () => {
  const timeLeft = useCountdown();

  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50">Aqui cualquier cosa</p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores necessitatibus officia quas porro dolore ut veritatis facere. Assumenda, nisi expedita, nesciunt similique eaque laudantium hic eum, voluptatibus cupiditate quos impedit.
          </p>
        </div>

        <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
          <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/feature-2.mp4"
              title={<><b>Car</b>naval</>}
              description="Cualquier cosa del carnaval."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
            <BentoCard
              src="videos/feature-3.mp4"
              title={<><b>Car</b>naval</>}
              description="Loreslsssssssssss."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
            <BentoCard
              src="videos/feature-4.mp4"
              title={<>3 <b>de</b> enero</>}
              description="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa."
              isComingSoon
            />
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <div className="flex size-full flex-col justify-between bg-yellow-300 p-5">
              <h1 className="bento-title max-w-64 text-black text-2xl font-bold">
                {timeLeft.days}  Días <br />
                {timeLeft.hours}  Horas <br />
                {timeLeft.minutes}  Minutos <br />
                {timeLeft.seconds}  Segundos
              </h1>

              <TiTime className="m-5 scale-[5] self-end" />
            </div>
          </BentoTilt>

          <BentoTilt className="bento-tilt_2">
            <video
              src="videos/feature-5.mp4"
              loop
              muted
              autoPlay
              className="size-full object-cover object-center"
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;

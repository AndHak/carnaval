import AnimatedTitle from "./AnimatedTitle";
import Button from "./Button";

const ImageClipBox = ({ src, clipClass }) => (
  <div className={clipClass}>
    <img src={src} />
  </div>
);

const Contact = () => {
  return (
    <div id="extras" className="my-20 min-h-96 w-screen px-5">
      <div className="relative rounded-lg bg-black py-24 text-blue-50 sm:overflow-hidden">
        <div className="absolute -left-20 top-0 hidden h-full w-72 overflow-hidden sm:block lg:left-20 lg:w-96">
          <ImageClipBox
            src="/img/contact-1.webp"
            clipClass="contact-clip-path-1"
          />
          <ImageClipBox
            src="/img/contact-2.webp"
            clipClass="contact-clip-path-2 lg:translate-y-40 translate-y-60"
          />
        </div>

        <div className="absolute -top-40 left-20 w-full sm:top-1/2 md:left-auto md:right-10 lg:top-20 lg:w-80">
        </div>

        <div className="flex flex-col items-center text-center">
          <p className="mb-10 font-general text-[14px] uppercase">
            Extras
          </p>

          <div className="flex flex-col md:flex-row gap-6 w-full justify-evenly">
            {/* Metaverso */}
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-xl font-bold mb-4">Metaverso</h2>
              <Button
                title="Ir al Metaverso"
                containerClass="cursor-pointer mb-4 bg-emerald-200"
                onClick={() =>
                  window.open(
                    "https://claude.ai/public/artifacts/d2ebbebc-0ca7-413d-9059-b7c4387833fe",
                    "_blank"
                  )
                }
              />
            </div>

            {/* Juegos */}
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold mb-4">Juegos</h2>
              <Button
                title="Ir a Juegos"
                containerClass="cursor-pointer bg-sky-200"
                onClick={() =>
                  window.open(
                    "https://www.spatial.io/s/diegopipe23s-Virtual-Area-65dbe587661fd11bd27c9c5d?share=6980912181516499068",
                    "_blank"
                  )
                }
              />
            </div>
          </div>

          <Button title="Contactanos" containerClass="mt-10 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Contact;

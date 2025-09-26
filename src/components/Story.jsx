import gsap from "gsap";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";

const FloatingImage = () => {

    return (
        <div
            id="canjea"
            className="min-h-dvh w-screen bg-black text-blue-50 flex flex-col items-center justify-center px-4"
        >
            {/* Título */}
            <p className="font-general text-sm uppercase md:text-[10px] text-center">
                Proximamente
            </p>

            <div className="relative size-full flex justify-center mx-auto">
                <AnimatedTitle
                    title="Canjea t<b>u</b>s puntos<br />aq<b>u</b>i"
                    containerClass="mt-5 text-center pointer-events-none mix-blend-difference relative z-10"
                />
            </div>

            <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 justify-items-center max-w-lg w-full mx-auto">
                {/* Card 1 */}
                <div className="relative aspect-square w-28 sm:w-40 md:w-48 lg:w-56 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center hover:scale-105 transition-all duration-200">
                    <img
                        src="/img/reward1.jpg"
                        alt="reward1"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 w-full bg-black/60 text-white text-xs sm:text-sm md:text-base px-2 py-1 text-center">
                        <p>Carioca</p>
                        <span className="text-violet-400 font-semibold">
                            200 pts
                        </span>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="relative aspect-square w-28 sm:w-40 md:w-48 lg:w-56 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center hover:scale-105 transition-all duration-200">
                    <img
                        src="/img/reward2.png"
                        alt="reward2"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 w-full bg-black/60 text-white text-xs sm:text-sm md:text-base px-2 py-1 text-center">
                        <p>Cilindro de gas</p>
                        <span className="text-violet-400 font-semibold">
                            2000 pts
                        </span>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="relative aspect-square w-28 sm:w-40 md:w-48 lg:w-56 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center hover:scale-105 transition-all duration-200">
                    <img
                        src="/img/reward3.jpg"
                        alt="reward3"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 w-full bg-black/60 text-white text-xs sm:text-sm md:text-base px-2 py-1 text-center">
                        <p>Entradas vip estadio</p>
                        <span className="text-violet-400 font-semibold">
                            1000 pts
                        </span>
                    </div>
                </div>

                {/* Card 4 */}
                <div className="relative aspect-square w-28 sm:w-40 md:w-48 lg:w-56 rounded-xl bg-slate-800 overflow-hidden flex items-center justify-center hover:scale-105 transition-all duration-200">
                    <img
                        src="/img/reward4.png"
                        alt="reward4"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 w-full bg-black/60 text-white text-xs sm:text-sm md:text-base px-2 py-1 text-center">
                        <p>Poncho</p>
                        <span className="text-violet-400 font-semibold">
                            500 pts
                        </span>
                    </div>
                </div>
            </div>

            {/* Sección estilo chatbot */}
            <div className="mt-10 flex justify-center w-full">
                <div className="flex h-full w-fit flex-col items-center">
                    {/* Caja del chat (mock) */}
                    <div className="w-[300px] max-w-sm rounded-2xl bg-slate-900/70 p-4 shadow-lg">
                        <div className="flex flex-col gap-3 text-sm text-blue-50">
                            <div className="self-start rounded-xl bg-slate-800 px-3 py-2">
                                Hola ingresa tu usuario para ver tus puntos.
                            </div>
                            <div className="self-end rounded-xl bg-violet-700 px-3 py-2">
                                Usuario123
                            </div>
                            <div className="self-start rounded-xl bg-slate-800 px-3 py-2">
                                Tienes <strong>120 puntos</strong>
                            </div>
                            <div className="self-start rounded-xl bg-slate-800 px-3 py-2 text-xs italic text-gray-300">
                                Más funciones en camino...
                            </div>
                        </div>

                        {/* Input simulado */}
                        <div className="my-4 flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Escribe tu usuario..."
                                className="flex-1 rounded-lg bg-slate-800 px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none"
                                disabled
                            />
                            <button className="rounded-lg bg-violet-700 px-3 py-2 text-sm font-semibold text-white opacity-50 cursor-not-allowed">
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FloatingImage;

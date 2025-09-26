import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { Route } from "lucide-react";
import { useLocation } from "react-router-dom";

const navItems = ["Inicio", "Educacion", "Mapa", "Apoyanos", "Contacto"];

const NavBar = () => {
    const [isAudioPlaying, setIsAudioPlaying] = useState(false);
    const [isIndicatorActive, setIsIndicatorActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const audioElementRef = useRef(null);
    const navContainerRef = useRef(null);
    const sidebarRef = useRef(null);

    const { y: currentScrollY } = useWindowScroll();
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const location = useLocation();

    const toggleAudioIndicator = () => {
        setIsAudioPlaying((prev) => !prev);
        setIsIndicatorActive((prev) => !prev);
    };

    useEffect(() => {
        if (isAudioPlaying) {
            audioElementRef.current.play();
        } else {
            audioElementRef.current.pause();
        }
    }, [isAudioPlaying]);

    useEffect(() => {
        if (currentScrollY === 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove("floating-nav");
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current.classList.add("floating-nav");
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navContainerRef.current.classList.add("floating-nav");
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.2,
        });
    }, [isNavVisible]);

    // Animación del sidebar
    useEffect(() => {
        if (sidebarRef.current) {
            gsap.to(sidebarRef.current, {
                x: isMenuOpen ? 0 : "100%",
                duration: 0.3,
                ease: "power3.out",
            });
        }
    }, [isMenuOpen]);

    return (
        <div
            ref={navContainerRef}
            className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
        >
            <header className="absolute top-1/2 w-full -translate-y-1/2 bg-black/70">
                <nav className="flex size-full items-center justify-between p-4">
                    {/* Logo */}
                    <div className="flex items-center gap-7">
                        <img src="/img/logo.jpg" alt="logo" className="w-10" />
                        <span className="text-white font-bold scale-[1.3]">
                            Plan B(its)
                        </span>
                    </div>

                    {/* Links Desktop */}
                    <div className="hidden md:flex h-full items-center">
                        {navItems.map((item, index) => {
                            const anchor = item.toLowerCase();
                            const isHome = location.pathname === "/";
                            const href = isHome ? `#${anchor}` : `/#${anchor}`;

                            return (
                                <a
                                    key={index}
                                    href={href}
                                    className="nav-hover-btn"
                                >
                                    {item}
                                </a>
                            );
                        })}
                        <button
                            onClick={toggleAudioIndicator}
                            className="ml-10 flex items-center space-x-0.5 mr-2"
                        >
                            <audio
                                ref={audioElementRef}
                                className="hidden"
                                src="/audio/loop.mp3"
                                loop
                            />
                            {[1, 2, 3, 4].map((bar) => (
                                <div
                                    key={bar}
                                    className={clsx("indicator-line", {
                                        active: isIndicatorActive,
                                    })}
                                    style={{
                                        animationDelay: `${bar * 0.1}s`,
                                    }}
                                />
                            ))}
                        </button>
                    </div>

                    {/* Botón Hamburger (Mobile) */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(true)}>
                            <HiMenu className="text-white w-7 h-7" />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Sidebar Mobile */}
            <div
                ref={sidebarRef}
                className="fixed top-0 right-0 h-screen w-64 bg-black/90 text-white p-6 transform translate-x-full z-50 flex flex-col md:hidden"
            >
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="self-end mb-8"
                >
                    <HiX className="w-7 h-7" />
                </button>
                {navItems.map((item, index) => {
                    const anchor = item.toLowerCase();
                    const isHome = location.pathname === "/";
                    const href = isHome ? `#${anchor}` : `/#${anchor}`;
                    return (<a
                        key={index}
                        href={href}
                        onClick={() => setIsMenuOpen(false)}
                        className="mb-4 text-lg hover:text-cyan-300"
                    >
                        {item}
                    </a>);
                })}

                <button
                    onClick={toggleAudioIndicator}
                    className="mt-4 flex items-center space-x-0.5"
                >
                    <audio
                        ref={audioElementRef}
                        className="hidden"
                        src="/audio/loop.mp3"
                        loop
                    />
                    <div className="flex h-full w-full gap-1">
                        {[1, 2, 3, 4].map((bar) => (
                            <div
                                key={bar}
                                className={clsx("indicator-line mt-2", {
                                    active: isIndicatorActive,
                                })}
                                style={{
                                    animationDelay: `${bar * 0.1}s`,
                                }}
                            />
                        ))}
                        <span className="ml-2.5">Play</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default NavBar;

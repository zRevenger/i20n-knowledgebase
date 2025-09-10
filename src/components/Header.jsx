import { useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion"; // se usi motion/react, importa da lì
import nLogo from "../assets/n-logo.svg";
import { SunIcon, MoonIcon, Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useSettings } from "../contexts/SettingsContext.jsx";

export default function Header() {
    const { theme, setTheme, currentTheme } = useSettings();
    const [menuOpen, setMenuOpen] = useState(false);

    const menuItems = [
        { to: "/", label: "Home" },
        { to: "/esplora", label: "Esplora" },
        { to: "/categorie", label: "Categorie" },
    ];

    return (
        <header className={`fixed top-0 left-0 w-full ${currentTheme.headerBg} backdrop-blur-md border-b ${currentTheme.headerBorder} shadow-sm z-50`}>
            <div className="max-w-6xl mx-auto flex items-center px-6 py-3">
                {/* Logo + titolo */}
                <div className="flex items-center gap-3">
                    <img src={nLogo} alt="Hyundai N Logo" className="h-8 w-auto" />
                    <h1 className={`hidden md:block text-xl font-bold ${currentTheme.headerText}`}>
                        Hyundai i20N - Knowledge Base
                    </h1>
                </div>

                <div className="flex-1"></div>

                {/* Navigazione desktop */}
                <nav className="hidden md:flex items-center gap-6 ml-6">
                    {menuItems.map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`
                relative ${currentTheme.headerText} transition-all duration-300
                hover:scale-110
                after:content-[''] after:absolute after:left-0 after:-bottom-1
                after:w-0 after:h-[2px] ${currentTheme.headerLinkUnderline}
                after:transition-all after:duration-300 hover:after:w-full
            `}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>


                {/* Toggle tema */}
                <div className="ml-6">
                    <button
                        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                        className={`relative w-12 h-12 flex items-center justify-center rounded-full border ${currentTheme.headerBorder} ${currentTheme.buttonBg} ${currentTheme.buttonText} transition-all duration-500 ease-in-out group`}
                    >
                        <SunIcon className={`absolute w-6 h-6 transition-all duration-500 transform ${theme === "light" ? "opacity-100 scale-100 rotate-0 group-hover:text-yellow-500" : "opacity-0 scale-50 -rotate-45"}`} />
                        <MoonIcon className={`absolute w-6 h-6 transition-all duration-500 transform ${theme === "dark" ? "opacity-100 scale-100 rotate-0 group-hover:text-indigo-400" : "opacity-0 scale-50 -rotate-45"}`} />
                    </button>
                </div>

                {/* Burger menu */}
                <button
                    className="relative flex ml-2 md:hidden p-2 rounded-md items-center justify-center transition-all duration-500 hover:scale-125 active:scale-110 ease-in-out group"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <XMarkIcon className={`absolute w-7 h-7 ${currentTheme.headerText} transition-all duration-500 transform rotate-0 ${menuOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-45"}`}/>
                    <Bars3Icon className={`w-7 h-7 ${currentTheme.headerText} transition-all duration-500 transform rotate-0 ${!menuOpen ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-45"}`}/>
                </button>
            </div>

            {/* Menu mobile con animazione */}
            {createPortal(
                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            key="mobile-menu"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                            className="fixed inset-x-0 top-0 h-screen flex flex-col z-40"
                        >
                            {/* Spacer per header */}
                            <div className="h-16"></div>

                            {/* Contenuto menu */}
                            <div className={`flex-1 ${currentTheme.headerBg} backdrop-blur-md border-t ${currentTheme.headerBorder} flex flex-col items-center justify-center gap-8 px-6`}>
                                {menuItems.map(({ to, label }) => (
                                    <Link
                                        key={to}
                                        to={to}
                                        className={`text-lg font-semibold ${currentTheme.headerText} hover:underline`}
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {label}
                                    </Link>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}


        </header>
    );
}

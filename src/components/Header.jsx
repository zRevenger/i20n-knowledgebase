import { Link } from "react-router-dom";
import nLogo from "../assets/n-logo.svg";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import {useSettings} from "../contexts/SettingsContext.jsx";

export default function Header() {
    const { theme, setTheme, currentTheme } = useSettings();
    return (
        <header className={`fixed top-0 left-0 w-full ${currentTheme.headerBg} backdrop-blur-md border-b ${currentTheme.headerBorder} shadow-sm z-50`}>
            <div className="max-w-6xl mx-auto flex items-center px-6 py-3">

                {/* Logo + titolo */}
                <div className="flex items-center gap-3">
                    <img src={nLogo} alt="Hyundai N Logo" className="h-8 w-auto" />
                    <h1 className={`text-xl font-bold ${currentTheme.headerText}`}>
                        Hyundai i20N - Knowledge Base
                    </h1>
                </div>

                <div className="flex-1"></div>

                {/* Navigazione */}
                <nav className="flex items-center gap-6">
                    {[
                        { to: "/", label: "Home" },
                        { to: "/esplora", label: "Esplora" },
                        { to: "/categorie", label: "Categorie" }
                    ].map(({ to, label }) => (
                        <Link
                            key={to}
                            to={to}
                            className={`
        relative ${currentTheme.headerText} transition-all duration-300
        hover:scale-110 hover:${currentTheme.headerText}
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
                        {/* Sole */}
                        <SunIcon
                            className={`absolute w-6 h-6 transition-all duration-500 transform
                                ${theme === "light" ? "opacity-100 scale-100 rotate-0 group-hover:text-yellow-500" : "opacity-0 scale-50 -rotate-45"}
                            `}
                        />
                        {/* Luna */}
                        <MoonIcon
                            className={`absolute w-6 h-6 transition-all duration-500 transform
                                ${theme === "dark" ? "opacity-100 scale-100 rotate-0 group-hover:text-indigo-400" : "opacity-0 scale-50 -rotate-45"}
                            `}
                        />
                    </button>
                </div>

            </div>
        </header>
    );
}

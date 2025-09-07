import { useState } from "react";
import { BarsArrowUpIcon } from "@heroicons/react/24/solid";
import {useSettings} from "../contexts/SettingsContext.jsx";

export default function SearchBar ({ search, setSearch, placeholder, onSort }) {
    const [sortOpen, setSortOpen] = useState(false);
    const { sortOption, setSortOption } = useSettings();

    const handleSort = (option) => {
        const newOption = option === sortOption ? null : option; // toggle
        setSortOption(newOption);
        setSortOpen(false);
        onSort && onSort(newOption);
    };

    const { currentTheme } = useSettings();

    return (
        <div className="w-full flex justify-center relative">
            <div className="w-full sm:w-2/3 lg:w-1/2 relative">
                {/* Contenitore input + icona con hover */}
                <div className="relative rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105">
                    {/* Input */}
                    <input
                        type="text"
                        placeholder={placeholder || "Cerca articoli, tag o contenuto..."}
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className={`
          w-full px-6 py-3 rounded-full pr-12
          ${currentTheme.cardBg} ${currentTheme.cardText} ${currentTheme.cardBorder}
          placeholder-gray-400
          focus:outline-none
          focus:shadow-xl focus:-translate-y-0.5
          transition-all duration-200
        `}
                    />

                    {/* Icona di sorting */}
                    <button
                        type="button"
                        onClick={() => setSortOpen(!sortOpen)}
                        className={`
          absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full
          ${sortOption ? currentTheme.cardText : "text-gray-400"}
          hover:${currentTheme.cardText}
          transition-all duration-200
        `}
                    >
                        <BarsArrowUpIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Dropdown del sort fuori dal contenitore hover */}
                {sortOpen && (
                    <div
                        className={`
          absolute top-full right-0 mt-2 w-48
          ${currentTheme.cardBg} ${currentTheme.cardBorder}
          shadow-lg rounded-lg z-50
        `}
                    >
                        <ul>
                            <li><button className={`w-full text-left px-4 py-2 ${currentTheme.cardText} hover:${currentTheme.buttonBg} first:rounded-t-lg`} onClick={() => handleSort("title-asc")}>Titolo ↑</button></li>
                            <li><button className={`w-full text-left px-4 py-2 ${currentTheme.cardText} hover:${currentTheme.buttonBg}`} onClick={() => handleSort("title-desc")}>Titolo ↓</button></li>
                            <li><button className={`w-full text-left px-4 py-2 ${currentTheme.cardText} hover:${currentTheme.buttonBg}`} onClick={() => handleSort("category-asc")}>Categoria ↑</button></li>
                            <li><button className={`w-full text-left px-4 py-2 ${currentTheme.cardText} hover:${currentTheme.buttonBg}`} onClick={() => handleSort("category-desc")}>Categoria ↓</button></li>
                            <li><button className={`w-full text-left px-4 py-2 ${currentTheme.cardText} hover:${currentTheme.buttonBg} last:rounded-b-lg`} onClick={() => handleSort(null)}>Rimuovi ordinamento</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
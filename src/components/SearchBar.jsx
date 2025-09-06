export default function SearchBar ({ search, setSearch, currentTheme, placeholder }) {
    return (
        <div className="w-full flex justify-center">
            <input
                type="text"
                placeholder={placeholder || "Cerca articoli, tag o contenuto..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`
    w-full sm:w-2/3 lg:w-1/2 px-6 py-3 rounded-full
    ${currentTheme.cardBg} ${currentTheme.cardText} ${currentTheme.cardBorder}
    placeholder-gray-400
    focus:outline-none
    focus:shadow-xl focus:-translate-y-0.5
    transition-all duration-200
    hover:shadow-lg hover:scale-105
  `}
            />
        </div>
    );
};
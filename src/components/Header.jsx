export default function Header({ theme, setTheme, currentTheme }) {
    return (
        <header className={`fixed top-0 left-0 w-full ${currentTheme.headerBg} backdrop-blur-md border-b ${currentTheme.headerBorder} shadow-sm z-50`}>
            <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-3">
                <h1 className="text-xl font-bold">Hyundai i20N Knowledge Base</h1>
                <button
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className={`relative w-12 h-12 flex items-center justify-center rounded-full border ${currentTheme.headerBorder} ${currentTheme.buttonBg} ${currentTheme.buttonText} transition-all duration-500 ease-in-out`}
                >
                    <span className={`absolute transition-all duration-500 transform ${theme === "light" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 -rotate-45"}`}>☀️</span>
                    <span className={`absolute transition-all duration-500 transform ${theme === "dark" ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-45"}`}>🌙</span>
                </button>
            </div>
        </header>
    );
}
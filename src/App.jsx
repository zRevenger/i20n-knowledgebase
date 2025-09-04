import { useState } from "react";
import Header from "./components/Header";
import KnowledgeBase from "./pages/KnowledgeBase";
import { themes } from "./utils/theme.js";

export default function App() {
    const [theme, setTheme] = useState("light");
    const currentTheme = themes[theme];

    return (
        <div className={`min-h-screen ${currentTheme.bg} ${currentTheme.text} transition-colors duration-500`}>
            <Header theme={theme} setTheme={setTheme} currentTheme={currentTheme} />
            <main className="pt-20 px-6">
                <KnowledgeBase currentTheme={currentTheme} />
            </main>
        </div>
    );
}
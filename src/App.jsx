import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import KnowledgeBase from "./pages/KnowledgeBase";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import { themes } from "./utils/theme.js";

export default function App() {
    const [theme, setTheme] = useState("light");
    const currentTheme = themes[theme];

    return (
        <div
            className={`min-h-screen overflow-y-auto ${currentTheme.bg} ${currentTheme.text} transition-colors duration-500`}
            style={{ scrollbarGutter: "stable both-edges" }}
        >
            <Header theme={theme} setTheme={setTheme} currentTheme={currentTheme} />
            <main className="pt-20 px-6">
                <Routes>
                    <Route path="/" element={<KnowledgeBase currentTheme={currentTheme} />} />
                    <Route path="/categorie" element={<CategoriesPage currentTheme={currentTheme} />} />
                    <Route path="/categorie/:categoryName" element={<CategoryPage currentTheme={currentTheme} />} />
                </Routes>
            </main>
        </div>
    );
}

import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import KnowledgeBase from "./pages/KnowledgeBase";
import CategoriesPage from "./pages/CategoriesPage";
import CategoryPage from "./pages/CategoryPage";
import Footer from "./components/Footer";
import Homepage from "./pages/Homepage.jsx";
import { useSettings } from "./contexts/SettingsContext";

export default function App() {
    const { currentTheme } = useSettings();

    return (
        <div
            className={`min-h-screen flex flex-col overflow-y-auto ${currentTheme.bg} ${currentTheme.text} transition-colors duration-500`}
            style={{ scrollbarGutter: "stable both-edges" }}
        >
            {/* Header con toggle tema */}
            <Header/>

            {/* Main content */}
            <main className="flex-1 pt-20">
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/esplora" element={<KnowledgeBase />} />
                    <Route path="/categorie" element={<CategoriesPage />} />
                    <Route path="/categorie/:categoryName" element={<CategoryPage />} />
                </Routes>
            </main>

            {/* Footer comune */}
            <Footer />
        </div>
    );
}

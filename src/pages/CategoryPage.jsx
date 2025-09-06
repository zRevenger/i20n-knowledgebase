// src/pages/CategoryPage.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import knowledgeData from "../data/knowledge.json";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar.jsx";
import SearchBar from "../components/SearchBar.jsx";

export default function CategoryPage({ currentTheme }) {
    const { categoryName } = useParams(); // prende la categoria dall'URL
    const [search, setSearch] = useState("");

    // filtro articoli della categoria selezionata
    const categoryArticles = knowledgeData.filter(
        (article) =>
            article.categoria.toLowerCase() === categoryName.toLowerCase()
    );

    // ricerca su titolo, contenuto e tags
    const filteredArticles = categoryArticles.filter((article) => {
        const searchLower = search.toLowerCase();
        return (
            article.titolo.toLowerCase().includes(searchLower) ||
            article.contenuto.toLowerCase().includes(searchLower) ||
            article.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        );
    });

    return (
        <div className="max-w-6xl mx-auto mt-8 px-6 flex flex-col gap-6">
            {/* Titolo categoria */}
            <h2 className="text-2xl font-bold text-center mb-4">
                Categoria: {categoryName}
            </h2>
            <Sidebar currentTheme={currentTheme} setSearch={setSearch} />
            {/* Search bar */}
            <SearchBar
                search={search}
                setSearch={setSearch}
                currentTheme={currentTheme}
                placeholder={`Cerca nella categoria ${categoryName}...`}
            />

            {/* Griglia articoli */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article) => (
                        <ArticleCard
                            key={article.id}
                            article={article}
                            currentTheme={currentTheme}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        Nessun articolo trovato in questa categoria.
                    </p>
                )}
            </div>
        </div>
    );
}

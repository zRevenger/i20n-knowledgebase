// src/pages/CategoryPage.jsx
import { useParams } from "react-router-dom";
import { useState } from "react";
import knowledgeData from "../data/knowledge.json";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CardGrid from "../components/CardGrid.jsx";

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
            <CardGrid
                items={filteredArticles}
                renderItem={(article) => (
                    <ArticleCard article={article} currentTheme={currentTheme} />
                )}
                emptyMessage="Nessun articolo trovato in questa categoria."
            />
        </div>
    );
}

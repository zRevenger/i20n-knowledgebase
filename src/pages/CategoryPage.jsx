// src/pages/CategoryPage.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import knowledgeData from "../data/knowledge.json";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CardGrid from "../components/CardGrid.jsx";
import {useSettings} from "../contexts/SettingsContext.jsx";

export default function CategoryPage() {
    const { categoryName } = useParams();
    const [search, setSearch] = useState("");
    const { sortOption, setSortOption } = useSettings();
    const [filteredArticles, setFilteredArticles] = useState([]);

    // Filtra articoli della categoria selezionata
    const categoryArticles = knowledgeData.filter(
        (article) => article.categoria.toLowerCase() === categoryName.toLowerCase()
    );

    // Filtra e ordina articoli in base a search e sort
    useEffect(() => {
        let results = categoryArticles.filter((article) => {
            const searchLower = search.toLowerCase();
            return (
                article.titolo.toLowerCase().includes(searchLower) ||
                article.contenuto.toLowerCase().includes(searchLower) ||
                article.tags.some((tag) => tag.toLowerCase().includes(searchLower))
            );
        });

        if (sortOption) {
            switch (sortOption) {
                case "title-asc":
                    results.sort((a, b) => a.titolo.localeCompare(b.titolo));
                    break;
                case "title-desc":
                    results.sort((a, b) => b.titolo.localeCompare(a.titolo));
                    break;
                case "category-asc":
                    results.sort((a, b) => a.categoria.localeCompare(b.categoria));
                    break;
                case "category-desc":
                    results.sort((a, b) => b.categoria.localeCompare(a.categoria));
                    break;
                default:
                    break;
            }
        }

        setFilteredArticles(results);
    }, [search, sortOption, categoryName]);

    return (
        <div className="max-w-6xl mx-auto mt-8 px-6 flex flex-col gap-6">
            {/* Titolo categoria */}
            <h2 className="text-2xl font-bold text-center mb-4">
                Categoria: {categoryName}
            </h2>
            <Sidebar setSearch={setSearch} />
            {/* Search bar */}
            <SearchBar
                search={search}
                setSearch={setSearch}
                onSort={setSortOption}
                placeholder={`Cerca nella categoria ${categoryName}...`}
            />

            {/* Griglia articoli */}
            <CardGrid
                items={filteredArticles}
                renderItem={(article) => (
                    <ArticleCard article={article}   />
                )}
                emptyMessage="Nessun articolo trovato in questa categoria."
            />
        </div>
    );
}

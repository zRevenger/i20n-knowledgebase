// src/pages/CategoryPage.jsx
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import knowledgeData from "../data/knowledge.json";
import ArticleCard from "../components/ArticleCard";
import Sidebar from "../components/Sidebar.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CardGrid from "../components/CardGrid.jsx";
import {useSettings} from "../contexts/SettingsContext.jsx";
import { FetchMD } from "../utils/FetchMD.jsx";

export default function CategoryPage() {
    const { categoryName } = useParams();
    const [search, setSearch] = useState("");
    const { sortOption, setSortOption } = useSettings();
    const [filteredArticles, setFilteredArticles] = useState([]);

    // Filtra articoli della categoria selezionata
    const categoryArticles = knowledgeData.filter(
        (article) => article.categoria.toLowerCase() === categoryName.toLowerCase()
    );

    // ricerca avanzata: titolo, contenuto, tags
    useEffect(() => {
        const searchLower = search.toLowerCase();

        // fetch di tutti i contenuti in parallelo
        Promise.all(
            categoryArticles.map((article) =>
                FetchMD(article.id)
                    .then((text) => ({
                        ...article,
                        _content: text.toLowerCase(), // salvo in un campo temporaneo
                    }))
                    .catch(() => ({
                        ...article,
                        _content: "", // se fallisce, contenuto vuoto
                    }))
            )
        ).then((articlesWithContent) => {
            // 🔎 filtro per titolo, contenuto e tags
            let results = articlesWithContent.filter(
                (article) =>
                    article.titolo.toLowerCase().includes(searchLower) ||
                    article._content.includes(searchLower) ||
                    article.tags.some((tag) => tag.toLowerCase().includes(searchLower))
            );

            // ↕️ sorting
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
        });
    }, [categoryArticles, search, sortOption]);

    return (
        <div className="max-w-sm sm:max-w-6/10 mx-auto mt-20 sm:mt-8 px-6 flex flex-col gap-6">
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

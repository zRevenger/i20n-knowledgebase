import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import knowledgeData from "../data/knowledge.json";
import Sidebar from "../components/Sidebar.jsx";
import SearchBar from "../components/Searchbar.jsx";
import CardGrid from "../components/CardGrid.jsx";
import {useSettings} from "../contexts/SettingsContext.jsx";

export default function KnowledgeBase() {
    const [search, setSearch] = useState("");
    const { sortOption, setSortOption } = useSettings();
    const [filteredArticles, setFilteredArticles] = useState(knowledgeData);

    // ricerca avanzata: titolo, contenuto, tags
    useEffect(() => {
        // Filtra articoli per titolo, contenuto e tags
        let results = knowledgeData.filter((article) => {
            const searchLower = search.toLowerCase();
            return (
                article.titolo.toLowerCase().includes(searchLower) ||
                article.contenuto.toLowerCase().includes(searchLower) ||
                article.tags.some((tag) => tag.toLowerCase().includes(searchLower))
            );
        });

        // Applica sorting
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
    }, [search, sortOption]);

    return (
        <div className="max-w-6xl mx-auto mt-8 px-6 flex flex-col gap-6">

            <Sidebar setSearch={setSearch} />

            {/* Search bar */}
            <SearchBar
                search={search}
                setSearch={setSearch}
                placeholder="Cerca articoli, tag o contenuto..."
                onSort={setSortOption}
            />

            {/* Griglia articoli */}
            <CardGrid
                items={filteredArticles}
                emptyMessage="Nessun articolo trovato."
                renderItem={(article) => (
                    <ArticleCard article={article} />
                )}
            />
        </div>
    );
}

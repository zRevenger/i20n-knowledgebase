import { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import knowledgeData from "../data/knowledge.json";
import Sidebar from "../components/Sidebar.jsx";
import SearchBar from "../components/Searchbar.jsx";
import CardGrid from "../components/CardGrid.jsx";

export default function KnowledgeBase({ currentTheme }) {
    const [search, setSearch] = useState("");
    const articlesData = knowledgeData;

    // ricerca avanzata: titolo, contenuto, tags
    const filteredArticles = articlesData.filter((article) => {
        const searchLower = search.toLowerCase();
        return (
            article.titolo.toLowerCase().includes(searchLower) ||
            article.contenuto.toLowerCase().includes(searchLower) ||
            article.tags.some(tag => tag.toLowerCase().includes(searchLower))
        );
    });

    return (
        <div className="max-w-6xl mx-auto mt-8 px-6 flex flex-col gap-6">

            <Sidebar currentTheme={currentTheme} setSearch={setSearch} />

            {/* Search bar */}
            <SearchBar
                search={search}
                setSearch={setSearch}
                currentTheme={currentTheme}
                placeholder="Cerca articoli, tag o contenuto..."
            />

            {/* Griglia articoli */}
            <CardGrid
                items={filteredArticles}
                emptyMessage="Nessun articolo trovato."
                renderItem={(article) => (
                    <ArticleCard article={article} currentTheme={currentTheme} />
                )}
            />
        </div>
    );
}

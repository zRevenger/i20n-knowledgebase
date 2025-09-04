import { useState } from "react";
import ArticleCard from "../components/ArticleCard";
import knowledgeData from "../data/knowledge.json";

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

            {/* Search bar */}
            <div className="w-full flex justify-center">
                <input
                    type="text"
                    placeholder="Cerca articoli, tag o contenuto..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className={`w-full sm:w-2/3 lg:w-1/2 px-6 py-3 rounded-full border-2 ${currentTheme.cardBorder} ${currentTheme.cardBg} ${currentTheme.cardText} placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-gray-400 transition shadow-md`}
                />
            </div>

            {/* Griglia articoli */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        article={article}
                        currentTheme={currentTheme}
                    />
                ))}
            </div>
        </div>
    );
}

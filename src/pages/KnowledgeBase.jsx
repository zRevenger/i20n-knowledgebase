import { useState } from "react";
import data from "../data/knowledge.json";
import ArticleCard from "../components/ArticleCard";

export default function KnowledgeBase({ currentTheme }) {
    const [query, setQuery] = useState("");

    const filtered = data.filter(
        (item) =>
            item.titolo.toLowerCase().includes(query.toLowerCase()) ||
            item.contenuto.toLowerCase().includes(query.toLowerCase()) ||
            item.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
    );

    return (
        <div className="max-w-4xl mx-auto">
            <input
                type="text"
                placeholder="Cerca nella knowledge base..."
                className={`w-full p-3 rounded-xl mb-6 shadow-sm ${currentTheme.tagBg} ${currentTheme.text}`}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <div className="grid gap-4">
                {filtered.map((item) => (
                    <ArticleCard key={item.id} article={item} currentTheme={currentTheme} />
                ))}
            </div>
        </div>
    );
}
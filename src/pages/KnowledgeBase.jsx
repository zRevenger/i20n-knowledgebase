import { useState, useEffect } from "react";
import ArticleCard from "../components/ArticleCard";
import knowledgeData from "../data/knowledge.json";
import Sidebar from "../components/Sidebar.jsx";
import SearchBar from "../components/Searchbar.jsx";
import CardGrid from "../components/CardGrid.jsx";
import {useSettings} from "../contexts/SettingsContext.jsx";
import { FetchMD } from "../utils/FetchMD.jsx";

export default function KnowledgeBase() {
    const [search, setSearch] = useState("");
    const { sortOption, setSortOption } = useSettings();
    const [filteredArticles, setFilteredArticles] = useState(knowledgeData);

    // ricerca avanzata: titolo, contenuto, tags
    useEffect(() => {
        const searchLower = search.toLowerCase();

        // fetch di tutti i contenuti in parallelo
        Promise.all(
            knowledgeData.map((article) =>
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
                    article.tags.some((tag) => tag.toLowerCase().includes(searchLower)) ||
                    article.categoria.toLowerCase().includes(searchLower)
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
    }, [search, sortOption]);

    return (
        <div className="max-w-sm sm:max-w-6/10 mx-auto mt-20 sm:mt-8 px-6 flex flex-col gap-6">

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

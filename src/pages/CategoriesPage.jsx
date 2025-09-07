import { Link } from "react-router-dom";
import knowledgeData from "../data/knowledge.json";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import CardGrid from "../components/CardGrid.jsx";

export default function CategoriesPage({ currentTheme }) {
    const [search, setSearch] = useState("");
    const [sortOption, setSortOption] = useState(null);
    const [filteredCategories, setFilteredCategories] = useState([]);

    // Lista categorie uniche
    const categories = Array.from(new Set(knowledgeData.map(a => a.categoria)));

    // Filtraggio e sorting categorie
    useEffect(() => {
        let results = categories.filter(cat =>
            cat.toLowerCase().includes(search.toLowerCase())
        );

        if (sortOption) {
            switch (sortOption) {
                case "title-asc":
                    results.sort((a, b) => a.localeCompare(b));
                    break;
                case "title-desc":
                    results.sort((a, b) => b.localeCompare(a));
                    break;
                default:
                    break;
            }
        }

        setFilteredCategories(results);
    }, [search, sortOption]);

    return (
        <div className="max-w-6xl mx-auto mt-8 px-6 flex flex-col gap-6">

            {/* Search bar */}
            <SearchBar
                search={search}
                setSearch={setSearch}
                currentTheme={currentTheme}
                placeholder={`Cerca categorie...`}
                onSort={setSortOption}
            />

            {/* Griglia categorie */}
            <CardGrid
                items={filteredCategories}
                renderItem={(category) => (
                    <Link key={category}  to={`/categorie/${category}`}>
                        <Card
                            title={category}
                            content={`Visualizza tutti gli articoli della categoria ${category}.`}
                            category={category}
                            currentTheme={currentTheme}
                        />
                    </Link>
                )}
                emptyMessage="Nessun articolo trovato in questa categoria."
            />
        </div>
    );
}

import { Link } from "react-router-dom";
import knowledgeData from "../data/knowledge.json";
import Card from "../components/Card";
import { useState } from "react";
import SearchBar from "../components/SearchBar.jsx";

export default function CategoriesPage({ currentTheme }) {
    const [search, setSearch] = useState("");

    // Lista categorie uniche
    const categories = Array.from(new Set(knowledgeData.map(a => a.categoria)));

    // Filtraggio per ricerca
    const filteredCategories = categories.filter(cat =>
        cat.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto mt-8 px-6 flex flex-col gap-6">

            {/* Search bar */}
            <SearchBar
                search={search}
                setSearch={setSearch}
                currentTheme={currentTheme}
                placeholder={`Cerca categorie...`}
            />

            {/* Griglia categorie */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.map(category => (
                    <Link key={category} to={`/categorie/${category}`}>
                        <Card
                            title={category}
                            content={`Visualizza tutti gli articoli della categoria ${category}.`}
                            category={category}
                            currentTheme={currentTheme}
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

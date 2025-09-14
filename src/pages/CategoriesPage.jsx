import Card from "../components/Card";
import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import CardGrid from "../components/CardGrid.jsx";
import {useSettings} from "../contexts/SettingsContext.jsx";
import {FetchKnowledgeData} from "../utils/FetchKnowledgeData.jsx";

export default function CategoriesPage() {
    const [search, setSearch] = useState("");
    const { sortOption, setSortOption } = useSettings();
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [categories, setCategories] = useState([]);

    // Carica tutti i dati da GitHub
    useEffect(() => {
        FetchKnowledgeData()
            .then((data) => {
                // filtra subito per categoria
                const categories = Array.from(new Set(data.map(a => a.categoria)));
                setCategories(categories);
                setFilteredCategories(categories);
            })
            .catch((err) => console.error("Errore fetching knowledge data:", err));
    }, [categories]);

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
        <div className="max-w-sm sm:max-w-6/10 mx-auto mt-8 px-6 flex flex-col gap-6">

            {/* Search bar */}
            <SearchBar
                search={search}
                setSearch={setSearch}
                placeholder={`Cerca categorie...`}
                onSort={setSortOption}
            />

            {/* Griglia categorie */}
            <CardGrid
                items={filteredCategories}
                renderItem={(category) => (
                    <Card
                        title={category}
                        content={`Visualizza tutti gli articoli della categoria ${category}.`}
                        category={category}
                        to={`/categorie/${category}`}
                    />
                )}
                emptyMessage="Nessun articolo trovato in questa categoria."
            />
        </div>
    );
}

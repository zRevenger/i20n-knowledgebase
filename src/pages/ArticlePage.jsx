import {Link, useParams} from "react-router-dom";
import knowledgeData from "../data/knowledge.json";
import { categoryGradients } from "../utils/theme.js";
import { useSettings } from "../contexts/SettingsContext.jsx";

export default function ArticlePage() {
    const { id } = useParams();
    const article = knowledgeData.find((a) => String(a.id) === id);

    const { currentTheme } = useSettings();

    if (!article) {
        return (
            <div className="max-w-3xl mx-auto mt-12 px-6 text-center">
                <h2 className="text-2xl font-bold">Articolo non trovato</h2>
            </div>
        );
    }

    // Gradient collegato alla categoria
    const gradient = categoryGradients[article.categoria.toLowerCase()] || "from-gray-400 to-gray-600";

    return (
        <article className="max-w-3xl mx-auto mt-12 px-6">
            {/* Titolo + indicatore categoria */}
            <header className="mb-6">
                <div className="flex items-center gap-3">
                    {/* Indicatore unico */}
                    <div className={`w-2 h-16 rounded-full bg-gradient-to-b ${gradient}`} />
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-extrabold">{article.titolo}</h1>
                        <h3 className={`mt-1 text-md ${currentTheme.cardText}`}>{article.categoria}</h3>
                    </div>
                </div>

                {/* Tags */}
                {article.tags?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        {article.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className={`px-3 py-1 text-sm rounded-full ${currentTheme.tagBg} ${currentTheme.tagText}`}>{tag}</span>
                        ))}
                    </div>
                )}
            </header>

            {/* Contenuto */}
            <div className={`prose prose-lg dark:prose-invert ${currentTheme.cardText}`}>
                {article.contenuto}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center py-16">
                <Link to="/esplora" className="px-6 py-3 rounded-full font-semibold bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out">Torna agli Articoli</Link>
            </div>
        </article>
    );
}

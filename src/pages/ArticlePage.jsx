import { Link, useParams } from "react-router-dom";
import knowledgeData from "../data/knowledge.json";
import { categoryGradients } from "../utils/theme.js";
import ReactMarkdown from "react-markdown";
import { useSettings } from "../contexts/SettingsContext.jsx";
import { FetchMD } from "../utils/FetchMD.jsx";
import {useEffect, useState} from "react";

export default function ArticlePage() {
    const { currentTheme } = useSettings();

    const { id } = useParams();
    const article = knowledgeData.find(a => String(a.id) === id);

    const [content, setContent] = useState("");

    useEffect(() => {
        FetchMD(article.id)
            .then((md) => setContent(md))
            .catch((err) => console.error("Errore:", err));
    }, [content, article]);

    if (!article) return(
        <article className="max-w-3xl mx-auto mt-12 px-6">
            {/* Titolo + indicatore categoria */}
            <header className="mb-6">

                <div className="flex items-stretch gap-3">

                    {/* Contenitore testo */}
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-extrabold text-center">Ops... sembra che l'articolo che stai cercando non esista</h1>
                    </div>
                </div>
            </header>
            {/* Pulsante torna agli articoli */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center py-16">
                <Link
                    to="/esplora"
                    className="px-6 py-3 rounded-full font-semibold bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                    Torna agli Articoli
                </Link>
            </div>
        </article>
    );

    // Gradient collegato alla categoria
    const gradient = categoryGradients[article.categoria.toLowerCase()] || "from-gray-400 to-gray-600";

    return (
        <article className="max-w-3xl mx-auto mt-12 px-6">
            {/* Titolo + indicatore categoria */}
            <header className="mb-6">

                <div className="flex items-stretch gap-3">
                    {/* Gradient */}
                    <div className={`w-2 rounded-full bg-gradient-to-b ${gradient}`} />

                    {/* Contenitore testo */}
                    <div className="flex flex-col">
                        <h3 className={`text-md ${currentTheme.cardText}`}>{article.categoria}</h3>
                        <h1 className="text-3xl font-extrabold">{article.titolo}</h1>
                        {article.sottotitolo && (
                            <h2 className={`mt-1 text-lg font-medium ${currentTheme.cardText}`}>
                                {article.sottotitolo}
                            </h2>
                        )}
                        <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {article.autore && <span>di {article.autore}</span>}
                            {article.data && <span className="ml-2">• {article.data}</span>}
                        </div>
                    </div>
                </div>

                {/* Tags */}
                {article.tags?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        {article.tags.map((tag, idx) => (
                            <span
                                key={idx}
                                className={`px-3 py-1 text-sm rounded-full ${currentTheme.tagBg} ${currentTheme.tagText}`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </header>
            <div className={`${currentTheme.cardBg} rounded-xl shadow-md p-8`}>
            {/* Contenuto */}
            <div className={`${currentTheme.cardText}`}>
                <ReactMarkdown
                    components={{
                        h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold border-b pb-2" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-bold" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-lg font-bold" {...props} />,
                        p: ({node, ...props}) => <p className="text-md my-4" {...props} />,
                        img: ({ node, ...props }) => (<img {...props} className="my-4 rounded-lg" />),
                        ul: ({node, ...props}) => (<ul className="list-disc pl-6 my-4 space-y-1" {...props} />),
                        ol: ({node, ...props}) => (<ol className="list-decimal pl-6 my-4 space-y-1" {...props} />),
                        li: ({node, ...props}) => (<li className="leading-relaxed" {...props} />),
                        blockquote: ({node, ...props}) => (<blockquote className={`border-l-4 ${currentTheme.quoteBg} border-red-500 pl-4 italic ${currentTheme.quoteText} my-4`} {...props} />),
                        a: ({node, ...props}) => (<a className="relative text-red-500 font-medium transition-colors duration-300
                   after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px]
                   after:bg-current after:transition-all after:duration-300 hover:after:w-full" {...props} />),
                        hr: () => <hr className={`my-8 rounded-3xl border-t-3 border-gray-300 dark:border-gray-700`} />,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>

            </div>
            {/* Pulsante torna agli articoli */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center py-16">
                <Link
                    to="/esplora"
                    className="px-6 py-3 rounded-full font-semibold bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
                >
                    Torna agli Articoli
                </Link>
            </div>
        </article>
    );
}

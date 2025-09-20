import { useState, useEffect } from "react";
import ArticleEditor from "../components/ArticleEditor.jsx";
import { FetchKnowledgeData } from "../utils/FetchKnowledgeData.jsx";

export default function EditorExplorer() {
    const [activeTab, setActiveTab] = useState("articles");
    const [articles, setArticles] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [articleContent, setArticleContent] = useState("");
    const [frontmatter, setFrontmatter] = useState({});

    // Fetch articoli
    useEffect(() => {
        if (activeTab === "articles") {
            fetch("https://i20n-knowledgebase-articles.vercel.app/api/listFiles?type=articles")
                .then((res) => res.json())
                .then((data) => setArticles(data))
                .catch((err) => console.error(err));
        }
    }, [activeTab]);

    // Fetch immagini
    useEffect(() => {
        if (activeTab === "images") {
            fetch("https://i20n-knowledgebase-articles.vercel.app/api/listFiles?type=images")
                .then((res) => res.json())
                .then((data) => setImages(data))
                .catch((err) => console.error(err));
        }
    }, [activeTab]);

    // Apri un articolo
    const openArticle = async (file) => {
        setSelectedArticle(file);

        const id = file.name.split(".")[0]; // usiamo il nome file come id

        try {
            const res = await fetch(
                `https://raw.githubusercontent.com/zRevenger/i20n-knowledgebase-articles/main/${file.path}`
            );
            const text = await res.text();

            try {
                const knowledgeData = await FetchKnowledgeData();
                const found = knowledgeData.find((a) => String(a.id) === String(id));

                setFrontmatter(
                    found || {
                        titolo: "",
                        sottotitolo: "",
                        categoria: "",
                        autore: "",
                        data: new Date().toISOString().split("T")[0],
                        tags: [],
                    }
                );
            } catch (err) {
                console.error("Errore fetch knowledge data:", err);
                setFrontmatter({
                    titolo: "",
                    sottotitolo: "",
                    categoria: "",
                    autore: "",
                    data: new Date().toISOString().split("T")[0],
                    tags: [],
                });
            }

            setArticleContent(text);
        } catch (err) {
            console.error("Errore caricamento articolo:", err);
        }
    };

    // Crea un nuovo articolo
    const createNewArticle = () => {
        const newArticle = {
            id: null,
            path: `articles/temp.md`,
            name: "temp.md",
            isNew: true,
        };
        setFrontmatter({
            titolo: "",
            sottotitolo: "",
            categoria: "",
            autore: "",
            data: new Date().toISOString().split("T")[0],
            tags: [],
        });
        setArticleContent("");
        setSelectedArticle(newArticle);
    };

    // 🗑️ Elimina articolo
    const deleteArticle = async (file) => {
        if (!confirm(`Vuoi davvero eliminare l’articolo "${file.name}"?`)) return;

        try {
            // carico knowledge.json
            const knowledgeRes = await fetch(
                "https://i20n-knowledgebase-articles.vercel.app/api/getFile?path=data/knowledge.json"
            );
            const { content: base64Content } = await knowledgeRes.json();
            let knowledge = JSON.parse(decodeURIComponent(escape(atob(base64Content))));

            // rimuovo entry dalla knowledge
            const id = file.name.split(".")[0];
            knowledge = knowledge.filter((k) => String(k.id) !== String(id));

            const res = await fetch(
                "https://i20n-knowledgebase-articles.vercel.app/api/saveFile",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: `🗑️ Eliminato articolo ${file.name} da editor web`,
                        files: [
                            {
                                path: file.path,
                                delete: true,
                            },
                            {
                                path: "data/knowledge.json",
                                content: JSON.stringify(knowledge, null, 2),
                            },
                        ],
                    }),
                }
            );

            if (res.ok) {
                alert("✅ Articolo eliminato con successo!");
                setArticles((prev) => prev.filter((a) => a.path !== file.path));
                if (selectedArticle?.path === file.path) setSelectedArticle(null);
            } else {
                const err = await res.json();
                alert("❌ Errore eliminazione: " + JSON.stringify(err));
            }
        } catch (err) {
            console.error(err);
            alert("❌ Errore eliminazione: " + err.message);
        }
    };

    // 🗑️ Elimina immagine
    const deleteImage = async (file) => {
        if (!confirm(`Vuoi davvero eliminare l’immagine "${file.name}"?`)) return;

        try {
            const res = await fetch(
                "https://i20n-knowledgebase-articles.vercel.app/api/saveFile",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: `🗑️ Eliminata immagine ${file.name} da editor web`,
                        files: [
                            {
                                path: file.path,
                                delete: true,
                            },
                        ],
                    }),
                }
            );

            if (res.ok) {
                alert("✅ Immagine eliminata con successo!");
                setImages((prev) => prev.filter((img) => img.path !== file.path));
            } else {
                const err = await res.json();
                alert("❌ Errore eliminazione: " + JSON.stringify(err));
            }
        } catch (err) {
            console.error(err);
            alert("❌ Errore eliminazione: " + err.message);
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-8 px-6">
            {/* Tabs */}
            <div className="flex gap-4 border-b pb-2 mb-6">
                <button
                    className={`px-4 py-2 font-semibold ${
                        activeTab === "articles"
                            ? "border-b-2 border-red-500 text-red-600"
                            : "text-gray-500"
                    }`}
                    onClick={() => {
                        setActiveTab("articles");
                        setSelectedArticle(null);
                    }}
                >
                    📄 Articoli
                </button>
                <button
                    className={`px-4 py-2 font-semibold ${
                        activeTab === "images"
                            ? "border-b-2 border-red-500 text-red-600"
                            : "text-gray-500"
                    }`}
                    onClick={() => {
                        setActiveTab("images");
                        setSelectedArticle(null);
                    }}
                >
                    🖼️ Immagini
                </button>
            </div>

            {/* Lista articoli */}
            {activeTab === "articles" && !selectedArticle && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Lista Articoli</h2>
                        <button
                            onClick={createNewArticle}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            ➕ Nuovo articolo
                        </button>
                    </div>

                    {articles.length === 0 ? (
                        <p className="text-gray-500">Nessun articolo trovato</p>
                    ) : (
                        <ul className="space-y-2">
                            {articles.map((file) => (
                                <li
                                    key={file.path}
                                    className="p-3 rounded-md border flex justify-between items-center"
                                >
                                    <span
                                        onClick={() => openArticle(file)}
                                        className="cursor-pointer hover:underline"
                                    >
                                        {file.name}
                                    </span>
                                    <button
                                        onClick={() => deleteArticle(file)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        🗑️ Elimina
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* Editor articolo */}
            {activeTab === "articles" && selectedArticle && (
                <ArticleEditor
                    frontmatter={frontmatter}
                    setFrontmatter={setFrontmatter}
                    content={articleContent}
                    setContent={setArticleContent}
                    article={selectedArticle}
                />
            )}

            {/* Lista immagini */}
            {activeTab === "images" && (
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold">Lista Immagini</h2>
                        <label className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
                            📤 Carica immagine
                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={async (e) => {
                                    const file = e.target.files[0];
                                    if (!file) return;

                                    const reader = new FileReader();
                                    reader.onload = async () => {
                                        const base64Content = reader.result.split(",")[1];

                                        const res = await fetch(
                                            "https://i20n-knowledgebase-articles.vercel.app/api/saveFile",
                                            {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    message: `Caricata nuova immagine ${file.name} da editor web`,
                                                    files: [
                                                        {
                                                            path: `images/${file.name}`,
                                                            content: base64Content,
                                                            encoding: "base64",
                                                        },
                                                    ],
                                                }),
                                            }
                                        );

                                        if (res.ok) {
                                            alert("✅ Immagine caricata con successo!");
                                            setImages((prev) => [
                                                ...prev,
                                                { name: file.name, path: `images/${file.name}` },
                                            ]);
                                        } else {
                                            const err = await res.json();
                                            alert("❌ Errore upload: " + JSON.stringify(err));
                                        }
                                    };
                                    reader.readAsDataURL(file);
                                }}
                            />
                        </label>
                    </div>

                    {images.length === 0 ? (
                        <p className="text-gray-500">Nessuna immagine trovata</p>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {images.map((file) => (
                                <div
                                    key={file.path}
                                    className="flex flex-col items-center gap-2 p-2 rounded-md border"
                                >
                                    <img
                                        src={`https://raw.githubusercontent.com/zRevenger/i20n-knowledgebase-articles/main/${file.path}`}
                                        alt={file.name}
                                        className="w-full h-32 object-cover rounded-md"
                                    />
                                    <span className="text-xs truncate">{file.name}</span>
                                    <button
                                        onClick={() => deleteImage(file)}
                                        className="text-red-600 hover:text-red-800 text-sm"
                                    >
                                        🗑️ Elimina
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

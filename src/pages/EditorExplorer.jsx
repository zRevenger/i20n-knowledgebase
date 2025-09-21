import { useState, useEffect } from "react";
import ArticleEditor from "../components/ArticleEditor.jsx";
import { FetchKnowledgeData } from "../utils/FetchKnowledgeData.jsx";
import {useSettings} from "../contexts/SettingsContext.jsx";
import { TrashIcon } from "@heroicons/react/24/solid";
import EditorImageGrid from "../components/EditorImageGrid.jsx";
import ArticleContent from "../components/ArticleContent.jsx";

export default function EditorExplorer() {
    const { currentTheme } = useSettings();

    const [activeTab, setActiveTab] = useState("articles");
    const [articles, setArticles] = useState([]);
    const [images, setImages] = useState([]);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [articleContent, setArticleContent] = useState("");
    const [frontmatter, setFrontmatter] = useState({});
    const [knowledge, setKnowledge] = useState([]);

    // caricamenti iniziali
    useEffect(() => {
        FetchKnowledgeData()
            .then((data) => {
                setKnowledge(data);
            })
            .catch((err) => console.error("Errore fetching knowledge data:", err));

        //Primo fetch articoli e immagini
        fetch("https://i20n-knowledgebase-articles.vercel.app/api/listFiles?type=articles")
            .then((res) => res.json())
            .then((data) => setArticles(data))
            .catch((err) => console.error(err));

        fetch("https://i20n-knowledgebase-articles.vercel.app/api/listFiles?type=images")
            .then((res) => res.json())
            .then((data) => setImages(data))
            .catch((err) => console.error(err));
    }, []);

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
        <div className="max-w-7xl mx-auto mt-10 px-6">
            {/* Tabs sopra la card */}
            <div className="flex mb-0">
                {[
                    {key: "articles", label: "📄 Articoli"},
                    {key: "images", label: "🖼️ Immagini"},
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => {
                            setActiveTab(tab.key);
                            setSelectedArticle(null);
                        }}
                        className={`px-4 py-2 rounded-t-xl font-medium transition 
                          ${
                            activeTab === tab.key
                                ? currentTheme.editorTabActive
                                : currentTheme.editorTabInactive
                        }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Container */}
            <div
                className={`${currentTheme.editorBg} ${currentTheme.editorText} shadow-lg rounded-2xl overflow-hidden rounded-tl-none`}
            >
                <div className="p-6">
                    {/* Lista articoli */}
                    {activeTab === "articles" && !selectedArticle && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Lista Articoli</h2>
                                <button
                                    onClick={createNewArticle}
                                    className={`px-4 py-2 ${currentTheme.editorButton} font-medium rounded-lg shadow transition`}
                                >
                                    ➕ Nuovo articolo
                                </button>
                            </div>

                            {articles.length === 0 ? (
                                <p className="italic opacity-70">Nessun articolo trovato</p>
                            ) : (
                                <ul className="space-y-3">
                                    {articles.map((file) => {
                                            const id = file.name.split(".")[0];
                                            const meta = knowledge.find((a) => String(a.id) === String(id));

                                            return (
                                                <li
                                                    key={file.path}
                                                    onClick={() => openArticle(file)}
                                                    className={`flex justify-between items-center p-4 border-l-4 ${currentTheme.editorAccentBorder} ${currentTheme.editorListItem} rounded-r-lg cursor-pointer transition`}
                                                >
                                                    <span
                                                        className="font-medium">{id} - {meta?.titolo || "(senza titolo)"}</span>
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            deleteArticle(file);
                                                        }}
                                                        className={`px-1 py-1 text-sm font-medium rounded-md ${currentTheme.editorButtonDelete}`}
                                                    >
                                                        <TrashIcon className="w-5 h-5"/>
                                                    </button>
                                                </li>
                                            );
                                        }
                                    )}
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
                            images={images}
                        />
                    )}

                    {/* Lista immagini */}
                    {activeTab === "images" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-bold">Lista Immagini</h2>
                                <label
                                    className={`px-4 py-2 ${currentTheme.editorButton} font-medium rounded-lg shadow cursor-pointer transition`}
                                >
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
                                                        headers: {"Content-Type": "application/json"},
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
                                                        {
                                                            name: file.name,
                                                            path: `images/${file.name}`,
                                                        },
                                                    ]);
                                                } else {
                                                    const err = await res.json();
                                                    alert(
                                                        "❌ Errore upload: " + JSON.stringify(err)
                                                    );
                                                }
                                            };
                                            reader.readAsDataURL(file);
                                        }}
                                    />
                                </label>
                            </div>

                            <EditorImageGrid images={images} deleteImage={deleteImage}></EditorImageGrid>

                        </div>
                    )}
                </div>
            </div>
            {activeTab === "articles" && selectedArticle && (
                <div className={"max-w-3xl mx-auto px-6 mt-10"}><ArticleContent content={articleContent}/></div>
            )}

        </div>


    );
}

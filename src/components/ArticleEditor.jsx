import { useState } from "react";
import ArticleContent from "./ArticleContent.jsx";

export default function ArticleEditor({ frontmatter, setFrontmatter, content, setContent, article }) {
    const [saving, setSaving] = useState(false);

    // Funzione per salvare l'articolo
    const saveArticle = async () => {
        setSaving(true);
        try {
            // 1. Recupera knowledge.json
            const knowledgeRes = await fetch(
                "https://i20n-knowledgebase-articles.vercel.app/api/getFile?path=data/knowledge.json"
            );

            if (!knowledgeRes.ok) {
                throw new Error("Impossibile caricare knowledge.json");
            }

            const { content: base64Content } = await knowledgeRes.json();
            let knowledge = JSON.parse(
                decodeURIComponent(escape(atob(base64Content)))
            );

            // 2. Se non c’è ID → assegna primo ID libero
            let articleId = frontmatter.id;
            if (!articleId || article.isNew) {
                const existingIds = knowledge.map(k => Number(k.id));
                let newId = 1;
                while (existingIds.includes(newId)) newId++;
                articleId = newId;

                // Aggiorna frontmatter e articolo
                frontmatter.id = articleId;
                article.path = `articles/${articleId}.md`;
                article.name = `${articleId}.md`;
            }

            // 3. Aggiorna o inserisci entry della knowledge
            const idx = knowledge.findIndex((k) => String(k.id) === String(frontmatter.id));
            if (idx >= 0) {
                knowledge[idx] = { ...knowledge[idx], ...frontmatter };
            } else {
                knowledge.push(frontmatter);
            }

            // 4. Prepara i file per il commit multiplo
            const files = [
                {
                    path: article.path,
                    content, // SOLO markdown puro
                },
                {
                    path: "data/knowledge.json",
                    content: JSON.stringify(knowledge, null, 2),
                },
            ];

            // 5. Commit unico su GitHub
            const res = await fetch(
                "https://i20n-knowledgebase-articles.vercel.app/api/saveFile",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        message: `Salvato articolo ${article.name} da editor web`,
                        files,
                    }),
                }
            );

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.error || "Errore salvataggio articolo");
            }

            const data = await res.json();
            alert(`✅ Articolo e knowledge salvati! Commit SHA: ${data.commitSha}`);

            // Aggiorna lo stato: articolo non è più "nuovo"
            article.isNew = false;
        } catch (err) {
            console.error(err);
            alert(`❌ Errore durante il salvataggio: ${err.message}`);
        } finally {
            setSaving(false);
        }
    };


    // Aggiornamento dei campi frontmatter
    const updateField = (field, value) => {
        setFrontmatter({ ...frontmatter, [field]: value });
    };

    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold">Editor Articolo: {article.name}</h2>

            {/* Campi frontmatter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block font-semibold mb-1">Titolo</label>
                    <input
                        type="text"
                        value={frontmatter.titolo || ""}
                        onChange={(e) => updateField("titolo", e.target.value)}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Sottotitolo</label>
                    <input
                        type="text"
                        value={frontmatter.sottotitolo || ""}
                        onChange={(e) => updateField("sottotitolo", e.target.value)}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Categoria</label>
                    <input
                        type="text"
                        value={frontmatter.categoria || ""}
                        onChange={(e) => updateField("categoria", e.target.value)}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Autore</label>
                    <input
                        type="text"
                        value={frontmatter.autore || ""}
                        onChange={(e) => updateField("autore", e.target.value)}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Data</label>
                    <input
                        type="date"
                        value={frontmatter.data || ""}
                        onChange={(e) => updateField("data", e.target.value)}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
                <div>
                    <label className="block font-semibold mb-1">Tags (separati da virgola)</label>
                    <input
                        type="text"
                        value={(frontmatter.tags || []).join(", ")}
                        onChange={(e) => updateField("tags", e.target.value.split(",").map(t => t.trim()))}
                        className="w-full border rounded-md px-2 py-1"
                    />
                </div>
            </div>

            {/* Contenuto Markdown */}
            <div>
                <label className="block font-semibold mb-1">Contenuto</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full h-96 border rounded-md px-2 py-1 font-mono"
                />
            </div>

            <button
                onClick={saveArticle}
                className={`px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 ${saving ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={saving}
            >
                {saving ? "Salvando..." : "💾 Salva Articolo"}
            </button>

            <ArticleContent content={content} />
        </div>
    );
}

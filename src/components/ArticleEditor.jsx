import {useRef, useState} from "react";
import {useSettings} from "../contexts/SettingsContext.jsx";
import { CalendarIcon, ListBulletIcon, LinkIcon, ItalicIcon, BoldIcon, H1Icon, H2Icon, H3Icon } from "@heroicons/react/24/solid";
import { CodeBracketSquareIcon } from "@heroicons/react/24/outline";
import {themes} from "../utils/theme.js";
import { ImQuotesLeft } from "react-icons/im";
import MarkdownPhotoPicker from "./MarkdownPhotoPicker.jsx";

export default function ArticleEditor({ frontmatter, setFrontmatter, content, setContent, article, images }) {
    const [saving, setSaving] = useState(false);
    const {currentTheme} = useSettings();

    const textareaRef = useRef(null);

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

    const isDark = currentTheme === themes.dark;

    const scrollVars = {
        "--scroll-thumb": isDark ? "rgba(255,255,255,0.12)" : "rgba(16,24,40,0.12)",
        "--scroll-thumb-hover": isDark ? "rgba(255,255,255,0.18)" : "rgba(16,24,40,0.20)",
        "--scroll-track": isDark ? "rgba(255,255,255,0.03)" : "rgba(16,24,40,0.04)",
    };

    const insertAtCursor = (before, after = "") => {
        const ta = textareaRef.current;
        if (!ta) {
            // fallback: append
            setContent((c) => c + before + after);
            return;
        }

        const start = ta.selectionStart ?? 0;
        const end = ta.selectionEnd ?? 0;
        const selected = content.slice(start, end);

        const newText = content.slice(0, start) + before + selected + after + content.slice(end);
        setContent(newText);

        // riposiziona il cursore dopo l'inserimento
        setTimeout(() => {
            ta.focus();
            const caret = start + before.length + (selected ? selected.length : 0);
            ta.selectionStart = ta.selectionEnd = caret;
        }, 0);
    };

    return (
        <div className="space-y-6">
            <style>{`
      /* classe che useremo sul textarea */
      .fancy-scroll {
        scrollbar-width: thin; /* Firefox */
        scrollbar-color: var(--scroll-thumb) var(--scroll-track); /* Firefox */
      }

      /* WebKit (Chrome, Edge, Safari) */
      .fancy-scroll::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }
      .fancy-scroll::-webkit-scrollbar-track {
        background: var(--scroll-track);
        border-radius: 999px;
      }
      .fancy-scroll::-webkit-scrollbar-thumb {
        background: linear-gradient(180deg, var(--scroll-thumb), var(--scroll-thumb-hover));
        border-radius: 999px;
        border: 2px solid transparent;
        background-clip: padding-box;
      }
      .fancy-scroll::-webkit-scrollbar-thumb:hover {
        background: var(--scroll-thumb-hover);
      }
    `}</style>
            {/* Titolo editor */}
            <div className="pb-2 border-b">
                <h2 className="text-2xl font-bold">
                    Editor Articolo: {frontmatter.id ? frontmatter.id : "TBD"} – {frontmatter.titolo ? frontmatter.titolo : "Senza Titolo"}
                </h2>
            </div>

            {/* Campi frontmatter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { key: "titolo", label: "Titolo", type: "text" },
                    { key: "sottotitolo", label: "Sottotitolo", type: "text" },
                    { key: "categoria", label: "Categoria", type: "text" },
                    { key: "autore", label: "Autore", type: "text" },
                    { key: "data", label: "Data", type: "date" },
                    {
                        key: "tags",
                        label: "Tags (separati da virgola)",
                        type: "text",
                        transform: (val) => val.split(",").map((t) => t.trim()).filter(Boolean),
                        stringify: (val) => (val || []).join(", "),
                    },
                ].map((field) => (
                    <div key={field.key} className="flex flex-col">
                        <label className="font-semibold mb-2 text-sm uppercase tracking-wide">
                            {field.label}
                        </label>

                        {field.type === "date" ? (
                            <div className="relative">
                                <input
                                    ref={(el) => (field.inputRef = el)}
                                    type="date"
                                    value={frontmatter.data || ""}
                                    onChange={(e) => updateField(field.key, e.target.value)}
                                    className={`w-full ${currentTheme.editorListItem} rounded-lg px-3 py-2 shadow-sm pr-10 appearance-none focus:outline-none`}
                                />
                                <CalendarIcon
                                    onClick={() => field.inputRef?.showPicker()}
                                    className={`w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 ${currentTheme.editorText}`}
                                />
                            </div>
                        ) : (
                            <input
                                type={field.type}
                                value={field.stringify ? field.stringify(frontmatter[field.key]) : frontmatter[field.key] || ""}
                                onChange={(e) =>
                                    updateField(
                                        field.key,
                                        field.transform ? field.transform(e.target.value) : e.target.value
                                    )
                                }
                                className={`w-full ${currentTheme.editorListItem} rounded-lg px-3 py-2 shadow-sm focus:outline-none`}
                            />
                        )}
                    </div>
                ))}
            </div>

            <div>
                <label className="block font-semibold mb-2 text-sm uppercase tracking-wide">
                    Contenuto
                </label>

                {/* Toolbar Markdown */}
                <div className="flex flex-wrap gap-2 mb-2">
                    <button
                        type="button"
                        onClick={() => insertAtCursor("# ", "\n")}
                        className={`px-2 py-1 text-sm rounded ${currentTheme?.editorListItem}`}
                        title="H1"
                    ><H1Icon className={"w-5 h-5"}/></button>

                    <button
                        type="button"
                        onClick={() => insertAtCursor("## ", "\n")}
                        className={`px-2 py-1 text-sm rounded ${currentTheme?.editorListItem}`}
                        title="H2"
                    ><H2Icon className={"w-5 h-5"}/></button>

                    <button
                        type="button"
                        onClick={() => insertAtCursor("### ", "\n")}
                        className={`px-2 py-1 text-sm rounded ${currentTheme?.editorListItem}`}
                        title="H1"
                    ><H3Icon className={"w-5 h-5"}/></button>

                    <button
                        type="button"
                        onClick={() => insertAtCursor("**", "**")}
                        className={`px-2 py-1 text-sm rounded ${currentTheme.editorListItem} font-bold`}
                        title="Grassetto"
                    ><BoldIcon className={"w-5 h-5"}/></button>

                    <button
                        type="button"
                        onClick={() => insertAtCursor("_", "_")}
                        className={`px-2 py-1 text-sm rounded ${currentTheme.editorListItem} italic`}
                        title="Corsivo"
                    ><ItalicIcon className={"w-5 h-5"}/></button>

                    <button
                        type="button"
                        onClick={() => insertAtCursor("- ", "\n")}
                        className={`px-2 py-1 text-sm rounded ${currentTheme.editorListItem}`}
                        title="Lista"
                    ><ListBulletIcon className={"w-5 h-5"}/></button>

                    <button
                        type="button"
                        onClick={() => insertAtCursor("[", "](http://)")}
                        className={`px-2 py-1 text-sm rounded ${currentTheme.editorListItem}`}
                        title="Link"
                    ><LinkIcon className={"w-5 h-5"}/></button>

                    <button
                        type="button"
                        onClick={() => insertAtCursor("> ", "\n")}
                        className={`px-2 py-1 text-sm rounded ${currentTheme.editorListItem}`}
                        title="Citazione"
                    ><ImQuotesLeft className={"w-5 h-5"}/></button>

                    <MarkdownPhotoPicker images={images} insertAtCursor={insertAtCursor} />

                    <button
                        type="button"
                        onClick={() => insertAtCursor("```js\n", "\n```")}
                        className={`px-2 py-1 text-sm rounded ${currentTheme.editorListItem}`}
                        title="Immagine"
                    ><CodeBracketSquareIcon className={"w-5 h-5"}/></button>
                </div>

            <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`${currentTheme.editorListItem} w-full h-96 rounded-lg px-3 py-2 font-mono shadow-sm fancy-scroll focus:outline-none`}
                style={scrollVars}
            />
        </div>


    {/* Bottone salva */}
            <div className="pt-4 border-t">
                <button
                    onClick={saveArticle}
                    className={`px-6 py-3 rounded-lg font-medium shadow-md transition ${
                        saving
                            ? "bg-green-600/70 text-white cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                    }`}
                    disabled={saving}
                >
                    {saving ? "Salvando..." : "💾 Salva Articolo"}
                </button>
            </div>
        </div>
    );

}

import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import {useSettings} from "../contexts/SettingsContext.jsx";

export default function MarkdownPhotoPicker({ images, insertAtCursor }) {
    const [showModal, setShowModal] = useState(false);
    const {currentTheme} = useSettings();

    return (
        <div className="inline-block relative">
            {/* Bottone Photo */}
            <button
                type="button"
                onClick={() => setShowModal(true)}
                className={`px-2 py-1 text-sm rounded ${currentTheme.editorListItem}`}
                title="Inserisci Foto"
            >
                <PhotoIcon className="w-5 h-5" />
            </button>

            {/* Modale immagini */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
                    <div className={`${currentTheme.editorBg} p-4 rounded-xl shadow-lg max-h-[80vh] overflow-y-auto w-auto`}>
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">Scegli un'immagine</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                            >
                                ✕
                            </button>
                        </div>

                        {images.length === 0 ? (
                            <div className="text-sm text-gray-500">Nessuna immagine disponibile</div>
                        ) : (
                            <div className="grid grid-cols-3 gap-2">
                                {images.map((img) => (
                                    <img
                                        key={img.path}
                                        src={`https://raw.githubusercontent.com/zRevenger/i20n-knowledgebase-articles/main/${img.path}`}
                                        alt={img.name}
                                        className="w-full h-50 object-cover rounded cursor-pointer hover:ring-2 hover:ring-blue-500"
                                        onClick={() => {
                                            insertAtCursor(
                                                `![${img.name}](https://raw.githubusercontent.com/zRevenger/i20n-knowledgebase-articles/main/${img.path})\n`
                                            );
                                            setShowModal(false);
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
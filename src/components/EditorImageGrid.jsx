import { useState } from "react";
import {TrashIcon} from "@heroicons/react/24/solid";
import {useSettings} from "../contexts/SettingsContext.jsx";

export default function EditorImageGrid({ images, deleteImage }) {
    const { currentTheme } = useSettings();
    const [preview, setPreview] = useState(null);

    return (
        <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {images.map((file) => (
                    <div
                        key={file.path}
                        className={`${currentTheme.editorListItem} relative rounded-lg shadow-sm hover:shadow-md transition overflow-hidden`}
                    >
                        {/* Bottone delete in alto a destra */}
                        <button
                            onClick={() => deleteImage(file)}
                            className={`absolute top-2 right-2 z-10 p-1 rounded-md shadow-md ${currentTheme.editorButtonDelete}`}
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>

                        {/* Immagine cliccabile */}
                        <img
                            src={`https://raw.githubusercontent.com/zRevenger/i20n-knowledgebase-articles/main/${file.path}`}
                            alt={file.name}
                            onClick={() => setPreview(file)} // apre il modal
                            className="w-full h-48 object-cover cursor-pointer rounded-2xl p-3"
                        />

                        {/* Nome immagine */}
                        <div className="px-3 mb-3">
                            <span className="text-sm truncate block">{file.name}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal di preview */}
            {preview && (
                <div
                    className={`fixed inset-0 flex bg-black/70 items-center justify-center z-50`}
                    onClick={() => setPreview(null)}
                >
                    <div className="relative max-w-4xl max-h-[90vh]">
                        <button
                            onClick={() => setPreview(null)}
                            className={`${currentTheme.editorButton} absolute top-2 right-2 rounded-full p-2 shadow-md`}
                        >
                            ✕
                        </button>
                        <img
                            src={`https://raw.githubusercontent.com/zRevenger/i20n-knowledgebase-articles/main/${preview.path}`}
                            alt={preview.name}
                            className="max-w-full max-h-[90vh] rounded-lg"
                        />
                    </div>
                </div>
            )}
        </>
    );
}

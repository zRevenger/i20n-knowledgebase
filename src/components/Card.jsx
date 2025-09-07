import { categoryGradients } from "../utils/theme";
import {useSettings} from "../contexts/SettingsContext.jsx";

export default function Card({ title, content, category = "default", tags = [] }) {
    const gradient = categoryGradients[category.toLowerCase()] || categoryGradients.default;

    const { currentTheme } = useSettings();

    return (
        <div
            className={`
    relative p-6 rounded-2xl min-h-[240px] flex flex-col border
    ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardText}
    transform transition-all duration-200 ease-in-out
    hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]
  `}
        >
            {/* Titolo con badge verticale */}
            <div className="mb-4 flex items-center gap-3">
                <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${gradient}`}></div>
                <h2 className="text-xl font-bold">{title}</h2>
            </div>

            {/* Contenuto */}
            {content && <p className="text-sm mb-4 flex-1">{content}</p>}

            {/* Tags opzionali */}
            {tags.length > 0 && (
                <div className="mt-auto flex flex-wrap gap-2">
                    {tags.map(tag => (
                        <span
                            key={tag}
                            className={`
            px-3 py-1 text-xs font-medium rounded-full transition
            ${currentTheme.tagBg} ${currentTheme.tagText}
            hover:brightness-110
          `}
                        >
          {tag}
        </span>
                    ))}
                </div>
            )}
        </div>
    );
}

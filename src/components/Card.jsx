import { categoryGradients } from "../utils/theme";

export default function Card({ title, content, category = "default", tags = [], currentTheme }) {
    const gradient = categoryGradients[category.toLowerCase()] || categoryGradients.default;

    return (
        <div
            className={`
        relative p-6 rounded-2xl shadow-md transition-transform transform hover:-translate-y-1 hover:shadow-xl
        min-h-[240px] flex flex-col border
        ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardText}
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

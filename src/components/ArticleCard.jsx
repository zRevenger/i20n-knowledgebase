import { categoryGradients } from "../utils/theme";

export default function ArticleCard({ article, currentTheme }) {
    const category = (article.categoria || "default").toLowerCase();
    const gradient = categoryGradients[category] || categoryGradients.default;

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
                <h2 className="text-xl font-bold">{article.titolo}</h2>
            </div>

            <p className="text-sm mb-4 flex-1">{article.contenuto}</p>

            <div className="mt-auto flex flex-wrap gap-2">
                {article.tags.map(tag => (
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

            <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-white via-transparent to-white opacity-0 hover:opacity-10 transition dark:from-gray-700 dark:via-transparent dark:to-gray-700"></div>
        </div>
    );
}

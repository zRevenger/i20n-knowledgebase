export default function ArticleCard({ article, currentTheme }) {
    return (
        <div
            className={`p-6 border rounded-xl shadow hover:shadow-lg transition min-h-[220px] ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardText}`}
        >
            <h2 className={`text-lg font-semibold mb-2 ${currentTheme.cardText}`}>
                {article.titolo}
            </h2>
            <p className={`${currentTheme.cardText} mb-4`}>
                {article.contenuto}
            </p>
            <div className="mt-auto flex gap-2 flex-wrap">
                {article.tags.map((tag) => (
                    <span
                        key={tag}
                        className={`px-2 py-1 text-xs rounded-full ${currentTheme.tagBg}`}
                    >
            {tag}
          </span>
                ))}
            </div>
        </div>
    );
}

export default function ArticleCard({ article, currentTheme }) {
    return (
        <div className={`p-4 border rounded-xl shadow hover:shadow-md transition ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardText}`}>
            <h2 className={`text-lg font-semibold ${currentTheme.cardText}`}>{article.titolo}</h2>
            <p className={`${currentTheme.cardText}`}>{article.contenuto.substring(0, 100)}...</p>
            <div className="mt-2 flex gap-2 flex-wrap">
                {article.tags.map(tag => (
                    <span key={tag} className={`px-2 py-1 text-xs rounded-full ${currentTheme.tagBg}`}>{tag}</span>
                ))}
            </div>
        </div>
    );
}
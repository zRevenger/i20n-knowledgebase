import Card from "./Card";

export default function ArticleCard({ article, currentTheme }) {
    return (
        <Card
            title={article.titolo}
            content={article.contenuto}
            category={article.categoria}
            tags={article.tags}
            currentTheme={currentTheme}
        />
    );
}

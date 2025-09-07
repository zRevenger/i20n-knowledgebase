import Card from "./Card";
import {useSettings} from "../contexts/SettingsContext.jsx";

export default function ArticleCard({ article }) {
    const { currentTheme } = useSettings();

    return (
        <Card
            title={article.titolo}
            content={article.contenuto}
            category={article.categoria}
            tags={article.tags}
            currentTheme={currentTheme}
            to={`/articolo/${article.id}`}
        />
    );
}

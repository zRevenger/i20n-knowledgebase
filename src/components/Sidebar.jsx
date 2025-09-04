import { Link, useLocation } from "react-router-dom";
import knowledgeData from "../data/knowledge.json";
import { categoryGradients } from "../utils/theme";

export default function Sidebar({ currentTheme }) {
    const location = useLocation();
    const categories = [...new Set(knowledgeData.map(a => a.categoria))];

    return (
        <aside
            className={`
                w-64 p-4 rounded-2xl shadow-md border
                ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardText}
                fixed top-80 left-18
                max-h-[calc(100vh-96px)] overflow-y-auto
            `}
        >
            <h2 className="text-lg font-bold mb-4">Categorie</h2>
            <ul className="flex flex-col gap-2">
                {categories.map((cat) => {
                    const gradient =
                        categoryGradients[cat.toLowerCase()] || categoryGradients.default;

                    const isActive = location.pathname.toLowerCase().includes(
                        `/categorie/${cat.toLowerCase()}`
                    );

                    return (
                        <li key={cat}>
                            <Link
                                to={`/categorie/${cat.toLowerCase()}`}
                                className={`
                                    flex items-center gap-3 px-3 py-2 rounded-xl transition
                                    ${isActive ? `${currentTheme.tagBg} font-semibold` : "hover:brightness-110"}
                                `}
                            >
                                <div className={`w-2 h-6 rounded-full bg-gradient-to-b ${gradient}`}></div>
                                <span>{cat}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}

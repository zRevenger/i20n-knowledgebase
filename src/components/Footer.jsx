export default function Footer({ currentTheme }) {
    return (
        <footer
            className={`
                mt-12 py-6 px-6 rounded-t-2xl shadow-inner border-t
                ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardText}
                text-center
            `}
        >
            <p className="text-sm">
                {new Date().getFullYear()}  - Developed by Davide Furfaro
            </p>
        </footer>
    );
}
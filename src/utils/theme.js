export const themes = {
    light: {
        bg: "bg-[var(--color-gray-50)]",
        text: "text-[var(--color-gray-900)]",
        headerBg: "bg-[var(--color-gray-header-light)]",
        headerBorder: "border-[var(--color-gray-300)]",
        cardBg: "bg-[var(--color-gray-50)]",
        cardBorder: "border-[var(--color-gray-300)]",
        cardText: "text-[var(--color-gray-900)]",
        buttonBg: "bg-[var(--color-gray-200)]",
        buttonText: "text-[var(--color-gray-900)]",
        tagBg: "bg-[var(--color-gray-200)]",
    },
    dark: {
        bg: "bg-[var(--color-gray-850)]",           // grigio neutro scuro
        text: "text-[var(--color-gray-50)]",       // quasi bianco
        headerBg: "bg-[var(--color-gray-header-dark)]", // header semitrasparente
        headerBorder: "border-[var(--color-gray-700)]",
        cardBg: "bg-[var(--color-gray-800)]",
        cardBorder: "border-[var(--color-gray-700)]",
        cardText: "text-[var(--color-gray-50)]",
        buttonBg: "bg-[var(--color-gray-700)]",
        buttonText: "text-[var(--color-gray-50)]",
        tagBg: "bg-[var(--color-gray-700)]",
    },
};

export const categoryGradients = {
    meccanica: "from-red-400 via-orange-400 to-yellow-400",
    interni: "from-green-400 via-teal-400 to-cyan-400",
    sicurezza: "from-indigo-400 via-purple-400 to-pink-400",
    design: "from-blue-400 via-indigo-400 to-purple-400",
    default: "from-gray-400 via-gray-500 to-gray-600"
};
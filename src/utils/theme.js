export const themes = {
    light: {
        bg: "bg-gray-100", // sfondo soft moderno
        text: "text-gray-900",

        headerBg: "bg-gray-50/70", // header chiaro ma separato
        headerBorder: "border-gray-200",
        headerText: "text-gray-900",
        headerLinkUnderline: "after:bg-gray-900",

        cardBg: "bg-white shadow-md", // card più “material style”
        cardBorder: "border-gray-200",
        cardText: "text-gray-800",

        tagBg: "bg-gray-200",
        tagText: "text-gray-700",

        buttonBg: "bg-gray-100 hover:bg-gray-200",
        buttonText: "text-gray-900",
    },

    dark: {
        bg: "bg-gray-900",
        text: "text-gray-100",

        headerBg: "bg-gray-800/70",
        headerBorder: "border-gray-700",
        headerText: "text-gray-100",
        headerLinkUnderline: "after:bg-gray-100",

        cardBg: "bg-gray-800 shadow-gray-700/65 shadow-sm", // più spessore con ombra
        cardBorder: "border-gray-700",
        cardText: "text-gray-200",

        tagBg: "bg-gray-700",
        tagText: "text-gray-200",

        buttonBg: "bg-gray-800 hover:bg-gray-700",
        buttonText: "text-gray-100",
    },
};

export const categoryGradients = {
    meccanica: "from-red-400 via-orange-400 to-yellow-400",
    interni: "from-green-400 via-teal-400 to-cyan-400",
    sicurezza: "from-indigo-400 via-purple-400 to-pink-400",
    design: "from-blue-400 via-indigo-400 to-purple-400",
    default: "from-gray-400 via-gray-500 to-gray-600"
};
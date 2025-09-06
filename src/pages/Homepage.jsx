import { Link } from "react-router-dom";
import heroBg from "../assets/hero-bg.jpg";
import {categoryGradients} from "../utils/theme.js";

export default function Homepage({ currentTheme }) {
    return (
        <div className="flex flex-col min-h-screen  -mx-6 -mt-50">
            {/* Hero Section */}
            <section
                className="relative h-screen w-full flex items-center justify-center text-center"
                style={{
                    backgroundImage: `url(${heroBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay scuro per leggibilità */}
                <div className="absolute inset-0 bg-black/80"></div>

                {/* Contenuto hero */}
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
                        Benvenuto nella <br/> Knowledge Base i20N
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-200 mb-6">
                        Scopri articoli, guide e molto altro dedicato alla tua Hyundai i20N.
                    </p>

                    {/* Pulsanti CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/esplora"
                            className="px-6 py-3 rounded-full font-semibold bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
                        >
                            Vedi Tutti gli Articoli
                        </Link>
                        <Link
                            to="/categorie"
                            className="px-6 py-3 rounded-full font-semibold bg-white text-gray-800 hover:bg-gray-200 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
                        >
                            Esplora Categorie
                        </Link>
                    </div>
                </div>
            </section>

            {/* Sezione contenuti introduttivi */}

            <section className="py-12">
                <h2 className={`max-w-4xl mx-auto px-6 text-center text-2xl sm:text-3xl font-bold mb-6 ${currentTheme.text}`}>
                    Trova subito quello che cerchi
                </h2>

                <div className="py-12 max-w-6xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className={`p-6 rounded-2xl shadow-md border ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardText}`}>
                        <div className="mb-4 flex items-center gap-3">
                            <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${categoryGradients.meccanica}`}></div>
                            <h2 className="text-xl font-bold">Guide Tecniche</h2>
                        </div>
                        <p>
                            Manuali, tutorial e spiegazioni dettagliate per capire e migliorare
                            la tua i20N.
                        </p>
                    </div>

                    <div className={`p-6 rounded-2xl border ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardText}`}>
                        <div className="mb-4 flex items-center gap-3">
                            <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${categoryGradients.interni}`}></div>
                            <h2 className="text-xl font-bold">Consigli di Manutenzione</h2>
                        </div>
                        <p>
                            Scopri come prenderti cura della tua auto con guide pratiche e
                            suggerimenti utili.
                        </p>
                    </div>

                    <div className={`p-6 rounded-2xl border ${currentTheme.cardBg} ${currentTheme.cardBorder} ${currentTheme.cardText}`}>
                        <div className="mb-4 flex items-center gap-3">
                            <div className={`w-1 h-6 rounded-full bg-gradient-to-b ${categoryGradients.sicurezza}`}></div>
                            <h2 className="text-xl font-bold">Curiosità e Approfondimenti</h2>
                        </div>
                        <p>
                            Approfondimenti su caratteristiche, tecnologia e dettagli della tua i20N
                            per conoscerla meglio ogni giorno.
                        </p>
                    </div>
                </div>
                <div className="mt-4 flex justify-center">
                    <Link
                        to="/esplora"
                        className="px-6 py-3 rounded-full font-semibold bg-red-600 text-white hover:bg-red-700 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out"
                    >
                        Vedi Tutti gli Articoli
                    </Link>
                </div>
            </section>
        </div>
    );
}
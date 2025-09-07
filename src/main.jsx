import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter} from "react-router-dom";
import App from "./App.jsx";
import "./utils/theme.css";
import {SettingsProvider} from "./contexts/SettingsContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <SettingsProvider>
            <HashRouter>
                <App />
            </HashRouter>
        </SettingsProvider>
    </React.StrictMode>
);

import {useSettings} from "../contexts/SettingsContext.jsx";
import ReactMarkdown from "react-markdown";

export default function ArticleContent({content})
{
    const { currentTheme } = useSettings();

    return(
        <div className={`${currentTheme.cardBg} rounded-xl shadow-md p-8`}>
            {/* Contenuto */}
            <div className={`${currentTheme.cardText}`}>
                <ReactMarkdown
                    components={{
                        h1: (props) => <h1 className="text-3xl font-extrabold border-b pb-2" {...props} />,
                        h2: (props) => <h2 className="text-2xl font-bold" {...props} />,
                        h3: (props) => <h3 className="text-lg font-bold" {...props} />,
                        p: (props) => <p className="text-md my-4" {...props} />,
                        img: (props) => {
                            const fileName = props.src ? props.src.split("/").pop() : "image";
                            return(<img {...props} alt={`${fileName}`} className="my-4 rounded-lg"/>)
                        },
                        ul: (props) => (<ul className="list-disc pl-6 my-4 space-y-1" {...props} />),
                        ol: (props) => (<ol className="list-decimal pl-6 my-4 space-y-1" {...props} />),
                        li: (props) => (<li className="leading-relaxed" {...props} />),
                        blockquote: (props) => (<blockquote className={`border-l-4 ${currentTheme.quoteBg} border-red-500 pl-4 italic ${currentTheme.quoteText} my-4`} {...props} />),
                        a: (props) => (<a className="relative text-red-500 font-medium transition-colors duration-300
                   after:content-[''] after:absolute after:left-0 after:-bottom-0.5 after:w-0 after:h-[2px]
                   after:bg-current after:transition-all after:duration-300 hover:after:w-full" {...props} />),
                        hr: () => <hr className={`my-8 rounded-3xl border-t-3 border-gray-300 dark:border-gray-700`} />,
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>

        </div>
    );
}
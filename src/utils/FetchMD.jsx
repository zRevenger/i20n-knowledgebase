export function FetchMD(articleID) {
    return fetch(`https://raw.githubusercontent.com/zRevenger/i20n-knowledgebase-articles/refs/heads/main/articles/${articleID}.md`)
        .then((res) => {
            if (!res.ok) throw new Error(`Errore fetch: ${res.statusText}`);
            return res.text();
        });
}
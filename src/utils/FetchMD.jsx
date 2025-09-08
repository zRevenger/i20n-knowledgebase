export function FetchMD(articleID) {
    return fetch(`/i20n-knowledgebase/articles/${articleID}.md`)
        .then((res) => {
            if (!res.ok) throw new Error(`Errore fetch: ${res.statusText}`);
            return res.text();
        });
}
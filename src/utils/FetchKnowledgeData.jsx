export function FetchKnowledgeData() {
    return fetch(`https://raw.githubusercontent.com/zRevenger/i20n-knowledgebase-articles/refs/heads/main/data/knowledge.json`)
        .then((res) => {
            if (!res.ok) throw new Error(`Errore fetch: ${res.statusText}`);
            return res.json();
        });
}
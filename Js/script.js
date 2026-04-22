//Getting elements
const form = document.getElementById("searchForm");
const input = document.getElementById("inputSearch");
const result = document.getElementById("result");

//Event listener
form.addEventListener("submit", function(e){
    e.preventDefault();

    const word = input.value.trim();

    if(!word) {
        showError("Please enter a word");
        return;
    }

    fetchWord(word)
});

//Fetching data
async function fetchWord(word) {
    result.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        if (!response.ok) {
            throw new Error("word not found");
        }

        const data = await response.json();
        displayWord(data[0]);

        //Display function
    function displayWord(wordData) {
        const wordText = wordData.word;
        const phonetic = wordData.phonetic || "";

        const audioSrc = wordData.phonetics?.find(p => p.audio)?.audio;

        let meaningsHTML = wordData.meanings.map(meaning => {
            const defs = meaning.definition.map(def => `
                <li>
                    ${def.definition}
                    ${def.example ? `<br><em>Example: ${def.example}</em>` : ""}
                </li>`).join("");
        
            return `
                <div class ="meaning">
                  <h3>${meaning.partOfSpeech}</h3>
                  <ul>${defs}</ul>
                </div>
            `;
            }).join("");

        //Synonyms
        const Synonyms = wordData.meanings[0].definitions[0].Synonyms || [];
        const SynonymsHTML = Synonyms.length ?
           `<div class = "synonyms">
              <strong>synonyms</strong>
              ${synonyms.map(s => `<span class="tag">${s}</span>`).join("")}
           </div>`
        : "";
        
        result.innerHTML = 
            `<div class = "card>
                <h2>${wordText}</h2>
                <P class= "phonetic">${phonetic}</P>
                ${audioSrc ? `<button id="audioBtn">Play</button>` : ""}
                ${meaningsHTML}
                ${SynonymsHTML}
            </div> `;
            
        if (audioSrc) {
            document.getElementById("audioBtn").addEventListener("click", () => playAudio(audioSrc));
        }
    }

//Function play aduio
function playAudio(src) {
    const audio = new Audio(src);
    audio.play();
}

//Error display
function showError(message) {
    result.innerHTML = `<p class="error>${message}</p>`;
}
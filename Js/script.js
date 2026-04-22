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

        let audio = "";
        if  (wordData.phonetics && wordData.phonetics.length > 0) {
            audio = wordData.phonetics.find(p => p.audio)?.audio || "";
        }

        const meaning = wordData.meanings[0];
        const definition = meaning.definitions[0].definition;

        let synonymsHTML = "";
        const synonyms = meaning.definitions[0].synonyms || [];

        synonymsHTML = synonyms.map(s => `<span>${s}</span>`).join("");

        result.innerHTML = `
            <h2>${wordText}</h2>
            <p>${phonetic}</p>
            ${audio ? `<button onclick="playAudio('${audio}')">Play</button>` : ""}

            <h3>${meaning.partOfSpeech}</h3>
            <p>${definition}</p>

            <div class="synonyms">${synonymsHTML}</div>`;
        }

        catch (error) {
            result.innerHTML = `<p>${error.message}</p>`;
        }
}

//Function play aduio
function playAudio(src) {
    const audio = new Audio(src);
    audio.play();
}
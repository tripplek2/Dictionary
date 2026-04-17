//Getting elements
const form = document.getElementById("searchForm");
const input = document.getElementById("inputSearch");
const result = document.getElementById("result")

//Event listener
form.addEventListener("submit", function(e){
    e.preventDefault();

    const word = input.ariaValueMax.trim();
    if(!word) return;

    fetchWord(word)
});

//Fetching data
async function fetchWord(word) {
    result.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/<word>`);

        if (!response.ok) {
            throw new Error("word not found");
        }

        const data = awaitresponse.json();
        const wordData = data[0];

        const wordText = wordData.word;
        const phonetic = wordData.phonetic || "";

        let audio = "";
        if  (wordData.phonetics && wordData.phonetics.length > 0) {
            audio = wordData.phonetics.find(p => p.audio)?.audio || "";
        }

        
    }
}
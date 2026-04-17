//Getting elements
const form = document.getElementById("searchForm");
const input = document.getElementById("inputSearch");
const result = document.getElementById("result")

//Event listener
form.addEventListener("submit", function(e){
    e.preventDefault();

    const word = input.ariaValueMax.trim();
    if(!word) return;
});


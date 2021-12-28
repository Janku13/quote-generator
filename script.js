// conecting my HTML elements with JS

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new_quote");

const loader = document.getElementById("loader");

// this is going to take the string json and form an object json in the next arry
let apiQuotes = [];

// Mostar animação do loader
function loadingAnimation() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// esconder o loader
function showText() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

//Pegando uma frase das que tem na API com a função rand e multiplica pelo len das frases que tem na API

function newQuote() {
  loadingAnimation();
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if there is an author
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //observar tamanho da fala para modificar css
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  // Queremos mostrar a frase e esconder o loader
  quoteText.textContent = quote.text;
  showText();
}
// Geting Quotes from API

async function getQuotes() {
  loadingAnimation();
  const apiUrl = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiUrl);
    //making the object json
    apiQuotes = await response.json();
    //ativar a função para retirada do Quote
    newQuote();
    //Catch Error
  } catch (error) {
    console.log("ERROR DID NOT CATCH URL");
  }
}

// função que manda tweet pro twitter

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Adicionando Evento Listener para funcionamento dos botões
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotes();

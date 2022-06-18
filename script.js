const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let apiQutoes = [];

// Show New Quote
function newQuote() {
  //Pick a random quote from apiQuotes array
  const quote = apiQutoes[Math.floor(Math.random() * apiQutoes.length)];
  //   Check if Author field if blank and replace with unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  //   Check Quote lenght to determine styling
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  quoteText.textContent = quote.text;
}

// Get Quotes From API
async function getQuotes() {
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQutoes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On Load
getQuotes();

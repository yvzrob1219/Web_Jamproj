// first i use unsplash API
const accessKey = "XXqChb_B3WhNxucKshCqC7_C-Oj4LRILVBzwPiH14nA";

// then we Select various elements from the HTML document
const formEl = document.querySelector("form"); 
const inputEl = document.getElementById("search-input"); t
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button"); 

//and Initialize variables for tracking 
let inputData = ""; 
let page = 1; 

// perform image search using Unsplash API
async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    // Fetch data from the API
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results; 

    if (page === 1) {
        searchResults.innerHTML = ""; 
    }

    // Loop through the search results and create elements to display images and links
    results.map((result) => {
        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("search-result"); // Apply a CSS class to the image wrapper
        const image = document.createElement("img");
        image.src = result.urls.small; 
        image.alt = result.alt_description; // Set the alt text for the image
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html; // Set the link URL to the Unsplash page of the image
        imageLink.target = "_blank"; 
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);
        imageWrapper.appendChild(imageLink);
        searchResults.appendChild(imageWrapper); // Add the image wrapper to the search results container
    });

    page++; // Increment the page number for the next search

    // Display the "Show More" button if there are more than one page of results
    if (page > 1) {
        showMore.style.display = "block";
    }
}


formEl.addEventListener("submit", (event) => {
    event.preventDefault(); 
    page = 1; 
    searchImages(); 
});

// Event listener for "Show More" button click
showMore.addEventListener("click", () => {
    searchImages(); 
});

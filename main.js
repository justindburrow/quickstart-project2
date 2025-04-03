const API_KEY = 'JZBPWw2q8LwA3RfHjBQfA0RRrnifKtzu';
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');

// Function to fetch and display random GIFs
async function fetchRandomGifs() {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=12`);
    const data = await response.json();

    if (data.data.length === 0) {
      resultsGrid.innerHTML = '<p>No GIFs found.</p>';
      return;
    }

    // Display random GIFs
    resultsGrid.innerHTML = ''; // Clear any existing content
    data.data.forEach((gif) => {
      const img = document.createElement('img');
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title;
      resultsGrid.appendChild(img);
    });
  } catch (error) {
    console.error('Error fetching random GIFs from Giphy API:', error);
    resultsGrid.innerHTML = '<p>Something went wrong. Please try again later.</p>';
  }
}

// Function to fetch and display search results
async function fetchSearchResults(keyword) {
  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(keyword)}&limit=12`);
    const data = await response.json();

    if (data.data.length === 0) {
      resultsGrid.innerHTML = '<p>No results found.</p>';
      return;
    }

    // Display search results
    resultsGrid.innerHTML = ''; // Clear any existing content
    data.data.forEach((gif) => {
      const img = document.createElement('img');
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title;
      resultsGrid.appendChild(img);
    });
  } catch (error) {
    console.error('Error fetching search results from Giphy API:', error);
    resultsGrid.innerHTML = '<p>Something went wrong. Please try again later.</p>';
  }
}

// Event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const keyword = input.value.trim();
  if (!keyword) return;

  fetchSearchResults(keyword);
});

// Fetch and display random GIFs on page load
fetchRandomGifs();
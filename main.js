const API_KEY = 'JZBPWw2q8LwA3RfHjBQfA0RRrnifKtzu';
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');

// Navbar buttons
const btnReactions = document.getElementById('btn-reactions');
const btnEntertainment = document.getElementById('btn-entertainment');
const btnSports = document.getElementById('btn-sports');
const btnAnimals = document.getElementById('btn-animals');

// Function to fetch and display GIFs based on a category or keyword
async function fetchGifs(endpoint, query = '') {
  try {
    const url = `https://api.giphy.com/v1/gifs/${endpoint}?api_key=${API_KEY}&q=${encodeURIComponent(query)}&limit=12`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.data.length === 0) {
      resultsGrid.innerHTML = '<p class="text-center">No GIFs found.</p>';
      return;
    }

    // Display GIFs
    resultsGrid.innerHTML = ''; // Clear any existing content
    data.data.forEach((gif) => {
      const col = document.createElement('div');
      col.className = 'col-md-3 col-sm-6';
      const img = document.createElement('img');
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title;
      img.className = 'img-fluid rounded';
      col.appendChild(img);
      resultsGrid.appendChild(col);
    });
  } catch (error) {
    console.error('Error fetching GIFs from Giphy API:', error);
    resultsGrid.innerHTML = '<p class="text-center">Something went wrong. Please try again later.</p>';
  }
}

// Event listener for form submission
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const keyword = input.value.trim();
  if (!keyword) return;

  fetchGifs('search', keyword);
});

// Event listeners for navbar buttons
btnReactions.addEventListener('click', () => fetchGifs('search', 'reactions'));
btnEntertainment.addEventListener('click', () => fetchGifs('search', 'entertainment'));
btnSports.addEventListener('click', () => fetchGifs('search', 'sports'));
btnAnimals.addEventListener('click', () => fetchGifs('search', 'animals'));

// Fetch and display trending GIFs on page load
fetchGifs('trending');
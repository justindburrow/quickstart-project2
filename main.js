const API_KEY = 'YOUR_GIPHY_API_KEY'; // Replace with your Giphy API key
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsGrid = document.getElementById('results-grid');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const keyword = input.value.trim();
  if (!keyword) return;

  // Clear previous results
  resultsGrid.innerHTML = '';

  try {
    const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${encodeURIComponent(keyword)}&limit=12`);
    const data = await response.json();

    if (data.data.length === 0) {
      resultsGrid.innerHTML = '<p>No results found.</p>';
      return;
    }

    // Display results
    data.data.forEach((gif) => {
      const img = document.createElement('img');
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title;
      resultsGrid.appendChild(img);
    });
  } catch (error) {
    console.error('Error fetching data from Giphy API:', error);
    resultsGrid.innerHTML = '<p>Something went wrong. Please try again later.</p>';
  }
});
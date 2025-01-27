const searchInput = document.getElementById('search-input');
const resultsElement = document.getElementById('results')!;

interface Comment {
    name: string;
    email: string;
    body: string;
}

searchInput?.addEventListener('keyup', async (e: KeyboardEvent) => {
  const query = (e.target as HTMLInputElement).value.trim();

  if (query.length < 2) {
    resultsElement.innerHTML = '';
    return;
  }

  // Show loading spinner
  resultsElement.innerHTML = '<div class="loading"></div>';

  try {
    const response = await fetch(`http://localhost:3001/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Error fetching search results: ${response.statusText}`);
    }
    const comments: Comment[] = await response.json();

    if (comments.length === 0) {
      resultsElement.innerHTML = '<li>No results found</li>';
    } else {
      const resultsHtml = comments.map((comment) => `
        <li>
          <div class="comment-name">${comment.name}</div>
          <div class="comment-email">${comment.email}</div>
          <div class="comment-body">${comment.body}</div>
        </li>
      `).join('');
      resultsElement.innerHTML = resultsHtml;
    }
  } catch (error) {
    console.error('Error fetching search results:', error);
    resultsElement.innerHTML = '<li>Error loading results</li>';
  }
});
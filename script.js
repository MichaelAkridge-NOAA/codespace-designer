// Function to fetch and display packages in a dropdown
function loadPackages() {
  fetch('docs/packages.txt')
    .then(response => response.text())  // Convert the response to text
    .then(text => {
      const lines = text.split('\n');  // Split the text into lines
      const selector = document.getElementById('packageSelector');
      lines.forEach(line => {
        if (line.trim().length > 0) {
          const option = document.createElement('option');
          const [packageName, repoName] = line.split(' --> ');
          option.value = packageName.trim();
          option.textContent = `${packageName.trim()} - ${repoName.trim()}`;
          selector.appendChild(option);
        }
      });
    })
    .catch(error => console.error('Failed to load packages:', error));
}

// Call loadPackages when the document is loaded
document.addEventListener('DOMContentLoaded', loadPackages);


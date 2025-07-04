// analytics.js
// This file will handle the UI logic for the analytics popup

document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get('jwt', ({ jwt }) => {
    const analyticsDiv = document.getElementById('analytics');
    if (jwt) {
      fetch('https://soxmed-api.vercel.app/api/user', {
        headers: { 'Authorization': `Bearer ${jwt}` }
      })
        .then(res => res.json())
        .then(data => {
          analyticsDiv.innerHTML = `Logged in as: ${data.user.access_token}`;
        })
        .catch(err => {
          analyticsDiv.innerHTML = 'Error fetching user info.';
          console.error(err);
        });
    } else {
      analyticsDiv.innerHTML = 'Not logged in.';
    }
  });
});

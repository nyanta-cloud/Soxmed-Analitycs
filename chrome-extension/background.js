// background.js
// Handles background tasks for the extension

chrome.runtime.onInstalled.addListener(() => {
  console.log('Soxmed Analytics Extension installed.');
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === 'setJWT') {
    chrome.storage.sync.set({ jwt: message.token });
  }
});

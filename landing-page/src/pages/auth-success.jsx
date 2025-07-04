import React, { useEffect } from 'react';

export default function AuthSuccess() {
  useEffect(() => {
    // Extract token from URL
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    if (token) {
      // Store in localStorage
      localStorage.setItem('jwt', token);
      // Send JWT to Chrome extension (if available)
      if (window.chrome && window.chrome.runtime) {
        window.chrome.runtime.sendMessage({ action: 'setJWT', token });
      }
    }
  }, []);

  return (
    <div>
      <h2>Authentication Successful!</h2>
      <p>You have successfully logged in with Twitter.</p>
    </div>
  );
}

import React, { useEffect } from 'react';
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID);

async function verify(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID, 
  });
  const payload = ticket.getPayload();
  const userid = payload['sub'];

}

verify('YOUR_ID_TOKEN').catch(console.error);


function GoogleAut() {
  useEffect(() => {
    /* global google */
    window.onload = function() {
      google.accounts.id.initialize({
        client_id: 'YOUR_GOOGLE_CLIENT_ID',
        callback: handleCallbackResponse
      });

      google.accounts.id.renderButton(
        document.getElementById('googleSignInButton'),
        { theme: 'outline', size: 'large' }
      );
    }
  }, []);

  const handleCallbackResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
   
  }

  return (
    <div className="App">
      <h1>Google Sign-In ile Giriş Yapın</h1>
      <div id="googleSignInButton"></div>
    </div>
  );
}

export default GoogleAut;
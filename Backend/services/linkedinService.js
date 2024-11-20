const postToLinkedIn = async (accessToken, postPayload) => {
  try {
    if (!accessToken) {
      throw new Error('Empty oauth2 access token'); // Throw an error if accessToken is empty
    }
    if (!postPayload) {
      throw new Error('Payload should not be empty');
    }

    const fetch = await import('node-fetch').then(module => module.default);

    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`, // Include the access token in the Authorization header
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0', // Required header
      },
      body: JSON.stringify(postPayload),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`LinkedIn API responded with status ${response.status}: ${errorBody}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error in postToLinkedIn:', error.message);
    throw error;
  }
};

module.exports = {
  postToLinkedIn,
};

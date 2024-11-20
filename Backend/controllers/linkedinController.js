const { postToLinkedIn } = require('../services/linkedinService');

// Helper function to truncate text to a specified length
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength - 3) + '...';
};

// API to create LinkedIn text post
exports.createTextPost = async (req, res) => {
  const { description } = req.body;

  const linkedinProfileId = process.env.LINKEDIN_PERSON_ID;
  const truncatedDescription = truncateText(description, 3000); // Strictly 3000 characters

  const postPayload = {
    author: `urn:li:person:${linkedinProfileId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: truncatedDescription,
        },
        shareMediaCategory: 'NONE',
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  };

  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const response = await postToLinkedIn(accessToken, postPayload);
    res.status(201).json({ message: 'Text post created successfully', response });
  } catch (error) {
    res.status(500).json({ message: 'Error creating text post', error: error.message });
  }
};

// API to create LinkedIn article post
exports.createArticlePost = async (req, res) => {
  const { description, title, hashtags } = req.body;

  const linkedinProfileId = process.env.LINKEDIN_PERSON_ID;

  // Process hashtags
  const hashtagArray = hashtags.split(' ').filter(tag => tag.startsWith('#'));
  const processedHashtags = hashtagArray.join(' ');

  // Improved article template format
  const articleTemplate = `
🔹 ${title}

${description}

${processedHashtags}

📅 ${new Date().toDateString()}
🔗 ${process.env.DEFAULT_ARTICLE_URL || 'https://www.linkedin.com/'}
  `.trim();

  const truncatedContent = truncateText(articleTemplate, 3000); // Strictly 3000 characters

  const postPayload = {
    author: `urn:li:person:${linkedinProfileId}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: truncatedContent,
        },
        shareMediaCategory: 'ARTICLE',
        media: [
          {
            status: 'READY',
            description: {
              text: truncateText(title || 'Article', 200), // LinkedIn's limit for media description
            },
            originalUrl: process.env.DEFAULT_ARTICLE_URL || 'https://www.linkedin.com/',
            title: {
              text: truncateText(title || 'Article', 200), // LinkedIn's limit for article title
            },
          },
        ],
      },
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
    },
  };

  try {
    const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
    const response = await postToLinkedIn(accessToken, postPayload);
    res.status(201).json({ message: 'Article post created successfully', response });
  } catch (error) {
    res.status(500).json({ message: 'Error creating article post', error: error.message });
  }
};
const axios = require('axios');

const generateJobContent = async (req, res) => {
  const { jobTitle } = req.body;
  try {
    const prompt = `Generate a detailed job description and list of responsibilities for a fresher position with the title: "${jobTitle}".

Structure:
1. Job Description (2-3 paragraphs)
2. Key Responsibilities (5-7 bullet points)

Guidelines:
- Use professional language suitable for job postings
- Focus on entry-level requirements and expectations
- Highlight skills and qualities important for freshers
- Keep the total content between 300 to 500 words
- Ensure the content is informative and engaging for job seekers

Begin the job posting now:`;

    const jobResponse = await axios.post(
      'https://api-inference.huggingface.co/models/meta-llama/Meta-Llama-3-8B-Instruct',
      {
        inputs: prompt,
        parameters: {
          max_new_tokens: 800,
          temperature: 0.7,
          top_p: 0.95,
          do_sample: true,
          return_full_text: false
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!Array.isArray(jobResponse.data) || jobResponse.data.length === 0) {
      throw new Error('Unexpected response format from Hugging Face API');
    }

    let jobContent = jobResponse.data[0].generated_text.trim();

    // Remove any task description or keyword list if present
    jobContent = jobContent.replace(/Your task is to.*?Keywords:.*?Tags:.*?$/s, '').trim();

    // Remove any lines consisting of underscores
    jobContent = jobContent.replace(/[_]+/g, '').trim();

    // Remove any occurrences of '**'
    jobContent = jobContent.replace(/\*\*/g, '').trim();

    // Remove any specific concluding notes
    jobContent = jobContent.replace(/Note: The above job description.*?Good luck with your job posting!$/s, '').trim();

    // Split content into description and responsibilities
    const sections = jobContent.split(/(?=Key Responsibilities)/);
    let jobDescription = sections[0].trim();
    let jobResponsibilities = sections.length > 1 ? sections[1].trim() : '';

    // Clean up the responsibilities section
    jobResponsibilities = jobResponsibilities.replace(/^Key Responsibilities:?\s*/i, '');
    jobResponsibilities = jobResponsibilities.split('\n').map(item => item.trim().replace(/^-\s*/, '')).filter(Boolean);

    const responseData = {
      jobTitle,
      jobDescription,
      jobResponsibilities,
      wordCount: jobContent.split(/\s+/).length
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error generating job content:', error.response ? error.response.data : error.message);
    if (error.code === 'ENOTFOUND') {
      res.status(500).json({ error: 'API endpoint not found. Please check your network connection and API URL.' });
    } else {
      res.status(500).json({ error: 'Error generating job content', details: error.message });
    }
  }
};

module.exports = { generateJobContent };

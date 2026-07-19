const express = require('express');
const Groq = require('groq-sdk');
const router = express.Router();

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || ''
});

// AI answer generation
router.post('/ai-answer', async (req, res) => {
  const { question, jobId, email } = req.body;
  
  console.log('AI Answer Request:', { question, jobId, email });
  console.log('Groq API Key present:', !!process.env.GROQ_API_KEY);
  
  if (!process.env.GROQ_API_KEY) {
    console.error('Groq API key not configured');
    return res.status(500).json({
      success: false,
      answer: 'Groq API key not configured'
    });
  }
  
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant for job applications. Provide professional, human-like answers to job application questions. Keep answers concise but thorough.'
        },
        {
          role: 'user',
          content: question
        }
      ],
      model: 'llama3-70b-8192',
      temperature: 0.7,
      max_tokens: 500,
    });
    
    const answer = chatCompletion.choices[0]?.message?.content || 'No answer generated';
    console.log('AI Answer generated successfully');
    
    res.json({
      success: true,
      answer
    });
  } catch (error) {
    console.error('Groq API error:', error.message);
    console.error('Full error:', error);
    res.status(500).json({
      success: false,
      answer: `Failed to generate AI answer: ${error.message}`
    });
  }
});

// Generate cover letter
router.post('/generate-cover-letter', async (req, res) => {
  const { studentName, jobTitle, companyName, skills } = req.body;
  
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({
      success: false,
      coverLetter: 'Groq API key not configured'
    });
  }
  
  try {
    const prompt = `Write a professional cover letter for ${studentName} applying for ${jobTitle} position at ${companyName}. Skills: ${skills}. Make it professional and compelling.`;
    
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a professional cover letter writer. Create compelling, professional cover letters.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      model: 'llama3-8b-8192',
      temperature: 0.7,
      max_tokens: 1000,
    });
    
    const coverLetter = chatCompletion.choices[0]?.message?.content || 'No cover letter generated';
    
    res.json({
      success: true,
      coverLetter
    });
  } catch (error) {
    console.error('Groq API error:', error);
    res.status(500).json({
      success: false,
      coverLetter: 'Failed to generate cover letter'
    });
  }
});

module.exports = router;

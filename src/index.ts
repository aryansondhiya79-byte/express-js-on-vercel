import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json({ limit: '12mb' }))

// Home route - HTML
app.get('/', (req, res) => {
  res.type('html').send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <title>Express on Vercel</title>
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/api-data">API Data</a>
          <a href="/healthz">Health</a>
        </nav>
        <h1>Welcome to Express on Vercel 🚀</h1>
        <p>This is a minimal example without a database or forms.</p>
        <img src="/logo.png" alt="Logo" width="120" />
      </body>
    </html>
  `)
})

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, '..', 'components', 'about.htm'))
})

// Example API endpoint - JSON
app.get('/api-data', (req, res) => {
  res.json({
    message: 'Here is some sample API data',
    items: ['apple', 'banana', 'cherry'],
  })
})

// AI image enhancement proxy (DeepAI waifu2x)
app.post('/api/enhance', async (req, res) => {
  try {
    const apiKey = process.env.DEEPAI_API_KEY
    if (!apiKey) {
      return res.status(500).json({
        error:
          'Server is not configured. Please set DEEPAI_API_KEY in environment variables.',
      })
    }

    const imageUrl = req.body?.image_url
    if (!imageUrl || typeof imageUrl !== 'string') {
      return res.status(400).json({
        error: 'Missing "image_url". Send JSON body: { "image_url": "https://..." }',
      })
    }

    const body = new URLSearchParams({ image: imageUrl })

    const deepAIResponse = await fetch('https://api.deepai.org/api/waifu2x', {
      method: 'POST',
      headers: { 'api-key': apiKey },
      body,
    })

    const data = await deepAIResponse.json()

    if (!deepAIResponse.ok) {
      return res.status(deepAIResponse.status).json({
        error: 'DeepAI request failed',
        details: data,
      })
    }

    return res.status(200).json({
      message: 'Image enhanced successfully',
      output_url: data.output_url,
      id: data.id,
    })
  } catch (error) {
    console.error('Enhance API error:', error)
    return res.status(500).json({
      error: 'Unexpected server error while enhancing image',
    })
  }
})

// Health check
app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app

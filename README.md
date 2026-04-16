# Express.js on Vercel

Basic Express.js + Vercel example that serves html content, JSON data and simulates an api route.

## Added: Free AI Photo Enhance API (Android-friendly)

This project now includes a backend endpoint that proxies image enhancement through DeepAI's `waifu2x` model.

- Route: `POST /api/enhance`
- Content-Type: `application/json`
- Body: `{ "image_url": "https://..." }`
- Required env var: `DEEPAI_API_KEY`

### Why this route exists

For Android apps, keeping the API key on backend is safer than embedding it directly inside the APK.

### Local environment

Set the API key before running:

```bash
export DEEPAI_API_KEY=your_key_here
```

### cURL test

```bash
curl -X POST http://localhost:3000/api/enhance \
  -H "Content-Type: application/json" \
  -d '{"image_url":"https://images.unsplash.com/photo-1516117172878-fd2c41f4a759"}'
```

Expected response:

```json
{
  "message": "Image enhanced successfully",
  "output_url": "https://...",
  "id": "..."
}
```

### Flutter Android call example

Use this in your Android Flutter app (send public image URL):

```dart
final response = await http.post(
  Uri.parse('https://your-domain.com/api/enhance'),
  headers: {'Content-Type': 'application/json'},
  body: jsonEncode({'image_url': imageUrl}),
);
```

## How to Use

You can choose from one of the following two methods to use this repository:

### One-Click Deploy

Deploy the example using [Vercel](https://vercel.com?utm_source=github&utm_medium=readme&utm_campaign=vercel-examples):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/vercel/examples/tree/main/solutions/express&project-name=express&repository-name=express)

### Clone and Deploy

```bash
git clone https://github.com/vercel/examples/tree/main/solutions/express
```

Install the Vercel CLI:

```bash
npm i -g vercel
```

Then run the app at the root of the repository:

```bash
vercel dev
```

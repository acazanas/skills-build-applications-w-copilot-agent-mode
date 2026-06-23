import { createServer } from './server.ts';
import connectDatabase from './config/database.ts';

const port = Number(process.env.PORT ?? 8000);

const app = createServer();

app.listen(port, async () => {
  console.log(`Backend listening on port ${port}`);
  const baseUrl = process.env.CODESPACE_NAME
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : `http://localhost:${port}`;
  console.log(`API base URL: ${baseUrl}`);

  try {
    await connectDatabase();
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
});

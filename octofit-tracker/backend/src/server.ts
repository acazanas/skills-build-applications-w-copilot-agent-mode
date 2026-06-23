import express from 'express';
import { apiRouter } from './routes.js';

export function createServer() {
  const app = express();
  app.use(express.json());

  app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  app.use('/api', apiRouter);

  return app;
}

export function getBaseUrl() {
  const codespaceName = process.env.CODESPACE_NAME;
  if (codespaceName) {
    return `https://${codespaceName}-8000.githubpreview.dev`;
  }
  return `http://localhost:8000`;
}

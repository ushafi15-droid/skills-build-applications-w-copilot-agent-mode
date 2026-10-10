import express, { type ErrorRequestHandler } from 'express';
import mongoose from 'mongoose';
import { apiBaseUrl, frontendOrigin } from './config/api';
import apiRouter from './routes';

const app = express();

app.use((request, response, next) => {
  const origin = request.get('origin');
  if (origin === frontendOrigin) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
    response.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  if (request.method === 'OPTIONS') {
    response.sendStatus(204);
    return;
  }

  next();
});

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({
    status: 'ok',
    service: 'octofit-api',
    apiBaseUrl,
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.get('/api', (_request, response) => {
  response.json({
    apiBaseUrl,
    endpoints: [
      '/api/users/',
      '/api/teams/',
      '/api/activities/',
      '/api/leaderboard/',
      '/api/workouts/',
    ],
  });
});

app.use(apiRouter);

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof mongoose.Error.CastError) {
    response.status(400).json({ error: 'Invalid record id' });
    return;
  }

  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
};

app.use(errorHandler);

export default app;

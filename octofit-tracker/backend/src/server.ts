import app from './app';
import { connectDatabase } from './config/database';
const port = Number(process.env.PORT || 8000);

async function startServer(): Promise<void> {
  await connectDatabase();

  app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit API listening on port ${port}`);
  });
}

startServer().catch((error: unknown) => {
  console.error('Unable to start OctoFit API:', error);
  process.exitCode = 1;
});
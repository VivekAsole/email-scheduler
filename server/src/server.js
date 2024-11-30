import dotenv from './config/dotenv.js' ;
import app from './app.js';
import connectDB from './config/db.js';
import agenda, { registerJobs } from './jobs/index.js';

const PORT = process.env.PORT || 3000;

// Start Agenda and server
(async () => {
  try {
    await connectDB()
    await agenda.start()
    registerJobs()
    console.log('Agenda started');
  } catch (error) {
    console.error('Error starting Agenda:', error);
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})();


import express from 'express';
import { postWorkflow } from '../controllers/workflowController.js';

const router = express.Router();

router.post('/workflow', postWorkflow);

export default router;

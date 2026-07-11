import { Router } from 'express';
import siviClient from '../services/siviClient.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();

// Generate designs from prompt
router.post('/designs-from-prompt', asyncHandler(async (req, res) => {
  const data = await siviClient.post('/general/designs-from-prompt', req.body);
  res.json(data);
}));

// Generate designs from content
router.post('/designs-from-content', asyncHandler(async (req, res) => {
  const data = await siviClient.post('/general/designs-from-content', req.body);
  res.json(data);
}));

// Generate content from prompt
router.post('/content-from-prompt', asyncHandler(async (req, res) => {
  const data = await siviClient.post('/general/content-from-prompt', req.body);
  res.json(data);
}));

// Check request status
router.get('/get-request-status', asyncHandler(async (req, res) => {
  const data = await siviClient.get('/general/get-request-status', {
    requestId: req.query.requestId,
  });
  res.json(data);
}));

// Get design variants
router.get('/get-design-variants', asyncHandler(async (req, res) => {
  const data = await siviClient.get('/general/get-design-variants', {
    designId: req.query.designId,
  });
  res.json(data);
}));

// Update webhook URL
router.post('/update-webhook', asyncHandler(async (req, res) => {
  const { webhookUrl } = req.body;
  if (!webhookUrl || typeof webhookUrl !== 'string') {
    return res.status(400).json({ error: 'webhookUrl is required and must be a string' });
  }
  const data = await siviClient.post('/general/update-webhook', { webhookUrl });
  res.json(data);
}));

export default router;

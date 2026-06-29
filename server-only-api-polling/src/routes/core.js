import { Router } from 'express';
import siviClient from '../services/siviClient.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = Router();

// Core endpoints
router.post('/designs-from-prompt', asyncHandler(async (req, res) => {
  const data = await siviClient.post('/general/designs-from-prompt', req.body);
  res.json(data);
}));

router.post('/designs-from-content', asyncHandler(async (req, res) => {
  const data = await siviClient.post('/general/designs-from-content', req.body);
  res.json(data);
}));

router.post('/content-from-prompt', asyncHandler(async (req, res) => {
  const data = await siviClient.post('/general/content-from-prompt', req.body);
  res.json(data);
}));

router.get('/get-request-status', asyncHandler(async (req, res) => {
  const data = await siviClient.get('/general/get-request-status', { requestId: req.query.requestId });
  res.json(data);
}));

router.get('/get-design-variants', asyncHandler(async (req, res) => {
  const data = await siviClient.get('/general/get-design-variants', { designId: req.query.designId });
  res.json(data);
}));

// Polling endpoint: submits and waits for completion
router.post('/designs-from-prompt-poll', asyncHandler(async (req, res) => {
  const submitRes = await siviClient.post('/general/designs-from-prompt', req.body);
  const requestId = submitRes?.body?.requestId ?? submitRes?.requestId ?? submitRes?.data?.requestId;

  if (!requestId) {
    return res.status(500).json({ error: 'No requestId returned from Sivi API', raw: submitRes });
  }

  console.log(`Polling started for requestId: ${requestId}`);

  let pollCount = 0;
  const maxPolls = 60; // ~10 minutes
  const delayMs = 10000; // 10 seconds

  const poll = async () => {
    pollCount++;
    const statusRes = await siviClient.get('/general/get-request-status', { requestId });
    const status = statusRes?.body?.status ?? statusRes?.status;

    console.log(`Poll ${pollCount}: status=${status}`);

    if (status === 'completed') {
      return { done: true, result: statusRes };
    }
    if (status === 'failed' || status === 'error') {
      return { done: true, error: true, result: statusRes };
    }
    if (pollCount >= maxPolls) {
      return { done: true, error: true, result: { message: 'Polling timeout exceeded' } };
    }

    await new Promise((r) => setTimeout(r, delayMs));
    return poll();
  };

  // Wait a bit before first poll to let the job queue
  await new Promise((r) => setTimeout(r, 5000));
  const final = await poll();

  if (final.error) {
    return res.status(500).json({
      success: false,
      message: 'Job failed or timed out',
      requestId,
      result: final.result,
    });
  }

  res.json({
    success: true,
    requestId,
    result: final.result,
  });
}));

export default router;

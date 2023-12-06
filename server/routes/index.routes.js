// const express = require("express")
import express from 'express';
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json('All good in here');
});

// module.exports = router;
export default router;

import express from 'express';
import supabase from '../database.js';

const app = express();
const router = express.Router();

// 
router.get("/results", async (req, res) => {
    console.log(req.url);
    res.send();
});

export default router;
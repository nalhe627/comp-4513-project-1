import express from 'express';
import supabase from '../database.js';

const app = express();
const router = express.Router();

// Returns all circuits
router.get("/constructors", async (req, res) => {
    // Select everything from the constructors table
    const { data, err } = await supabase
        .from("constructors")
        .select();

    res.send(data);
});

// Returns specific constructor
router.get("/constructors/:ref", async (req, res) => {
    // Select everything from the constructor row with specific constructorRef 
    const { data, err } = await supabase
        .from("constructors")
        .select()
        .eq("constructorRef", req.params.ref);

    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ error: `Could not find constructor with reference ${req.params.ref}` });
    }
});

export default router;
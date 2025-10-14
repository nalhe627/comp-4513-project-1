import express from 'express';
import supabase from '../database.js';

const app = express();
const router = express.Router();

// Returns all circuits
router.get("/circuits", async (req, res) => {
    // Select everything from circuits table
    const { data, err } = await supabase
        .from("circuits")
        .select();

    res.send(data);
});

// Returns a circuit with the specified ref field
router.get("/circuits/:ref", async (req, res) => {
    // Select everything from the circuit row with the specified circuitRef
    const { data, err } = await supabase
        .from("circuits")
        .select()
        .eq("circuitRef", req.params.ref);

    if (data.length > 0) {
        res.send(data);
    } else { // No data was returned
        res.send({ error: `Could not find circuit with reference ${req.params.ref}` });
    }
});

// Returns all circuits in a given season 
router.get("/circuits/season/:year", async (req, res) => {
    // Select everything from circuits + round and name of race table
    // with the specified year and in ascending order by round number
    const { data, err } = await supabase
        .from("circuits")
        .select(`
            circuitId, circuitRef, name, location, country,
            lat, lng, alt, url, races!inner (round, name)
        `)
        .eq("races.year", req.params.year)
        // TODO: fix ordering not working (might have to do with not being 1-to-1 but 1-to-many)
        .order("races(round)");

    if (data.length > 0) {
        res.send(data);
    } else { // No data was returned
        res.send({ error: `Could not find circuits in the ${req.params.year} season` });
    }
});

export default router;
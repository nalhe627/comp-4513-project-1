import express from 'express';
import supabase from '../database.js';

const app = express();
const router = express.Router();

// Returns qualifying results for specific race
router.get("/qualifying/:raceId", async (req, res) => {
    // Select almost everything from qualifying table with specified raceId, ordered by position
    const { data, err } = await supabase
        .from("qualifying")
        // Don't show driverId, raceId, and constructorId
        .select(`
            qualifyId, number, position, q1, q2, q3,
            drivers!inner (driverRef, code, forename, surname),
            races!inner (name, round, year, date),
            constructors!inner (name, constructorRef, nationality)
        `)
        .eq("raceId", req.params.raceId)
        .order("position", { ascending: true });

    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ error: `Could not find qualifying results for raceId ${req.params.raceId}` });
    }
});

export default router;
import express from 'express';
import supabase from '../database.js';

const app = express();
const router = express.Router();

// Returns all drivers
router.get("/drivers", async (req, res) => {
    // Select everything from the drivers table
    const { data, error } = await supabase
        .from("drivers")
        .select();

    res.send(data);
});

// Returns a specific driver based on the ref parameter specified
router.get("/drivers/:ref", async (req, res) => {
    // Select everything from the drivers row with the specific driverRef
    const { data, error } = await supabase
        .from("drivers")
        .select()
        .eq("driverRef", req.params.ref); // Case sensitive
        
    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ error: `No driver was found with the reference ${req.params.ref}` });
    }
});

// Returns drivers whose surname begins with the provided substring
router.get("/drivers/search/:substr", async (req, res) => {
    // Select everything from the drivers rows with a surname starting with the substring
    const { data, error } = await supabase
        .from("drivers")
        .select()
        .ilike("surname", `${req.params.substr}%`);

    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ error: `No drivers were found with a surname starting with ${req.params.substr}` });
    }
});

// Returns drivers within a given race
router.get("/drivers/race/:raceId", async (req, res) => {
    // Select everything from the drivers rows that have the raceId specified
    const { data, error } = await supabase
        .from("drivers")
        // Not selecting all from results table to not show driver and race id
        .select(`
            *, 
            results!inner (
                position,
                positionText,
                positionOrder,
                grid, 
                fastestLap, 
                fastestLapTime, 
                fastestLapSpeed, 
                rank,
                points,
                time,
                milliseconds,
                laps,
                number,
                statusId,
                constructorId,
                resultId
            )
        `)
        .eq("results.raceId", req.params.raceId);

    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ error: `No drivers were found that have raceId ${req.params.raceId}` });
    }
});

export default router;
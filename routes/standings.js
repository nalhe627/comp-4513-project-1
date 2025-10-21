import express from 'express';
import supabase from '../database.js';

const app = express();
const router = express.Router();

// Returns the current seasons driver standings for a specific race
router.get("/standings/drivers/:raceId", async (req, res) => {
    // Select almost everything from driverStandings rows with specified raceId, ordered by position
    const { data, error } = await supabase
        .from("driverStandings")
        // Don't show raceId and driverId
        .select(`
            driverStandingsId, points, position, positionText, wins,
            drivers!inner (driverRef, code, forename, surname),
            races!inner (name, round, year, date)
        `)
        .eq("raceId", req.params.raceId)
        .order("position", { ascending: true });

    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ 
            error: `Could not find current season driver standings for raceId ${req.params.raceId}`
         });
    }
});

// Returns the current seasons constructors standings for a specific race
router.get("/standings/constructors/:raceId", async (req, res) => {
    // Select almost everything from constructorStandings rows with specified raceId, ordered by position
    const { data, error } = await supabase
        .from("constructorStandings")
        // Don't show raceId and constructorId
        .select(`
            constructorStandingsId, points, position, positionText, wins,
            constructors!inner (constructorRef, name, nationality),
            races!inner (name, round, year, date)
        `)
        .eq("raceId", req.params.raceId)
        .order("position", { ascending: true });
    
    if (error) { // Will catch invalid raceId
        res.send(error);
    } else if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ 
            error: `Could not find current season constructor standings for raceId ${req.params.raceId}`
         });
    }
});

export default router;
import express from 'express';
import supabase from '../database.js';

const app = express();
const router = express.Router();

// Returns results of a specific race
router.get("/results/:raceId", async (req, res) => {
    // Select almost everything from results rows with the specified raceId, ordered by grid
    const { data, err } = await supabase
        .from("results")
        // Don't show raceId, driverId, and constructorId
        .select(`
            resultId, number, grid, positionText, points, laps, time, milliseconds,
            fastestLap, fastestLapTime, fastestLapSpeed, rank,
            drivers!inner (driverRef, code, forename, surname),
            races!inner (name, round, year, date),
            constructors!inner (name, constructorRef, nationality)
        `)
        // Since some data was lost in exporting result table, raceId only goes up to ~700
        .eq("raceId", req.params.raceId)
        .order("grid", { ascending: true });
    
    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ error: `Could not find results for raceId ${req.params.raceId}` });
    }
});

// Returns results for a specific driver
router.get("/results/driver/:ref", async (req, res) => {
    // Select almost everything from results rows with the specified driverRef
    const { data, err } = await supabase
        .from("results")
        .select(`
            resultId, number, grid, positionText, points, laps, time, milliseconds,
            fastestLap, fastestLapTime, fastestLapSpeed, rank,
            drivers!inner (driverRef, code, forename, surname),
            races!inner (name, round, year, date),
            constructors!inner (name, constructorRef, nationality)
        `)
        .eq("drivers.driverRef", req.params.ref);
    
    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ error: `Could not find results for driverRef ${req.params.ref}` });
    }
});

// Returns results for a specific driver between two years
router.get("/results/drivers/:ref/seasons/:start/:end", async (req, res) => {
    // Send an error meessage if start year > end year
    if (req.params.start > req.params.end) {
        res.send({ 
            error: `Start year ${req.params.start} is larger than end date ${req.params.end}` 
        });
        return;
    }
    
    // Select almost everything from results rows with the specified driverRef,
    // between the given start and end years
    const { data, err } = await supabase
        .from("results")
        .select(`
            resultId, number, grid, positionText, points, laps, time, milliseconds,
            fastestLap, fastestLapTime, fastestLapSpeed, rank,
            drivers!inner (driverRef, code, forename, surname),
            races!inner (name, round, year, date),
            constructors!inner (name, constructorRef, nationality)
        `)
        .eq("drivers.driverRef", req.params.ref)
        .gte("races.year", req.params.start)
        .lte("races.year", req.params.end);
    
    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ 
            error: `Could not find results for driverRef ${req.params.ref} between the years ${req.params.start} and ${req.params.end}`
         });
    }
});

export default router;
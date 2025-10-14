import express from 'express';
import supabase from '../database.js';

const app = express();
const router = express.Router();

// Returns a specific race
router.get("/races/:raceId", async (req, res) => {
    // Select almost everything from the races row with specified raceId
    const { data, err } = await supabase
        .from("races")
        // Don't show circuitId
        .select(`
            raceId, year, round, name, date, time, url,
            fp1_date, fp1_time, fp2_date, fp2_time, fp3_date, fp3_time,
            quali_date, quali_time, sprint_date, sprint_time,
            circuits!inner (name, location, country)    
        `)
        .eq("raceId", req.params.raceId);

    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ error: `Could not find race with id ${req.params.raceId}` });
    }
});

// Returns the races within a given season
router.get("/races/season/:year", async (req, res) => {
    // Select everything from the races row with the specified year, ordered by round
    const { data, err } = await supabase
        .from("races")
        .select(`
            raceId, year, round, name, date, time, url,
            fp1_date, fp1_time, fp2_date, fp2_time, fp3_date, fp3_time,
            quali_date, quali_time, sprint_date, sprint_time,
            circuits!inner (name, location, country)    
        `)
        .eq("year", req.params.year)
        .order("round");

    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ error: `Could not find races in the year ${req.params.year}` });
    }
});

// Returns the race in the given season and round
router.get("/races/season/:year/:round", async (req, res) => {
    // Select everything from the race row with the specified year and round
    const { data, err } = await supabase
        .from("races")
        .select(`
            raceId, year, round, name, date, time, url,
            fp1_date, fp1_time, fp2_date, fp2_time, fp3_date, fp3_time,
            quali_date, quali_time, sprint_date, sprint_time,
            circuits!inner (name, location, country)    
        `)
        .eq("year", req.params.year)
        .eq("round", req.params.round);

    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ 
            error: `Could not find the race in the year ${req.params.year} in round ${req.params.round}`
        });
    }
});

// Returns all races for a given circuit
router.get("/races/circuits/:ref", async (req, res) => {
    // Select everything from the races row with the specified circuitRef, ordered by year
    const { data, err } = await supabase
        .from("races")
        .select(`
            raceId, year, round, name, date, time, url,
            fp1_date, fp1_time, fp2_date, fp2_time, fp3_date, fp3_time,
            quali_date, quali_time, sprint_date, sprint_time,
            circuits!inner (name, location, country)    
        `)
        .eq("circuits.circuitRef", req.params.ref)
        .order("year");

    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ error: `Could not find races with the circuitRef ${req.params.ref}` });
    }
});

// Returns all races for a given circuit between two years
router.get("/races/circuits/:ref/season/:start/:end", async (req, res) => {
    // Send an error meessage if start year > end year
    if (req.params.start > req.params.end) {
        res.send({ 
            error: `Start year ${req.params.start} is larger than end date ${req.params.end}` 
        });
        return;
    }

    // Select everything from the races row with the specified circuitRef
    // and are between the given start and end years
    const { data, err } = await supabase
        .from("races")
        .select(`
            raceId, year, round, name, date, time, url,
            fp1_date, fp1_time, fp2_date, fp2_time, fp3_date, fp3_time,
            quali_date, quali_time, sprint_date, sprint_time,
            circuits!inner (name, location, country)    
        `)
        .eq("circuits.circuitRef", req.params.ref)
        .gte("year", req.params.start)
        .lte("year", req.params.end);

    if (data.length > 0) {
        res.send(data);
    } else { // No data was found
        res.send({ 
            error: `Could not find races with the circuitRef ${req.params.ref} between the years ${req.params.start} and ${req.params.end}`
         });
    }
});

export default router;
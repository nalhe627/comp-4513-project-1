import express from 'express';
// import supa from '@supabase/supabase-js';

// Import all routers
import circuitsRouter from './routes/circuits.js';
import constructorsRouter from './routes/constructors.js';
import driversRouter from './routes/drivers.js';
import racesRouter from './routes/races.js';
import resultsRouter from './routes/results.js';
import qualifyingRouter from './routes/qualifying.js';
import standingsRouter from './routes/standings.js';

const app = express();

// Integrate routers within app (they all start with "/api" route)
app.use("/api", [
    circuitsRouter,
    constructorsRouter,
    driversRouter,
    racesRouter,
    resultsRouter,
    qualifyingRouter,
    standingsRouter
]);

// Start the server
app.listen(8080, () => {
    console.log("Listening on port 8080");
    console.log("http://localhost:8080/api/");
});

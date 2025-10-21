import express from 'express';

// Import all routers
// Go to the routes folder to inspect the different routes
import circuitsRouter from './routes/circuits.js';
import constructorsRouter from './routes/constructors.js';
import driversRouter from './routes/drivers.js';
import racesRouter from './routes/races.js';
import resultsRouter from './routes/results.js';
import qualifyingRouter from './routes/qualifying.js';
import standingsRouter from './routes/standings.js';

const app = express();
// Deployment build on Render uses an env variable for the port
const port = process.env.PORT || 8080;

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
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

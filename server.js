import express from 'express';
import supa from '@supabase/supabase-js';

const app = express();
// TODO: remove hardcoded keys
const supaUrl = process.env.PROJECT_URL 
const supaAnonKey = process.env.ANON_API_KEY 

const supabase = supa.createClient(supaUrl, supaAnonKey);

// 
app.get("", async (req, res) => {
   res.send(); 
});

// Start the server
app.listen(8080, () => {
    console.log("Listening on port 8080");
})

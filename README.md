# COMP 4513 Assignment 1
 
## Overview

This project contains APIs for querying certain details from F1 data (e.g., drivers, constructors, circuits, etc.). The project was completed as part of the first assignment in COMP 4513 at Mount Royal University, implementing a node server with Express.js to handle API requests and a Supabase project to provision the database for the F1 data.

[![Node.JS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Render](https://img.shields.io/badge/Render-8A05FF.svg?style=for-the-badge&logo=render&logoColor=white)](https://render.com/)

## Getting Started

If you would like to test the APIs directly, see the [Test Links section](#test-links).

### Installation

If you instead would like to build the repository on your local machine, first make sure that you have [Node.js](https://nodejs.org/en/download/current) installed.

Then, launch a commnad line interface (e.g., Terminal, Command Prompt) and clone the repository in a directory in your file system:
```
git clone https://github.com/nalhe627/comp-4513-project-1.git
```

Next, install the node depenendencies used within the repository (make sure that you're currently located in the repository in your CLI):
```
npm install
```

Finally, run the node server:
```
npm run dev
```
The server should then be running in http://localhost:8080, where you can test the same API routes as below.

### Example:

**Request:** `/api/circuits/monza`

**Response:**
```json
[
  {
    "circuitId": 14,
    "circuitRef": "monza",
    "name": "Autodromo Nazionale di Monza",
    "location": "Monza",
    "country": "Italy",
    "lat": 45.6156,
    "lng": 9.28111,
    "alt": 162,
    "url": "http://en.wikipedia.org/wiki/Autodromo_Nazionale_Monza"
   }
]
```

## Test Links

**Base URL:** [comp-4513-project-1.onrender.com](https://comp-4513-project-1.onrender.com)

### Circuits Route
- [/api/circuits](https://comp-4513-project-1.onrender.com/api/circuits)
- [/api/circuits/monza](https://comp-4513-project-1.onrender.com/api/circuits/monza)
- [/api/circuits/calgary](https://comp-4513-project-1.onrender.com/api/circuits/calgary)

### Constructors Route
- [/api/constructors](https://comp-4513-project-1.onrender.com/api/constructors)
- [/api/constructors/ferrari](https://comp-4513-project-1.onrender.com/api/constructors/ferrari)

### Drivers Route
- [/api/drivers](https://comp-4513-project-1.onrender.com/api/drivers)
- [/api/drivers/Norris](https://comp-4513-project-1.onrender.com/api/drivers/Norris)
- [/api/drivers/norris](https://comp-4513-project-1.onrender.com/api/drivers/norris)
- [/api/drivers/connolly](https://comp-4513-project-1.onrender.com/api/drivers/connolly)
- [/api/drivers/search/sch](https://comp-4513-project-1.onrender.com/api/drivers/search/sch)
- [/api/drivers/search/xxxxx](https://comp-4513-project-1.onrender.com/api/drivers/search/xxxxx)
- [/api/drivers/race/1069](https://comp-4513-project-1.onrender.com/api/drivers/race/1069)

### Races Route
- [/api/races/1034](https://comp-4513-project-1.onrender.com/api/races/1034)
- [/api/races/season/2021](https://comp-4513-project-1.onrender.com/api/races/season/2021)
- [/api/races/season/1800](https://comp-4513-project-1.onrender.com/api/races/season/1800)
- [/api/races/season/2020/5](https://comp-4513-project-1.onrender.com/api/races/season/2020/5)
- [/api/races/season/2020/100](https://comp-4513-project-1.onrender.com/api/races/season/2020/100)
- [/api/races/circuits/7](https://comp-4513-project-1.onrender.com/api/races/circuits/7)
- [/api/races/circuits/7/season/2015/2022](https://comp-4513-project-1.onrender.com/api/races/circuits/7/season/2015/2022)
- [/api/races/circuits/7/season/2022/2022](https://comp-4513-project-1.onrender.com/api/races/circuits/7/season/2022/2022)

### Results Route
- [/api/results/1106](https://comp-4513-project-1.onrender.com/api/results/1106)
- [/api/results/driver/max_verstappen](https://comp-4513-project-1.onrender.com/api/results/driver/max_verstappen)
- [/api/results/driver/connolly](https://comp-4513-project-1.onrender.com/api/results/driver/connolly)
- [/api/results/drivers/sainz/seasons/2021/2022](https://comp-4513-project-1.onrender.com/api/results/drivers/sainz/seasons/2021/2022)
- [/api/results/drivers/sainz/seasons/2035/2022](https://comp-4513-project-1.onrender.com/api/results/drivers/sainz/seasons/2035/2022)

### Qualifying Route
- [/api/qualifying/1106](https://comp-4513-project-1.onrender.com/api/qualifying/1106)

### Standings Route
- [/api/standings/drivers/1120](https://comp-4513-project-1.onrender.com/api/standings/drivers/1120)
- [/api/standings/constructors/1120](https://comp-4513-project-1.onrender.com/api/standings/constructors/1120)
- [/api/standings/constructors/asds](https://comp-4513-project-1.onrender.com/api/standings/constructors/asds)

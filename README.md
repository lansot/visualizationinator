# Behold! The VISUALIZATIONINATOR!

A Svelte frontend fetches *metocean* data from a simple Express backend, then shows it using ChartJS.

The backend handles parsing the data file and serving it as an object containing a nicely-processed array of metocean observations.

(Started with a Svelte app template, then built up)

## Getting started

1. Install dependencies with `yarn`
2. Run the backend with `node server.js`
3. Run the frontend with `yarn dev`
4. Go to `http://localhost:5000/`
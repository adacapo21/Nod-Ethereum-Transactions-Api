import { Router } from 'express';
import axios from "axios";
import transactionRoutes from "./routes/transactionRoutes.js";

/**
 * Contains all API routes for the application.
 */
const router = Router();

/**
 * GET /api
 */
router.get('/', (req, res) => {
    res.json({
        app: req.app.locals.title,
        apiVersion: req.app.locals.version
    });
});

/**
 * Api Task.
 */
router.use('/transactions', transactionRoutes);

// Define endpoint
router.get(
    "/jobs", async (req, res) => {
        try {
            const jobs = await axios.get(`http://api.plos.org/search?q=title:DNA`);
            res.json({
                jobs: jobs.data
            })
        } catch(err) {
            res.status(500).send({
                message: err.message
            });
        }
    }
);


export default router;
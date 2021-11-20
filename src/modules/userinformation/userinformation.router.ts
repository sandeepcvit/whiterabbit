import * as express from "express";
import { 
    add,
    listing,
    details,
} from './userinformation.controller';

const router = express.Router();

// Routes
router.post('/add', add);
router.post('/list', listing);
router.get("/details/:userId",  details);

export default router;

import express from "express"
import { userRegister, userLogin, updateFlowContainer } from "../controllers/userController.js";

const router = express.Router();

router.post('/register', userRegister )
router.post('/login', userLogin )
router.post('/editFlow', updateFlowContainer )

export default router;

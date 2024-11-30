import express from 'express'
import workflowRoutes from './workflowRoutes.js'
import userRoutes from './userRoutes.js'

const router = express.Router()

router.use('/execute', workflowRoutes)
router.use('/user', userRoutes)

export default router;
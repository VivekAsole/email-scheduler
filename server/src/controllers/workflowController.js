import agenda from '../config/agenda.js';
import scheduleWorkflow from '../services/scheduleWorkflow.js';

export const postWorkflow = (req, res) => {
    const workflow = req.body;

    try {
        scheduleWorkflow(agenda, workflow);
        res
            .status(200)
            .json({
                message: 'Workflow scheduled successfully!'
            })
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .json({
                error: 'Failed to schedule workflow'
            });
    }
};

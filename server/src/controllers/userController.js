import mongoose from "mongoose";
import User from "../models/User.js";

const userRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res
                .status(400)
                .json({
                    message: 'User already exists'
                });
        }

        const user = new User({ username, email, password });

        const savedUser = await user.save();

        res
            .status(201)
            .json(savedUser);

    } catch (error) {
        res
            .status(500)
            .json({
                message: error.message
            });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res
                .status(400)
                .json({
                    message: 'Email and password are required.'
                });
        }

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(404)
                .json({
                    message: 'User not found.'
                });
        }

        if (password !== user.password) {
            return res
                .status(401)
                .json({
                    message: 'Invalid password.'
                });
        }

        // Respond with success
        return res
            .status(200)
            .json({
                message: 'Login successful.',
                user: {
                    id: user._id,
                    username: user.username,
                    flow_container: user.flow_container
                }
            });
    } catch (error) {
        // Handle unexpected errors
        console.error('Error during login:', error);
        return res
            .status(500)
            .json({
                message: 'Internal server error.'
            });
    }
}

const updateFlowContainer = async (req, res) => {

    const { id, flow_container } = req.body;
    const objectId = new mongoose.Types.ObjectId(id)

    try {
        // Check if `flow_container` is provided
        if (!flow_container || typeof flow_container !== 'object') {
            return res.status(400).json({ error: 'Invalid or missing flow_container data.' });
        }

        // Find the user by ID and update the flow_container field
        const updatedUser = await User.findByIdAndUpdate(
            objectId,
            { flow_container }, // Update flow_container
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedUser) {
            return res
                .status(404)
                .json({
                    error: 'User not found.'
                });
        }

        // Respond with the updated user document
        res
            .status(200)
            .json({
                message: 'flow_container updated successfully',
                user: {
                    id: updatedUser._id,
                    username: updatedUser.username,
                    flow_container: updatedUser.flow_container
                }
            });
    } catch (error) {
        console.error('Error updating flow_container:', error.message);
        res.status(500).json({ error: 'Internal server error.' });
    }
}



export { userRegister, userLogin, updateFlowContainer }
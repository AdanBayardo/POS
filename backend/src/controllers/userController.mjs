import User from '../models/userModel.mjs';

const userController = {
    // Get all users
    getUsers: async (req, res) => {
        try {
            const users = await User.find().select('-password');
            res.status(200).send(users);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Get a user by ID
    getUserById: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).select('-password');
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    },

    // Update a user
    updateUser: async (req, res) => {
        try {
            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).select('-password');
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(400).send(error);
        }
    },

    // Delete a user
    deleteUser: async (req, res) => {
        try {
            const user = await User.findByIdAndDelete(req.params.id).select('-password');
            if (!user) {
                return res.status(404).send();
            }
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

export default userController;

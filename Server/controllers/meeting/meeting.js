// controllers/meeting.js

const Meeting = require('../../model/schema/meeting'); // Make sure this path is correct

// Create a new meeting
const add = async (req, res) => {
    try {
        // If you don't have auth middleware, use req.body.createBy or set a default user for testing
        const meeting = new Meeting({ ...req.body });
        await meeting.save();
        res.status(201).json({ message: 'Meeting created', meeting });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// List all meetings (not deleted)
const index = async (req, res) => {
    try {
        const meetings = await Meeting.find({ deleted: false })
            .populate('attendes', 'firstName lastName')
            .populate('attendesLead', 'leadName')
            .populate('createBy', 'username firstName lastName');
        res.status(200).json(meetings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// View a single meeting by ID
const view = async (req, res) => {
    try {
        const meeting = await Meeting.findOne({ _id: req.params.id, deleted: false })
            .populate('attendes', 'firstName lastName')
            .populate('attendesLead', 'leadName')
            .populate('createBy', 'username firstName lastName');
        if (!meeting) return res.status(404).json({ message: "Meeting not found" });
        res.status(200).json(meeting);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Soft delete a meeting
const deleteData = async (req, res) => {
    try {
        const meeting = await Meeting.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
        if (!meeting) return res.status(404).json({ message: "Meeting not found" });
        res.status(200).json({ message: 'Meeting deleted', meeting });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Soft delete many meetings
const deleteMany = async (req, res) => {
    try {
        const { ids } = req.body; // expects { ids: [id1, id2, ...] }
        const result = await Meeting.updateMany(
            { _id: { $in: ids } },
            { $set: { deleted: true } }
        );
        res.status(200).json({ message: 'Meetings deleted', result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { add, index, view, deleteData, deleteMany };

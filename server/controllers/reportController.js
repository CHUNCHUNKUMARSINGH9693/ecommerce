import Report from '../models/Report.js';

// @desc    Submit a new report
// @route   POST /api/v1/reports
export const createReport = async (req, res, next) => {
    try {
        const { type, subject, description, relatedId, priority } = req.body;

        if (!type || !subject || !description) {
            res.status(400);
            throw new Error('type, subject and description are required');
        }

        const report = await Report.create({
            user: req.user._id,
            type,
            subject,
            description,
            relatedId,
            priority
        });

        res.status(201).json({ success: true, data: report });
    } catch (error) {
        next(error);
    }
};

// @desc    Get user's reports
// @route   GET /api/v1/reports/my-reports
export const getMyReports = async (req, res, next) => {
    try {
        const reports = await Report.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: reports });
    } catch (error) {
        next(error);
    }
};
import LoginLog from '../models/LoginLog.js';

export const createLoginLog = async (req, res) => {
  try {
    const { action, device, ipAddress } = req.body;
    const userId = req.user._id;

    const log = new LoginLog({
      userId,
      action,
      device: device || 'Unknown',
      ipAddress: ipAddress || req.ip || 'Unknown'
    });

    await log.save();
    res.status(201).json(log);
  } catch (error) {
    console.error('Error creating login log:', error);
    res.status(500).json({ message: error.message });
  }
};

export const getLoginLogs = async (req, res) => {
  try {
    const logs = await LoginLog.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .lean();
    
    res.json(logs);
  } catch (error) {
    console.error('Error fetching login logs:', error);
    res.status(500).json({ message: 'Error fetching login logs' });
  }
};

export const deleteLoginLogsByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const userId = req.user._id;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Start date and end date are required' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({ message: 'Invalid date format' });
    }

    const result = await LoginLog.deleteMany({
      userId,
      timestamp: {
        $gte: start,
        $lte: end
      }
    });

    res.json({
      message: `Successfully deleted ${result.deletedCount} login logs`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error deleting login logs:', error);
    res.status(500).json({ message: 'Error deleting login logs' });
  }
}; 
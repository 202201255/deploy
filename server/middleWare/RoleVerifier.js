const roleBasedDashboard = (studentHandler, professorHandler) => {
    return (req, res, next) => {
        if (req.user.role === 'student') {
            return studentHandler(req, res, next);
        } else if (req.user.role === 'faculty') {
            return professorHandler(req, res, next);
        } else { 
            return res.status(403).json({ success: false, message: 'Unauthorized' });
        }
    };
};

module.exports = {roleBasedDashboard};
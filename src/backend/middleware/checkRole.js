module.exports = (roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const rolesArray = Array.isArray(roles) ? roles : [roles];
    
    if (!rolesArray.includes(req.user.role)) {
      return res.status(403).json({ message: 'Unauthorized: Insufficient permissions' });
    }
    
    next();
  };
};
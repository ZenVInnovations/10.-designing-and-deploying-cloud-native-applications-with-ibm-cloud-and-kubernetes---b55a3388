const { body, validationResult } = require('express-validator');

// Check validation results
const validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Validate user registration
exports.validateRegistration = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role')
    .optional()
    .isIn(['jobSeeker', 'employer']).withMessage('Role must be either jobSeeker or employer'),
  validateResults,
];

// Validate user login
exports.validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please enter a valid email address'),
  body('password')
    .trim()
    .notEmpty().withMessage('Password is required'),
  validateResults,
];

// Validate user profile update
exports.validateUpdateUser = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('phone')
    .optional()
    .trim(),
  body('location')
    .optional()
    .trim(),
  body('title')
    .optional()
    .trim(),
  body('company')
    .optional()
    .trim(),
  body('website')
    .optional()
    .trim()
    .isURL().withMessage('Website must be a valid URL'),
  body('bio')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Bio must be 500 characters or less'),
  body('profileImage')
    .optional()
    .trim()
    .isURL().withMessage('Profile image must be a valid URL'),
  validateResults,
];

// Validate job creation
exports.validateJobCreation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Job title is required')
    .isLength({ min: 5 }).withMessage('Job title must be at least 5 characters'),
  body('company')
    .trim()
    .notEmpty().withMessage('Company name is required'),
  body('location')
    .trim()
    .notEmpty().withMessage('Job location is required'),
  body('type')
    .trim()
    .notEmpty().withMessage('Job type is required'),
  body('experience')
    .trim()
    .notEmpty().withMessage('Experience level is required'),
  body('salary')
    .trim()
    .notEmpty().withMessage('Salary range is required'),
  body('description')
    .trim()
    .notEmpty().withMessage('Job description is required')
    .isLength({ min: 50 }).withMessage('Job description must be at least 50 characters'),
  body('requirements')
    .trim()
    .notEmpty().withMessage('Requirements are required')
    .isLength({ min: 30 }).withMessage('Requirements must be at least 30 characters'),
  body('responsibilities')
    .trim()
    .notEmpty().withMessage('Responsibilities are required')
    .isLength({ min: 30 }).withMessage('Responsibilities must be at least 30 characters'),
  body('skills')
    .trim()
    .notEmpty().withMessage('Required skills are required'),
  body('closingDate')
    .notEmpty().withMessage('Closing date is required')
    .isISO8601().withMessage('Closing date must be a valid date'),
  body('companyLogo')
    .optional()
    .trim()
    .isURL().withMessage('Company logo must be a valid URL'),
  body('companyWebsite')
    .optional()
    .trim()
    .isURL().withMessage('Company website must be a valid URL'),
  body('companyDescription')
    .optional()
    .trim(),
  validateResults,
];

// Validate job update
exports.validateJobUpdate = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 5 }).withMessage('Job title must be at least 5 characters'),
  body('location')
    .optional()
    .trim(),
  body('type')
    .optional()
    .trim(),
  body('experience')
    .optional()
    .trim(),
  body('salary')
    .optional()
    .trim(),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 50 }).withMessage('Job description must be at least 50 characters'),
  body('requirements')
    .optional()
    .trim()
    .isLength({ min: 30 }).withMessage('Requirements must be at least 30 characters'),
  body('responsibilities')
    .optional()
    .trim()
    .isLength({ min: 30 }).withMessage('Responsibilities must be at least 30 characters'),
  body('skills')
    .optional()
    .trim(),
  body('closingDate')
    .optional()
    .isISO8601().withMessage('Closing date must be a valid date'),
  body('companyLogo')
    .optional()
    .trim()
    .isURL().withMessage('Company logo must be a valid URL'),
  body('companyWebsite')
    .optional()
    .trim()
    .isURL().withMessage('Company website must be a valid URL'),
  body('companyDescription')
    .optional()
    .trim(),
  validateResults,
];

// Validate job application
exports.validateApplication = [
  body('jobId')
    .trim()
    .notEmpty().withMessage('Job ID is required'),
  body('coverLetter')
    .trim()
    .notEmpty().withMessage('Cover letter is required')
    .isLength({ min: 50 }).withMessage('Cover letter must be at least 50 characters'),
  body('resumeUrl')
    .trim()
    .notEmpty().withMessage('Resume URL is required')
    .isURL().withMessage('Resume URL must be a valid URL'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone number is required')
    .isLength({ min: 10 }).withMessage('Please enter a valid phone number'),
  validateResults,
];

// Validate application status update
exports.validateStatusUpdate = [
  body('status')
    .trim()
    .notEmpty().withMessage('Status is required')
    .isIn(['Pending', 'Reviewed', 'Interview', 'Offer', 'Rejected'])
    .withMessage('Status must be a valid status'),
  validateResults,
];
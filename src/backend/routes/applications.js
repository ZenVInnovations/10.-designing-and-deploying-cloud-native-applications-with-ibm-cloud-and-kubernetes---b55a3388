const express = require('express');
const Application = require('../models/Application');
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { validateApplication, validateStatusUpdate } = require('../middleware/validation');

const router = express.Router();

/**
 * @route   POST /api/applications
 * @desc    Apply for a job
 * @access  Private (Job Seekers only)
 */
router.post('/', [auth, checkRole('jobSeeker'), validateApplication], async (req, res) => {
  try {
    const { jobId, coverLetter, resumeUrl, phone } = req.body;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if user has already applied for this job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: req.user.userId
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Create new application
    const application = new Application({
      job: jobId,
      applicant: req.user.userId,
      coverLetter,
      resumeUrl,
      phone,
      status: 'Pending'
    });

    await application.save();

    // Increment application count for the job
    job.applications += 1;
    await job.save();

    res.status(201).json(application);
  } catch (error) {
    console.error('Application submission error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/applications/me
 * @desc    Get all applications for the authenticated job seeker
 * @access  Private (Job Seekers only)
 */
router.get('/me', [auth, checkRole('jobSeeker')], async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user.userId })
      .populate('job', 'title company companyLogo location type')
      .sort({ appliedAt: -1 });

    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/applications/job/:jobId
 * @desc    Get all applications for a specific job
 * @access  Private (Employer who posted the job only)
 */
router.get('/job/:jobId', auth, async (req, res) => {
  try {
    // Find the job
    const job = await Job.findById(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if the authenticated user is the employer who posted the job
    if (job.postedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view these applications' });
    }
    
    // Get applications for the job
    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email profileImage')
      .sort({ appliedAt: -1 });
    
    res.json(applications);
  } catch (error) {
    console.error('Get job applications error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/applications/:id/status
 * @desc    Update application status
 * @access  Private (Employer who posted the job only)
 */
router.put('/:id/status', [auth, validateStatusUpdate], async (req, res) => {
  try {
    const { status } = req.body;
    
    // Find application
    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    // Get the job associated with this application
    const job = await Job.findById(application.job);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user is the employer who posted the job
    if (job.postedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this application' });
    }
    
    // Update status
    application.status = status;
    await application.save();
    
    res.json(application);
  } catch (error) {
    console.error('Update application status error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
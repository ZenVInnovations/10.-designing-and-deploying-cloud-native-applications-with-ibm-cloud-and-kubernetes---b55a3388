const express = require('express');
const Job = require('../models/Job');
const auth = require('../middleware/auth');
const checkRole = require('../middleware/checkRole');
const { validateJobCreation, validateJobUpdate } = require('../middleware/validation');

const router = express.Router();

/**
 * @route   GET /api/jobs
 * @desc    Get all jobs with optional filtering
 * @access  Public
 */
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      type, 
      experience, 
      location, 
      page = 1, 
      limit = 10 
    } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { skills: { $regex: search, $options: 'i' } }
      ];
    }
    
    if (type) filter.type = type;
    if (experience) filter.experience = experience;
    if (location) filter.location = location;
    
    // Pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    // Query jobs
    const jobs = await Job.find(filter)
      .sort({ postedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    // Get total count for pagination
    const total = await Job.countDocuments(filter);
    
    res.json({
      jobs,
      totalPages: Math.ceil(total / parseInt(limit)),
      currentPage: parseInt(page),
      total
    });
  } catch (error) {
    console.error('Get jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/jobs/:id
 * @desc    Get job by ID
 * @access  Public
 */
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json(job);
  } catch (error) {
    console.error('Get job error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   POST /api/jobs
 * @desc    Create a new job
 * @access  Private (Employers only)
 */
router.post(
  '/',
  [auth, checkRole('employer'), validateJobCreation],
  async (req, res) => {
    try {
      const {
        title,
        company,
        companyLogo,
        companyWebsite,
        companyDescription,
        location,
        type,
        experience,
        salary,
        description,
        requirements,
        responsibilities,
        skills,
        closingDate,
      } = req.body;

      // Create new job
      const job = new Job({
        title,
        company,
        companyLogo,
        companyWebsite,
        companyDescription,
        location,
        type,
        experience,
        salary,
        description,
        requirements: requirements.split('\n').filter(Boolean),
        responsibilities: responsibilities.split('\n').filter(Boolean),
        skills: skills.split(',').map(skill => skill.trim()).filter(Boolean),
        closingDate,
        postedBy: req.user.userId,
      });

      await job.save();
      
      res.status(201).json(job);
    } catch (error) {
      console.error('Create job error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

/**
 * @route   PUT /api/jobs/:id
 * @desc    Update a job
 * @access  Private (Job creator only)
 */
router.put('/:id', [auth, validateJobUpdate], async (req, res) => {
  try {
    // Find job
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user is the job creator
    if (job.postedBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized to update this job' });
    }
    
    // Update fields if provided
    const updatableFields = [
      'title', 'location', 'type', 'experience', 'salary',
      'description', 'requirements', 'responsibilities', 'skills',
      'closingDate', 'companyLogo', 'companyWebsite', 'companyDescription'
    ];
    
    updatableFields.forEach(field => {
      if (req.body[field] !== undefined) {
        // Handle arrays correctly
        if (field === 'requirements' || field === 'responsibilities') {
          job[field] = req.body[field].split('\n').filter(Boolean);
        } else if (field === 'skills') {
          job[field] = req.body[field].split(',').map(skill => skill.trim()).filter(Boolean);
        } else {
          job[field] = req.body[field];
        }
      }
    });
    
    await job.save();
    
    res.json(job);
  } catch (error) {
    console.error('Update job error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   DELETE /api/jobs/:id
 * @desc    Delete a job
 * @access  Private (Job creator only)
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    // Find job
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if user is the job creator or an admin
    if (job.postedBy.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this job' });
    }
    
    await job.remove();
    
    res.json({ message: 'Job removed' });
  } catch (error) {
    console.error('Delete job error:', error);
    
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   GET /api/jobs/employer/me
 * @desc    Get all jobs posted by the authenticated employer
 * @access  Private (Employers only)
 */
router.get('/employer/me', [auth, checkRole('employer')], async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user.userId }).sort({ postedAt: -1 });
    res.json(jobs);
  } catch (error) {
    console.error('Get employer jobs error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
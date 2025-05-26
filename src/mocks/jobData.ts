import { Job, JobApplication } from '../types/job';
import { subDays, addDays } from 'date-fns';

// Generate some mock job data for frontend development
export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    companyLogo: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    companyWebsite: 'https://techcorp.example.com',
    companyDescription: 'TechCorp is a leading technology company specializing in innovative software solutions for businesses of all sizes.',
    location: 'Remote',
    type: 'Full-time',
    experience: 'Senior Level',
    salary: '$100,000 - $130,000',
    description: 'We are looking for a skilled Senior Frontend Developer to join our team. You will be responsible for building user interfaces for web applications using modern JavaScript frameworks, with a focus on React.',
    requirements: [
      '5+ years of experience in frontend development',
      'Strong proficiency in JavaScript, HTML, and CSS',
      'Experience with React, Redux, and TypeScript',
      'Understanding of web accessibility standards',
      'Experience with responsive design and cross-browser compatibility',
      'Knowledge of modern frontend build tools (Webpack, Vite, etc.)'
    ],
    responsibilities: [
      'Develop and maintain user interfaces for web applications',
      'Collaborate with designers and backend developers',
      'Write clean, maintainable, and well-documented code',
      'Participate in code reviews and mentor junior developers',
      'Optimize applications for maximum speed and scalability',
      'Stay up-to-date with the latest frontend technologies and best practices'
    ],
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Redux', 'REST APIs', 'Git', 'Responsive Design'],
    postedAt: subDays(new Date(), 5).toISOString(),
    closingDate: addDays(new Date(), 25).toISOString(),
    applications: 24,
    postedBy: 'employer-1'
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'DataSystems',
    companyLogo: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    companyWebsite: 'https://datasystems.example.com',
    companyDescription: 'DataSystems specializes in building scalable backend systems and data processing pipelines for enterprise clients.',
    location: 'Hybrid',
    type: 'Full-time',
    experience: 'Mid Level',
    salary: '$85,000 - $110,000',
    description: 'We are seeking a Backend Developer to help design and implement server-side applications and APIs. You will be responsible for writing clean, efficient code and ensuring high performance and responsiveness to requests from the front-end.',
    requirements: [
      '3+ years of experience in backend development',
      'Proficiency in Node.js, Express, and MongoDB',
      'Experience with RESTful API design and implementation',
      'Knowledge of authentication and authorization protocols',
      'Understanding of server-side rendering',
      'Familiarity with cloud services (AWS, Azure, or GCP)'
    ],
    responsibilities: [
      'Design and implement robust and scalable server-side applications',
      'Create and maintain RESTful APIs',
      'Integrate with databases and third-party services',
      'Ensure data security and implement authentication systems',
      'Collaborate with frontend developers and DevOps engineers',
      'Write comprehensive tests and documentation'
    ],
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'JavaScript', 'TypeScript', 'AWS', 'Docker', 'Git'],
    postedAt: subDays(new Date(), 3).toISOString(),
    closingDate: addDays(new Date(), 27).toISOString(),
    applications: 18,
    postedBy: 'employer-2'
  },
  {
    id: '3',
    title: 'Full Stack Developer',
    company: 'WebSolutions',
    companyLogo: 'https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    companyWebsite: 'https://websolutions.example.com',
    companyDescription: 'WebSolutions is a web development agency that creates beautiful and functional websites and applications for clients across various industries.',
    location: 'On-site',
    type: 'Full-time',
    experience: 'Mid Level',
    salary: '$90,000 - $115,000',
    description: 'We are looking for a talented Full Stack Developer to join our team. You will be responsible for developing and maintaining web applications, working on both frontend and backend components.',
    requirements: [
      '3+ years of experience in full stack development',
      'Strong knowledge of JavaScript, HTML, and CSS',
      'Experience with React or Angular on the frontend',
      'Experience with Node.js or Python on the backend',
      'Familiarity with database systems (SQL and NoSQL)',
      'Understanding of version control systems'
    ],
    responsibilities: [
      'Develop and maintain full stack web applications',
      'Build responsive user interfaces using modern frontend frameworks',
      'Implement server-side logic and APIs',
      'Integrate with databases and third-party services',
      'Collaborate with designers, product managers, and other developers',
      'Ensure code quality through testing and code reviews'
    ],
    skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'MongoDB', 'SQL', 'Git', 'RESTful APIs'],
    postedAt: subDays(new Date(), 7).toISOString(),
    closingDate: addDays(new Date(), 23).toISOString(),
    applications: 32,
    postedBy: 'employer-3'
  },
  {
    id: '4',
    title: 'UX/UI Designer',
    company: 'CreativeMinds',
    companyLogo: 'https://images.pexels.com/photos/3153201/pexels-photo-3153201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    companyWebsite: 'https://creativeminds.example.com',
    companyDescription: 'CreativeMinds is a design-focused agency that creates beautiful, user-centered digital experiences for startups and established brands.',
    location: 'Remote',
    type: 'Full-time',
    experience: 'Mid Level',
    salary: '$80,000 - $100,000',
    description: 'We are seeking a talented UX/UI Designer to create amazing user experiences. The ideal candidate should have a strong portfolio demonstrating their ability to create intuitive, engaging, and accessible user interfaces.',
    requirements: [
      '3+ years of experience in UX/UI design',
      'Proficiency in design tools like Figma, Sketch, or Adobe XD',
      'Understanding of user-centered design principles',
      'Experience with responsive design and mobile-first approaches',
      'Knowledge of accessibility standards',
      'Ability to create wireframes, prototypes, and high-fidelity designs'
    ],
    responsibilities: [
      'Create user-centered designs by understanding business requirements and user feedback',
      'Develop wireframes, prototypes, and high-fidelity mockups',
      'Conduct user research and usability testing',
      'Collaborate with developers to implement designs',
      'Create and maintain design systems',
      'Stay up-to-date with the latest design trends and best practices'
    ],
    skills: ['UX Design', 'UI Design', 'Figma', 'Sketch', 'Wireframing', 'Prototyping', 'User Research', 'Design Systems', 'Accessibility'],
    postedAt: subDays(new Date(), 2).toISOString(),
    closingDate: addDays(new Date(), 28).toISOString(),
    applications: 15,
    postedBy: 'employer-4'
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudTech',
    companyLogo: 'https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    companyWebsite: 'https://cloudtech.example.com',
    companyDescription: 'CloudTech specializes in cloud infrastructure and DevOps solutions, helping companies optimize their deployment pipelines and infrastructure.',
    location: 'Hybrid',
    type: 'Full-time',
    experience: 'Senior Level',
    salary: '$110,000 - $140,000',
    description: 'We are looking for a DevOps Engineer to help us build and maintain our cloud infrastructure and CI/CD pipelines. You will be responsible for automating deployment processes and ensuring the reliability and scalability of our systems.',
    requirements: [
      '5+ years of experience in DevOps or system administration',
      'Strong knowledge of cloud services (AWS, Azure, or GCP)',
      'Experience with containerization technologies (Docker, Kubernetes)',
      'Proficiency in infrastructure as code (Terraform, CloudFormation)',
      'Experience with CI/CD tools (Jenkins, GitHub Actions, CircleCI)',
      'Knowledge of Linux/Unix administration'
    ],
    responsibilities: [
      'Design and implement cloud infrastructure using infrastructure as code',
      'Set up and maintain CI/CD pipelines',
      'Monitor system performance and troubleshoot issues',
      'Implement security best practices and ensure compliance',
      'Automate routine operational tasks',
      'Collaborate with development teams to improve deployment processes'
    ],
    skills: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'Linux', 'Bash', 'Python', 'Monitoring', 'Security'],
    postedAt: subDays(new Date(), 1).toISOString(),
    closingDate: addDays(new Date(), 29).toISOString(),
    applications: 10,
    postedBy: 'employer-5'
  },
  {
    id: '6',
    title: 'Data Scientist',
    company: 'AnalyticsPro',
    companyLogo: 'https://images.pexels.com/photos/7567432/pexels-photo-7567432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    companyWebsite: 'https://analyticspro.example.com',
    companyDescription: 'AnalyticsPro helps businesses leverage their data to make informed decisions through advanced analytics and machine learning solutions.',
    location: 'Remote',
    type: 'Full-time',
    experience: 'Mid Level',
    salary: '$95,000 - $120,000',
    description: 'We are seeking a Data Scientist to help us analyze and interpret complex data. You will be responsible for developing machine learning models and extracting insights from large datasets to solve business problems.',
    requirements: [
      '3+ years of experience in data science or related field',
      'Strong background in statistics and machine learning',
      'Proficiency in Python and data analysis libraries (NumPy, Pandas, Scikit-learn)',
      'Experience with data visualization tools',
      'Knowledge of SQL and database systems',
      'Familiarity with big data technologies is a plus'
    ],
    responsibilities: [
      'Collect, process, and analyze large datasets',
      'Develop machine learning models for prediction and classification tasks',
      'Create data visualizations and reports',
      'Collaborate with stakeholders to understand business needs',
      'Communicate findings and recommendations to non-technical audiences',
      'Stay up-to-date with the latest developments in data science'
    ],
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization', 'NumPy', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Big Data'],
    postedAt: subDays(new Date(), 4).toISOString(),
    closingDate: addDays(new Date(), 26).toISOString(),
    applications: 20,
    postedBy: 'employer-6'
  },
  {
    id: '7',
    title: 'Product Manager',
    company: 'InnovateTech',
    companyLogo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    companyWebsite: 'https://innovatetech.example.com',
    companyDescription: 'InnovateTech is a tech startup focused on creating innovative products that solve real-world problems in the enterprise space.',
    location: 'On-site',
    type: 'Full-time',
    experience: 'Senior Level',
    salary: '$120,000 - $150,000',
    description: 'We are looking for an experienced Product Manager to lead the development of our enterprise SaaS products. You will be responsible for defining product strategy, gathering requirements, and coordinating with cross-functional teams to deliver exceptional products.',
    requirements: [
      '5+ years of experience in product management, preferably in SaaS or enterprise software',
      'Strong understanding of software development lifecycle',
      'Experience with agile methodologies',
      'Excellent communication and presentation skills',
      'Ability to translate business requirements into product features',
      'Experience with product analytics and data-driven decision making'
    ],
    responsibilities: [
      'Define product vision, strategy, and roadmap',
      'Gather and prioritize product requirements',
      'Work with design and engineering teams to deliver features',
      'Conduct market research and competitive analysis',
      'Track product metrics and make data-driven decisions',
      'Communicate product updates and value to stakeholders'
    ],
    skills: ['Product Management', 'Agile', 'JIRA', 'Product Strategy', 'User Stories', 'Market Research', 'Analytics', 'Roadmapping', 'Stakeholder Management'],
    postedAt: subDays(new Date(), 6).toISOString(),
    closingDate: addDays(new Date(), 24).toISOString(),
    applications: 28,
    postedBy: 'employer-7'
  },
  {
    id: '8',
    title: 'Mobile Developer (iOS)',
    company: 'AppWorks',
    companyLogo: 'https://images.pexels.com/photos/37348/office-sitting-room-executive-sitting.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    companyWebsite: 'https://appworks.example.com',
    companyDescription: 'AppWorks is a mobile app development studio that creates beautiful and functional mobile applications for iOS and Android platforms.',
    location: 'Remote',
    type: 'Contract',
    experience: 'Mid Level',
    salary: '$70 - $90 per hour',
    description: 'We are looking for an iOS Developer to join our team on a contract basis. You will be responsible for developing and maintaining iOS applications using Swift and following Apple's design guidelines.',
    requirements: [
      '3+ years of experience in iOS development',
      'Proficiency in Swift and UIKit',
      'Experience with iOS frameworks and APIs',
      'Knowledge of iOS app architecture patterns (MVC, MVVM)',
      'Understanding of Apple's design principles and interface guidelines',
      'Experience with version control systems (Git)'
    ],
    responsibilities: [
      'Develop and maintain iOS applications',
      'Write clean, efficient, and maintainable code',
      'Collaborate with designers and backend developers',
      'Implement user interfaces following Apple's design guidelines',
      'Integrate with RESTful APIs and third-party services',
      'Troubleshoot and fix bugs and performance issues'
    ],
    skills: ['Swift', 'iOS', 'UIKit', 'Xcode', 'Git', 'RESTful APIs', 'CocoaPods', 'Core Data', 'Mobile Development'],
    postedAt: subDays(new Date(), 8).toISOString(),
    closingDate: addDays(new Date(), 22).toISOString(),
    applications: 12,
    postedBy: 'employer-8'
  }
];

// Mock job applications for the user dashboard
export const mockApplications: JobApplication[] = [
  {
    id: '1',
    jobId: '1',
    jobTitle: 'Senior Frontend Developer',
    company: 'TechCorp',
    companyLogo: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    appliedAt: subDays(new Date(), 3).toISOString(),
    status: 'Reviewed',
    resumeUrl: 'https://example.com/resume.pdf',
    coverLetter: 'I am excited to apply for the Senior Frontend Developer position at TechCorp. With over 5 years of experience in frontend development, I have a strong background in React, TypeScript, and modern JavaScript practices. I believe my skills and experience make me a perfect fit for this role.'
  },
  {
    id: '2',
    jobId: '2',
    jobTitle: 'Backend Developer',
    company: 'DataSystems',
    companyLogo: 'https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    appliedAt: subDays(new Date(), 5).toISOString(),
    status: 'Interview',
    resumeUrl: 'https://example.com/resume.pdf',
    coverLetter: 'I am writing to express my interest in the Backend Developer position at DataSystems. With my experience in Node.js, Express, and MongoDB, I am confident that I can contribute to your team and help build scalable backend systems.'
  },
  {
    id: '3',
    jobId: '3',
    jobTitle: 'Full Stack Developer',
    company: 'WebSolutions',
    companyLogo: 'https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    appliedAt: subDays(new Date(), 7).toISOString(),
    status: 'Pending',
    resumeUrl: 'https://example.com/resume.pdf',
    coverLetter: 'I am applying for the Full Stack Developer position at WebSolutions. I have a strong background in both frontend and backend development, with experience in React, Node.js, and various database systems. I am excited about the opportunity to contribute to your team.'
  },
  {
    id: '4',
    jobId: '7',
    jobTitle: 'Product Manager',
    company: 'InnovateTech',
    companyLogo: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    appliedAt: subDays(new Date(), 10).toISOString(),
    status: 'Rejected',
    resumeUrl: 'https://example.com/resume.pdf',
    coverLetter: 'I am interested in the Product Manager position at InnovateTech. With my experience in product management and agile methodologies, I believe I can help drive your product strategy and deliver exceptional value to your customers.'
  }
];
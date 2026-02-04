// Mock database for jobs (in production, use a real database)
let jobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    type: 'Full-time',
    category: 'Engineering',
    salary: '$120k - $180k',
    description: 'We are looking for an experienced Frontend Developer to join our team. You will be responsible for building user interfaces using React and Next.js.',
    requirements: ['5+ years of experience', 'React/Next.js expertise', 'TypeScript proficiency', 'Team leadership experience'],
    badges: ['Remote', 'Urgent', 'Featured'],
    postedDate: '2026-02-03',
    companyLogo: null,
  },
  {
    id: '2',
    title: 'Product Designer',
    company: 'DesignStudio',
    location: 'New York, NY',
    type: 'Full-time',
    category: 'Design',
    salary: '$90k - $130k',
    description: 'Join our creative team as a Product Designer. You will work on exciting projects for Fortune 500 clients.',
    requirements: ['3+ years of product design', 'Figma expertise', 'Strong portfolio', 'UX research skills'],
    badges: ['Hybrid', 'Benefits'],
    postedDate: '2026-02-02',
    companyLogo: null,
  },
  {
    id: '3',
    title: 'Backend Engineer',
    company: 'DataFlow Systems',
    location: 'Austin, TX',
    type: 'Full-time',
    category: 'Engineering',
    salary: '$130k - $170k',
    description: 'Build scalable backend systems using Node.js and Python. Work with our data infrastructure team.',
    requirements: ['4+ years backend experience', 'Node.js/Python', 'Database design', 'API development'],
    badges: ['Remote', 'Stock Options'],
    postedDate: '2026-02-01',
    companyLogo: null,
  },
  {
    id: '4',
    title: 'Marketing Manager',
    company: 'GrowthHub',
    location: 'Los Angeles, CA',
    type: 'Full-time',
    category: 'Marketing',
    salary: '$80k - $110k',
    description: 'Lead our marketing efforts and drive brand awareness. Manage campaigns across multiple channels.',
    requirements: ['5+ years marketing experience', 'Digital marketing expertise', 'Team management', 'Analytics skills'],
    badges: ['On-site', 'Leadership'],
    postedDate: '2026-01-30',
    companyLogo: null,
  },
  {
    id: '5',
    title: 'DevOps Engineer',
    company: 'CloudNative Co.',
    location: 'Seattle, WA',
    type: 'Contract',
    category: 'Engineering',
    salary: '$100/hr',
    description: 'Help us build and maintain our cloud infrastructure. Experience with AWS and Kubernetes required.',
    requirements: ['AWS/GCP expertise', 'Kubernetes', 'CI/CD pipelines', 'Infrastructure as Code'],
    badges: ['Remote', 'Contract'],
    postedDate: '2026-01-28',
    companyLogo: null,
  },
  {
    id: '6',
    title: 'UX Researcher',
    company: 'UserFirst Labs',
    location: 'Boston, MA',
    type: 'Part-time',
    category: 'Design',
    salary: '$50/hr',
    description: 'Conduct user research and usability testing. Help shape product decisions with data-driven insights.',
    requirements: ['UX research experience', 'Qualitative research methods', 'Data analysis', 'Communication skills'],
    badges: ['Hybrid', 'Flexible Hours'],
    postedDate: '2026-01-25',
    companyLogo: null,
  },
  {
    id: '7',
    title: 'Sales Representative',
    company: 'SalesForce Pro',
    location: 'Chicago, IL',
    type: 'Full-time',
    category: 'Sales',
    salary: '$60k + Commission',
    description: 'Drive B2B sales and build lasting client relationships. Uncapped commission potential.',
    requirements: ['2+ years B2B sales', 'CRM experience', 'Strong communication', 'Goal-oriented'],
    badges: ['On-site', 'Commission'],
    postedDate: '2026-01-22',
    companyLogo: null,
  },
  {
    id: '8',
    title: 'Data Scientist',
    company: 'AI Innovations',
    location: 'Remote',
    type: 'Full-time',
    category: 'Data Science',
    salary: '$140k - $200k',
    description: 'Build ML models and derive insights from large datasets. Work on cutting-edge AI projects.',
    requirements: ['ML/AI expertise', 'Python/R proficiency', 'Statistics background', 'PhD preferred'],
    badges: ['Remote', 'Featured', 'Top Salary'],
    postedDate: '2026-02-04',
    companyLogo: null,
  },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  // Get filter parameters
  const search = searchParams.get('search')?.toLowerCase() || '';
  const category = searchParams.get('category') || '';
  const type = searchParams.get('type') || '';
  const location = searchParams.get('location') || '';
  const sort = searchParams.get('sort') || 'newest';

  let filteredJobs = [...jobs];

  // Apply search filter
  if (search) {
    filteredJobs = filteredJobs.filter(job =>
      job.title.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search) ||
      job.description.toLowerCase().includes(search)
    );
  }

  // Apply category filter
  if (category) {
    filteredJobs = filteredJobs.filter(job => job.category === category);
  }

  // Apply type filter
  if (type) {
    filteredJobs = filteredJobs.filter(job => job.type === type);
  }

  // Apply location filter
  if (location) {
    filteredJobs = filteredJobs.filter(job => 
      job.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  // Apply sorting
  if (sort === 'newest') {
    filteredJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
  } else if (sort === 'relevance' && search) {
    // Sort by relevance (title matches first, then company, then description)
    filteredJobs.sort((a, b) => {
      const aScore = (a.title.toLowerCase().includes(search) ? 3 : 0) +
                     (a.company.toLowerCase().includes(search) ? 2 : 0) +
                     (a.description.toLowerCase().includes(search) ? 1 : 0);
      const bScore = (b.title.toLowerCase().includes(search) ? 3 : 0) +
                     (b.company.toLowerCase().includes(search) ? 2 : 0) +
                     (b.description.toLowerCase().includes(search) ? 1 : 0);
      return bScore - aScore;
    });
  }

  return Response.json({ jobs: filteredJobs, total: filteredJobs.length });
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    const newJob = {
      id: String(Date.now()),
      title: body.title,
      company: body.company,
      location: body.location,
      type: body.type,
      category: body.category,
      salary: body.salary,
      description: body.description,
      requirements: body.requirements || [],
      badges: body.badges || [],
      postedDate: new Date().toISOString().split('T')[0],
      companyLogo: null,
    };

    // Validate required fields
    if (!newJob.title || !newJob.company || !newJob.location || !newJob.type || !newJob.category) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    jobs.unshift(newJob);
    
    return Response.json({ success: true, job: newJob }, { status: 201 });
  } catch (error) {
    return Response.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

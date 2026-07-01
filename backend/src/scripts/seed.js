require('dotenv').config();
const prisma = require('../db/prisma');

async function main() {
  // Clear existing data so this script is safe to re-run
  await prisma.service.deleteMany();
  await prisma.caseStudy.deleteMany();
  await prisma.workingProcess.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.testimonial.deleteMany();

  await prisma.service.createMany({
    data: [
      { title: 'Web Development', iconName:"web-development", websiteUrl: "https://web.dev/learn", description: 'Custom websites and web applications built for performance.', backgroundColor: "green", sortOrder: 1 },
      { title: 'Mobile App Development', iconName:"mobile-app",  websiteUrl: "https://web.dev/learn", description: 'Native and cross-platform mobile apps for iOS and Android.', backgroundColor: "gray", sortOrder: 2 },
      { title: 'UI/UX Design', iconName:"ui-ux", websiteUrl: "https://web.dev/learn", description: 'User-centered design that balances usability and aesthetics.', backgroundColor: "white", sortOrder: 3 },
      { title: 'Cloud & DevOps', iconName:"cloud-devops", websiteUrl: "https://web.dev/learn", description: 'Scalable infrastructure, CI/CD pipelines, and cloud migration.', backgroundColor: "green", sortOrder: 4 },
    ],
  });

  await prisma.caseStudy.createMany({
    data: [
      {
        title: 'E-Commerce Platform Revamp',
        shortDescription: 'Rebuilt a legacy online store, improving load times by 60%.',
        linkUrl: 'https://dribbble.com/shots/25643771-YuviPep-Store-E-commerce-Platform-Revamp',
        sortOrder: 1,
      },
      {
        title: 'Healthcare Patient Portal',
        shortDescription: 'A secure portal for patients to book appointments and view records.',
        linkUrl: 'https://medlineplus.gov/ency/patientinstructions/000880.htm',
        sortOrder: 2,
      },
      {
        title: 'Fintech Dashboard',
        shortDescription: 'Real-time analytics dashboard for a financial services client.',
        linkUrl: 'https://dribbble.com/shots/25785234-Sway-Finance-Modern-Mobile-App-Design',
        sortOrder: 3,
      },
    ],
  });

  await prisma.workingProcess.createMany({
    data: [
      { stepNo: 1, title: 'Discovery', description: 'We learn about your business goals and requirements.', sortOrder: 1 },
      { stepNo: 2, title: 'Design', description: 'We create wireframes and prototypes for your approval.', sortOrder: 2 },
      { stepNo: 3, title: 'Development', description: 'We build the product using modern, scalable technology.', sortOrder: 3 },
      { stepNo: 4, title: 'Launch & Support', description: 'We deploy your product and provide ongoing support.', sortOrder: 4 },
    ],
  });

  await prisma.teamMember.createMany({
    data: [
      { name: 'Julian Roxas', role: 'Lead Developer', sortOrder: 1 },
      { name: 'Miki Roxas', role: 'UI/UX Designer', sortOrder: 2 },
      { name: 'JM Roxas', role: 'Project Manager', sortOrder: 3 },
    ],
  });

  await prisma.testimonial.createMany({
    data: [
      { name: 'Kuya Oliver', roleCompany: 'HR, SearchWorksPH', message: 'They delivered beyond our expectations, on time and on budget.', rating: 5, sortOrder: 1 },
      { name: 'Kuya Sushi', roleCompany: 'Founder, RetailCo', message: 'Professional, communicative, and genuinely invested in our success.', rating: 5, sortOrder: 2 },
      { name: 'Tom Cruise', roleCompany: 'CTO, FinServe', message: 'The team understood our complex requirements and executed flawlessly.', rating: 4, sortOrder: 3 },
    ],
  });

  console.log('Seed complete:');
  console.log('- 4 services');
  console.log('- 3 case studies');
  console.log('- 4 working process steps');
  console.log('- 3 team members');
  console.log('- 3 testimonials');

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
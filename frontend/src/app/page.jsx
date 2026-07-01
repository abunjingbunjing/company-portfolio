import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/home/Hero";
import Partners from "@/components/home/Partners";
import Services from "@/components/home/Services";
import CTA from "@/components/home/Cta";
import CaseStudies from "@/components/home/CaseStudies";
import WorkingProcess from "@/components/home/WorkingProcess";
import Team from "@/components/home/Team";
import Testimonials from "@/components/home/Testimonials";
import Contact from "@/components/home/Contact";
import Footer from "@/components/layout/Footer";

import {
  getServices,
  getCaseStudies,
  getWorkingProcess,
  getTeamMembers,
  getTestimonials,
} from "@/lib/api";

export default async function Home() {

  const [
    services,
    caseStudies,
    workingProcesses,
    TeamMembers,
    testimonials,
  ] = await Promise.all([
    getServices(),
    getCaseStudies(),
    getWorkingProcess(),
    getTeamMembers(),
    getTestimonials(),
  ]);

  return (
    <main>
      <Navbar />
      <Hero />
      <Partners />
      <Services services={services} />
      <CTA />
      <CaseStudies caseStudies={caseStudies} />
      <WorkingProcess processes={workingProcesses} />
      <Team members={TeamMembers} />
      <Testimonials testimonials={testimonials} />
      <Contact />
      <Footer />
    </main>
  );
}
import SectionHeading from "../ui/SectionHeading";
import Container from "../ui/Container";
import { getServices } from "@/lib/api";
import ServiceCard from "./ServiceCard";
import SectionHeader from "../ui/SectionHeader";

export default async function Services() {
  const services = await getServices();

  return (
    <>  <Container>
        <section id="services">
        <SectionHeader 
        title="Services"
        description="At our digital marketing agency, we offer a range of services to help businesses grow and succeed online."
        />


            <div className="grid gap-8 lg:grid-cols-2">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        service={service}
                    />
                ))}
            </div>
            </section>
        </Container>
    </>
  );
}
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Container from "../ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

export default function CaseStudies({ caseStudies }) {
  return (
    <section id="case-studies">
        <Container>
        <SectionHeader
            title="Case Studies"
            description="Explore real-world examples of how we've helped businesses achieve success through tailored digital marketing strategies."
        />

      <div className="grid rounded-[45px] bg-[#191A23] text-white md:grid-cols-3">

        {caseStudies.map((study, index) => (

          <div
            key={study.id}
            className={`p-12 ${
              index !== caseStudies.length - 1
                ? "border-b md:border-b-0 md:border-r border-gray-700"
                : ""
            }`}
          >

            <p className="mb-8 text-gray-300">
              {study.shortDescription}
            </p>

            <Link
              href={study.linkUrl || "#"}
              className="flex items-center gap-2 text-primary"
            >
              Learn More

              <ArrowUpRight size={18} />

            </Link>

          </div>

        ))}

      </div>
</Container>
    </section>
  );
}
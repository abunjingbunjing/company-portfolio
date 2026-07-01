"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Container from "../ui/Container";

export default function Testimonials({ testimonials }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  return (
    <Container>
        <section id="testimonials">
      <SectionHeader id="testimonials"
        title="Testimonials"
        description="Hear from our satisfied clients about their experience working with us."
      />
      <div className="rounded-[45px] bg-[#191A23] p-12 overflow-hidden">
        <div
          className="overflow-hidden"
          ref={emblaRef}
        >
          <div className="flex">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="min-w-full px-4"
              >
                <div className="rounded-[32px] border border-primary p-10">
                  <p className="text-lg leading-8 text-white">
                    "{testimonial.message}"
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-full bg-primary">
                    <Image
                      src={
                        testimonial.avatarUrl ||
                        "/images/team/default-avatar.png"
                      }
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-300">
                      {testimonial.roleCompany}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 flex justify-center gap-4">
          <Button
            variant="light"
            onClick={scrollPrev}
            className="hover:bg-primary shrink-0 transition-transform duration-300 hover:scale-105"
          >
            ←
          </Button>
          <Button
            variant="light"
            onClick={scrollNext}
            className="hover:bg-primary shrink-0 transition-transform duration-300 hover:scale-105"
          >
            →
          </Button>
        </div>
      </div>
      </section>
    </Container>
  );
}
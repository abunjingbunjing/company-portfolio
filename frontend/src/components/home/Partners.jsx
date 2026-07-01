import Image from "next/image";
import Container from "../ui/Container";

const logos = [
  "amazon",
  "dribble",
  "hubspot",
  "notion",
  "netflix",
  "zoom",
];

export default function Partners() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid grid-cols-2 items-center gap-8 md:grid-cols-3 lg:grid-cols-6">
          {logos.map((logo) => (
            <div
              key={logo}
              className="flex justify-center grayscale transition hover:grayscale-0"
            >
              <Image
                src={`/images/partners/${logo}.svg`}
                alt={logo}
                width={120}
                height={48}
                className="h-8 w-auto"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
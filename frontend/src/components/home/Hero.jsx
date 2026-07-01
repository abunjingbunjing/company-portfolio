import Image from "next/image";
import Button from "../ui/Button";
import Container from "../ui/Container";

export default function Hero() {
  return (
    <section id="home" className="py-12 lg:py-20">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
                <h1
                    className="
                        text-5xl
                        lg:text-6xl
                        font-medium
                        leading-tight
                    "
                >
                    Navigating the digital landscape for success
                </h1>
                <p
                    className="
                        text-lg
                        text-gray-700
                        max-w-xl
                    "
                >
                    Our digital marketing agency helps businesses grow and
                    succeed online through a range of services including SEO,
                    PPC, social media marketing, and content creation.
                </p>
                <a href="#contact">
                <Button className="hover:bg-primary hover:text-black">
                Book a Consultation
                </Button>
                </a>
            </div>
            <div className="flex justify-center lg:justify-end">
                <Image
                    src="/images/hero-illustration.svg"
                    alt="Digital Marketing Illustration"
                    width={600}
                    height={515}
                    priority
                    className="w-full max-w-xl h-auto"
                />
            </div>
        </div>
      </Container>
    </section>
  );
}
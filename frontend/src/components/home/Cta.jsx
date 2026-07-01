import Image from "next/image";
import Link from "next/link";

export default function Cta() {
  return (
    <section className="py-24">
      <div className="mx-auto flex max-w-7xl items-center justify-between rounded-[45px] bg-[#F3F3F3] px-16 py-14">

        <div className="max-w-lg">

          <h2 className="text-4xl font-semibold">
            Let's make things happen
          </h2>

          <p className="mt-6 text-gray-600">
            Contact us today to learn more about how our digital marketing
            services can help your business grow and succeed online.
          </p>
          <Link href="#contact">
          <button className="mt-8 rounded-xl bg-black px-8 py-4 text-white hover:bg-primary hover:text-black">
            Get your free proposal
          </button>
          </Link>
        </div>

        <div className="hidden lg:block">

          <Image
            src="/images/cta/illustration.svg"
            alt=""
            width={400}
            height={300}
          />

        </div>

      </div>
    </section>
  );
}
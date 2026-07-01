import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-24 rounded-t-[45px] bg-[#191A23] text-white">

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">

            <Image
                src="/images/logo.svg"
                alt="Positivus"
                width={220}
                height={56}
                priority
                className="h-8 w-auto lg:h-10 invert"
            />

          <nav className="flex flex-wrap gap-8">

            <a href="#">About us</a>
            <a href="#">Services</a>
            <a href="#">Use Cases</a>
            <a href="#">Pricing</a>
            <a href="#">Blog</a>

          </nav>

        </div>

        <div className="mt-16 border-t border-neutral-700 pt-10">

          <p>
            © {new Date().getFullYear()} Positivus.
            All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}
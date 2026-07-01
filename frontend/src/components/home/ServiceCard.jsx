import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { BACKGROUND_COLORS } from "@/constants/backgroundColors";
import Link from "next/link";

export default function ServiceCard({ service }) {
    const iconSrc =
    service.iconUrl?.startsWith("/")
        ? service.iconUrl
        : service.iconUrl?.startsWith("http")
        ? service.iconUrl
        : service.iconName
        ? `/images/services/${service.iconName}.svg`
        : "/images/services/default.svg";

  return (
    <Link
      href={service.websiteUrl || "#"}
      target={service.websiteUrl ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="block"
    >
    <article
      className={`
        ${BACKGROUND_COLORS[service.backgroundColor] || "bg-secondary"}
        rounded-[32px]
        border-2
        border-black
        shadow-[0_6px_0_0_#000]
        p-8
        flex
        justify-between
        items-center
        min-h-[310px] shrink-0 transition-transform duration-300 hover:scale-105
      `}
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-between h-full">

        <div>
          <h3 className="inline rounded bg-primary px-2 py-1 text-3xl font-medium">
            {service.title}
          </h3>

          <p className="mt-6 max-w-xs text-gray-700">
            {service.description}
          </p>
        </div>

        <button className="mt-10 flex items-center gap-3 font-medium">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
            <ArrowUpRight size={20} />
          </div>

          Learn More

        </button>

      </div>

      {/* RIGHT SIDE */}

      <div className="relative h-40 w-40">
        <Image
            src={iconSrc}
            alt={service.title}
            fill
            className="object-contain"
        />
      </div>

    </article>
    </Link>
  );
}
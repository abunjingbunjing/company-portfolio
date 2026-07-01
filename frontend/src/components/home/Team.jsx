import Image from "next/image";
import { getSocialIcon } from "@/lib/socials";
import SectionHeader from "@/components/ui/SectionHeader";
import Container from "../ui/Container";
import { BACKEND_URL } from "@/lib/config";
import Link from "next/link";

export default function Team({ members }) {
  return (
    <Container>
    <section id="team">
        <SectionHeader
            title="Team"
            description="Meet the skilled professionals who bring creativity, expertise, and passion to every project."
        />
      {/* Cards */}
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {members.map((member) => (
          <article
            key={member.id}
            className="
              rounded-[32px]
              border-2
              border-black
              bg-white
              p-8
              shadow-[0_6px_0_0_#000]
            "
          >
            {/* Top */}
            <div className="flex items-start justify-between">
              <div className="flex gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-full bg-primary">
                  <Image
                    src={
                        member.avatarUrl
                          ? `${BACKEND_URL}${member.avatarUrl}`
                          : "/images/team/default.png"
                    }
                    alt={member.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex flex-col justify-end">
                  <h3 className="text-xl font-semibold">
                    {member.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {member.role}
                  </p>
                </div>
              </div>
                {member.socialsJson &&
                  (() => {
                    try {
                      const socials = JSON.parse(member.socialsJson);

                      const platform = Object.keys(socials)[0];

                      if (!platform) return null;
console.log(member.avatarUrl);
                      return (
                        <a
                          href={socials[platform]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-full bg-black p-2"
                        >
                          <Image
                            src={getSocialIcon(platform)}
                            alt={platform}
                            width={20}
                            height={20}
                          />
                        </a>
                      );
                    } catch {
                      return null;
                    }
                  })()}
            </div>
            <hr className="my-8" />
            <p className="text-gray-600">
              {member.role}
            </p>
          </article>
        ))}
      </div>
      {/* Button */}
      <div className="mt-12 flex justify-end">
        <Link href="/team">
        <button className="rounded-xl bg-black px-8 py-4 text-white hover:bg-primary hover:text-black shrink-0 transition-transform duration-300 hover:scale-105">
          See all team
        </button>
        </Link>
      </div>
      </section>
    </Container>
  );
}
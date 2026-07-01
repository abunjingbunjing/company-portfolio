'use client';

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Container from "../ui/Container";
import SectionHeader from "@/components/ui/SectionHeader";

export default function WorkingProcess({ processes }) {
  const [openId, setOpenId] = useState(
    processes.length ? processes[0].id : null
  );
  function toggle(id) {
    setOpenId(openId === id ? null : id);
  }
  return (
    <Container>
    <section id="working-process" className="py-24">
        <SectionHeader
            title="Our Working Process"
            description="Step-by-step approach that keeps every project organized and ensures high-quality results."
        />
      <div className="space-y-8">
        {processes.map((step) => {
          const isOpen = openId === step.id;
          return (
            <article
              key={step.id}
              className={`
                rounded-[32px]
                border-2
                border-black
                shadow-[0_6px_0_0_#000]
                transition-all
                ${
                  isOpen
                    ? "bg-primary"
                    : "bg-white"
                }
              `}
            >
              <button
                onClick={() => toggle(step.id)}
                className="flex w-full items-center justify-between p-8"
              >
                <div className="flex items-center gap-8">
                  <span className="text-5xl font-bold">
                    {String(step.stepNo).padStart(2, "0")}
                  </span>
                  <h3 className="text-2xl font-semibold">
                    {step.title}
                  </h3>
                </div>
                <div className="rounded-full border border-black p-2 hover:bg-primary shrink-0 transition-transform duration-300 hover:scale-115">
                  {isOpen ? <Minus /> : <Plus />}
                </div>
              </button>
              {isOpen && (
                <div className="border-t border-black px-8 py-8">
                  <p className="max-w-4xl leading-8 text-gray-700">
                    {step.description}
                  </p>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
    </Container>
  );
}
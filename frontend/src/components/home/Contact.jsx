"use client";

import { useState } from "react";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { submitContactForm } from "@/lib/api";
import Container from "../ui/Container";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await submitContactForm(form);

      setSuccess("Your message has been sent successfully.");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  }

  return (
    <Container>
    <section id ="contact" className="py-16">
      <SectionHeader
        title="Contact Us"
        description="Connect with us: Let's discuss your digital marketing needs."
      />
      <div className="rounded-[45px] bg-[#F3F3F3] p-12">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* LEFT */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="mb-2 block">
                Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border p-4"
              />
            </div>
            <div>
              <label className="mb-2 block">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border p-4"
              />
            </div>
            <div>
              <label className="mb-2 block">
                Message
              </label>
              <textarea
                rows={7}
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                className="w-full rounded-xl border p-4"
              />
            </div>
            {error && (
              <p className="text-red-600">
                {error}
              </p>
            )}
            {success && (
              <p className="text-green-600">
                {success}
              </p>
            )}
            <Button className="w-full">
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
          {/* RIGHT */}
          <div className="hidden lg:flex items-center justify-center">
            <Image
              src="/images/contact/contact-illustration.svg"
              alt="Contact"
              width={420}
              height={420}
            />
          </div>
        </div>
      </div>
      </section>
    </Container>
  );
}
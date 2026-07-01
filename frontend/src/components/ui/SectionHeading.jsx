import Container from "./Container";

export default function SectionHeading({
  title,
  description,
}) {
  return (
    <Container>
      <div className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-center">
        <h2 className="inline-block rounded-md bg-primary px-3 py-1 text-4xl font-medium">
          {title}
        </h2>

        <p className="max-w-2xl text-gray-700">
          {description}
        </p>
      </div>
    </Container>
  );
}
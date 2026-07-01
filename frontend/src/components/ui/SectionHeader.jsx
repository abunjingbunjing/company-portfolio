export default function SectionHeader({
  title,
  description,
  align = "left",
}) {
  return (
    <div
      className={`
        mb-16
        flex
        flex-col
        gap-6
        ${
          align === "center"
            ? "items-center text-center"
            : "lg:flex-row lg:items-center"
        }
      `}
    >
      <span className="w-fit rounded bg-primary px-3 py-1 text-4xl font-semibold">
        {title}
      </span>

      <p className="max-w-xl text-gray-600">
        {description}
      </p>
    </div>
  );
}
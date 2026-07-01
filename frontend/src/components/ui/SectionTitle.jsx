export default function SectionTitle({ title, description }) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8 mb-10">
      <h2 className="inline-block bg-lime-300 px-3 py-1 rounded text-3xl font-bold">
        {title}
      </h2>

      {description && (
        <p className="text-gray-700 max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
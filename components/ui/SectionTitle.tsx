import Heading from "./Heading";

interface SectionTitleProps {
  title: string;
  description?: string;
}

export default function SectionTitle({
  title,
  description,
}: SectionTitleProps) {
  return (
    <div className="mb-12 text-center">
      <Heading>{title}</Heading>

      {description && (
        <p className="mt-4 text-muted max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
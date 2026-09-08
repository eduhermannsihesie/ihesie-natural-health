interface StepCardProps {
  id: string;
  title: string;
  description: string;
}

export default function StepCard({
  id,
  title,
  description,
}: StepCardProps) {
  return (
    <div className="relative">

      {/* Number */}

      <div className="flex items-center gap-4">

        <span
          className="
            font-heading
            text-3xl
            font-bold
            text-primary-hover
          "
        >
          {id}
        </span>

        {/* Content */}

        <div>

          <h3 className="text-xl font-semibold text-primary-hover">
            {title}
          </h3>

          <p
            className="
              mt-1
              text-base
              max-w-xs
              text-muted
            "
          >
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}
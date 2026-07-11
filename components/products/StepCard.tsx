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
            text-4xl
            font-bold
            text-primary-hover
            leading-none
          "
        >
          {id}
        </span>

        {/* Content */}

        <div>

          <h3 className="text-2xl font-medium">
            {title}
          </h3>

          <p
            className="
              mt-1
              text-base
              leading-7
              max-w-xs
            "
          >
            {description}
          </p>

        </div>

      </div>

    </div>
  );
}
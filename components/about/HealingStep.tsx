interface HealingStepProps {
  number: number;
  title: string;
  description: string;
  className?: string;
}

export default function HealingStep({
  number,
  title,
  description,
  className = "",
}: HealingStepProps) {
  return (
    <div className={`flex items-start justify-center gap-3 ${className}`}>
     <span className=" text-4xl font-bold text-primary-hover font-heading">{number}.</span>
      <div className="flex flex-col gap-2 ">
      <h3 className="font-body text-2xl font-semibold leading-snug">
        {" "}
        {title}
      </h3>

      <p className="leading-7 max-w-xs">
        {description}
      </p>
      </div>
    </div>
  );
}
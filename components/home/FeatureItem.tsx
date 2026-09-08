interface Props {
  number: string;
  title: string;
  description: string;
}

export default function FeatureItem({
  number,
  title,
  description,
}: Props) {
  return (
    <div className="flex items-start gap-4">
      <span
        className="
          shrink-0
          font-heading
          text-3xl
          font-bold
          text-primary-hover
        "
      >
        {number}
      </span>

       <div className="flex-1">
         <h3
          className="
            font-body
            text-xl
            lg:text-2xl
            font-semibold
            text-primary-hover
          "
        >
          {title}
        </h3>
        
        <p
           className="
            mt-2
            text-sm
            sm:text-base
            text-muted
          "
        >
          {description}
        </p>
        

      </div>
    </div>
  );
}
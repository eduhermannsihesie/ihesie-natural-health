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
    <div className="flex items-start gap-4 sm:gap-6 lg:gap-8">
      <span
        className="
          shrink-0
          font-heading
          text-3xl
          sm:text-4xl
          lg:text-5xl
          font-bold
          text-primary-hover
          leading-none
        "
      >
        {number}
      </span>

       <div className="flex-1">
         <h3
          className="
            font-body
            text-xl
            sm:text-2xl
            lg:text-3xl
            font-semibold
          "
        >
          {title}
        </h3>
        
        <p
           className="
            mt-2
            text-sm
            sm:text-base
            leading-6
            sm:leading-7
            text-muted
          "
        >
          {description}
        </p>
        

      </div>
    </div>
  );
}
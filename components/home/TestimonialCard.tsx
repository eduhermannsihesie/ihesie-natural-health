interface Props {
  quote: string;
  author: string;
}

export default function TestimonialCard({
  quote,
  author,
}: Props) {
  return (
     <div className="mx-auto max-w-sm lg:max-w-2xl px-6 text-center">

       <p
        className="
          font-body
          text-base
          sm:text-lg
          lg:text-xl
          italic
          leading-7
          sm:leading-9
          text-foreground
        "
      >
        "{quote}"
      </p>

      <p
        className="
          mt-6
          lg:mt-8
          text-sm
          sm:text-lg
          text-primary-200
        "
      >
        — {author}
      </p>

    </div>
  );
}
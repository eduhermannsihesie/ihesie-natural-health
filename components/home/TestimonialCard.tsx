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
          lg:text-lg
          italic
          text-primary-hover
        "
      >
        "{quote}"
      </p>

      <p
        className="
          mt-6
          lg:mt-8
          text-sm
          text-primary-200
        "
      >
        — {author}
      </p>

    </div>
  );
}
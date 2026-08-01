import Image from "next/image";
import Link from "next/link";

interface Props{

    title:string;
    description:string;
    image:string;

}

export default function ArticleCard({

    title,
    description,
    image,

}:Props){

    return(

        <article className="grid gap-6 md:grid-cols-[180px_1fr] items-center">

            <Image
                src={image}
                alt={title}
                width={180}
                height={180}
                className="rounded object-cover"
            />

            <div>

                <h3 className="font-heading text-xl lg:text-2xl font-semibold">
                    {title}
                </h3>

                <p className="mt-3 text-muted">
                    {description}
                </p>

                <Link
                    href="#"
                    className="mt-4 inline-block text-secondary text-sm font-semibold"
                >
                    Read Article →
                </Link>

            </div>

        </article>

    )

}
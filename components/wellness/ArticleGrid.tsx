import Container from "@/components/layout/Container";
import ArticleCard from "./ArticleCard";

interface Props{
 articles:{
   id:number;
   title:string;
   description:string;
   image:string;
  }[];

  hasMore:boolean;
  onLoadMore:()=>void;
}

export default function ArticleGrid({
    articles,
    hasMore,
    onLoadMore,
}: Props){

    return(

        <section className="pb-20">

            <Container>

                {articles.length === 0 ? (
  <div className="py-24 text-center">

    <h3 className="font-heading text-2xl">
      No articles found
    </h3>

    <p className="mt-2 text-muted">
      Try another search term.
    </p>

  </div>
) : (

                <div className="space-y-10">

                    {articles.map(article=>(

                        <ArticleCard
                            key={article.id}
                            {...article}
                        />

                    ))}

                </div>
)}

{hasMore && (
    <div className="mt-16 flex justify-center">
      <button
        onClick={onLoadMore}
        className="
          rounded-md
          border
          border-primary
          px-8
          py-3
          text-sm
          font-medium
          text-primary
          transition
          hover:bg-primary
          hover:text-white
        "
      >
        View More
      </button>
    </div>
)}

            </Container>

        </section>

    )

}
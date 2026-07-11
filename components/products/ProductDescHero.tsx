import Image from "next/image";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import Price from "@/components/common/Price";

interface ProductHeroProps {
  product: {
    name: string;
    title: string;
    image: string;
    description: string;
    price: number;
    weight: string;
    keyBenefits: string[];
  };
}


export default function ProductDescHero({
  product,
}: ProductHeroProps) {
  return (
    <section className="py-6 lg:py-8">
      <Container>
      <div
         className="text-xs text-muted text-right mb-12">

Home /
Products /
<span className="text-foreground">
{product.name}
</span>

</div>

        <div className="max-w-5xl mx-auto grid gap-20 lg:grid-cols-2 items-center">

          {/* Product Image */}

          <div className="relative h-120 flex justify-center items-center rounded-xl bg-surface-earth-light p-8">

            <Image
              src={product.image}
              alt={product.name}
              width={200}
              height={200}
              className="object-contain"
            />

          </div>

          {/* Product Details */}

          <div>

            <h1 className="font-body text-3xl lg:text-4xl font-medium">
              {product.name}
            </h1>
             
            <h4 className="mt-4 text-lg lg:text-xl font-medium">{product.title}</h4>

            <p className="mt-4 text-base leading-8">
              {product.description}
            </p>

            <h3 className="mt-4  text-primary-hover text-xl lg:text-2xl">
Key Benefits
</h3>

<ul className="mt-2 space-y-1">
    {product.keyBenefits.map((benefit)=>(
        <li key={benefit}
        className="text-primary-hover flex gap-3">
            •
            <span>{benefit}</span>
        </li>
    ))}
</ul>

{/* 
<div className="mt-6 flex gap-4 items-center">

<p className="font-medium text-xl text-primary-hover">
Size :
</p>

<span
className="
text-sm
rounded-full
border
border-primary-hover
bg-primary-50
text-primary-hover
px-5
py-1
"
>
{product.weight}
</span>

</div> */}



            <div className="mt-4 flex items-center justify-between gap-8">

              <div>

                <p className="text-sm text-muted">
                  Price
                </p>

                <p className="text-2xl font-heading font-semibold text-primary-hover">
                  <Price amount={product.price}/>
                </p>

              </div>

              <div>

                <p className="text-sm text-muted">
                  Weight
                </p>

                <p className="text-xl font-heading font-semibold text-primary-hover">
                  {product.weight}
                </p>

              </div>

            </div>

            <div className=" mt-6 flex gap-6 items-center">

            
<div className="flex items-center border-2 rounded-full  w-fit">
   <button className="px-4 py-1.5">-</button> 
   <span className="px-2">1</span>
   <button className="px-4 py-1.5">+</button>
</div>


     <Button
        size="lg"
        className="w-full text-xl"
        >Purchase</Button>
  </div>

          </div>


        </div>

      </Container>
    </section>
  );
}
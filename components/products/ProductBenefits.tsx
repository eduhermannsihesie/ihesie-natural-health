import Container from "@/components/layout/Container";

interface ProductBenefitsProps {
  product: {
    keyBenefits: string[];
  };
}

export default function ProductBenefits({
  product,
}: ProductBenefitsProps) {
  return (
    <section className="py-16 bg-surface-earth-light">
      <Container>

        <div className="max-w-3xl">

          <h2 className="font-heading text-3xl lg:text-4xl">
            Key Benefits
          </h2>

          <ul className="mt-8 space-y-5">

            {product.keyBenefits.map((benefit) => (

              <li
                key={benefit}
                className="flex gap-3"
              >
                <span className="text-primary">✔</span>

                <span>{benefit}</span>

              </li>

            ))}

          </ul>

        </div>

      </Container>
    </section>
  );
}
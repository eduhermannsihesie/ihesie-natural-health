import Container from "@/components/layout/Container";

export default function AboutHero() {
  return (
   <section className="py-16 sm:py-20 lg:py-28">
      <Container>

        <div className="mx-auto max-w-5xl text-center">

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xltext-4xl lg:text-5xl leading-tight font-medium">
            About Us
          </h2>
    

          <p className="mt-10 text-base lg:text-lg leading-8 text-foreground">
           At Ihesie Natural Health Services, we believe that nature offers remarkable resources that can support human health and well-being. Our passion is to help individuals and families embrace a holistic approach to wellness through botanical remedies, natural therapies, and healthy lifestyle practices.
          </p>

          <p className="mt-6 text-base lg:text-lg leading-8 text-foreground">
            Our work is founded on the belief that true wellness comes from restoring balance within the body rather than simply addressing isolated concerns. By combining traditional natural wisdom with ongoing research and professional understanding, we strive to provide natural wellness solutions that support long-term health and vitality.
          </p>

        </div>

      </Container>
    </section>
  );
}
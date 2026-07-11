import Container from "@/components/layout/Container";

interface ProductToolbarProps {
  total: number;
  selected: string;
  onChange: (value: string) => void;
}

export default function ProductToolbar({
  total,
  selected,
  onChange,
} : ProductToolbarProps ) {
  return (
    <section className="py-8">
      <Container>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-muted">
            Showing {total} product{total !== 1 && "s"}
          </p>

          <select
            value={selected}
            onChange={(e) => onChange(e.target.value)}
            className="
              rounded-md
              border
              border-border
              bg-white
              px-4
              py-2
              text-sm
              focus:outline-none
              focus:ring-2
              focus:ring-primary
            "
          >
           <option value="All">All Products</option>
            <option value="Digestive Health">
              Digestive Health
            </option>

            <option value="Women's Health">
              Women's Health
            </option>

            <option value="Liver Support">
              Liver Support
            </option>

            <option value="Detox">
              Detox
            </option>
          </select>

        </div>

      </Container>
    </section>
  );
}
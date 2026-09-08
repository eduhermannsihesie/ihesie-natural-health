"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import Container from "@/components/layout/Container";

interface ProductToolbarProps {
  total: number;
  selected: string;
  onChange: (value: string) => void;
}

const categories = [
  "All",
  "Digestive Health",
  "Women's Health",
  "Liver Support",
  "Detox",
];

export default function ProductToolbar({
  total,
  selected,
  onChange,
}: ProductToolbarProps) {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    selected === "All" ? "All Products" : selected;

  function handleSelect(value: string) {
    onChange(value);
    setOpen(false);
  }

  return (
    <section className="pt-16">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-sm text-muted">
            Showing {total} product{total !== 1 && "s"}
          </p>

          <div className="relative w-52">
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              className="
                flex
                w-full
                items-center
                justify-between
                rounded-md
                border
                border-border
                bg-white
                px-4
                py-2
                text-sm
                transition
                focus:outline-none
                focus:border-primary
                focus:ring-2
                focus:ring-primary/20
              "
            >
              <span>{selectedLabel}</span>

              <ChevronDown
                size={16}
                className={`
                  text-muted
                  transition-transform
                  duration-200
                  ${open ? "rotate-180" : ""}
                `}
              />
            </button>

            {open && (
              <div
                className="
                  absolute
                  right-0
                  z-30
                  mt-2
                  w-full
                  overflow-hidden
                  rounded-md
                  border
                  border-border
                  bg-white
                  shadow-lg
                "
              >
                {categories.map((category) => {
                  const isSelected =
                    selected === category;

                  const label =
                    category === "All"
                      ? "All Products"
                      : category;

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() =>
                        handleSelect(category)
                      }
                      className={`
                        flex
                        w-full
                        items-center
                        justify-between
                        px-4
                        py-2.5
                        text-left
                        text-sm
                        transition-colors

                        ${
                          isSelected
                            ? "bg-primary text-white"
                            : "bg-white text-heading hover:bg-primary/10 hover:text-primary"
                        }
                      `}
                    >
                      <span>{label}</span>

                      {isSelected && (
                        <Check size={15} />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

          </div>
        </div>
      </Container>
    </section>
  );
}
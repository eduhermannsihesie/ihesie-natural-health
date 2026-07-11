"use client";
import Button from "../../ui/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  contactSchema,
  ContactFormData,
} from "@/lib/validations/contactSchema";
import { on } from "process";

export default function ContactForm() {
  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset,
    } = useForm<ContactFormData>({
      resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {

        const response = await fetch("/api/contact",{

            method:"POST",

            headers:{
                "Content-Type":"application/json",
            },

            body:JSON.stringify(data),

        });

        if(response.ok){

            reset();

            alert("Message sent successfully!");

        }

    };
    return (
         <form onSubmit={handleSubmit(onSubmit)} className="mx-auto mt-25 max-w-6xl">

          <div className="mb-9 grid lg:gap-50 lg:grid-cols-2">

            {/* Left Column */}

            <div className="space-y-8">

              <div>
                <label className="mb-2 block text-base lg:text-lg text-gray-400">
                  Name*:
                </label>

                <input
                  type="text"
                  {...register("name")}
                  className="
                    w-full
                    border-0
                    border-b
                    border-border
                    bg-transparent
                    transition-colors
                    duration-300
                    py-3
                    outline-none
                    focus:border-primary-200
                  "
                  
                />
              </div>

              <div>
                <label className="mb-2 block text-base lg:text-lg text-gray-400">
                  Phone Number*:
                </label>

                <input
                  type="tel"
                  {...register("phone")}
                  className="
                    w-full
                    border-0
                    border-b
                    border-border
                    bg-transparent
                    transition-colors
                    duration-300
                    py-3
                    outline-none
                    focus:border-primary-200
                  "
                />
              </div>

              
            </div>

            {/* Right Column */}

            <div className="space-y-8 mt-9 lg:mt-0">

              <div>
                <label className="mb-2 block text-base lg:text-lg text-gray-400">
                  Email*:
                </label>

                <input
                  type="email"
                  {...register("email")}
                  className="
                    w-full
                    border-0
                    border-b
                    border-border
                    bg-transparent
                    transition-colors
                    duration-300
                    py-3
                    outline-none
                    focus:border-primary-200
                  "
                />
              </div>

              <div>
                <label className="mb-2 block text-base lg:text-lg text-gray-400">
                  Location*:
                </label>

                <input
                  type="text"
                  {...register("location")}
                  className="
                    w-full
                    border-0
                    border-b
                    border-border
                    bg-transparent
                    transition-colors
                    duration-300
                    py-3
                    outline-none
                    focus:border-primary-200
                  "
                />
              </div>

            </div>

          </div>

          <div>
                <label className="block text-base lg:text-lg text-gray-400">
                  Message*:
                </label>

                <textarea
                  rows={6}
                  {...register("message")}
                  className="
                    w-full
                    resize-none
                    border-0
                    border-b
                    border-border
                    bg-transparent
                    transition-colors
                    duration-300
                    -py-2
                    outline-none
                    focus:border-primary-200
                  "
                />
              </div>


          {/* Button */}

          <div className="mt-12 flex justify-center">

            <button
              disabled={isSubmitting}
              className="px-15 py-1 rounded-sm border-2 border-primary text-primary bg-surface-green font-semibold text-lg hover:bg-primary hover:text-white"
            >
              {isSubmitting ? "Sending..." : "Submit"}
            </button>

          </div>

        </form>

    )
}
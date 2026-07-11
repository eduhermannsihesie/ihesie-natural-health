import Image from "next/image";
import {cn} from "@/lib/utils";

interface Props {
  title: string;
  description: string;
  icon?: string;
  className?: string;
  layout?: "horizontal" | "vertical";

}

export default function ServiceCard({
  title,
  description,
  icon,
  className,
  layout = "vertical",
}: Props) {
  return (
      <div 
        className={cn(
          "bg-white px-3 flex flex-col items-center justify-center p-6 h-full", 
          className
        )}>
        {layout === "horizontal" ? (
          <div className="flex items-center justify-content gap-2">
            
            {icon && (
              <Image
                src={icon}
                alt={title}
                width={80}
                height={80}
                className="shrink-0"
        />
        )}

      <div className="text-left">
        <h4 className=" font-heading text-lg text-left font-semibold">
          {title}
        </h4>

        <p className="text-base text-muted text-left leading-7">
          {description}
        </p>

      </div>
    </div>
  ) : (
    <>
      {icon && (
        <Image
          src={icon}
          alt={title}
          width={80}
          height={80}
        />
      )}
      <div className="text-left">  
      <h4 className=" font-heading text-lg text-left  font-semibold mb-2">
        {title}
      </h4>

      <p className="text-base text-muted text-left leading-7">
        {description}
      </p>
      </div>
    
    </>
  )}
  </div>
  );
}

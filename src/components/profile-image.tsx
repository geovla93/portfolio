import Image from "next/image";

import { cn } from "@/lib/utils";

export function ProfileImage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("h-48 w-48 md:h-64 md:w-64", className)} {...props}>
      <div className="bg-accent relative h-full w-full overflow-hidden rounded-2xl">
        <Image src="/placeholder.svg" alt="" className="object-cover" fill />
      </div>
    </div>
  );
}

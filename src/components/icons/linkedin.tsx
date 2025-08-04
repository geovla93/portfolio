import { memo } from "react";

import { cn } from "@/lib/utils";

const LinkedInIcon = memo(
  ({ className, ...props }: React.ComponentProps<"svg">) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      className={cn("lucide lucide-linkedin-icon lucide-linkedin", className)}
      {...props}
    >
      <title>LinkedIn</title>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx={4} cy={4} r={2} />
    </svg>
  ),
);

LinkedInIcon.displayName = "LinkedInIcon";

export { LinkedInIcon };

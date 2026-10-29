import {
  experiences,
  formatMonth,
  type Experience as ExperienceType,
} from "@/data/experiences";

function Role({
  title,
  company,
  start,
  end,
  summary,
  scope,
  technologies,
}: ExperienceType) {
  return (
    <li className="grid gap-4 py-8 md:grid-cols-12 md:gap-8">
      <p className="text-muted-foreground text-sm tabular-nums md:col-span-3">
        <time dateTime={start}>{formatMonth(start)}</time>
        <span aria-hidden="true"> – </span>
        <span className="sr-only"> to </span>
        {end ? <time dateTime={end}>{formatMonth(end)}</time> : "Present"}
      </p>

      <div className="md:col-span-9">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-muted-foreground">{company}</p>
        <p className="mt-3 max-w-lg leading-relaxed">{summary}</p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {scope.map((group) => (
            <div key={group.label}>
              <h4 className="text-sm font-medium">{group.label}</h4>
              <ul className="text-muted-foreground mt-2 list-disc space-y-1.5 pl-5 text-sm leading-relaxed">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground mt-6 font-mono text-xs">
          {technologies.join(" · ")}
        </p>
      </div>
    </li>
  );
}

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="border-t py-16 sm:py-24"
    >
      <h2
        id="experience-title"
        className="text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
      >
        From smart contract audits to CTO
      </h2>
      <p className="text-muted-foreground mt-3 max-w-lg leading-relaxed">
        Since {formatMonth(experiences[experiences.length - 1].start)} I&apos;ve
        been at Cyberscope, a blockchain security company. The scope has grown
        from writing and auditing code to owning the product.
      </p>

      <ol className="mt-10 divide-y border-y">
        {experiences.map((experience) => (
          <Role key={experience.start} {...experience} />
        ))}
      </ol>
    </section>
  );
}

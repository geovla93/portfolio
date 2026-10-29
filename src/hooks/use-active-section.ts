import { useEffect, useState } from "react";

/**
 * Returns the id of the section being read: the last of `ids` whose top has
 * scrolled into the upper third of the viewport, or the last section once the
 * page bottoms out. Null above the first section.
 */
export function useActiveSection(ids: readonly string[]) {
  const [activeId, setActiveId] = useState<string | null>(null);
  // Callers map their links on every render, so compare by content.
  const key = ids.join(" ");

  useEffect(() => {
    const sections = key
      .split(" ")
      .map((id) => document.getElementById(id))
      .filter((section) => section !== null);
    let frame = 0;

    function update() {
      frame = 0;
      const line = window.innerHeight / 3;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;
      let current: string | null = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) current = section.id;
      }
      setActiveId(atBottom ? (sections.at(-1)?.id ?? current) : current);
    }

    function scheduleUpdate() {
      frame ||= requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [key]);

  return activeId;
}

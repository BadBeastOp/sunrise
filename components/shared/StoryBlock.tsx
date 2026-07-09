import Link from "next/link";
import { cn } from "@/lib/utils";

interface StoryBlockProps {
  eyebrow?: string;
  title: string;
  body: string[];
  image?: string;
  imagePosition?: "left" | "right";
  stat1?: { value: string; label: string };
  stat2?: { value: string; label: string };
  cta?: { label: string; href: string };
}

export default function StoryBlock({
  eyebrow,
  title,
  body,
  image,
  imagePosition = "right",
  stat1,
  stat2,
  cta,
}: StoryBlockProps) {
  const isImageLeft = imagePosition === "left";

  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      {isImageLeft && image ? (
        <div className="overflow-hidden rounded-[24px]">
          <img src={image} alt={title} className="h-[360px] w-full object-cover" />
        </div>
      ) : null}

      <div>
        {eyebrow && (
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#C7A76C]">
            {eyebrow}
          </p>
        )}
        <h3 className="mb-5 font-cormorant text-3xl font-light text-[#111111] md:text-4xl">
          {title}
        </h3>
        <div className="space-y-4 text-sm leading-relaxed text-[#6B6B6B]">
          {body.map((entry) => (
            <p key={entry}>{entry}</p>
          ))}
        </div>
        {(stat1 || stat2) && (
          <div className="mt-8 flex flex-wrap gap-8">
            {stat1 ? (
              <div>
                <p className="font-cormorant text-3xl font-light text-[#111111]">{stat1.value}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C7A76C]">{stat1.label}</p>
              </div>
            ) : null}
            {stat2 ? (
              <div>
                <p className="font-cormorant text-3xl font-light text-[#111111]">{stat2.value}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-[#C7A76C]">{stat2.label}</p>
              </div>
            ) : null}
          </div>
        )}
        {cta ? (
          <Link href={cta.href} className="mt-8 inline-flex items-center text-sm font-medium uppercase tracking-[0.2em] text-[#111111] transition-colors hover:text-[#C7A76C]">
            {cta.label}
          </Link>
        ) : null}
      </div>

      {!isImageLeft && image ? (
        <div className="overflow-hidden rounded-[24px]">
          <img src={image} alt={title} className="h-[360px] w-full object-cover" />
        </div>
      ) : null}
    </div>
  );
}

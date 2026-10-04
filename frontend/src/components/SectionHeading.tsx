import React from "react";
import { motion } from "framer-motion";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  tag,
  title,
  subtitle,
  className = "",
  align = "left",
}) => {
  return (
    <div className={`mb-12 ${align === "center" ? "text-center" : "text-left"} ${className}`}>
      {tag && (
        <span className="inline-block font-archivo text-xs font-bold uppercase tracking-widest text-primary mb-3">
          [ {tag} ]
        </span>
      )}
      <div className="relative inline-block">
        <h2 className="h2-display text-foreground">{title}</h2>
        {/* Animated Lime Underline on Viewport Entry */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="h-[3px] bg-primary origin-left mt-3 w-full"
        />
      </div>
      {subtitle && (
        <p className="mt-4 text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

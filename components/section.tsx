"use client";
import React, { useMemo } from "react";
import { Card } from "./ui";
import { cn } from "~/Utilities";

const GRID_CLASSES = {
  lg: {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  },
  md: {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
    5: "md:grid-cols-5",
    6: "md:grid-cols-6",
  },
  sm: {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
    6: "sm:grid-cols-6",
  },
} as const;

interface SectionProps {
  sectionTitle: string;
  screenShots: ScreenShot[];
  rowLg?: 1 | 2 | 3 | 4 | 5 | 6;
  rowMd?: 1 | 2 | 3 | 4 | 5 | 6;
  rowSm?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  largeCard?: boolean;
  userIsPro?: boolean;
}

const Section = React.memo<SectionProps>(
  ({
    sectionTitle,
    screenShots,
    rowLg = 4,
    rowMd = 3,
    rowSm = 2,
    className,
    largeCard = false,
    userIsPro = false,
  }) => {
    const gridClasses = useMemo(() => {
      const classes = [
        "w-full gap-2 grid grid-cols-1 my-2 lg:px-0 px-4",
        GRID_CLASSES.lg[rowLg],
        GRID_CLASSES.md[rowMd],
        GRID_CLASSES.sm[rowSm],
        className,
      ].filter(Boolean);

      return cn(...classes);
    }, [rowLg, rowMd, rowSm, className]);

    const cards = useMemo(() => {
      return screenShots.map((screenShot, index) => (
        <Card
          index={index}
          title={screenShot.title}
          videoUrl={screenShot.videoUrl}
          link={screenShot.link}
          key={`${screenShot.title}-${index}`}
          largeCard={largeCard}
          isPro={screenShot.isPro}
          userIsPro={userIsPro}
        />
      ));
    }, [screenShots, largeCard, userIsPro]);

    return (
      <section
        className="w-full py-6"
        aria-labelledby={`section-${sectionTitle
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
      >
        <header className="w-full flex items-center justify-between mt-4 lg:px-0 px-4">
          <h2
            id={`section-${sectionTitle.toLowerCase().replace(/\s+/g, "-")}`}
            className="sm:text-xl text-xl text-gray-800 font-bold tracking-tight"
          >
            {sectionTitle}
          </h2>
        </header>

        <div
          className={gridClasses}
          role="grid"
          aria-label={`${sectionTitle} content grid`}
        >
          {cards}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;

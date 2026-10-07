"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const batPath =
  "M70 32c-8-17-26-27-47-26 9 8 11 19 8 29C20 25 10 22 0 23c14 8 19 19 21 32 11-10 23-13 37-8 4 8 8 14 12 17 4-3 8-9 12-17 14-5 26-2 37 8 2-13 7-24 21-32-10-1-20 2-31 12-3-10-1-21 8-29-21-1-39 9-47 26Z";

export default function ScrollBats() {
  const { scrollYProgress } = useScroll();
  const reduceMotion = useReducedMotion();
  const travel = reduceMotion ? 0 : 1;
  const firstBatY = useTransform(scrollYProgress, [0, 1], [0, 220 * travel]);
  const secondBatY = useTransform(scrollYProgress, [0, 1], [0, -130 * travel]);
  const thirdBatY = useTransform(scrollYProgress, [0, 1], [0, 90 * travel]);

  return (
    <>
      {[firstBatY, secondBatY, thirdBatY].map((y, index) => (
        <motion.div
          aria-hidden="true"
          className={`bat-flock bat-flock--${["one", "two", "three"][index]}`}
          key={index}
          style={{ y }}
        >
          <svg viewBox="0 0 140 72" focusable="false">
            <path d={batPath} />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

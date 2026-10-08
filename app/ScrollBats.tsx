"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

const batPath =
  "M70 32c-8-17-26-27-47-26 9 8 11 19 8 29C20 25 10 22 0 23c14 8 19 19 21 32 11-10 23-13 37-8 4 8 8 14 12 17 4-3 8-9 12-17 14-5 26-2 37 8 2-13 7-24 21-32-10-1-20 2-31 12-3-10-1-21 8-29-21-1-39 9-47 26Z";

const crossingBats = [
  { top: 13, size: 48, direction: 1, start: 0.015, delay: 0 },
  { top: 28, size: 31, direction: -1, start: 0.075, delay: -0.12 },
  { top: 44, size: 62, direction: 1, start: 0.135, delay: -0.2 },
  { top: 68, size: 38, direction: -1, start: 0.195, delay: -0.04 },
  { top: 21, size: 35, direction: 1, start: 0.255, delay: -0.27 },
  { top: 57, size: 74, direction: -1, start: 0.315, delay: -0.14 },
  { top: 81, size: 43, direction: 1, start: 0.375, delay: -0.3 },
  { top: 36, size: 52, direction: -1, start: 0.435, delay: -0.08 },
  { top: 17, size: 29, direction: 1, start: 0.495, delay: -0.23 },
  { top: 73, size: 58, direction: -1, start: 0.555, delay: -0.18 },
  { top: 48, size: 39, direction: 1, start: 0.615, delay: -0.32 },
  { top: 31, size: 68, direction: -1, start: 0.675, delay: -0.1 },
  { top: 88, size: 34, direction: 1, start: 0.735, delay: -0.24 },
  { top: 62, size: 46, direction: -1, start: 0.795, delay: -0.16 },
] as const;

function CrossingBat({
  progress,
  top,
  size,
  direction,
  start,
  delay,
  reduceMotion,
}: {
  progress: MotionValue<number>;
  top: number;
  size: number;
  direction: 1 | -1;
  start: number;
  delay: number;
  reduceMotion: boolean;
}) {
  const end = Math.min(start + 0.2, 1);
  const x = useTransform(
    progress,
    [start, end],
    direction === 1 ? ["-12vw", "112vw"] : ["112vw", "-12vw"],
  );
  const y = useTransform(progress, [start, end], [direction * 28, direction * -28]);
  const opacity = useTransform(progress, [start, start + 0.025, end - 0.02, end], [0, 0.2, 0.2, 0]);

  return (
    <motion.div
      aria-hidden="true"
      className="bat-crossing"
      style={{ x: reduceMotion ? 0 : x, y: reduceMotion ? 0 : y, opacity: reduceMotion ? 0 : opacity, top: `${top}%`, width: `${size}px`, rotate: direction === 1 ? -8 : 8 }}
      animate={reduceMotion ? undefined : { scaleY: [0.84, 1, 0.84] }}
      transition={{ duration: 0.34, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <svg viewBox="0 0 140 72" focusable="false">
        <path d={batPath} />
      </svg>
    </motion.div>
  );
}

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
      {crossingBats.map((bat, index) => (
        <CrossingBat key={index} progress={scrollYProgress} {...bat} reduceMotion={Boolean(reduceMotion)} />
      ))}
    </>
  );
}

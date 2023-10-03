"use client";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import React from "react";
import { observable } from "@legendapp/state";
import { observer } from "@legendapp/state/react";

const cardVariants: Variants = {
  offscreen: {
    y: 150,
    rotate: -20,
  },
  onscreen: {
    y: 0,
    rotate: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const cardFlipVariantsFront: Variants = {
  hidden: {
    rotateY: 180,
  },
  visible: {
    rotateY: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const cardFlipVariantsBack: Variants = {
  visible: {
    rotateY: 180,
  },
  hidden: {
    rotateY: 0,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const cardsState$ = observable({
  revealed: false,
});

export const CardsFlip = observer(function CardsFlip() {
  const cardsRevealed = cardsState$.revealed.get();
  let clickHandler = () => cardsState$.revealed.set(!cardsRevealed);

  return (
    <div className="flex flex-col gap-4 mt-6">
      <h1 className="text-6xl font-bold text-center">Flipping cards</h1>
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true }}
        className="flex flex-wrap gap-4 mt-2 justify-center"
      >
        <Card />
        <Card />
        <Card />
      </motion.div>

      <div className="flex justify-center mt-[200px] ">
        <motion.button
          onClick={clickHandler}
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300
            w-[300px] h-[70px]
            font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          Flip
        </motion.button>
      </div>
    </div>
  );
});

const Card = observer(function Card() {
  const revealed = cardsState$.revealed.get();

  return (
    <motion.div variants={cardVariants}>
      <motion.div
        className="w-[270px] h-[400px] relative"
        style={{ perspective: 1000 }}
        animate={revealed ? "visible" : "hidden"}
        initial={false}
      >
        <motion.div
          variants={cardFlipVariantsBack}
          className="absolute w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image fill className="rounded-t-lg" src={`/assets/cards/${"back.png"}`} alt="ace" />
        </motion.div>

        <motion.div
          variants={cardFlipVariantsFront}
          className="absolute w-full h-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image fill className="rounded-t-lg" src={`/assets/cards/ace1.png`} alt="ace" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

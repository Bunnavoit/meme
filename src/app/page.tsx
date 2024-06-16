"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [step, setStep] = useState(0);
  const [countdown, setCountdown] = useState(50);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleChoice = () => {
    setStep(1);
    setCountdown(50);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  useEffect(() => {
    let timer: any;
    if (step === 1 && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    } else if (step === 1 && countdown === 0) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setStep(2);
    }

    return () => clearInterval(timer);
  }, [step, countdown]);

  const reset = () => {
    setStep(0);
    setCountdown(30);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-center">
      {step === 0 ? (
        <>
          <h1 className="text-4xl shining-text">ENGLISH OR SPANISH?</h1>
          <div className="flex flex-row items-center justify-center space-x-4 py-10">
            <button
              className="text-3xl p-2 border border-gray-400 rounded-lg hover:bg-white hover:text-black"
              onClick={handleChoice}
            >
              English
            </button>
            <button
              className="text-3xl p-2 border border-gray-400 rounded-lg hover:bg-white hover:text-black"
              onClick={handleChoice}
            >
              Spanish
            </button>
          </div>
        </>
      ) : step === 1 ? (
        <>
          <h1 className="text-4xl shining-text">Whoever moves first is gay!</h1>
          <p className="text-2xl text-white mt-5">
            Time left: {countdown} seconds
          </p>
          <Image src="/sus.gif" alt="Funny Image" width={500} height={500} />
        </>
      ) : (
        <>
          <h1 className="text-4xl shining-text">Whoever moves first is gay!</h1>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            className="mt-5 mb-5"
          >
            <Image
              src="/cons.jpg"
              alt="Congratulation Image"
              width={500}
              height={500}
            />
          </motion.div>

          <button
            className="mt-10 text-3xl p-2 border border-gray-400 rounded-lg hover:bg-white hover:text-black"
            onClick={reset}
          >
            Ask Again
          </button>
        </>
      )}
      <audio ref={audioRef} src="/song.mp3" />
    </main>
  );
}

import { useEffect, useState } from 'react';
import Wordbox from '../Wordbox';
import wordList from '../../word-list';
import './style.css';

// TODO: temporary disable function - remove next line when you start using it
/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const generateWord = (size: number) => {
  const sizeIndex = size === undefined
    ? Math.floor(Math.random() * wordList.length)
    : size - 3;
  
  if (sizeIndex < 0 || sizeIndex >= wordList.length) {
    return null;
  }
  
  const words = wordList[sizeIndex];
  const wordIndex = Math.floor(Math.random() * words.length);
  return words[wordIndex];
};

const Stage = () => {
  const [words, setWords] = useState<string[]>(['jahoda', 'ostružina', 'borůvka'])
  const [mistakes, setMistakes] = useState<number>(0)
  const [isShaking, setIsShaking] = useState<boolean>(false)

  const handleFinish = () => {
    const newWord: any = generateWord(6)
    setWords(prev => [...prev.slice(1), newWord])
  }

  const handleMistake = () => {
    setMistakes(mistakes + 1)
    setIsShaking(true)
  }

  useEffect(() => {
    const timer = setTimeout(() => setIsShaking(false), 300)

    return () => {
      clearTimeout(timer)
    }
  }, [isShaking])

  return (
    <div className={`stage ${isShaking ? "shake" : ""}`}>
      <div className="stage__mistakes">Chyb: {mistakes}</div>
      <div className="stage__words">
        {words.map((word, index) => (
          <Wordbox
            word={word}
            key={word}
            onFinish={handleFinish}
            active={index === 0}
            onMistake={handleMistake}
          />
        ))}
      </div>
    </div>
  );
};

export default Stage;
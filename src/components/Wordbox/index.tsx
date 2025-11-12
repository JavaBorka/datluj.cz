import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti'
import './style.css';

interface IWordboxProp {
  word: string;
  onFinish: () => void;
  active: boolean;
  onMistake: () => void
}

const Wordbox = ({ word, onFinish, active, onMistake }: IWordboxProp) => {
  const [lettersLeft, setLettersLeft] = useState<string>(word)
  const [mistake, setMistake] = useState<boolean>(false)

  useEffect(() => {

    const handleKeyUp = (e: KeyboardEvent) => {
      const firstLetter = e.key.charAt(0).toLowerCase()
      const expected = lettersLeft.charAt(0).toLowerCase()

      if (firstLetter !== expected) {
        setMistake(true)
        onMistake()
        return
      }

      if (lettersLeft.length === 1) {
        onFinish()
        confetti({
          particleCount: 140,
          spread: 80,
          startVelocity: 45,
          gravity: 0.9,
          ticks: 120,
          scalar: 0.9,
          origin: { y: 0.6 },
        })
        return
      }

      setMistake(false)
      setLettersLeft(prev => prev.slice(1))
    };

    if (active) {
    
      document.addEventListener('keyup', handleKeyUp)

      return () => {
        document.removeEventListener('keyup', handleKeyUp)
      };
    }
  }, [lettersLeft, active, mistake, onMistake])

  return (
    <div className={mistake ? "wordbox--mistake" : "wordbox"}>{lettersLeft}</div>
  );
};

export default Wordbox
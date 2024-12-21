/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

const Typewriter = () => {
  const words = ["MERN Developer", "UI/UX Designer"];
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(300);

  useEffect(() => {
    if (index === words.length) return;

    if (subIndex === words[index].length + 1 && !isDeleting) {
      setIsDeleting(true);
      setSpeed(100);
    } else if (subIndex === 0 && isDeleting) {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      setSpeed(150);
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, isDeleting, speed, words]);

  useEffect(() => {
    if (isDeleting) setSpeed(100);
  }, [isDeleting]);

  return (
    <div className="text-3xl font-semibold text-teal-500">
      {`${words[index].substring(0, subIndex)}|`}
    </div>
  );
};

export default Typewriter;

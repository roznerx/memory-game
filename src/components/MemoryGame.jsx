import { useEffect, useState } from "react";
import "../App.css";
import "./MemoryGame.css";
import _ from "lodash";
import GameBoard from "./GameBoard";
import WinModal from "./WinModal";

const MemoryGame = ({ images }) => {
  const [imageArr, setImageArr] = useState([]);
  const [selectedImgs, setSelectedImgs] = useState([]);
  const [matched, setMatched] = useState([]);
  const [blockBoard, setBlockBoard] = useState(false);
  const [showModal, setShowModal] = useState(false);

  function click(image, index) {
    if (
      blockBoard || 
      selectedImgs.find(i => i.index === index) || 
      matched.includes(image)
    ) return;

    const selection = [...selectedImgs, { image, index }];
    setSelectedImgs(selection);

    if (selection.length === 2) {
      setBlockBoard(true);

      if (selection[0].image === selection[1].image) {
        setMatched(prev => [...prev, selection[0].image]);
        setTimeout(() => {
          setBlockBoard(false);
          setSelectedImgs([]);
        }, 500);
      } else {
        setTimeout(() => {
          setBlockBoard(false);
          setSelectedImgs([]);
        }, 500);
      }
    };
  };

  function reset() {
    setShowModal(false);
    setImageArr(_.shuffle([...images, ...images]));
    setMatched([]);
    setSelectedImgs([]);
  };

  useEffect(() => {
    setImageArr(_.shuffle([...images, ...images]));
  }, [images])

  useEffect(() => {
  if (matched.length === images.length) {
    setTimeout(() => {
      setShowModal(true);
    }, 300);
  }
}, [matched, images]);

  return (
    <>
      {
        showModal &&
        <WinModal reset={reset} />
      }
      <div className="main-wrapper">
        <header className="app-header">
          <h1>Memory Game</h1>
        </header>
        <GameBoard 
          imageArr={imageArr}
          selectedImgs={selectedImgs}
          matched={matched}
          blockBoard={blockBoard}
          click={click}
        />
        <button
          className="btn" 
          onClick={() => reset()}
        >
          Reset
        </button>
      </div>
    </>
  );
};

export default MemoryGame;

import { useEffect, useState } from "react";
import "./MemoryGame.css";
import _ from "lodash";

const MemoryGame = ({ images }) => {
  const [imageArr, setImageArr] = useState([]);
  const [selectedImgs, setSelectedImgs] = useState([]);
  const [matched, setMatched] = useState([]);
  const [blockBoard, setBloackBoard] = useState(false);

  function click(image, index) {
    if (
      blockBoard || 
      selectedImgs.find(i => i.index === index) || 
      matched.includes(image)
    ) return;

    const selection = [...selectedImgs, { image, index }];
    setSelectedImgs(selection);

    if (selection.length === 2) {
      setBloackBoard(true);

      if (selection[0].image === selection[1].image) {
        setMatched(prev => [...prev, selection[0].image]);
        setTimeout(() => {
          setBloackBoard(false);
          setSelectedImgs([]);
        }, 500);
      } else {
        setTimeout(() => {
          setBloackBoard(false);
          setSelectedImgs([]);
        }, 500);
      }
    };
  };

  useEffect(() => {
    setImageArr(_.shuffle([...images, ...images]));
  }, [images])

  useEffect(() => {
  if (matched.length === images.length) {
    setTimeout(() => {
      alert("YOU WIN!");
      setMatched([]);
      setSelectedImgs([]);
      setImageArr(_.shuffle([...images, ...images]));
    }, 300);
  }
}, [matched, images]);

  return (
    <div className="main-wrapper">
      <header className="app-header">
        <h1>Memory Game</h1>
      </header>
      <div className="game-wrapper">
        <div className="game-board">
          {
            selectedImgs && imageArr.map((image, index) => (
              <img
                key={index}
                src={
                  selectedImgs.find(i => i.index === index) || 
                  matched.includes(image)
                    ? image
                    : ""
                }
                style={{ 
                  width: "250px", 
                  height: "250px", 
                  padding: "10px",
                  backgroundColor: selectedImgs.find((i) => index === i.index) || 
                  matched.includes(image) ? "white" : "gray",
                }}
                onClick={
                  selectedImgs.find(i => i.index === index) || matched.includes(image) || blockBoard
                    ? undefined
                    : () => click(image, index)
                }
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;

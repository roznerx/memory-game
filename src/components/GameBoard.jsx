import "./GameBoard.css";

export default function GameBoard({ imageArr, selectedImgs, matched, blockBoard, click }) {
  return (
    <div className="game-wrapper">
        <div className="game-board">
          {
            imageArr && selectedImgs && imageArr.map((image, index) => {
              const isSelected = selectedImgs.find(i => i.index === index);
              const isMatched = matched.includes(image);
              const isRevealed = isSelected || isMatched;
              
              return (
                <img
                  key={index}
                  src={isRevealed ? image : ""}
                  style={{ 
                    width: "250px", 
                    height: "250px", 
                    padding: "10px",
                    cursor: "pointer",
                    backgroundColor: isRevealed ? "white" : "gray",
                  }}
                  onClick={
                    isRevealed || blockBoard ? undefined: () => click(image, index)
                  }
                />
            )})
          }
        </div>
      </div>
  );
};

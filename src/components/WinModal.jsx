import "../App.css";
import "./WinModal.css";

export default function WinModal({ reset }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>You Win! 🎉</h2>
        <button 
          className="btn"
          onClick={() => reset()}
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

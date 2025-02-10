/* eslint-disable react/prop-types */
import "./styles/BlurOverlay.css";
export function BlurOverlay({ onClick }) {
  return (
    <div onClick={onClick} className="blur-overlay">
      <div className="overlay-modal">
        <h3>Click here to focus</h3>
      </div>
    </div>
  );
}

import Params from "../images/Params.png";
import EditCard from "./EditCard";

export default function ParameterButton({ buttonPopup, setButtonPopup }) {
  function handleClick() {
    console.log("Clicked");
    setButtonPopup(true);
  }

  return (
    <div className="parameter-button">
      <img src={Params} alt="Parameters" onClick={handleClick} />
      <EditCard buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
    </div>
  );
}

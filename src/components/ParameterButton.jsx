import Params from "../images/Params.png";
import EditCard from "./EditCard";
import PropTypes from "prop-types";

export default function ParameterButton({ buttonPopup, setButtonPopup }) {
  function handleClick() {
    setButtonPopup(true);
  }

  return (
    <div className="parameter-button">
      <img src={Params} alt="Parameters" onClick={handleClick} />
      <EditCard buttonPopup={buttonPopup} setButtonPopup={setButtonPopup} />
    </div>
  );
}
ParameterButton.propTypes = {
  buttonPopup: PropTypes.bool.isRequired,
  setButtonPopup: PropTypes.func.isRequired,
};

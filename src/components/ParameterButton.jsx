/* BTIB */
import Params from "../images/Params.png";
import EditCard from "./EditCard/EditCard";
/* Libs & plugins */
import PropTypes from "prop-types";

function ParameterButton({ buttonPopup, setButtonPopup }) {
  ////////////////////////////////////////////////////////////////
  // Event handlers
  ////////////////////////////////////////////////////////////////

  function handleClick() {
    setButtonPopup(true);
  }

  ////////////////////////////////////////////////////////////////
  // JSX
  ////////////////////////////////////////////////////////////////

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

export default ParameterButton;

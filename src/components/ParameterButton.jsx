import Params from "../images/Params.png";

export default function ParameterButton() {
  function handleClick() {
    console.log("Parameters");
  }

  return (
    <div className="parameter-button">
      <img src={Params} alt="Parameters" onClick={handleClick} />
    </div>
  );
}

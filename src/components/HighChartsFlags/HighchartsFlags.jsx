import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import HighchartsAccessibility from "highcharts/modules/accessibility";
import useInitialize from "../../hooks/useInitialize";
HighchartsAccessibility(Highcharts);

function HighchartsFlags({ data, ceiling, floor }) {
  const options = useInitialize(data);
  return (
    <div className="highcharts-container">
      {data.length > 0 ? (
        <HighchartsReact
          highcharts={Highcharts}
          constructorType={"stockChart"}
          options={options}
          ceiling={ceiling}
          floor={floor}
        />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default HighchartsFlags;

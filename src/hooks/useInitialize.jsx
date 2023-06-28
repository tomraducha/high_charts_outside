/* BTIB */
import Period from "../images/Period.svg";
import { infoSeries } from "../data/infoSeries";
/* Libs & plugins */
import PropTypes from "prop-types";

function useInitialize(data) {
  const seriesData = [];

  data.forEach((obj, index) => {
    seriesData.push({
      name: `${infoSeries[index].room}`,
      data: obj,
      color: `${infoSeries[index].color}`,
      lineColor: `${infoSeries[index].lineColor}`,
    });
  });

  const options = {
    plotOptions: {
      series: {
        lineWidth: 2,
      },
    },
    chart: {
      className: "chart",
      height: "800px",
      type: "area",
      reflow: true,
      borderBottom: "10px solid black",
      events: {
        render: function () {
          const yAxis = this.yAxis[0];
          yAxis.removePlotLine("min-line");
          yAxis.removePlotLine("max-line");
          yAxis.addPlotLine({
            id: "min-line",
            color: "rgba(41, 197, 104)",
            value: yAxis.dataMin,
            width: 2,
            dashStyle: "shortdash",
            zIndex: 3,
            label: {
              text: "Min",
              align: "right",
              x: -10,
            },
          });
          yAxis.addPlotLine({
            id: "max-line",
            color: "red",
            value: yAxis.dataMax,
            width: 2,
            dashStyle: "shortdash",
            label: {
              text: "Max",
              align: "right",
              x: -10,
              style: {
                color: "red",
              },
            },
          });
        },
      },
    },

    rangeSelector: {
      inputPosition: {
        align: "center",
        y: -40,
      },
      verticalAlign: "top",
      labelStyle: {
        display: "none",
      },
      dropdown: "always",
      buttons: [
        {
          type: "day",
          count: 1,
          text: "Jour",
        },
        {
          type: "month",
          count: 1,
          text: "Mois",
        },
        {
          type: "month",
          count: 3,
          text: "3 mois",
        },
        {
          type: "month",
          count: 6,
          text: "6 mois",
        },
        {
          type: "year",
          count: 1,
          text: "Année",
        },
        {
          type: "all",
          text: "TimeRangeSelector",
        },
      ],
      inputEnabled: true,
      inputDateFormat: "%e %B %y",
      inputBoxWidth: 160,
      inputBoxHeight: 18,
      inputStyle: {
        fontSize: "15px",
        color: "black",
      },
      selected: 7,
      buttonTheme: {
        "stroke-width": 1,
        stroke: "grey",
        r: 2,
        style: {
          fontSize: "19px",
          border: "solid 1px black",
          color: "grey",
        },
      },
      allButtonsEnabled: true,
    },
    yAxis: [
      {
        floor: 10,
        ceiling: 100,
        labels: {
          align: "left",
          x: 0,
          y: 0,
        },
      },
      {
        lineWidth: 0,
        opposite: false,
      },
    ],

    series: seriesData,

    title: {
      useHTML: true,
      text: `<img src=${Period} />`,
    },

    tooltip: {
      valueSuffix: "°C",
      backgroundColor: "rgba(236, 236, 237, 1)",
      borderColor: "rgba(236, 236, 237, 1)",
      borderRadius: 20,
      borderWidth: 2,
      shadow: true,
      style: {
        color: "black",
        fontSize: "15px",
      },
      shared: true,
    },
  };
  return options;
}

useInitialize.propTypes = {
  data: PropTypes.array.isRequired,
};

export default useInitialize;

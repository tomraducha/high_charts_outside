import Period from "../images/Period.svg";
import Highcharts from "highcharts/highstock";
import { colors } from "../data/color";

export default function useInitialize(data, ceiling, floor) {
  const seriesData = [];

  data.forEach((obj, index) => {
    seriesData.push({
      name: `Courbe ${index + 1}`,
      data: obj,
      color: `${colors[index % colors.length]}`,
    });
  });

  const options = {
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
        floor: floor,
        ceiling: ceiling,
        labels: {
          enabled: false,
        },
      },
      {
        lineWidth: 0,
        opposite: false,
      },
      {
        title: {
          text: "Température",

          style: {
            fontSize: "17px",
          },
        },
        opposite: false,
        labels: {
          enabled: false,
        },
      },
    ],

    series: seriesData,

    title: {
      useHTML: true,
      text: `<img src=${Period} />`,
      x: -28,
      y: 10,
    },

    tooltip: {
      valueSuffix: "°C",
      backgroundColor: "rgba(161, 234, 180, 0.8)",
      borderColor: "rgba(161, 234, 180)",
      borderRadius: 20,
      borderWidth: 2,
      shadow: false,
      style: {
        color: "green",
        fontSize: "15px",
      },

      formatter: function () {
        const date = Highcharts.dateFormat("%e %B %Y", this.x);
        const temp = this.y;
        return `<b>${date}</b><br>Temp: ${temp}°C`;
      },
    },
  };
  return options;
}

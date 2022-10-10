import ResizableBox from "./ResizableBox";
import useDemoConfig from "../useDemoConfig";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function LivreurBar() {
  const { randomizeData } = useDemoConfig({
    series: 3,
    dataType: "ordinal",
  });
  const data = [
    {
      label: "Series 1",
      data: [
        {
          primary: "Mohamed Ali",
          secondary: 59,
        },
        {
          primary: "Amine Khalfaoui",
          secondary: 74,
        },
        {
          primary: "Kamel Hmiden",
          secondary: 59,
        },
        {
          primary: "Raouf Zitouni",
          secondary: 28,
        },
        {
          primary: "Aymen Kchich",
          secondary: 29,
        },
        {
          primary: "Hamdi Mastouri",
          secondary: 10,
        },
        {
          primary: "Bilel Ksouda",
          secondary: 87,
        },
        {
          primary: "Salim Mekdich",
          secondary: 55,
        },
        {
          primary: "Amine Ksouda",
          secondary: 81,
        },
        {
          primary: "Sami Fehri",
          secondary: 97,
        },
      ],
    },
    {
      label: "Series 2",
      data: [
        {
          primary: "Mohamed Ali",
          secondary: 75,
        },
        {
          primary: "Amine Khalfaoui",
          secondary: 92,
        },
        {
          primary: "Kamel Hmiden",
          secondary: 50,
        },
        {
          primary: "Raouf Zitouni",
          secondary: 43,
        },
        {
          primary: "Aymen Kchich",
          secondary: 86,
        },
        {
          primary: "Hamdi Mastouri",
          secondary: 35,
        },
        {
          primary: "Bilel Ksouda",
          secondary: 45,
        },
        {
          primary: "Salim Mekdich",
          secondary: 60,
        },
        {
          primary: "Amine Ksouda",
          secondary: 50,
        },
        {
          primary: "Sami Fehri",
          secondary: 1,
        },
      ],
    },
  ];
  const primaryAxis = React.useMemo(
    () => ({
      position: "left",
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        position: "bottom",
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <>
      <br />
      <br />
      <ResizableBox>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </>
  );
}

import ResizableBox from "./ResizableBox";
import useDemoConfig from "../useDemoConfig";
import React from "react";
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

export default function Bar() {
  //   const {  randomizeData } = useDemoConfig({
  //     series: 3,
  //     dataType: "ordinal",
  //   });
  const data = [
    {
      label: "Livré",
      data: [
        {
          primary: "Janvier",
          secondary: 54,
        },
        {
          primary: "Fevrier",
          secondary: 83,
        },
        {
          primary: "Mars",
          secondary: 6,
        },
        {
          primary: "Avril",
          secondary: 61,
        },
        {
          primary: "Mai",
          secondary: 83,
        },
        {
          primary: "Juin",
          secondary: 3,
        },
        {
          primary: "Juillet",
          secondary: 51,
        },
        {
          primary: "Aout",
          secondary: 54,
        },
        {
          primary: "Septembre",
          secondary: 47,
        },
        {
          primary: "Octobre",
          secondary: 40,
        },
      ],
    },
    {
      label: "En Stock",
      data: [
        {
          primary: "Janvier",
          secondary: 72,
        },
        {
          primary: "Fevrier",
          secondary: 37,
        },
        {
          primary: "Mars",
          secondary: 52,
        },
        {
          primary: "Avril",
          secondary: 80,
        },
        {
          primary: "Mai",
          secondary: 39,
        },
        {
          primary: "Juin",
          secondary: 34,
        },
        {
          primary: "Juillet",
          secondary: 28,
        },
        {
          primary: "Aout",
          secondary: 39,
        },
        {
          primary: "Septembre",
          secondary: 12,
        },
        {
          primary: "Octobre",
          secondary: 37,
        },
      ],
    },
    {
      label: "Total",
      data: [
        {
          primary: "Janvier",
          secondary: 29,
        },
        {
          primary: "Fevrier",
          secondary: 34,
        },
        {
          primary: "Mars",
          secondary: 5,
        },
        {
          primary: "Avril",
          secondary: 72,
        },
        {
          primary: "Mai",
          secondary: 18,
        },
        {
          primary: "Juin",
          secondary: 55,
        },
        {
          primary: "Juillet",
          secondary: 92,
        },
        {
          primary: "Aout",
          secondary: 82,
        },
        {
          primary: "Septembre",
          secondary: 84,
        },
        {
          primary: "Octobre",
          secondary: 42,
        },
      ],
    },
  ];
  const primaryAxis = React.useMemo(
    () => ({
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  return (
    <>
      {/* <button onClick={randomizeData}>Randomize Data</button> */}
      <br />
      <br />
      <ResizableBox width={1400}>
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

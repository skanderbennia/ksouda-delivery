import ResizableBox from "./ResizableBox";
import useDemoConfig from "../useDemoConfig";
import React from "react";
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});
const AxisOptions = dynamic(() => import("react-charts").then((mod) => mod.AxisOptions), {
  ssr: false,
});

export default function LineColis() {
  const { data, randomizeData } = useDemoConfig({
    series: 3,
    dataType: "time",
  });

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
      <button onClick={randomizeData}>Randomize Data</button>
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

// ChartDisplay.tsx
import React from "react";
import { getChartIcon } from "../assets/chartIcons";
import { chartTypeList } from "../data/chartTypeList";

type Props = {
  chartType: string;
  onTypeChange: (type: string) => void;
};

export const ChartDisplay: React.FunctionComponent<Props> = ({ chartType, onTypeChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onTypeChange(e.target.value);
  };

  return (
    <div>
      <select value={chartType} onChange={handleChange}>
        {chartTypeList.map((type: string) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <div
        id="chart-icon"
        dangerouslySetInnerHTML={{ __html: getChartIcon(chartType) }}
      />
    </div>
  );
};
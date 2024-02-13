import React from "react";
import { PieChart, Pie, Legend } from "recharts";

const DonutChart = () => {
  const data = [
    { name: "Group A", value: 400, fill: "#0088FE" },
    { name: "Group B", value: 300, fill: "#00C49F" },
    { name: "Group C", value: 300, fill: "#FFBB28" },
    { name: "Group D", value: 200, fill: "#FF8042" }
  ];

  const renderColorfulLegendText = (value: string, entry: any) => {
    return (
      <span style={{ color: "#596579", fontWeight: 500, padding: "10px" }}>
        {value}
      </span>
    );
  };


    return (
      <div className=" flex justify-center">

<PieChart width={350} height={360} className=" ">
  
  <Pie
    data={data}
    cx="50%"
    cy="50%"
    innerRadius={60}
    outerRadius={110}
    fill="#8884d8"
    paddingAngle={0}
    dataKey="value"
  >

  </Pie>

  <Legend
  className="border-2"
    height={0}
    width={0}
    iconType="square"
    layout="horizontal"
    verticalAlign="bottom"
    iconSize={15}
    padding={40}
    formatter={renderColorfulLegendText}
  />
</PieChart>


   

      </div>
    )
};

export default DonutChart;

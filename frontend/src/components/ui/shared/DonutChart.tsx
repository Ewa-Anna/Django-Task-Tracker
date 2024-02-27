import { getReportStatistics } from "@/features/ticket-api/ticket-api";
import React, { PureComponent, useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useQuery } from "react-query";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";
import Loader from "./Loader";

const theme = "dark";

const DonutChart = ({ header, }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {data:pieChartData,refetch,isLoading}=useQuery("pieChartData",()=>getReportStatistics(sort),
    {
    refetchOnWindowFocus: false,
    enabled: false //disable the query: 
                   //this is how we keep it from running on component mount. 
  })



  const [sort, setSort] = useState("overall");
  const [isOpen, setIsOpen] = useState(false);
console.log(sort)

useEffect(()=>{
refetch()
},[sort])





const transforPieData=(data)=>{

  if(data){
    const transformedPieData =  Object.entries(data).map(([key, value]) => ({
  name: key.charAt(0).toUpperCase() + key.slice(1), // Zmiana pierwszej litery na wielką
  value: value
}))
return transformedPieData
  }
return []
}

const xd = transforPieData(pieChartData)


  const COLORS = ["#881337", "#8d6333", "#0e7490",];

  const resort = (type) => {
    setSort(type);
    setIsOpen(false);
  };

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.3;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill={theme === "dark" ? "white" : "orange"}
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

const displaySortLabel= ()=>{
let label

if(sort==="usertasks") label="My Tasks"

else if(sort==="overall")label="Overall"
return label
}



  return (
    <div className=" w-full p-2  h-1/3 flex rounded-[4px]  flex-col border-2 border-dark-3">
      <div className=" flex justify-between">
        <h4 className="text-2xl mb-2">{header}</h4>
        <div
          className="flex  items-center gap-2 relative"
          tabIndex={0}
          ref={containerRef}
          onBlur={() => {
            setIsOpen(false);
          }}
          onClick={() => setIsOpen((state) => !state)}
        >
          <span className="mr-3 text-sm text-slate-300">sortBy</span>
          <span className="text-sm text-slate-100 font-semibold border-2 w-[120px] py-1  flex justify-center  border-none bg-dark-3 rounded-[10px]">
            {displaySortLabel()}
          </span>

          <div className="cursor-pointer hover:bg-dark-4 rounded-[25%] transition">
            <IoIosArrowDown size={21} />
          </div>

          {isOpen && (
            <div className="flex flex-col absolute top-10 cursor-pointer right-0 bg-dark-2 w-full p-2 gap-1 z-50">
         {sort!=="overall"&&     <span
                onClick={(e) => {
                  e.stopPropagation();
                  resort("overall");
                }}
                className="hover:text-violet-600"
              >

                Overall
              </span>}
              
       {  sort!=="usertasks"&&     <span
                onClick={(e) => {
                  e.stopPropagation();
                  resort("usertasks");
                }}
                className="hover:text-violet-600"
              >
                My Tasks
              </span>}
        

     

            </div>
          )}
        </div>
      </div>

{  isLoading?<Loader/> :   <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Legend
            verticalAlign="middle"
            align="right"
            layout="vertical"
            height={56}
            iconSize={18}
          />
          <Pie
            stroke="black"
            isAnimationActive={true}
            data={transforPieData(pieChartData)}
            cx="55%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={105}
            innerRadius={60}
            fill="#8814d8"
            dataKey="value"
          >
            {xd.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>}
    </div>
  );
};

export default DonutChart;

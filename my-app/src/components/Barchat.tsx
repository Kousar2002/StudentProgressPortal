import React,{useEffect,useState} from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';
export default function BasicBars() {
    const [students,setStudents]=useState([]);
     useEffect(() => {
        const stored = localStorage.getItem("students");
        if (stored) {
          setStudents(JSON.parse(stored));
        }
      }, []);
      console.log(students);
      const result={}
      students.forEach((val,ind)=>{
        val.cards?.forEach(card=>{
          const mid=card?.dropdown;
          console.log(mid)
          if(!result[mid]){
            result[mid]={passcount:0,failcount:0,examattendcount:0};
          }
          result[mid].examattendcount+=1;
          const passed=card.telugu>=35&&card.maths>=35&&card.english>=35;
          if(passed){
            result[mid].passcount+=1;
          }else{
            result[mid].failcount+=1;
          }
        })
      })
//       Object.entries(result).forEach(([mid, stats]) => {
//   console.log(mid, stats);
// });
      console.log(result);
      // console.log(result?.Mid1?.passcount ?? 0);
      // console.log(result?.Mid2?.failcount ?? 0);
      // console.log(result?.Mid2?.passcount ?? 0);
      // console.log(result?.Mid2?.failcount ?? 0);
      // console.log(result?.Mid3?.passcount ?? 0);
      // console.log(result?.Mid3?.failcount ?? 0)
      const Mid1passcount=result?.Mid1?.passcount ?? 0
      const Mid1failcount=result?.Mid1?.failcount ?? 0
      const Mid1attendcount=result?.Mid1?.examattendcount??0
      const Mid2passcount=result?.Mid2?.passcount ?? 0
      const Mid2failcount=result?.Mid2?.failcount ?? 0
      const Mid2attendcount=result?.Mid2?.examattendcount??0
      const Mid3passcount=result?.Mid3?.passcount ?? 0
      const Mid3failcount=result?.Mid3?.failcount ?? 0
      const Mid3attendcount=result?.Mid3?.examattendcount??0
      const totalstudendts={
        data:[Mid1attendcount,Mid2attendcount,Mid3attendcount],
        label:"TotalStudents"
      }
      const passedstudents={
        data:[Mid1passcount,Mid2passcount,Mid3passcount],
        label:"Passedstudents"
      }
      const failedstudents={
        data:[Mid1failcount,Mid2failcount,Mid3failcount],
        label:"Failedstudents"
      }
      const totalPassCount=Mid1passcount+Mid2passcount+Mid3passcount;
      const totalFailCount=Mid1failcount+Mid2failcount+Mid3failcount;
      const totalattendCount=Mid1attendcount+Mid2attendcount+Mid3attendcount;
      const donutdata = [
  { label: 'Pass', value: totalPassCount, color: '#0088FE' },
  { label: 'Fail', value: totalFailCount, color: '#00C49F' },
  { label: 'TotalStudents', value: totalattendCount, color: '#FFBB28' },
 
];


      // const totalPassCount=Object.values(result)
      // .reduce((sum,item)=> sum+item.passcount,0)
      // const totalFailCount=Object.values(result)
      // .reduce((sum,item)=> sum+item.failcount,0);
      // const totalattendCount=Object.values(result)
      // .reduce((sum,item)=> sum+item.)
  //     const mids = Object.keys(result);

  // const passData = mids.map((mid) => result[mid]?.passcount ?? 0);
  // const failData = mids.map((mid) => result[mid]?.failcount ?? 0);
  // const attendData = mids.map((mid) => result[mid]?.examattendcount ?? 0);
//   const data = {
//   pass: [Mid1passcount ?? 0, Mid2passcount ?? 0, Mid3passcount ?? 0],
//   attend: [Mid1attendcount ?? 0, Mid2attendcount ?? 0, Mid3attendcount ?? 0],
//   fail: [Mid1failcount ?? 0, Mid2failcount ?? 0, Mid3failcount ?? 0],
// };
console.log(typeof Mid1passcount)
  return (
    <>
    <BarChart
      xAxis={[{ data: ['Mid 1', 'Mid 2', 'Mid 3'] }]}
      series={[{ data: [Mid1passcount ?? 0,Mid2passcount ?? 0,Mid3passcount ?? 0],label:"PassCount" }, { data: [Mid1failcount,Mid2failcount,Mid3failcount],label:"Fail Count" }]}
      height={300}
    />
    <BarChart
      height={300}
      xAxis={[{data:["Mid1","Mid2","Mid3"]}]}
      series={[
        { ...totalstudendts, stack: 'total',},
        { ...passedstudents, stack: 'total', },
        { ...failedstudents, stack: 'total', },
      ]}
    />
     <PieChart
      series={[{ innerRadius: 50, outerRadius: 100,data:donutdata , arcLabel: 'value'  }]}
      // {...settings} 
      height={300}
    />
     <LineChart
      xAxis={[{ data: ['Jan', 'Feb', 'Mar', 'Apr'] }]}  // x-axis labels
      series={[
        { data: [10, 20, 15, 30], label: 'Sales 2025' }, // first line
        { data: [5, 15, 10, 25], label: 'Sales 2024' },  // second line
      ]}
     
      width={600}
  height={300}
    />
    {/* <LineChart
  xAxis={[{ data: ["Mid1", "Mid2", "Mid3"] }]}
  series={[
    { data: data.pass, label: "Pass" },
    { data: data.attend, label: "Attend" },
    { data: data.fail, label: "Fail" },
  ]}
  height={200}
  margin={{ bottom: 10 }}
/> */}
          {/* <LineChart
        xAxis={[{ data: mids, label: "Mid Exams" }]}
        series={[
          {
            label: "Passed Students",
            data: passData,
            color: "#1976d2",
          },
          {
            label: "Total Attended Students",
            data: attendData,
            color: "#2e7d32",
          },
          {
            label: "Failed Students",
            data: failData,
            color: "#d32f2f",
          },
        ]}
        height={400}
        margin={{ top: 30, bottom: 30, left: 50, right: 20 }}
        grid={{ vertical: true, horizontal: true }}
        legend={{ position: { vertical: "top", horizontal: "center" } }}
      /> */}

     {/* <LineChart
      xAxis={[{ data: ["Mid1","Mid2","Mid3"] }]}
      series={[
        {
data: [
        Number(Mid1passcount) || 0,
        Number(Mid2passcount) || 0,
        Number(Mid3passcount) || 0,
      ],
           label: "Passed Students",
            color: "#1976d2",
          // valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
        },
        {
          data: [
        Number(Mid1attendcount) || 0,
        Number(Mid2attendcount) || 0,
        Number(Mid3attendcount) || 0,
      ],
          label: "Total Attended Students",
          color: "#2e7d32",
        },
        {
          data: [
        Number(Mid1failcount) || 0,
        Number(Mid2failcount) || 0,
        Number(Mid3failcount) || 0,
      ],
          label: "Failed Students",
          color: "#d32f2f",

          // valueFormatter: (value) => (value == null ? '?' : value.toString()),
        },
      ]}
      height={500}
      margin={{ bottom: 10 }}
    /> */}
    </>
  );
}

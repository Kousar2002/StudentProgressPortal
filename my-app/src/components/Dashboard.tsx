import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
interface CardData {
  dropdown: string;
  telugu: string;
  english: string;
  maths: string;
}
interface StudentInfo {
  name: string;
  rollno: string;
  class: string;
  cards: CardData[];
}
const Dashboard: React.FC = () => {
  const [students, setStudents] = useState<StudentInfo[]>([]);
  useEffect(() => {
    const stored = localStorage.getItem("students");
    if (stored) {
      setStudents(JSON.parse(stored));
    }
  }, []);
  students?.map((val,ind)=>{
      console.log(val.name);
      console.log(val.rollno);
      console.log(val.class);
      val.cards.map((mid,index)=>{
        console.log(mid.dropdown);
        console.log(mid.telugu);
        console.log(mid.maths);
        console.log(mid.english)
      })

  })
   const getGrade=(marks:number)=>{
    if(marks > 100 || marks < 0 || !marks) return "__";
    if(marks>=91) return "A+";
    if(marks>=81) return "A";
    if(marks>=71) return "B+";
    if(marks>=61) return "B";
    if(marks>=51) return "C+";
    if(marks>=41) return "C";
    if(marks>=35) return "D";
    return "F";
  }
  return (
    <Box>
      <Box sx={{display:"flex",justifyContent:"space-around"}}>
            <Typography variant="h4" component="h2">
            Students Dashboard
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            component={Link}
            to="/studentform"
          >
            Add Student
          </Button>
      </Box>
      <TableContainer component={Paper} sx={{marginTop:3}}>
        <Table sx={{"& td, & th": { border: "1px solid black" } }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>RollNO</TableCell>
              <TableCell>class</TableCell>
              <TableCell align="center" colSpan={4}>
                Mid
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.map((row, ind) => (
              <TableRow key={row.name}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.rollno}</TableCell>
                <TableCell>{row.class}</TableCell>
                <TableCell colSpan={4}>
                  <>
                    <Table>
                      <TableHead>
                        <TableRow>
                          {["Mids", "Telugu", "English", "Maths","TotalMarks","Grade","Result"].map(
                            (sub, ind) => (
                              <TableCell key={ind}>{sub}</TableCell>
                            )
                          )}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row?.cards?.map((val, Ind) => (
                          <TableRow key={Ind}>
                            <TableCell>{val.dropdown}</TableCell>
                            <TableCell>{val.telugu}</TableCell>
                            <TableCell>{val.english}</TableCell>
                            <TableCell>{val.maths}</TableCell>
                            <TableCell>{Number(val.telugu)+Number(val.english)+Number(val.maths)}</TableCell>
                            <TableCell>{getGrade(Math.round((Number(val.telugu)+Number(val.english)+Number(val.maths))/3))}</TableCell>
                            <TableCell>{(Number(val.telugu)>35 && Number(val.english)>35 && Number(val.maths)>35)?"Pass":"Fail"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default Dashboard;

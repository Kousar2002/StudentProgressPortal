import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { Box, Typography, Grid, Paper, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Drawer from "./Drawer";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

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
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [filteredStates, setFilteredStates] = useState<StudentInfo[]>([]);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  useEffect(() => {
    const stored = localStorage.getItem("students");
    if (stored) {
      const parsedata = JSON.parse(stored);
      setStudents(parsedata);
      setFilteredStates(parsedata);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("open", JSON.stringify(open));
  }, [open]);
  students?.map((val, ind) => {
    console.log(val.name);
    console.log(val.rollno);
    console.log(val.class);
    val.cards.map((mid, index) => {
      console.log(mid.dropdown);
      console.log(mid.telugu);
      console.log(mid.maths);
      console.log(mid.english);
    });
  });
  const handleSearchChange = (e) => {
    console.log(e.target.value);
    const searchVal = e.target.value;
    setSearchText(e.target.value);
    if (searchVal == "") {
      setFilteredStates(students);
    } else {
      const newfilteredRows = students.filter((row) =>
        row.name.toLowerCase().includes(searchVal.toLowerCase())
      );
      // const newfilteredRows=students.filter(row=> row.name)
      console.log(newfilteredRows);
      setFilteredStates(newfilteredRows);
    }
  };
  const getGrade = (marks: number) => {
    if (marks > 100 || marks < 0 || !marks) return "__";
    if (marks >= 91) return "A+";
    if (marks >= 81) return "A";
    if (marks >= 71) return "B+";
    if (marks >= 61) return "B";
    if (marks >= 51) return "C+";
    if (marks >= 41) return "C";
    if (marks >= 35) return "D";
    return "F";
  };
  const DeleteStudent = (deleteIndex) => {
    console.log(deleteIndex);
    const filteredData = students.filter((val, ind) => val.id !== deleteIndex);
    localStorage.setItem("students", JSON.stringify(filteredData));
    // console.log(filteredData);
    setFilteredStates(filteredData);
  };
  const EditStudent = (student) => {
    console.log(student);
    navigate("/studentform", { state: student });
  };
  const handleSelectChange = (e) => {
    const selectedVal = e.target.value;
    console.log(selectedVal);
    setStatus(selectedVal);
    const passedstu = students.filter(
      (val, ind) =>
        val.cards.length == 3 &&
        val.cards.every(
          (val1, ind) =>
            val1.telugu >= 35 && val1.english >= 35 && val1.maths >= 35
        )
    );
    console.log(passedstu);
    const failedstu = students.filter((val, ind) =>
      val.cards.some(
        (val1, ind) => val1.telugu < 35 || val1.english < 35 || val1.maths < 35
      )
    );
    console.log(failedstu);
    if (selectedVal == "pass") {
      setFilteredStates(passedstu);
    } else if (selectedVal == "fail") {
      setFilteredStates(failedstu);
    } else {
      setFilteredStates(students);
    }
  };
  const handleSearch=()=>{
    
  }

  const handleStats = () => {
    setOpen(true);
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <h2>Students Dashboard</h2>
        {/* <Typography variant="h4" component="h2">
            Students Dashboard
          </Typography> */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/studentform"
          sx={{height:50}}
        >
          Add Student
        </Button>
        <Drawer />
        <Box sx={{display:"flex",gap:10}}>
          <TextField
           fullWidth
            label="Search"
            // sx={{width:"500px"}}
            value={searchText}
            onChange={handleSearchChange}
          />
          <Button variant="contained" onClick={handleSearch}>search</Button>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="status"
              onChange={handleSelectChange}
            >
              <MenuItem value={"All"} >All</MenuItem>
              <MenuItem value={"pass"}>pass</MenuItem>
              <MenuItem value={"fail"}>fail</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {/* <Button onClick={handleStats}>
             Stats
          </Button> */}
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ "& td, & th": { border: "1px solid black" } }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#FFC6C6" }}>
              <TableCell>Name</TableCell>
              <TableCell>RollNO</TableCell>
              <TableCell>class</TableCell>
              <TableCell align="center" colSpan={4}>
                Mid
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStates?.map((row, ind) => (
              <TableRow
                key={row.name}
                sx={{ backgroundColor: ind % 2 == 0 ? "#FDCFFA" : "#FFF2EF" }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.rollno}</TableCell>
                <TableCell>{row.class}</TableCell>
                <TableCell colSpan={4}>
                  <>
                    <Table>
                      <TableHead>
                        <TableRow sx={{ backgroundColor: "#84AE92" }}>
                          {[
                            "Mids",
                            "Telugu",
                            "English",
                            "Maths",
                            "TotalMarks",
                            "Grade",
                            "Result",
                          ].map((sub, ind) => (
                            <TableCell key={ind}>{sub}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row?.cards?.map((val, Ind) => (
                          <TableRow
                            key={Ind}
                            sx={{
                              backgroundColor:
                                Ind % 2 == 0 ? "#B9D4AA" : "#FAFFCA",
                            }}
                          >
                            <TableCell>{val.dropdown}</TableCell>
                            <TableCell>{val.telugu}</TableCell>
                            <TableCell>{val.english}</TableCell>
                            <TableCell>{val.maths}</TableCell>
                            <TableCell>
                              {Number(val.telugu) +
                                Number(val.english) +
                                Number(val.maths)}
                            </TableCell>
                            <TableCell>
                              {getGrade(
                                Math.round(
                                  (Number(val.telugu) +
                                    Number(val.english) +
                                    Number(val.maths)) /
                                    3
                                )
                              )}
                            </TableCell>
                            <TableCell>
                              {Number(val.telugu) > 35 &&
                              Number(val.english) > 35 &&
                              Number(val.maths) > 35
                                ? "Pass"
                                : "Fail"}
                            </TableCell>
                            {/* <TableCell> <Button onClick={DeleteStudent()}>Delete</Button></TableCell> */}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </>
                </TableCell>
                <TableCell>
                  {" "}
                  <Button
                    onClick={() => DeleteStudent(row.id)}
                    startIcon={<DeleteIcon />}
                    sx={{ color: "red" }}
                  >
                    Delete
                  </Button>{" "}
                  <Button
                    onClick={() => EditStudent(row)}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
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

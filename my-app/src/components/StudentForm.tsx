import React, { useState, useEffect } from "react";
import { useFormik, FieldArray, FormikProvider } from "formik";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

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
interface CardErrors {
  dropdown?: string;
  telugu?: string;
  english?: string;
  maths?: string;
}
interface StudentErrors {
  name?: string;
  rollno?: string;
  class?: string;
  cards?: CardErrors[];
}
const initialValues: StudentInfo = {
  name: "",
  rollno: "",
  class: "",
  cards: [{ dropdown: "", telugu: "", english: "", maths: "" }],
};

const StudentForm: React.FC = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState<StudentInfo[]>([]);
  const [showadd, setShowAdd] = useState<boolean>(false);
  const [showdel, setShowDel] = useState<boolean>(true);
  useEffect(() => {
    const stored = localStorage.getItem("students");
    if (stored) {
      setStudents(JSON.parse(stored));
    }
  }, []);
  const options = ["Mid1", "Mid2", "Mid3"];
  const formik = useFormik<StudentInfo>({
    initialValues,
    validate: (values) => {
      console.log(values);
      console.log(values.cards.length);
      const errors: StudentErrors = {};
      if (!values.name) {
        errors.name = "Name is required";
      }
      console.log(values.rollno);
      console.log(typeof values.rollno);
      console.log(!values.rollno || values.rollno.toString().trim() === "");
      if (!values.rollno || values.rollno.toString().trim() === "") {
        errors.rollno = "Roll No is required";
      } else if (/[a-zA-Z]/.test(values.rollno)) {
        errors.rollno = "It must be a number";
      } else {
        const num = Number(values.rollno);
        if (isNaN(num)) {
          errors.rollno = "Roll No must be a valid number";
        } else if (num <= 0) {
          errors.rollno = "Roll No must be a positive number";
        }
      }
      if (!values.class) {
        errors.class = "Class is required";
      }
      if (values.cards.length > 0) {
        const cardErrors: CardErrors[] = values.cards.map((card) => {
          const cardError: CardErrors = {};
          if (!card.dropdown) {
            cardError.dropdown = "Select a mid";
          }
          ["telugu", "english", "maths"].forEach((field) => {
            const value = card[field as keyof CardData];
            const numValue = Number(value);
            if (value === "") {
              cardError[
                field as keyof CardErrors
              ] = `${field} marks is required`;
            } else if (/[a-zA-Z]/.test(value)) {
              cardError[
                field as keyof CardErrors
              ] = `${field} must be a number`;
            } else if (isNaN(numValue)) {
              cardError[
                field as keyof CardErrors
              ] = `${field} must be a valid number`;
            } else if (numValue < 0 || numValue > 100) {
              console.log("IOUFDSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS")
              cardError[
                field as keyof CardErrors
              ] = `${field} must be between 0 and 100`;
            }
          });
          console.log(cardError);
          return Object.keys(cardError).length > 0 ? cardError : undefined;
          // if(Object.keys(cardError).length>0){
          //     return cardError;
          // }
          // return cardError;
          // return cardError;
          //    return Object.keys(cardError).length > 0 ? cardError : undefined;
          // return Object.keys(cardError).length===0?"":cardError;
        });
        console.log(cardErrors);
        // console.log(cardErrors.cardError)
        // errors.cards=cardErrors;
        const filteredErrors = cardErrors.filter((e) => e !== undefined);
        console.log(filteredErrors);
        if(filteredErrors.length>0){
          errors.cards = cardErrors as CardErrors[];
        }

        // if (cardErrors.length > 0) {
        //   errors.cards = cardErrors as CardErrors[];
        // }
      }
      console.log(errors);
      console.log(errors.cards, "errors");
      return errors;
    },
    onSubmit: (values) => {
      console.log("Form submitted", values);
      console.log(values.rollno);
      console.log(values.class);
      console.log(values.rollno+"-"+values.class);
      console.log(typeof (values.rollno+"-"+values.class))
      console.log(students);
      const currentId=values.class+"-"+values.rollno
      students.map((val,ind)=>{
        console.log(val)
        // if(val.id===(currentId)){

        // }
      })
      const filterarr=students.filter((val,ind)=>val.id==currentId);
      if(filterarr.length>0){
        alert("student with id already exist");
      }
      const newStudent={
        ...values,
        id:currentId
      }
      const updatedStudents = [...students,newStudent];
      console.log(updatedStudents);
      setStudents(updatedStudents);
      localStorage.setItem("students", JSON.stringify(updatedStudents));
      navigate("/");
    },
    validateOnChange: true,
    validateOnBlur: true,
  });
  const handleAddCard = (push: (obj: CardData) => void, form: any) => {
    push({ dropdown: "", telugu: "", english: "", maths: "" });
    console.log(form.values.cards.length);
    console.log(form.values.cards);
    //     const arr=form.values.cards.filter((data,ind)=>{
    //         console.log(data)
    //         console.log(ind);
    //         console.log(data.dropdown);
    //         console.log(data[ind]);
    //         // console.log(data[ind].dropdown)
    //         // data[ind]?.dropdown?data[ind]?.dropdown:""
    //   })
    // console.log(arr);
    if (form.values.cards.length == 2) {
      setShowAdd(true);
    }
    if (form.values.cards.length > 0) {
      setShowDel(false);
    }
  };
  const getDisable = (Val: StudentInfo, ind: number) => {
    console.log("dskkkkkkkkkkkk disable");
    console.log(Val);
    console.log(ind);
    const selectedDropdowns = Val.cards
      .filter((_, i) => i !== ind)
      .map((card) => card?.dropdown)
      .filter(Boolean);
    console.log(selectedDropdowns);
    return selectedDropdowns;
  };
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
  // console.log(Val.mids);
  // console.log(Val.cards[ind]?.dropdown)
  // console.log(ind)
  // return options.filter((val)=> val==Val.cards[ind]?.dropdown)
  // console.log(Val.cards[index].dropdown);
  // console.log(index);

  const handleDelete = (
    remove: (index: number) => void,
    form: any,
    index: number
  ) => {
    console.log("hlkkkkkkkkkkkkkkk");
    const newLength = form.values.cards.length - 1;
    remove(index);
    console.log(newLength);
    console.log(form.values.cards);
    if (newLength == 1) {
      setShowDel(true);
    }
    if (newLength <= 2) {
      setShowAdd(false);
    }
  };
  return (
    <Paper
      elevation={4}
      style={{ padding: 20, width: 500, margin: "40px auto" }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Student Mid Exam Form
      </Typography>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit} noValidate>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldTouched(e.target.name, true, true);
              }}
              // onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.touched.name && !!formik.errors.name}
              helperText={formik.touched.name && formik.errors.name}
            />
            <TextField
              fullWidth
              label="Roll No"
              name="rollno"
              type="text"
              //   type="number"
              value={formik.values.rollno}
              onChange={(e) => {
                formik.handleChange(e);
                formik.setFieldTouched(e.target.name, true, true);
              }}
              // onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={!!formik.touched.rollno && !!formik.errors.rollno}
              helperText={formik.touched.rollno && formik.errors.rollno}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Select Class</InputLabel>
              <Select
                labelId="class-label"
                name="class"
                label="Select Class"
                value={formik.values.class}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={!!formik.touched.class && !!formik.errors.class}
              >
                <MenuItem value="11">11</MenuItem>
                <MenuItem value="12">12</MenuItem>
              </Select>
              {formik.touched.class && formik.errors.class && (
                <Box sx={{ color: "red", fontSize: 12 }}>
                  {formik.errors.class}
                </Box>
              )}
            </FormControl>
            <FieldArray name="cards">
              {({ push, remove, form }) => (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {form.values.cards.map((card, index) => {
                    const disableMids=getDisable(form.values, index)
                    return(
                    <Box
                      key={index}
                      sx={{
                        border: "1px solid gray",
                        padding: 2,
                        borderRadius: 2,
                      }}
                    >
                      <FormControl fullWidth margin="normal">
                        <InputLabel>Select Mid</InputLabel>
                        <Select
                          label="Select Class"
                          name={`cards.${index}.dropdown`}
                          value={formik.values.cards[index].dropdown}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            !!formik.touched.cards?.[index]?.dropdown &&
                            !!formik.errors.cards?.[index]?.dropdown
                          }
                        >
                          {options.map((mid, ind) => (
                            <MenuItem
                              value={mid}
                              key={ind}
                              disabled={disableMids.includes(
                                mid
                              )}
                            >
                              {mid}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.touched.cards?.[index]?.dropdown &&
                          formik.errors.cards?.[index]?.dropdown && (
                            <Box sx={{ color: "red", fontSize: 12 }}>
                              {formik.errors.cards[index]?.dropdown}
                            </Box>
                          )}
                      </FormControl>
                      {
                        [
                          { key: "telugu", label: "Telugu" },
                          { key: "english", label: "English" },
                          { key: "maths", label: "Maths" },
                        ].map(({ key, label }) => (
                          <TextField
                            key={key}
                            fullWidth
                            margin="normal"
                            label={label}
                            // type="number"
                            name={`cards.${index}.${key}`}
                            value={
                              formik.values.cards[index][key as keyof CardData]
                            }
                            onChange={(e) => {
                              formik.handleChange(e);
                              formik.setFieldTouched(e.target.name, true, true);
                            }}
                            onBlur={formik.handleBlur}
                            error={
                              !!(
                                formik.touched.cards?.[index]?.[
                                  key as keyof CardData
                                ] &&
                                (
                                  formik.errors.cards?.[index] as
                                    | CardData
                                    | undefined
                                )?.[key as keyof CardData]
                              )
                            }
                            helperText={
                              formik.touched.cards?.[index]?.[
                                key as keyof CardData
                              ] &&
                              (
                                formik.errors.cards?.[index] as
                                  | CardData
                                  | undefined
                              )?.[key as keyof CardData]
                            }
                          />
                        ))
                      }
                      <p>
                        Total Marks:{" "}
                        {Number(formik.values.cards[index].telugu) +
                          Number(formik.values.cards[index].english) +
                          Number(formik.values.cards[index].maths)}
                      </p>
                      <p>
                        Result:{" "}
                        {formik.values.cards[index].telugu &&
                        formik.values.cards[index].english &&
                        formik.values.cards[index].maths
                          ? Number(formik.values.cards[index].telugu) > 35 &&
                            Number(formik.values.cards[index].english) > 35 &&
                            Number(formik.values.cards[index].maths) > 35
                            ? "Pass"
                            : "Fail"
                          : ""}
                      </p>
                      <p>
                        Grade:{getGrade(Math.round((Number(formik.values.cards[index].telugu)+Number(formik.values.cards[index].english)+Number(formik.values.cards[index].maths))/3))}
                      </p>
                      <Button
                        variant="contained"
                        color="secondary"
                        disabled={showdel}
                        onClick={() => handleDelete(remove, form, index)}
                      >
                        Delete
                      </Button>
                    </Box>
                  )})}
                  <Box sx={{ textAlign: "right" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      disabled={showadd}
                      onClick={() => handleAddCard(push, form)}
                    >
                      Add Card
                    </Button>
                  </Box>
                </Box>
              )}
            </FieldArray>
            <Box style={{ textAlign: "center" }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </FormikProvider>
    </Paper>
  );
};
export default StudentForm;

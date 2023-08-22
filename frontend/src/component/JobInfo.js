import { useState, useEffect, useContext } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import apiList from "../lib/apiList";
import axios from "axios";
import { SetPopupContext } from "../App";

export default function JobInfo() {
  const [Applications,setApplications]=useState([]);
  const setPopup = useContext(SetPopupContext);
  const rows=[{
    name:"sample",
    calories:"calories",
    fat:"fat",
    carbs:"carbs",
    protein:"protein"
  },{
    name:"sample",
    calories:"calories",
    fat:"fat",
    carbs:"carbs",
    protein:"protein"
  },{
    name:"sample",
    calories:"calories",
    fat:"fat",
    carbs:"carbs",
    protein:"protein"
  }]
  const getRecruiterInfo=()=>{
    axios
    .get(apiList.recruiterInfo,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      console.log(response.data);
      setApplications(response.data);
    })
    .catch((err) => {
      console.log(err.response);
      // console.log(err.response.data);
      setApplications([]);
      setPopup({
        open: true,
        severity: "error",
        message: err.response.data.message,
      });
    });
  }
  useEffect(()=>{
    getRecruiterInfo();
  },[]);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Contact</TableCell>
            <TableCell align="right">Bio(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

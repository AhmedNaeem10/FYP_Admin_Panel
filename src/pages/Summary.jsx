import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';
import { useEffect } from 'react';
import DatePicker from '../components/datepicker/DatePicker'
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import { MenuItem } from "@mui/material";
import Button from '@mui/material/Button';
import image from '../images/report.jpeg';
import ReplayIcon from '@mui/icons-material/Replay';
import IconButton from '@mui/material/IconButton';

const faculty_data = [
  { id: 1, name: 'Dr. Jawwad Shamsi', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A-1" },
  { id: 2, name: 'Dr. Atif Tahir', age: 35, email: "k191346@nu.edu.pk", entry: "08:04 AM", exit: "08:55 AM", time: "08:00 - 08:55", venue: "B-1" },
  { id: 3, name: 'Mr. Zain', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "B-12" },
  { id: 4, name: 'Mr. Basit Jasani', age: 35, email: "k191346@nu.edu.pk", entry: "12:45 AM", exit: "01:25 PM", time: "12:35 - 01:30", venue: "Lab-1" },
  { id: 5, name: 'Dr. Farooq', age: 35, email: "k191346@nu.edu.pk", entry: "03:25 AM", exit: "04:00 AM", time: "03:20 - 04:15", venue: "C-19" },
  { id: 6, name: 'Dr. Zulfiqar', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "E1" },
  { id: 7, name: 'Mr. Sohail Afzal', age: 35, email: "k191346@nu.edu.pk", entry: "09:52 AM", exit: "10:40 AM", time: "09:50 - 10:45", venue: "E2" },
  { id: 8, name: 'Mr. Ahmed', age: 35, email: "k191346@nu.edu.pk", entry: "10:54 AM", exit: "11:45 AM", time: "10:50 - 11:45", venue: "E3" },
  { id: 9, name: 'Mr. Sohaib Raza', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "A-4" },
  { id: 10, name: 'Mr. Sohaib Rauf', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "B-7" },
  { id: 11, name: 'Ms. Nida', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "C-14" },
  { id: 12, name: 'Ms. Asiya', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "E6" },
  { id: 13, name: 'Ms. Aqsa', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "B-10" },
  { id: 14, name: 'Mr. Abdullah', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "C-20" },
  { id: 15, name: 'Dr. Rafi', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "R109" },
  { id: 16, name: 'Mr. Jamil', age: 35, email: "k191346@nu.edu.pk", entry: "08:05 AM", exit: "09:00 AM", time: "08:00 - 08:55", venue: "S2" }
];

const columns = [
  { field: 'id', headerName: 'ID', width: 50 },
  {
    field: 'time',
    headerName: 'Time',
    width: 150,
    editable: true,
  },
  {
    field: 'venue',
    headerName: 'Venue',
    width: 150,
    editable: true,
  },
  {
    field: 'name',
    headerName: 'Full name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    type: 'email',
    width: 220,
    editable: true,
  },
  {
    field: 'entry',
    headerName: 'Entry time',
    width: 150,
    editable: true,
  },
  {
    field: 'exit',
    headerName: 'Exit time',
    width: 150,
    editable: true,
  }
];

export default function DataGridDemo() {
  const [data, setData] = useState([]);
  const [copy, setCopy] = useState([]);
  const [date, setDate] = useState("")
  const [time, setTime] = useState("All time slots");
  const [venue, setVenue] = useState("All venues")
  const [name, setName] = useState("");

  const getDate = () => {
    const today = new Date().toDateString();
    let parts = today.split(" ");
    return parts[0] + ", " + parts[2] + "-" + parts[1] + "-" + parts[3];
  }
  useEffect(() => {
    setDate(getDate());
  }, []);

  useEffect(() => {
    async function fetchData() {
      // call api and pass date.split(", ")[1]
      // const response = await axios.get(PASS DATE HERE);
      // setData(response.data)
      setData(faculty_data)
      setCopy(faculty_data);
    }
    fetchData();
  }, [date])

  useEffect(() => {
    if (name.length) {
      setData(copy.filter(val => {
        let parts = val.name.toLocaleLowerCase().split(" ")
        for (let part of parts) {
          if (part.startsWith(name.toLowerCase()) && (time == "All time slots" || val.time.startsWith(time)) && (venue == "All venues" || venue == val.venue)) {
            return true;
          }
        }
        return false;
      }));
    } else {
      setData(copy.filter(val => {
        return (time == "All time slots" || val.time.startsWith(time)) && (venue == "All venues" || venue == val.venue);
      }))
    }
  }, [name]);

  useEffect(() => {
    setData(copy.filter(val => {
      if ((time == "All time slots" || val.time.startsWith(time)) && (venue == "All venues" || venue == val.venue)) {
        if (name == "") {
          return true;
        } else {
          let parts = val.name.toLocaleLowerCase().split(" ")
          for (let part of parts) {
            if (part.startsWith(name.toLowerCase())) {
              return true;
            }
          }
          return false;
        }
      }
      return false;
    }));
  }, [time])

  useEffect(() => {
    setData(copy.filter(val => {
      if ((venue == "All venues" || val.venue == venue) && (time == "All time slots" || val.time.startsWith(time))) {
        if (name == "") {
          return true;
        } else {
          let parts = val.name.toLocaleLowerCase().split(" ")
          for (let part of parts) {
            if (part.startsWith(name.toLowerCase())) {
              return true;
            }
          }
          return false;
        }
      }
      return false;
    }));
  }, [venue])

  const handleQuery = async (e) => {
    setName(e.target.value);
  }

  const handleTimeChange = (e) => {
    setTime(e.target.value)
  }

  const handlVenueChange = (e) => {
    setVenue(e.target.value);
  }

  const resetFilter = () => {
    setName("")
    setTime("All time slots")
    setVenue("All venues")
  }


  return (
    <>
      <div class="container">
        <img src={image} alt="image" style={{ height: 400, width: "100%", marginTop: -50, objectFit: "cover" }} />
        <div class="bottom-left"><h1 style={{ fontSize: 50 }}>Attendance Report</h1></div>
        <div class="bottom-right" style={{ color: "black" }}><DatePicker setDate={setDate} /></div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "95%" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "95%", alignItems: "center" }}>
            <h1 style={{ fontSize: 30, paddingBottom: 20, marginTop: 30 }}>{`${date}`}</h1>
            <div>
              <IconButton aria-label="reset" color="primary" >
                <ReplayIcon onClick={resetFilter} style={{ marginRight: 8 }} fontSize="large" />
              </IconButton>
              
              <TextField style={{ marginTop: 8, paddingRight: 8 }} id="outlined-basic" label="Name" variant="outlined" value={name} onChange={handleQuery} />

              <Select value={time} style={{ marginTop: 8 }} onChange={handleTimeChange}>
                <MenuItem value={"All time slots"}>All time slots</MenuItem>
                <MenuItem value={"08:00"}>08:00</MenuItem>
                <MenuItem value={"08:55"}>08:55</MenuItem>
                <MenuItem value={"09:50"}>09:50</MenuItem>
                <MenuItem value={"10:45"}>10:45</MenuItem>
                <MenuItem value={"11:40"}>11:40</MenuItem>
                <MenuItem value={"12:35"}>12:35</MenuItem>
                <MenuItem value={"01:30"}>01:30</MenuItem>
                <MenuItem value={"02:25"}>02:25</MenuItem>
                <MenuItem value={"03:20"}>03:20</MenuItem>
              </Select>

              <Select value={venue} style={{ marginTop: 8, marginLeft: 8 }} onChange={handlVenueChange}>
                <MenuItem value={"All venues"}>All venues</MenuItem>
                <MenuItem value={"A-1"}>A-1</MenuItem>
                <MenuItem value={"A-2"}>A-2</MenuItem>
                <MenuItem value={"A-3"}>A-3</MenuItem>
                <MenuItem value={"A-4"}>A-4</MenuItem>
                <MenuItem value={"A-5"}>A-5</MenuItem>
                <MenuItem value={"A-6"}>A-6</MenuItem>
                <MenuItem value={"A-7"}>A-7</MenuItem>
                <MenuItem value={"A-8"}>A-8</MenuItem>
                <MenuItem value={"B-9"}>B-9</MenuItem>
                <MenuItem value={"B-10"}>B-10</MenuItem>
                <MenuItem value={"B-11"}>B-11</MenuItem>
                <MenuItem value={"B-12"}>B-12</MenuItem>
                <MenuItem value={"B-11"}>B-11</MenuItem>
                <MenuItem value={"C-17"}>C-17</MenuItem>
                <MenuItem value={"C-18"}>C-18</MenuItem>
                <MenuItem value={"C-19"}>C-19</MenuItem>
                <MenuItem value={"C-20"}>C-20</MenuItem>
                <MenuItem value={"C-22"}>C-22</MenuItem>
                <MenuItem value={"E1"}>E1</MenuItem>
                <MenuItem value={"E2"}>E2</MenuItem>
                <MenuItem value={"E3"}>E3</MenuItem>
                <MenuItem value={"E4"}>E4</MenuItem>
                <MenuItem value={"E5"}>E5</MenuItem>
                <MenuItem value={"E6"}>E6</MenuItem>
                <MenuItem value={"R7"}>R7</MenuItem>
                <MenuItem value={"R11"}>R11</MenuItem>
                <MenuItem value={"R12"}>R12</MenuItem>
                <MenuItem value={"R109"}>R109</MenuItem>
                <MenuItem value={"S2"}>S2</MenuItem>
                <MenuItem value={"Lab-1"}>Lab-1</MenuItem>
                <MenuItem value={"Lab-3"}>Lab-3</MenuItem>
                <MenuItem value={"Lab-4"}>Lab-4</MenuItem>
                <MenuItem value={"Lab-5"}>Lab-5</MenuItem>
                <MenuItem value={"Lab-6"}>Lab-6</MenuItem>
                <MenuItem value={"Lab-7"}>Lab-7</MenuItem>
                <MenuItem value={"Lab-8"}>Lab-8</MenuItem>
                <MenuItem value={"Lab-10"}>Lab-10</MenuItem>
                <MenuItem value={"Lab-11"}>Lab-11</MenuItem>
                <MenuItem value={"Lab-12"}>Lab-12</MenuItem>
                <MenuItem value={"MPI Lab"}>MPI Lab</MenuItem>
              </Select>
            </div>
          </div>
          <Box sx={{ height: 578, width: '95%', marginBottom: 10 }}>
            <DataGrid
              rows={data}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              // checkboxSelection
              disableSelectionOnClick
              experimentalFeatures={{ newEditingApi: true }}
            />
          </Box>
        </div>
      </div>
    </>
  );
}

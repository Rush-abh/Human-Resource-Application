import React, {useState} from "react";
import "../../styles/styles.css";
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import {DatePicker, TimePicker } from '@material-ui/pickers';

export default function SendRequest() {



  const [leave, setLeave] = useState('');
  const [selectedDate, handleDateChange] = useState(new Date());



  const handleChange = (event) => {
    setLeave(event.target.value);
  };



  const Names = [
    { name: 'John Oliver'},
    { name: 'Elizabeth Mulberry'},
    { name: 'Walter Smith'},
  ];



  return (



    <div className="MainContainer">
      <Typography className="title" variant="h6">Requests</Typography>
      <hr className="dividers"/>



      <form autoComplete="off">
        <FormControl className="drop-down" required>
          <InputLabel id="demo-simple-select-required-label">Leave type</InputLabel>
          <Select
            labelId="demo-simple-select-required-label"
            id="demo-simple-select-required"
            value={leave}
            onChange={handleChange}>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={1}>Sick Leave</MenuItem>
            <MenuItem value={2}>Annual Leave</MenuItem>
            <MenuItem value={3}>Parental Leave</MenuItem>
            <MenuItem value={4}>Personal/carer’s Leave</MenuItem>
            <MenuItem value={5}>Compassionate Leave</MenuItem>
            <MenuItem value={6}>Community service Leave</MenuItem>
            <MenuItem value={7}>Long service Leave</MenuItem>
            <MenuItem value={8}>Birthday Leave</MenuItem>
          </Select>
          <FormHelperText>Required</FormHelperText>
        </FormControl>



        <div className="switch">
          <FormControlLabel
            className=""
            value="start"
            control={<Switch color="primary" />}
            label="All day"
            labelPlacement="start"
            edge="start"/>
        </div>
        <div className="date">
          <div className="date-row row">
            <div className="date-column col-md-6">
                <DatePicker
                  openTo="year"
                  format="dd/MM/yyyy"
                  label="Start Date"
                  views={["year", "month", "date"]}
                  value={selectedDate}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  />
            </div>
            <div className="date-column col-md-6">
                <TimePicker
                  variant="inline"
                  label="Start Time"
                  value={selectedDate}
                  onChange={handleDateChange}
                  />
            </div>
          </div>
          <div className="date-row row">
            <div className=" date-column col-md-6">
                <DatePicker
                  openTo="year"
                  format="dd/MM/yyyy"
                  label="End Date"
                  views={["year", "month", "date"]}
                  value={selectedDate}
                  onChange={handleDateChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  />
            </div>
            <div className="date-column col-md-6">
                <TimePicker
                  variant="inline"
                  label="End Time"
                  value={selectedDate}
                  onChange={handleDateChange}
                  />
            </div>
          </div>
        </div>
        <div className="file-upload row">
          <TextField
            className="file-upload-field"
            name="upload-photo"
            type="file"
            />
        </div>
        <div className="manager">
          <Autocomplete
            multiple
            id="tags-filled"
            options={Names.map((option) => option.name)}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ))
            }
            renderInput={(params) => (
              <TextField {...params} label="Manager" />
            )}
            />
        </div>



        <div className="comments">
          <TextField
            className="comments-field"
            id="standard-textarea"
            label="Comments"
            multiline
            />
        </div>
        <div className="submit">
          <Button
            type="submit"
            className="submit-btn"
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}>
            Request
          </Button>
        </div>
      </form>
    </div>
  )
}
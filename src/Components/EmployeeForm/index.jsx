import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, TextField } from '@mui/material';
import './index.css';
import React, { useEffect, useState } from 'react'
import axios from 'axios';

const EmployeeForm = (props) => {
    // const [emp, setEmp] = useState({
    //     empId: "",
    //     empName: "",
    //     empJob: "",
    //     isManager: ""
    // })

    function handleClose() {
        props.onClose();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (props.emp) {
            // todo: update employee
        }
        else {
            return await addEmployee(e);
        }
    }

    async function addEmployee(e) {
        try {
            let response = await axios.post('http://localhost:4000/admin/add-emp', {
                empName: e.target.empName.value,
                empJob: e.target.empJob.value,
                isManager: e.target.isManager.checked
            });
            if (response.status == 200) {
                props.onSuccess();
            }
        }
        catch (err) {
            console.error(err);
        }
        finally {
            handleClose();
        }
    }

    useEffect(() => {
        if (props.emp) {
            console.log('empExists!');

        }
    }, []);

    return (
        <>
            <Dialog open={props.open} onClose={handleClose}>

                <form onSubmit={handleSubmit}>
                    <DialogTitle>Add new employee</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Fill the form and submit to add a new employee
                        </DialogContentText>
                        <TextField
                            disabled
                            sx={{ display: props.emp ? 'inline-block' : 'none' }}
                            margin='dense'
                            id='empId'
                            label='Employee ID'
                            type='text'
                            fullWidth
                            variant='outlined'
                            defaultValue={props.emp ? props.emp.empId : ""}
                        />
                        <TextField
                            autoFocus
                            margin='dense'
                            id='empName'
                            label='Employee Name'
                            type='text'
                            fullWidth
                            variant='outlined'
                            defaultValue={props.emp ? props.emp.empName : ""}
                            required
                        />
                        <TextField
                            margin='dense'
                            id='empJob'
                            label='Employee Job'
                            type='text'
                            fullWidth
                            variant='outlined'
                            defaultValue={props.emp ? props.emp.empJob : ""}
                        />
                        <FormControlLabel control={<Checkbox id='isManager' />} label="Manager?" />
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' type='submit'>Submit</Button>
                        <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    )
}

export default EmployeeForm
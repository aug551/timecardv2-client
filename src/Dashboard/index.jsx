import './index.css';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import { EmployeeContext } from '../Layout';
import axios from 'axios';
import ShiftsTable from '../ShiftsTable';

const Dashboard = () => {
    const { emp, setEmp } = useContext(EmployeeContext);
    const [shifts, setShifts] = useState();

    useEffect(() => {
        getShifts();

    }, []);

    function getShifts() {
        axios.post('http://localhost:4000/emp/shifts', {
            empId: emp.empid
        })
            .then(result => {
                setShifts(result.data);
            })
            .catch(error => {
                console.log(error.message);
            })

    }

    function logOut() {
        localStorage.removeItem('emp');
        setEmp(null);
    }

    async function punch() {
        if (shifts === undefined || shifts === null)
            return;

        let punch = (shifts.length > 0 && shifts[0].shiftend === null) ? "punch-out" : "punch-in";

        try {

            let result = await axios.post(`http://localhost:4000/emp/${punch}`, {
                empId: emp.empid
            });

            if (result.status == 200) {
                getShifts();
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    function displayPunchBtnText() {
        if (shifts === undefined || shifts === null)
            return "Loading";

        if (shifts.length <= 0)
            return "Punch In";

        return (shifts[0].shiftend === null) ? "Punch out" : "Punch In";
    }

    return (
        <div className='dashboard-container'>
            <div className="info-container">
                <h2>{emp.empname}</h2>
                <h3>Number: {emp.empid}</h3>
                <h3>{emp.empjob}</h3>
                <Button sx={{ marginTop: '1.3rem' }} variant='contained' onClick={() => logOut()}>Log out</Button>
            </div>
            <Button variant='contained' onClick={() => punch()}>{displayPunchBtnText()}</Button>
            {(shifts == undefined) ? <>Loading...</> : <ShiftsTable shifts={shifts} />}
        </div>
    )
}

export default Dashboard
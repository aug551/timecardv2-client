import './index.css';
import React, { useContext, useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Button } from '@mui/material';
import { EmployeeContext } from '../Layout';
import axios from 'axios';
import ShiftsTable from '../ShiftsTable';
import { useOutletContext } from 'react-router-dom';

const Dashboard = () => {
    const [shifts, setShifts] = useState(null);
    const [emp, setEmp] = useOutletContext();

    async function getShifts() {
        try {
            const shiftsRes = await axios.post('http://localhost:4000/emp/shifts', {
                empId: emp.empid
            })
            const res = shiftsRes.data;
            setShifts(res);
        } catch (err) { console.error(err); }
    }

    function logOut() {
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

    useEffect(() => {
        if (shifts === null || shifts === undefined)
            getShifts();
    }, [shifts]);

    function renderDashboard() {
        return (
            <div className='dashboard-container'>
                <div className="info-container">
                    <h2>{emp.empname}</h2>
                    <h3>Number: {emp.empid}</h3>
                    <h3>{emp.empjob}</h3>
                    <Button sx={{ marginTop: '1.3rem' }} variant='contained' onClick={() => logOut()}>Log out</Button>
                </div>
                <Button variant='contained' onClick={() => punch()}>{displayPunchBtnText()}</Button>
                <ShiftsTable shifts={shifts} />
            </div>
        )
    }

    return (
        <>
            {(emp == null) ? <>loading</> : renderDashboard()}
        </>
    )
}

export default Dashboard
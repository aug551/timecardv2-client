import axios from 'axios';
import EmployeesTable from '../../Components/EmployeesTable';
import './index.css';
import React, { createContext, useEffect, useState } from 'react'
import { Button } from '@mui/material';
import EmployeeForm from '../../Components/EmployeeForm';

export const EmployeesContext = createContext();

const Employees = () => {
    const [emps, setEmps] = useState(null);
    const [empFormOpen, setEmpFormOpen] = useState(false);

    useEffect(() => {
        async function getAllEmployees() {
            try {
                const response = await axios.get('http://localhost:4000/admin/getallemps');
                if (response.status === 200) {
                    console.log(response.data)
                    return setEmps(response.data);
                }

                throw new Error('Server error!');
            }
            catch (err) {
                console.log(err);
            }
        }

        if (!emps) {
            getAllEmployees();
        }
    }, [emps]);

    async function addEmployee() {
        setEmpFormOpen(true);
    }

    return (
        <div className="employees-page-container">
            <header className='heading-container'>
                <h1>List of employees</h1>
                <p>Click on an employee to edit them</p>
                <Button sx={{
                    width: '188px',
                    height: '50px',
                    fontSize: '1rem'
                }}
                    variant='outlined'
                    color='primary'
                    onClick={async () => addEmployee()}>
                    Add Employee
                </Button>
            </header>
            <EmployeesContext.Provider value={[emps, setEmps]}>
                <EmployeesTable />
            </EmployeesContext.Provider>

            <EmployeeForm open={empFormOpen} onClose={() => setEmpFormOpen(false)} onSuccess={() => setEmps(null)} />
        </div>
    )
}

export default Employees
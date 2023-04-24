import { DataGrid } from '@mui/x-data-grid';
import './index.css';
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { EmployeesContext } from '../../Admin/Employees';

const EmployeesTable = () => {
    const [rows, setRows] = useState([]);
    const [emps, setEmps] = useContext(EmployeesContext);
    const [focusedEmp, setFocusedEmp] = useState(null);

    const columns = [
        { field: 'id', headerName: 'ID', minWidth: 5 },
        { field: 'empName', headerName: 'Name', minWidth: 100, flex: 1.5 },
        { field: 'empJob', headerName: 'Job', minWidth: 80, flex: 1 }
    ];

    useEffect(() => {
        if (emps)
            setRows(emps.map(emp => {
                return {
                    id: emp.empid,
                    empName: emp.empname,
                    empJob: emp.empjob
                }
            }))
    }, [emps]);

    async function editEmp(params) {
        setFocusedEmp(params.row);
        console.log(params.row);
    }

    return (
        <div className="employees-container">
            <DataGrid
                autoHeight
                sx={{
                    minHeight: '400px',
                    maxWidth: '800px',
                    margin: 'auto',
                    fontSize: '1.2rem'
                }}
                rows={rows}
                columns={columns}
                onRowClick={editEmp}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize: 30 }
                    },
                }}
                pageSizeOptions={[10, 20, 30, 50]} />
        </div>
    )
}

export default EmployeesTable
import './index.css';

import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'

const ShiftsTable = (props) => {
    const [rows, setRows] = useState([]);

    const columns = [
        { field: 'id', headerName: 'Id', minWidth: 5 },
        { field: 'date', headerName: 'Date', minWidth: 130, flex: 1.5 },
        { field: 'shiftStart', headerName: 'Start', minWidth: 90, flex: 1 },
        { field: 'shiftEnd', headerName: 'End', minWidth: 80, flex: 1 },
        { field: 'shiftDuration', headerName: 'Duration', minWidth: 70, flex: 1 }
    ]

    useEffect(() => {
        if (props.shifts == null || props.shifts.length <= 0) {
            // Error here
            return;
        }

        setRows(props.shifts.map(shift => {
            let shiftStart = new Date(shift.shiftstart);
            let shiftEnd = (shift.shiftend === null) ? "-" : new Date(shift.shiftend);

            function formatTime(date) {
                return date.toTimeString().split(' ')[0].slice(0, -3);
            }

            function formatDuration(start, end) {
                // console.log(end);
                return ((end.getTime() - start.getTime()) / 3600000).toFixed(2);
            }

            let newShift = {
                id: shift.shiftid,
                date: shiftStart.toDateString(),
                shiftStart: formatTime(shiftStart),
                shiftEnd: (shiftEnd === '-') ? '-' : formatTime(shiftEnd),
                shiftDuration: (shiftEnd === '-') ? formatDuration(shiftStart, new Date()) : formatDuration(shiftStart, shiftEnd)
            };

            return newShift;
        }));

    }, [props.shifts]);

    return (
        <>
            <div className="table-container">
                <DataGrid
                    autoHeight
                    sx={{
                        minHeight: '400px',
                        maxWidth: '800px',
                        margin: 'auto'
                    }}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 5 }
                        },
                        columns: {
                            columnVisibilityModel: {
                                id: false
                            }
                        }
                    }}
                    pageSizeOptions={[5, 10, 20, 50]}
                />
            </div>
        </>
    )
}

export default ShiftsTable
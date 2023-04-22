import React, { useCallback, useEffect, useState } from 'react'
import './index.css';
import { useOutletContext } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const PasswordReset = () => {
    const [emp, setEmp] = useOutletContext();
    const [canSubmit, setCanSubmit] = useState(false);
    const [pwdForm, setPwdForm] = useState({
        oldPwd: {
            error: ['req'],
            value: ""
        },
        newPwd: {
            errors: ['req'],
            value: ""
        },
        confirmPwd: {
            errors: ['req'],
            value: ""
        }
    });

    const updatePwdHandler = useCallback(
        (type) => (event) => {
            const curr = event.target.value;
            const prev = pwdForm;

            let errors = [];

            if (event.target.value == "") {
                errors.push("req");
            }

            // validation for each
            if (event.target.id == "oldPwd") {
                // No action
            }
            if (event.target.id == "newPwd") {
                if (!curr.match(/^.{6,}$/g)) {
                    errors.push("min-length");
                }
                if (curr.match(/^.{128,}$/g)) {
                    errors.push("max-length");
                }
                if (curr != pwdForm.confirmPwd.value && prev.confirmPwd.errors.indexOf('confirm') == -1) {
                    prev.confirmPwd.errors.push('confirm');
                }
                if (curr == pwdForm.confirmPwd.value && prev.confirmPwd.errors.indexOf('confirm') >= 0) {
                    const idxRm = prev.confirmPwd.errors.indexOf('confirm');
                    prev.confirmPwd.errors.splice(idxRm, 1);
                }
            }
            if (event.target.id == "confirmPwd") {
                if (curr != pwdForm.newPwd.value) {
                    errors.push("confirm");
                }
            }

            prev[event.target.id] = {
                value: curr,
                errors
            };

            let errFlag = false;
            for (let key in prev) {
                console.log(key);
                if (prev[key].errors.length > 0)
                    errFlag = true;
                break;
            }

            if (!errFlag) {
                setCanSubmit(true);
            }

            setPwdForm(prev);

        }, [pwdForm]
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    // Checks if pwd is more than 6 and less than 128 characters long


    return (
        <>
            <div className="password-reset-container">
                <h2>Password Reset form for {emp ? emp.empname : "null"} (id: {emp ? emp.empid : "null"})</h2>
                <form onSubmit={handleSubmit} id='password-reset-form'>
                    <TextField sx={{ width: '100%' }} required id='oldPwd' label='Old Password' variant='outlined' type='password' onChange={updatePwdHandler("oldPwd")} />
                    <TextField sx={{ width: '100%' }} required id='newPwd' label='New Password' variant='outlined' type='password' onChange={updatePwdHandler("newPwd")} autoComplete='off' />
                    <TextField sx={{ width: '100%' }} required id='confirmPwd' label='Confirm New Password' variant='outlined' type='password' onChange={updatePwdHandler("confirmPwd")} autoComplete='off' />
                    <Button disabled={!canSubmit} sx={{ width: '100%', height: '2.7rem', fontSize: '1.33rem' }} variant='contained' type='submit' id='reset-password-btn'>Reset Password</Button>
                </form>
            </div>
        </>
    )
}

export default PasswordReset
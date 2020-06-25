import React from 'react';

function ViewData(props) {

    return(props.employeeData.map(
        (employee, i) => (
            <div key={i}>
                <p>Employee #{i+1}</p>
                <p>Name: {employee.name}</p>
                <p>Designation: {employee.designation}</p>
                <p>Contact Details: {employee.contact.map(
                    (e, i) => {
                        if(i === employee.contact.length-1) return e;
                        return (e + ',');
                    }
                )}</p>
                <p>Skills: {employee.skills.map(
                    (e, i) => {
                        if(i === employee.skills.length-1) return e;
                        return (e + ',');
                    }
                )}</p>
                <p>DOB: {employee.dob}</p>
            </div>
        )
    ));
}

export default ViewData;

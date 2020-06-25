import React from 'react';

function ViewData(props) {

    return(props.employeeData.map(
        (employee, i) => (
            <div key={i}>
                <p>Employee #{i+1}</p>
                <p>Name: {employee.name}</p>
                <p>Designation: {employee.designation}</p>
                <p>Contact Details: {employee.contact}</p>
                <p>Skills: {employee.skills}</p>
                <p>DOB: {employee.dob}</p>
            </div>
        )
    ));
}

export default ViewData;

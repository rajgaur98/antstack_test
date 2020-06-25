import React, { Component } from 'react'

export class Inputs extends Component {

    state = {
        name: '',
        designation: '',
        contact: [],
        skills: [],
        dob: '',
        numOfContacts: 1,
        numOfSkills: 1,
    };

    onChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidUpdate(prevProps){
        if(prevProps.toggle !== this.props.toggle){
            if(this.validate(this.state)){
                this.props.addFormData(this.state);
                this.setDefaultState();
            }
        }
    }

    validate(fields){
        console.log('in vlaidate');
        if(fields.name.length === 0) return false;
        if(fields.designation.length === 0) return false;
        // reference from https://www.w3resource.com/javascript/form/phone-no-validation.php for the below regex
        if(!fields.contact.match(/^\d{10}$/)) return false;
        return true;
    }

    setDefaultState = () => {
        this.setState({
            name: '',
            designation: '',
            contact: [],
            skills: [],
            dob: '',
        });
    }

    render() {
        return (
            <form>
                <div className="border-class">
                    <label htmlFor="name">Name: </label>
                    <input className="inputs" type="text" value={this.state.name} name="name" onChange={this.onChange}/><br />
                    <label htmlFor="designation">Designation: </label>
                    <input className="inputs" type="text" value={this.state.designation} name="designation" onChange={this.onChange}/><br />
                    <label htmlFor="contact">Contact Details: </label>
                    <input className="inputs" type="text" value={this.state.contact} name="contact" onChange={this.onChange}/>
                    <button className="btn btn-default">+</button>
                    <br />
                    <label htmlFor="skills">Skills: </label>
                    <input className="inputs" type="text" value={this.state.skills} name="skills" onChange={this.onChange}/>
                    <button className="btn btn-default">+</button>
                    <br />
                    <label htmlFor="dob">Date of Birth: </label>
                    <input className="inputs" type="date" value={this.state.dob} name="dob" onChange={this.onChange}/>
                </div>
            </form>
        )
    }
}

export default Inputs

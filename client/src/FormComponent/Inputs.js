import React, { Component } from 'react'

export class Inputs extends Component {

    state = {
        name: '',
        designation: '',
        contact: '',
        skills: '',
        dob: '',
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
        if(!fields.contact.match(/^\d{10}$/)) return false;
        return true;
    }

    setDefaultState(){
        this.setState({
            name: '',
            designation: '',
            contact: '',
            skills: '',
            dob: '',
        });
    }

    render() {
        return (
            <form>
                <div className="border-class">
                    <label htmlFor="name">Name: </label>
                    <input className="inputs" type="text" name="name" onChange={this.onChange}/><br />
                    <label htmlFor="designation">Designation: </label>
                    <input className="inputs" type="text" name="designation" onChange={this.onChange}/><br />
                    <label htmlFor="contact">Contact Details: </label>
                    <input className="inputs" type="text" name="contact" onChange={this.onChange}/><br />
                    <label htmlFor="skills">Skills: </label>
                    <input className="inputs" type="text" name="skills" onChange={this.onChange}/><br />
                    <label htmlFor="dob">Date of Birth: </label>
                    <input className="inputs" type="date" name="dob" onChange={this.onChange}/>
                </div>
            </form>
        )
    }
}

export default Inputs

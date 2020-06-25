import React, { Component } from 'react'

export class Inputs extends Component {

    state = {
        name: '',
        designation: '',
        contact: [''],
        skills: [''],
        dob: '',
    };

    onChange = (event) => {
        event.persist();
        this.setState({[event.target.name]: event.target.value}); 
    }

    onContactChange = (index) => (event) => {
        event.persist();
        this.setState(state => {
            let contact = state.contact.map((e, i) => i === index? event.target.value: e);
            return {
                contact,
            }
        }, () => {console.log(this.state.contact)});
    }

    onSkillsChange = (index) => (event) => {
        event.persist();
        this.setState(state => {
            let skills = state.skills.map((e, i) => i === index? event.target.value: e);
            return {
                skills,
            }
        }, () => {console.log(this.state.skills)});
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
        if(fields.name.length === 0) return false;
        if(fields.designation.length === 0) return false;
        // reference from https://www.w3resource.com/javascript/form/phone-no-validation.php for the below regex
        for(let i=0; i<fields.contact.length; i++)
            if(!fields.contact[i].match(/^\d{10}$/)) return false;
        return true;
    }

    setDefaultState = () => {
        this.setState({
            name: '',
            designation: '',
            contact: [''],
            skills: [''],
            dob: '',
        });
    }

    addContactField = (e) => {
        e.preventDefault();
        if(this.state.contact.length < 4){
            this.setState((state, props) => ({
                contact: [...state.contact, '']
            }));
        }
    }

    addSkillField = (e) => {
        e.preventDefault();
        if(this.state.skills.length < 20){
            this.setState((state, props) => ({
                skills: [...state.skills, '']
            }));
        }
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
                    <button className="btn btn-default" onClick={this.addContactField}>+</button>
                    {
                        this.state.contact.map((e, i) => {
                            return i === 0? (
                                <React.Fragment key={i}>
                                    <input className="inputs" type="text" value={e} onChange={this.onContactChange(i)}/>
                                    <br />
                                </React.Fragment>
                            ): (
                                <React.Fragment key={i}>
                                    <input className="inputs" type="text" value={e} onChange={this.onContactChange(i)}/>
                                    <br /><br />
                                </React.Fragment>
                            );
                        })
                    }
                    <br />
                    <label htmlFor="skills">Skills: </label>
                    <button className="btn btn-default" onClick={this.addSkillField}>+</button>
                    {
                        this.state.skills.map((e, i) => {
                            return i === 0 ?(
                                <React.Fragment key={i}>
                                    <input className="inputs" type="text" value={e} onChange={this.onSkillsChange(i)}/>
                                    <br />
                                </React.Fragment>
                            ): (
                                <React.Fragment key={i}>
                                    <input className="inputs" type="text" value={e} onChange={this.onSkillsChange(i)}/>
                                    <br /><br />
                                </React.Fragment>
                            );
                        })
                    }
                    <br />
                    <label htmlFor="dob">Date of Birth: </label>
                    <input className="inputs" type="date" value={this.state.dob} name="dob" onChange={this.onChange}/>
                </div>
            </form>
        )
    }
}

export default Inputs

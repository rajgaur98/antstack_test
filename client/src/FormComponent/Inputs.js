import React, { Component } from 'react'

export class Inputs extends Component {

    state = {
        name: '',
        errorInName: false,
        designation: '',
        errorInDesg: false,
        contact: [{type: '', value: '', typeError: false, error: false}],
        skills: [''],
        dob: '',
    };

    onNameChange = (event) => {
        event.persist();
        this.setState({
            name: event.target.value,
            errorInName: event.target.value.length > 0? false: true,
        }); 
    }

    onDesgChange = (event) => {
        event.persist();
        this.setState({
            designation: event.target.value,
            errorInDesg: event.target.value.length > 0? false: true,
        }); 
    }

    onDOBChange = (event) => {
        event.persist();
        this.setState({
            dob: event.target.value,
        }); 
    }

    onContactChange = (index) => (event) => {
        event.persist();
        this.setState(state => {
            let contact = state.contact.map((e, i) => i === index? {type: e.type, value: event.target.value, error: event.target.value.match(/^\d{10}$/)? false: true, typeError: e.typeError}: e);
            return {
                contact,
            }
        });
    }

    onTypeChange = (index) => (event) => {
        event.persist();
        this.setState(state => {
            let contact = state.contact.map((e, i) => i === index? {type: event.target.value, value: e.value, error: e.error, typeError: event.target.value.length > 0? false: true}: e);
            return {
                contact,
            }
        });
    }

    onSkillsChange = (index) => (event) => {
        event.persist();
        this.setState(state => {
            let skills = state.skills.map((e, i) => i === index? event.target.value: e);
            return {
                skills,
            }
        });
    }

    componentDidUpdate(prevProps){
        if(prevProps.toggle !== this.props.toggle){
            if(this.validate(this.state)){
                let finalData = {
                    name: this.state.name,
                    designation: this.state.designation,
                    contact: this.state.contact.map((e) => ({type: e.type, number: e.value})),
                }
                let skills = [];
                for(let i=0; i<this.state.skills.length; i++){
                    let skill = this.state.skills[i];
                    if(skill.length > 0) skills.push(skill);
                }
                if(skills.length > 0) finalData.skills = skills;
                if(this.state.dob !== '') finalData.dob = this.state.dob; 
                this.props.addFormData(finalData);
            }
        }
        if(prevProps.clearFormData !== this.props.clearFormData && this.props.clearFormData) this.setDefaultState();
    }

    validate(fields){
        if(fields.name.length === 0) {
            this.setState({errorInName: true});
            return false;
        }
        if(fields.designation.length === 0) {
            this.setState({errorInDesg: true});
            return false;
        }
        // reference from https://www.w3resource.com/javascript/form/phone-no-validation.php for the below regex
        for(let i=0; i<fields.contact.length; i++)
            if(!fields.contact[i].value.match(/^\d{10}$/) || fields.contact[i].type.length === 0) {
                this.setState(state => {
                    let contact = state.contact.map((e, ind) => ind === i? {type: e.type, value: e.value, typeError: e.type.length === 0? true: false ,error: e.value.match(/^\d{10}$/)? false: true}: e);
                    return {
                        contact,
                    }
                });
                return false;
            };
        return true;
    }

    setDefaultState = () => {
        this.setState({
            name: '',
            designation: '',
            contact: [{type: '', value: '', error: false, typeError: false}],
            skills: [''],
            dob: '',
        });
    }

    addContactField = (e) => {
        e.preventDefault();
        if(this.state.contact.length < 4){
            this.setState((state, props) => ({
                contact: [...state.contact, {type: '', value: '', error: false, typeError: false}]
            }));
        }
    }

    removeContactField = (index) => (event) => {
        event.preventDefault();
        this.setState((state, props) => ({
            contact: state.contact.filter((e, i) => i !== index)
        }));
    }

    addSkillField = (e) => {
        e.preventDefault();
        if(this.state.skills.length < 20){
            this.setState((state, props) => ({
                skills: [...state.skills, '']
            }));
        }
    }

    removeSkillField = (index) => (event) => {
        event.preventDefault();
        this.setState((state, props) => ({
            skills: state.skills.filter((e, i) => i !== index)
        }));
    }

    render() {
        return (
            <form>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input className="inputs" type="text" value={this.state.name} name="name" onChange={this.onNameChange}/><br />
                    {
                        this.state.errorInName? <span><span className="error-msg">length of name should be greater than 0</span><br /></span>: null
                    }
                    <label htmlFor="designation">Designation: </label>
                    <input className="inputs" type="text" value={this.state.designation} name="designation" onChange={this.onDesgChange}/><br />
                    {
                        this.state.errorInDesg? <span><span className="error-msg">length of designation should be greater than 0</span><br /></span>: null
                    }
                    <label htmlFor="contact">Contact Details: </label>
                    <button onClick={this.addContactField}>+</button>
                    {
                        this.state.contact.map((e, i) => {
                            return i === 0? (
                                <React.Fragment key={i}>
                                    <input className="inputs" type="text" placeholder="Phone number" value={e.value} onChange={this.onContactChange(i)}/>
                                    <input className="inputs" type="text" placeholder="Type" value={e.type} onChange={this.onTypeChange(i)}/>
                                    {
                                        e.typeError? <span><br /><span className="error-msg">Enter a type</span></span>: null 
                                    }
                                    <br />
                                    {
                                        e.error? <span><span className="error-msg">Enter a valid 10 digit number</span><br /></span>: null
                                    }
                                </React.Fragment>
                            ): (
                                <React.Fragment key={i}>
                                    <div className="inputs">
                                        <button className="inputs" onClick={this.removeContactField(i)}>-</button>
                                        <input className="inputs" type="text" placeholder="Phone number" value={e.value} onChange={this.onContactChange(i)} />
                                        <input className="inputs" type="text" placeholder="Type" value={e.type} onChange={this.onTypeChange(i)} />
                                        {
                                            e.typeError? <span><br /><span className="error-msg">Enter a type</span></span>: null 
                                        }
                                    </div>
                                    <br /><br />
                                    {
                                        e.error? <span><span className="error-msg">Enter a valid 10 digit number</span><br /></span>: null
                                    }
                                </React.Fragment>
                            );
                        })
                    }
                    <br />
                    <label htmlFor="skills">Skills: </label>
                    <button onClick={this.addSkillField}>+</button>
                    {
                        this.state.skills.map((e, i) => {
                            return i === 0 ?(
                                <React.Fragment key={i}>
                                    <input className="inputs" type="text" value={e} onChange={this.onSkillsChange(i)}/>
                                    <br />
                                </React.Fragment>
                            ): (
                                <React.Fragment key={i}>
                                    <div className="inputs">
                                        <input type="text" value={e} onChange={this.onSkillsChange(i)}/>
                                        <button onClick={this.removeSkillField(i)}>-</button>
                                    </div>
                                    <br /><br />
                                </React.Fragment>
                            );
                        })
                    }
                    <br />
                    <label htmlFor="dob">Date of Birth: </label>
                    <input className="inputs" type="date" max="2001-01-01" value={this.state.dob} name="dob" onChange={this.onDOBChange}/>
                </div>
            </form>
        )
    }
}

export default Inputs

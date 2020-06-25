import React, { Component } from 'react'

export class Inputs extends Component {

    state = {
        name: '',
        errorInName: false,
        designation: '',
        errorInDesg: false,
        contact: [{value: '', error: false}],
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
            let contact = state.contact.map((e, i) => i === index? {value: event.target.value, error: event.target.value.match(/^\d{10}$/)? false: true}: e);
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
                let finalData = {
                    name: this.state.name,
                    designation: this.state.designation,
                    contact: this.state.contact.map((e) => e.value),
                }
                let skills = [];
                for(let i=0; i<this.state.skills.length; i++){
                    let skill = this.state.skills[i];
                    if(skill.length > 0) skills.push(skill);
                }
                if(skills.length > 0) finalData.skills = skills;
                if(this.state.dob !== '') finalData.dob = this.state.dob; 
                this.props.addFormData(finalData);
                this.setDefaultState();
            }
        }
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
            if(!fields.contact[i].value.match(/^\d{10}$/)) {
                this.setState(state => {
                    let contact = state.contact.map((e, ind) => ind === i? {value: fields.contact[i].value, error: true}: e);
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
            contact: [{value: '', error: false}],
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
                <div className="border-class">
                    <label htmlFor="name">Name: </label>
                    {
                        this.state.errorInName? 'length of name should be greater than 0': null
                    }
                    <input className="inputs" type="text" value={this.state.name} name="name" onChange={this.onNameChange}/><br />
                    <label htmlFor="designation">Designation: </label>
                    {
                        this.state.errorInDesg? 'length of designation should be greater than 0': null
                    }
                    <input className="inputs" type="text" value={this.state.designation} name="designation" onChange={this.onDesgChange}/><br />
                    <label htmlFor="contact">Contact Details: </label>
                    <button onClick={this.addContactField}>+</button>
                    {
                        this.state.contact.map((e, i) => {
                            return i === 0? (
                                <React.Fragment key={i}>
                                    {
                                        e.error? 'length should be 10 and no alphabets': null
                                    }
                                    <input className="inputs" type="text" value={e.value} onChange={this.onContactChange(i)}/>
                                    <br />
                                </React.Fragment>
                            ): (
                                <React.Fragment key={i}>
                                    {
                                        e.error? 'length should be 10 and no alphabets': null
                                    }
                                    <div className="inputs">
                                        <input type="text" value={e.value} onChange={this.onContactChange(i)}/>
                                        <button onClick={this.removeContactField(i)}>-</button>
                                    </div>
                                    <br /><br />
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
                    <input className="inputs" type="date" value={this.state.dob} name="dob" onChange={this.onDOBChange}/>
                </div>
            </form>
        )
    }
}

export default Inputs

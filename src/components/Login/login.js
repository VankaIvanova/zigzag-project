import React, { Component } from "react";
import {PostData} from '../../service/PostData';
import './login.css'

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

class Login extends Component {

    constructor(){
        super();
        this.state = {
            order: '',
            email: '',
            address: '',
            redirectToReferrer: false,
            formErrors: {
                order: "",
                email: "",
            }
        };
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login(event) {
        event.preventDefault();

        PostData(this.state).then((result) => {
            if (result) {
                result.map(item => {
                    if (item.order === this.state.order &&
                        item.email === this.state.email) {
                            this.setState({redirectToReferrer: true});
                            this.props.history.push('dashboard');
                    } 
                    return false;
                })
           }
        });
    }
    
    onChange(e){
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "order":
                formErrors.order =
                value.length < 4 || value.length > 15 ? "Invalid Order number (Must be 4-15 characters long)." : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                ? ""
                : "Invalid Email address";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    }
   
    render() {
        const { formErrors } = this.state;

        return (
            <div className="wrapper">           
                <div className="form-wrapper">
                    <form onSubmit={this.handleSubmit} noValidate>
                        <div className="form-group">
                            <input 
                                type="text" 
                                className={formErrors.order.length ? 'form-control is-invalid' : 'form-control'} 
                                name="order"
                                placeholder="Order number"
                                noValidate
                                required
                                onChange={this.onChange}
                            />
                            {formErrors.order.length > 0 && (
                                <small className="text-muted">{formErrors.order}</small>
                            )}
                        </div>
                        <div className="form-group">
                            <input
                                type="email" 
                                className={formErrors.email.length ? 'form-control is-invalid' : 'form-control'} 
                                placeholder="Email address"
                                name="email"
                                noValidate
                                required
                                onChange={this.onChange}
                            />
                            {formErrors.email.length > 0 && (
                                <small className="text-muted">{formErrors.email}</small>
                            )}
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary" onClick={this.login}>Proceed</button>
                        </div>
                    </form>

                </div>
            </div>
        );
    }
}
  
export default Login;
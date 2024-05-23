import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";


function LoginForm() {
    // Create state for the form values
    const [formState, setFormState] = useState({
        name: "",
        email: "",
        password: "",
        terms: false
    });


    const formSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Must be a valid email address.").required("Must include email address."),
        password: Yup.string().required("Password is Required").min(6, "Passwords must be at least 6 characters long."),
        terms: Yup.boolean().oneOf([true], "You must accept Terms and Conditions")
    });


    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        terms: ""
    });


    const [buttonDisabled, setButtonDisabled] = useState(true);


    // Each time the form value state is updated, check to see if it is valid per our schema.
    useEffect(() => {
        formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);


    const inputChange = e => {
        const { name, value, type, checked } = e.target;
        const valueToUse = type === "checkbox" ? checked : value;


        Yup.reach(formSchema, name)
            .validate(valueToUse)
            .then(() => {
                setErrors({
                    ...errors,
                    [name]: ""
                });
            })
            .catch(err => {
                setErrors({
                    ...errors,
                    [name]: err.errors[0]
                });
            });


        setFormState({
            ...formState,
            [name]: valueToUse
        });
    };


    // This handles what happens when we submit the form. We want to prevent the default
    // form submission from the browser and control what happens when we submit.
    const formSubmit = e => {
        e.preventDefault();
        console.log("submitted!");
        axios
            .post("https://reqres.in/api/users", formState)
            .then(res => {
                console.log("success", res.data);


                // Reset form state
                setFormState({
                    name: "",
                    email: "",
                    password: "",
                    terms: false
                });


                // Clear errors
                setErrors({
                    name: "",
                    email: "",
                    password: "",
                    terms: ""
                });
            })
            .catch(err => console.log(err.response));
    };


    return (
        <form onSubmit={formSubmit}>
            <label htmlFor="nameInput">
                Name
                <input id="nameInput" type="text" name="name" placeholder="Name" value={formState.name} onChange={inputChange} />
            </label>
            {errors.name && <p className="error">{errors.name}</p>}


            <label htmlFor="emailInput">
                Email
                <input id="emailInput" type="email" name="email" placeholder="Email" value={formState.email} onChange={inputChange} />
            </label>
            {errors.email && <p className="error">{errors.email}</p>}


            <label htmlFor="passwordInput">
                Password
                <input id="passwordInput" type="password" name="password" placeholder="Password" value={formState.password} onChange={inputChange} />
            </label>
            {errors.password && <p className="error">{errors.password}</p>}


            <label htmlFor="termsInput">
                Do you agree to the terms and conditions?
                <input id="termsInput" type="checkbox" name="terms" checked={formState.terms} onChange={inputChange} />
            </label>
            {errors.terms && <p className="error">{errors.terms}</p>}


            <button type="submit" disabled={buttonDisabled}>Submit!</button>
        </form>
    );
}


export default LoginForm;


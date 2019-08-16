import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";




const UserForm = ({ errors, touched, values, status }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (status) {
            setUsers([...users, status]);
                    }
    }, [status]);


return (
    <div className="user-form">
        <Form>
            <Field
            component="input"
            type="text"
            name="username"
            placeholder="Username"
            />
            {touched.username && errors.username && 
            (<p> className="error">{errors.username}</p>
            ) }
            />
            <Field
            component="input"
            type="text"
            name="email"
            placeholder="User Email"
            />
            {touched.email && errors.email && 
            (<p> className="error">{errors.email}</p>
            ) }
            />
            <Field
            component="input"
            type="password"
            name="pwd"
            placeholder="*********"
            />
            {touched.pwd && errors.pwd && 
            (<p> className="error">{errors.pwd}</p>
            ) }
            />
            <label className="checkbox-container">
          Accept Terms of Service
          <Field
            type="checkbox"
            name="tos"
            checked={values.tos}
            />
            {touched.tos && errors.tos && 
            (<p> className="error">{errors.tos}</p>
            ) }
          <span className="checkmark" />
        </label>
        </Form>
</div> );

const formikHOC = withFormik({
    mapPropsToValues({ username, email, pwd, tos }) {
      return {
        username: username || "",
        email: email || "",
        pwd: pwd || "",
        tos: tos || false
      };
    },
    validationSchema: Yup.object().shape({
      username: Yup.string("Invalid Entry").required("Username Required"),
      email: Yup.string("Invalid Entry").email("Invalid Format").required("Email Required"),
      tos: Yup.required("Must agree to TOS")
    }),
    handleSubmit(values, { setStatus, resetForm }) {
      axios
        .post("https://reqres.in/api/users", values)
        .then(res => {
          console.log("handleSubmit: then: res: ", res);
          setStatus(res.data);
          resetForm();
        })
        .catch(err => console.error("handleSubmit: catch: err: ", err));
    },
});
};

export default withFormik(propsToValuesMap)(UserForm);
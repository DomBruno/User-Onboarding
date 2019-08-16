import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const UserForm = ({ errors, touched, values, status }) => {
  
  const [users, setUsers] = useState([]);
  console.log(users);

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
        {touched.username && errors.username && (
          <p className="error">{errors.username}</p>
        )}
        <Field type="text" name="email" placeholder="User Email" />
        {touched.email && errors.email && <p className="error">{errors.email}</p>}
        <Field component="select" className="role-select" name="role">
          <option>Select User Role</option>
          <option value="UI/UX">UI/UX</option>
          <option value="Front-End">Front-End</option>
          <option value="Back-End">Back-End</option>
        </Field>
        <Field
          type="password"
          name="pwd"
          placeholder="Password"
        />
        {touched.notes && errors.notes && (
          <p className="error">{errors.notes}</p>
        )}
        <label className="checkbox-container">
          I Agree to TOS
          <Field
            type="checkbox"
            name="tos"
            checked={values.tos}
          />
          <span className="checkmark" />
        </label>
        <button>Submit!</button>
      </Form>
      Registered Users:
      {users.map(user => (
        <p className="list" key={user.id}>{user.username},  {user.email},  {user.role}</p>
      ))}
    </div>
  );
};

const formikHOC = withFormik({
  mapPropsToValues({ username, email, notes, role, tos }) {
    return {
      username: username || "",
      email: email || "",
      notes: notes || "",
      role: role || "",
      tos: tos || false
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string("Invalid Input").required("Username Required"),
    email: Yup.string("Invalid Input").email("Invalid Format").required("Email is Required"),
    tos: Yup.bool("You must agree to the TOS").oneOf([true], 'You must agree to the TOS'),
    notes: Yup.string()
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
  }
});
const UserFormWithFormik = formikHOC(UserForm);

export default UserFormWithFormik;
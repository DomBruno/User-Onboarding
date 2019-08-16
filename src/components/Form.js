import React, { useState, useEffect } from "react";
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

/* things to delete:
     x state *
     x handleChanges
     x handleSubmit
     x form onSubmit
     x input onChange
     input values
     labels
*/

const AnimalForm = ({ errors, touched, values, status }) => {
  /*const [animal, setAnimal] = useState({ species: "" });

  const handleChange = event => {
    setAnimal({ ...animal, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    console.log(animal.species);
  };*/

  const [animals, setAnimals] = useState([]);
  console.log(animals);

  useEffect(() => {
    if (status) {
      setAnimals([...animals, status]);
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
          <option value="omnivore">Omnivore</option>
        </Field>
        <label className="checkbox-container">
          I Agree to TOS
          <Field
            type="checkbox"
            name="tos"
            checked={values.tos}
          />
          <span className="checkmark" />
        </label>
        <Field
          component="textarea"
          type="text"
          name="notes"
          placeholder="Notes"
        />
        {touched.notes && errors.notes && (
          <p className="error">{errors.notes}</p>
        )}
        <button>Submit!</button>
      </Form>
      {animals.map(animal => (
        <p key={animal.id}>{animal.species}</p>
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
const AnimalFormWithFormik = formikHOC(AnimalForm);

export default AnimalFormWithFormik;
// REFS NOTES
/* References is the name, but in React its just 'Ref'. Refs allow us to get 
access to other DOM elements and work with them. */
/* Looking at AddUser component again, we have our inputs, and we manage what the 
user enters by simply keeping track of it. We simply have our state, and with every 
keystroke, we update our state. So every keystroke, update the value we get by the 
user and we store it in our state and feed it back into the input and then use
that state later to set inputs but also to send it to the place we need the data. */
/* This is a scenario where refs could help us */

// HOW DO REFS WORK?
/* Set up a connection between a HTML element which is being rendered in the end and 
our other JavaScript code. */
/* First of all need to create a ref, which do with help of another react hook,
useRef */
import React, { useState, useRef } from "react";

import Card from "../UI/Card";
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";
/* import Wrapper and now use it as a regular react component */
import Wrapper from "../Helpers/Wrapper";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  /* call useRef in our code -> in our functional component. Call the const nameInputref, 
  because I plan on connecting this ref with that first input which allows us to enter a username. */
  /* Need to let React know we want to connect a ref to san HTML element by going to that element to 
  which we want to connect the ref and adding a special prop there the ref prop. */
  const nameInputRef = useRef();
  /* Doing another useRef below for the age input */
  const ageInputRef = useRef();

  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredUsername, enteredAge);
    setEnteredUsername("");
    setEnteredAge("");
  };

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    /* only one root element can be returned because in JavaScript can only return one
    thing. Even array -> just one object so you still only return one array, one object so
    not two arrays at the same time. Wrapping [] is a work around -any element would work
    including custom components -> only thing that matters = one value -> return.  */

    /* we've put dynamic expression as first value in the array with a comma, curly braces 
    had to be removed for the first expression because we're no longer inside JSX. */

    /* IMPORTANT NOTES -> We can retrun an array, because React is able to work with arrays 
    of JSX elements. i.e. mapping arrays of data to JSX elements. BUT will get warning as is, 
    because whenever you're working with an array of JSX elements, React wants a key on every 
    element. So easier to just use <div> to wrap. */

    /* With wrapping <div>, can end up with div soup i.e. lots of divs very confusing. 
    So created Wrapper */
    <Wrapper>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
            /* ref prop like key prop is a built in prop, can add to add 
            HTML element. Can connect any HTML element to one of your references */
            ref={}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;

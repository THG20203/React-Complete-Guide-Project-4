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

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    /* capturing the ref value -> storing it in const enteredName */
    const enteredName = nameInputRef.current.value;
    /* enteredAge would clash with enteredAge state above -> hence enteredUserAge as 
    name of the const */
    const enteredUserAge = ageInputRef.current.value;
    /* Changed the if statement below to check for the consts storing the ref info ->
    Always values we retrieved from the refs. */
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: "Invalid input",
        message: "Please enter a valid name and age (non-empty values).",
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: "Invalid age",
        message: "Please enter a valid age (> 0).",
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    /* no longer need to reset these inputs by resetting state, because we're not using
    state to get our values, we're now using refs */
    /* Can reset the value without the DOM -> sort of dirty solution. */
    nameInputRef.current.value = "";
    ageInputRef.current.value = "";
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
            /* ref prop like key prop is a built in prop, can add to add 
            HTML element. Can connect any HTML element to one of your references. */
            /* Name input ref passed as a value -> (the constant which stores the first ref). 
            Important to note -> what will end up inside of nameInputRef in the end will really be 
            a real DOM element later. */
            ref={nameInputRef}
          />
          <label htmlFor="age">Age (Years)</label>
          <input id="age" type="number" ref={ageInputRef} />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </Wrapper>
  );
};

export default AddUser;

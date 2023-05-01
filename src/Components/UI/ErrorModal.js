import React from "react";

import Card from "./Card";
import Button from "./Button";
import classes from "./ErrorModal.module.css";

//INITIAL PORTAL NOTES
/* We can now use a portal for ErrorModal.js -> might want to have backdrop and modal 
as direct children of the body, external to the root, but next to the root div
which holds the rest of our application. */

/* Portals need two things: a place where you want to port the Component to, and then 
need to let the Component know that it should have a portal to that place. */

//PORTAL PROCESS IN ACTION
/* Process of 'portalling' the backdrop. Make const called BackDrop -> new 
component, to be added in this same file in this app, I only use this backdrop 
Component in conjunction with my modal. */

/* So, I'll store all my components in one big file, but you could also split it
into multiple Component files -> especially in conjunction with other Components
as well. */
const Backdrop = (props) => {
  <div className={classes.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  <Card className={classes.modal}>
    <header className={classes.header}>
      <h2>{props.title}</h2>
    </header>
    <div className={classes.content}>
      <p>{props.message}</p>
    </div>
    <footer className={classes.actions}>
      <Button onClick={props.onConfirm}>Okay</Button>
    </footer>
  </Card>;
};

const ErrorModal = (props) => {
  return <React.fragment>{/* In the fragment */}</React.fragment>;
};

export default ErrorModal;

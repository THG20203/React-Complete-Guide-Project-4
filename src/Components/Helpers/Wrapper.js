/* In here not even going to import react cause not going to write any JSX code */

const Wrapper = (props) => {
  /* Just returning props.children and NOT any JSX code. Remember the children prop
holds all the content you're passing between the opening and closing tag of my custom 
component. */

  /* It is valid in a component to return just that content which I got between the 
opening and closing text */
  return props.children;
};

export default Wrapper;

import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { useHistory } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import AuthContext from "./store/auth";
import Form from "react-bootstrap/Form";
import FormLabel from "react-bootstrap/esm/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import FormGroup from "react-bootstrap/esm/FormGroup";
import classes from "./Login.module.css";
// import { Button } from 'react-bootstrap';
import Button from "react-bootstrap/Button";

const AuthForm = () => {
  const Navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstnameRef = useRef();
  const lastNameRef = useRef();
  const Username = useRef();
  const mobileNumberRef = useRef();
  const zipCode = useRef();
  const confirmPassword = useRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  // const [data,setData] = useState([])

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredPassword = passwordInputRef.current.value;
    const enteredEmail = emailInputRef.current.value;
    // const firstnames = firstnameRef.current.value;
    // const enteredFirstname = firstnameRef.current.value;
    let confirmPasswords;
    if (!isLogin) {
      confirmPasswords = confirmPassword.current.value;
    }
    let enteredZipCode;
    if (!isLogin) {
      enteredZipCode = zipCode.current.value;
    }
    let enteredFirstname;
    if(!isLogin) {
      enteredFirstname = firstnameRef.current.value;
      }
    let enteredLastname;
    if (!isLogin) {
      enteredLastname = lastNameRef.current.value;
    }
    let enterUsername;
    if (!isLogin) {
      enterUsername = Username.current.value;
    }
    let enteredMobile;
    if(!isLogin){
      enteredMobile = mobileNumberRef.current.value;
    }

    // const confirmPasswords = confirmPassword.current.value;
    localStorage.setItem("enteredEmail", JSON.stringify(enteredEmail));
    localStorage.setItem("enteredFirstname",JSON.stringify(enteredFirstname));
    localStorage.setItem("enteredLastname", JSON.stringify(enteredLastname));
    localStorage.setItem("enteredMobile", JSON.stringify(enteredMobile));

    setIsLoading(true);
    if (isLogin) {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC1IGFMrAiDCdrOeZvHMmLFNXAULK_QBYM",
        {
          method: "POST",
          body: JSON.stringify({
            name:enteredFirstname,
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          setIsLoading(false);
          console.log(res.data,"this is main ");
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          const expireTokentime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authCtx.login(data.idToken, expireTokentime.toISOString());
          Navigate("/dash")

        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC1IGFMrAiDCdrOeZvHMmLFNXAULK_QBYM",
        {
          method: "POST",
          body: JSON.stringify({
            name:enteredFirstname,
            email: enteredEmail,
            password: enteredPassword,
            confirmPass: confirmPasswords,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          setIsLoading(false);
          console.log(res);
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = "Authentication failed!";
              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          const expireTokentime = new Date(
            new Date().getTime() + +data.expiresIn * 1000
          );
          authCtx.login(data.idToken, expireTokentime.toISOString());
          Navigate("/dash")
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <div className={classes.main}>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      <Form>
        {!isLogin && (
          <FormGroup className={classes.FormGroup}>
            <FormLabel className={classes.label}>First Name</FormLabel>
            <FormControl
              className={classes.input}
              type="text"
              name="firstname"
              id="firstname"
              ref={firstnameRef}
            ></FormControl>
          </FormGroup>
        )}
        {!isLogin && (
          <FormGroup className={classes.FormGroup}>
            <FormLabel className={classes.label}>Last Name</FormLabel>
            <FormControl
              className={classes.input}
              type="text"
              name="lastname"
              id="lastname"
              ref={lastNameRef}
            ></FormControl>
          </FormGroup>
        )}
        {!isLogin && (
          <FormGroup className={classes.FormGroup}>
            <FormLabel className={classes.label}>Username</FormLabel>
            <FormControl
              className={classes.input}
              type="text"
              name="Username"
              id="Username"
              ref={Username}
            ></FormControl>
          </FormGroup>
        )}
        {!isLogin && (
          <FormGroup className={classes.FormGroup}>
            <FormLabel className={classes.label}>ZipCode</FormLabel>
            <FormControl
              className={classes.input}
              type="text"
              name="zipCode"
              id="zipCode"
              ref={zipCode}
            ></FormControl>
          </FormGroup>
        )}
        <FormGroup className={classes.FormGroup}>
          <FormLabel className={classes.label}>Email</FormLabel>
          <FormControl
            className={classes.input}
            type="email"
            name="email"
            id="email"
            ref={emailInputRef}
          ></FormControl>
        </FormGroup>
        {!isLogin && (<FormGroup className={classes.FormGroup}>
            <FormLabel className={classes.label}>Mobile Number</FormLabel>
            <FormControl
              className={classes.input}
              type="number"
              name="number"
              id="number"
              ref={mobileNumberRef}
            ></FormControl>
          </FormGroup>)}
        <FormGroup className={classes.FormGroup}>
          <FormLabel className={classes.label}>Password</FormLabel>
          <FormControl
            className={classes.input}
            type="text"
            name="password"
            id="password"
            ref={passwordInputRef}
          ></FormControl>
        </FormGroup>
        {!isLogin && (
          <FormGroup className={classes.FormGroup}>
            <FormLabel className={classes.label}>confirm Password</FormLabel>
            <FormControl
              className={classes.input}
              type="text"
              name="Confirm password"
              id="Cpassword"
              ref={confirmPassword}
            ></FormControl>
          </FormGroup>
        )}
        <div>
          {!isLoading && <Button onClick={submitHandler}>{isLogin ? "Login" : "Register"}</Button>}
          {isLoading && <p>Sending request...</p>}
          <Button
            type="button"
            className={classes.btn}
            onClick={switchAuthModeHandler}
          >
            {isLogin
              ? "Not Have An Account Register"
              : "Login with existing account"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AuthForm;

{
  /* <form onSubmit={submitHandler}>
<div className={classes.control}>
  <label htmlFor='email'>Your Email</label>
  <input type='email' id='email' required ref={emailInputRef} />
</div>
<div className={classes.control}>
  <label htmlFor='password'>Your Password</label>
  <input
    type='password'
    id='password'
    required
    ref={passwordInputRef}
  />
</div>
<div className={classes.actions}>
  {!isLoading && (
    <button>{isLogin ? 'Login' : 'Create Account'}</button>
  )}
  {isLoading && <p>Sending request...</p>}
  <button
    type='button'
    className={classes.toggle}
    onClick={switchAuthModeHandler}
  >
    {isLogin ? 'Create new account' : 'Login with existing account'}
  </button>
</div>
</form> */
}

import { useRef, useState, useEffect } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const REGISTER_URL = "api/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccesss] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_REGEX.test(email) || !PWD_REGEX.test(pwd)) {
      setErrMsg("Invalid entry!");
      return;
    }
    try {
      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "appication/json",
        },
        body: JSON.stringify({ email, pwd }),
      });

      const data = await response.json();

      console.log(response.data);
      console.log(JSON.stringify(response));
      setSuccesss(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status === 409) {
        setErrMsg("Account with that email already exists.");
      } else {
        setErrMsg("Registration Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <div
      className="app d-flex justify-content-center 
                    align-items-center text-center vh-100 vw-100"
    >
      <div className="row d-flex justify-content-center align-items-stretch gap-4 p-4">
        <div
          className={"card p-4 shadow rounded m-4"}
          style={{ width: "400px" }}
        >
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live={"assertive"}
          >
            {errMsg}
          </p>
          <h1>Jerp Registration</h1>
          <form onSubmit={handleSubmit}>
            <div
              className={"form-floating mt-3 mb-3 input-group-has-validation"}
            >
              <input
                className={"form-control"}
                type={"email"}
                id={"email"}
                placeholder={"Enter email"}
                ref={userRef}
                autoComplete={"off"}
                name={"email"}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                aria-describedby={"emailnote"}
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
                required
              />
              <label htmlFor={"email"}>
                Email
                <span className={validEmail ? "valid" : "d-none"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validEmail || !email ? "d-none" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <p
                id={"emailnote"}
                className={
                  emailFocus && !validEmail ? "instructions" : "d-none"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must be valid email address.
              </p>
            </div>
            <div className={"form-floating mt-3 mb-3"}>
              <input
                type={"password"}
                className={"form-control"}
                id={"pwd"}
                placeholder={"Enter password"}
                name={"pwd"}
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                aria-invalid={validPwd ? "false" : "true"}
                aria-describedby={"pwdnote"}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
                required
              />
              <label htmlFor={"pwd"}>
                Password
                <span className={validPwd ? "valid" : "d-none"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !pwd ? "d-none" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <p
                id={"pwdnote"}
                className={pwdFocus && !validPwd ? "instructions" : "d-none"}
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                8 to 24 characters.
                <br />
                Must include uppercase and lowercase letters, a number and a
                special character [!@#$%].
                <br />
              </p>
            </div>
            <div className={"form-floating mt-3 mb-3"}>
              <input
                type={"password"}
                className={"form-control"}
                id={"pwd-confirmation"}
                placeholder={"Confirm password"}
                name={"pwd-confirmation"}
                onChange={(e) => setMatchPwd(e.target.value)}
                //value={pwd}
                aria-describedby={"confirmnote"}
                aria-invalid={validMatch ? "false" : "true"}
                onFocus={() => setMatchFocus(true)}
                onBlur={() => setMatchFocus(false)}
                required
              />
              <label htmlFor={"pwd-confirmation"}>
                Confirm Password
                <span className={validMatch && matchPwd ? "valid" : "d-none"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={validMatch || !matchPwd ? "d-none" : "invalid"}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <p
                id={"confirmnote"}
                className={
                  matchFocus && !validMatch ? "instructions" : "d-none"
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Must match the first password input field.
              </p>
            </div>
            <div className="row pt-3 justify-content-center">
              <div className="col d-flex">
                <button
                  disabled={!validEmail || !validPwd || !validMatch}
                  className={"btn btn-primary btn-lg w-100"}
                  type="submit"
                >
                  Register
                </button>
              </div>
              <div className="col d-flex">
                <button
                  className={"btn btn-secondary btn-lg w-100"}
                  type="button"
                >
                  <a href="/api/login" style={{textDecoration: "none", color: "white"}}>Login</a>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

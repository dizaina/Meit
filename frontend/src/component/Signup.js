import { useState, useContext } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  makeStyles,
  Paper,
  MenuItem,
  Input,
} from "@material-ui/core";
import axios from "axios";
import { Redirect } from "react-router-dom";
import ChipInput from "material-ui-chip-input";
import DescriptionIcon from "@material-ui/icons/Description";
import FaceIcon from "@material-ui/icons/Face";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/material.css";

import PasswordInput from "../lib/PasswordInput";
import EmailInput from "../lib/EmailInput";
import FileUploadInput from "../lib/FileUploadInput";
import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import isAuth from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  body: {
    padding: "60px 60px",
  },
  inputBox: {
    width: "400px",
  },
  submitButton: {
    width: "400px",
  },
}));

const MultifieldInput = (props) => {
  const classes = useStyles();
  const { education, setEducation } = props;

  return (
    <>
      {education.map((obj, key) => (
        <Grid
          item
          container
          className={classes.inputBox}
          key={key}
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <Grid item xs={6}>
            <TextField
              label={`Institution Name #${key + 1}`}
              value={education[key].institutionName}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].institutionName = event.target.value;
                setEducation(newEdu);
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Start Year"
              value={obj.startYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].startYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="End Year"
              value={obj.endYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].endYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            setEducation([
              ...education,
              {
                institutionName: "",
                startYear: "",
                endYear: "",
              },
            ])
          }
          className={classes.inputBox}
        >
          Add another institution details
        </Button>
      </Grid>
    </>
  );
};

const Login = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [loggedin, setLoggedin] = useState(isAuth());

  const [signupDetails, setSignupDetails] = useState({
    type: "applicant",
    email: "",
    password: "",
    name: "",
    education: [],
    skills: [],
    resume: "",
    profile: "",
    bio: "",
    gender:"",
    contactNumber: "",
  });

  const [phone, setPhone] = useState("");

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    totalExperience: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    currentCTC: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    expectedCTC: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    noticePeriod: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    gender: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    currentEmployer: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    currentLocation: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    relevantExperience: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    }
  });

  const handleInput = (key, value) => {
    setSignupDetails({
      ...signupDetails,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    });
  };

  const handleLogin = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    console.log(education);

    let updatedDetails = {
      ...signupDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
    };

    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  const handleLoginRecruiter = () => {
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    let updatedDetails = {
      ...signupDetails,
    };
    if (phone !== "") {
      updatedDetails = {
        ...signupDetails,
        contactNumber: `+${phone}`,
      };
    } else {
      updatedDetails = {
        ...signupDetails,
        contactNumber: "",
      };
    }

    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    console.log(updatedDetails);

    if (verified) {
      axios
        .post(apiList.signup, updatedDetails)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("type", response.data.type);
          setLoggedin(isAuth());
          setPopup({
            open: true,
            severity: "success",
            message: "Logged in successfully",
          });
          console.log(response);
        })
        .catch((err) => {
          setPopup({
            open: true,
            severity: "error",
            message: err.response.data.message,
          });
          console.log(err.response);
        });
    } else {
      setInputErrorHandler(tmpErrorHandler);
      setPopup({
        open: true,
        severity: "error",
        message: "Incorrect Input",
      });
    }
  };

  return loggedin ? (
    <Redirect to="/" />
  ) : (
    <Paper elevation={3} className={classes.body}>
      <Grid container direction="column" spacing={4} alignItems="center">
        <Grid item>
          <Typography variant="h3" component="h2">
            Signup
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            select
            label="Category"
            variant="outlined"
            className={classes.inputBox}
            value={signupDetails.type}
            onChange={(event) => {
              handleInput("type", event.target.value);
            }}
          >
            <MenuItem value="applicant">Applicant</MenuItem>
            <MenuItem value="recruiter">Recruiter</MenuItem>
          </TextField>
        </Grid>
        <Grid item>
          <TextField
            label="Name"
            value={signupDetails.name}
            onChange={(event) => handleInput("name", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.name.error}
            helperText={inputErrorHandler.name.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("name", true, "Name is required");
              } else {
                handleInputError("name", false, "");
              }
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <EmailInput
            label="Email"
            value={signupDetails.email}
            onChange={(event) => handleInput("email", event.target.value)}
            inputErrorHandler={inputErrorHandler}
            handleInputError={handleInputError}
            className={classes.inputBox}
            required={true}
          />
        </Grid>
        <Grid item>
          <PasswordInput
            label="Password"
            value={signupDetails.password}
            onChange={(event) => handleInput("password", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.password.error}
            helperText={inputErrorHandler.password.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("password", true, "Password is required");
              } else {
                handleInputError("password", false, "");
              }
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="Total Experience"
            value={signupDetails.totalExperience}
            onChange={(event) => handleInput("totalExperience", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.totalExperience.error}
            helperText={inputErrorHandler.totalExperience.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("totalExperience", true, "Experience is required");
              } else {
                handleInputError("totalExperience", false, "");
              }
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Relevant Experience"
            value={signupDetails.relevantExperience}
            onChange={(event) => handleInput("relevantExperience", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.relevantExperience.error}
            helperText={inputErrorHandler.relevantExperience.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("relevantExperience", true, "Experience is required");
              } else {
                handleInputError("relevantExperience", false, "");
              }
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Current CTC"
            value={signupDetails.currentCTC}
            onChange={(event) => handleInput("currentCTC", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.currentCTC.error}
            helperText={inputErrorHandler.currentCTC.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("currentCTC", true, "Current CTC is required");
              } else {
                handleInputError("currentCTC", false, "");
              }
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Expected CTC"
            value={signupDetails.expectedCTC}
            onChange={(event) => handleInput("expectedCTC", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.expectedCTC.error}
            helperText={inputErrorHandler.expectedCTC.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("expectedCTC", true, "Expected CTC is required");
              } else {
                handleInputError("expectedCTC", false, "");
              }
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Notice Period"
            value={signupDetails.noticePeriod}
            onChange={(event) => handleInput("noticePeriod", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.noticePeriod.error}
            helperText={inputErrorHandler.noticePeriod.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("noticePeriod", true, "Expected CTC is required");
              } else {
                handleInputError("noticePeriod", false, "");
              }
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Current Employer"
            value={signupDetails.currentEmployer}
            onChange={(event) => handleInput("currentEmployer", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.currentEmployer.error}
            helperText={inputErrorHandler.currentEmployer.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("currentEmployer", true, "Expected CTC is required");
              } else {
                handleInputError("currentEmployer", false, "");
              }
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            label="Current Location"
            value={signupDetails.currentLocation}
            onChange={(event) => handleInput("currentLocation", event.target.value)}
            className={classes.inputBox}
            error={inputErrorHandler.currentLocation.error}
            helperText={inputErrorHandler.currentLocation.message}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("currentLocation", true, "Expected CTC is required");
              } else {
                handleInputError("currentLocation", false, "");
              }
            }}
            variant="outlined"
          />
        </Grid>
        <Grid item>
          <TextField
            select
            label="Gender"
            variant="outlined"
            className={classes.inputBox}
            value={signupDetails.gender}
            onChange={(event) => {
              handleInput("gender", event.target.value);
            }}
            onBlur={(event) => {
              if (event.target.value === "") {
                handleInputError("gender", true, "Gender is required");
              } else {
                handleInputError("gender", false, "");
              }
            }}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </TextField>
        </Grid>
        {signupDetails.type === "applicant" ? (
          <>
            <MultifieldInput
              education={education}
              setEducation={setEducation}
            />
            <Grid item>
              <ChipInput
                className={classes.inputBox}
                label="Skills"
                variant="outlined"
                helperText="Press enter to add skills"
                onChange={(chips) =>
                  setSignupDetails({ ...signupDetails, skills: chips })
                }
              />
            </Grid>
            <Grid item>
              <FileUploadInput
                className={classes.inputBox}
                label="Resume (.pdf)"
                icon={<DescriptionIcon />}
                // value={files.resume}
                // onChange={(event) =>
                //   setFiles({
                //     ...files,
                //     resume: event.target.files[0],
                //   })
                // }
                uploadTo={apiList.uploadResume}
                handleInput={handleInput}
                identifier={"resume"}
              />
            </Grid>
            <Grid item>
              <FileUploadInput
                className={classes.inputBox}
                label="Profile Photo (.jpg/.png)"
                icon={<FaceIcon />}
                // value={files.profileImage}
                // onChange={(event) =>
                //   setFiles({
                //     ...files,
                //     profileImage: event.target.files[0],
                //   })
                // }
                uploadTo={apiList.uploadProfileImage}
                handleInput={handleInput}
                identifier={"profile"}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid item style={{ width: "100%" }}>
              <TextField
                label="Bio (upto 250 words)"
                multiline
                rows={8}
                style={{ width: "100%" }}
                variant="outlined"
                value={signupDetails.bio}
                onChange={(event) => {
                  if (
                    event.target.value.split(" ").filter(function (n) {
                      return n != "";
                    }).length <= 250
                  ) {
                    handleInput("bio", event.target.value);
                  }
                }}
              />
            </Grid>
            <Grid item>
              <PhoneInput
                country={"in"}
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
            </Grid>
          </>
        )}

        <Grid item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              signupDetails.type === "applicant"
                ? handleLogin()
                : handleLoginRecruiter();
            }}
            className={classes.submitButton}
          >
            Signup
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Login;

// {/* <Grid item>
//           <PasswordInput
//             label="Re-enter Password"
//             value={signupDetails.tmpPassword}
//             onChange={(event) => handleInput("tmpPassword", event.target.value)}
//             className={classes.inputBox}
//             labelWidth={140}
//             helperText={inputErrorHandler.tmpPassword.message}
//             error={inputErrorHandler.tmpPassword.error}
//             onBlur={(event) => {
//               if (event.target.value !== signupDetails.password) {
//                 handleInputError(
//                   "tmpPassword",
//                   true,
//                   "Passwords are not same."
//                 );
//               }
//             }}
//           />
//         </Grid> */}

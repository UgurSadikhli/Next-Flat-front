import React, { useEffect, useState } from "react";
import styles from "./RegisterPage.module.css";
import hederImg from "../../img/hederIco.jpg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AvatarInput from "../../components/avatarinput/AvatartInput";
import backIco from "../../../src/icons/back.png";

const Register = () => {
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    age: "",
    phone_num: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile_image: "",
  });

  const [termsAccepted, setTermsAccepted] = useState(false);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = () => {
    setTermsAccepted((prev) => !prev);
  };
  const gotologin =()=>{
    navigate("/login")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!termsAccepted) {
      alert("You must agree to the terms and conditions.");
      return;
    }

    const newUser = {
      ...formData,
      apartment_ids: ["1"], 
    };

    try {
     // "http://localhost:3000/users"
      const response = await fetch("https://api.nextflat.my/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        alert("User successfully registered!");
        navigate("/");
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const theme = createTheme({
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'goldenrod', 
              },
            },
            '& .MuiInputLabel-root': {
              color: 'gray', 
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'orange', 
            },
            '& .MuiInputLabel-root[data-shrink="true"]': {
              color: 'goldenrod', 
            },
          },
        },
      },
    },
  });

  return (
    <>
      <div className={styles.full}>
        <div>
          <div className={styles.heder}>
            <img
              src={hederImg}
              alt="Next Flat"
              className={styles.animated_image}
              onClick={() => navigate("/")}
            />
          </div>
          <hr className={styles.bottomHR} />
        </div>
        <div>
        <button
            className={styles.backbtn}
            onClick={() => navigate("/")}
          >
            <img className={styles.backIco} alt="" src={backIco} />
            {t("Back")}
          </button>
        </div>
        <div className={styles.body}>
          <div className={styles.formBody}>
            <ThemeProvider theme={theme}>
              <div className={styles.formBodyLeftMain}>
                <AvatarInput
                  setProfileImage={(url) => setFormData((prev) => ({ ...prev, profile_image: url }))} // Update profile image state
                />
                <div className={styles.formBodyLeft}>
                  <div className={styles.formBodyLeftC1}>
                    <TextField
                      id="name"
                      name="name"
                      label={t("Name")}
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                    <TextField
                      id="email"
                      name="email"
                      label={t("Email")}
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <TextField
                      id="password"
                      name="password"
                      label={t("Password")}
                      type="password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    <TextField
                      id="country"
                      name="country"
                      label={t("Country")}
                      value={formData.country}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className={styles.formBodyLeftC2}>
                    <TextField
                      id="surname"
                      name="surname"
                      label={t("Surname")}
                      value={formData.surname}
                      onChange={handleInputChange}
                    />
                    <TextField
                      id="phone_num"
                      name="phone_num"
                      label={t("Phone number")}
                      value={formData.phone_num}
                      onChange={handleInputChange}
                    />
                    <TextField
                      id="confirmPassword"
                      name="confirmPassword"
                      label={t("Re-Password")}
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                    <TextField
                      id="age"
                      name="age"
                      label={t("Age")}
                      value={formData.age}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className={styles.labelDiv}>
                  <label className={styles.termsLabele}>
                    <input type="checkbox" onChange={handleCheckboxChange} />
                    {t("agreeWithTerms")}
                  </label>
                  <div className={styles.GotoLogin} onClick={gotologin} >
                    {t("login")}
                  </div>
                </div>
              </div>
            </ThemeProvider>
            <button className={styles.ButtonCreate} onClick={handleSubmit}>
              {t("create")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;

import React, { useEffect, useState } from "react";
import styles from "./LoginPage.module.css";
import hederImg from "../../img/hederIco.jpg";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import backIco from "../../../src/icons/back.png";

const Login = () => {
  const lang = localStorage.getItem("language");
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState(""); 
  const [loading, setLoading] = useState(false); 

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); 
    setErrorMessage(""); 

    const { email, password } = formData;

    try {

      // "https://api.nextflat.my/login"
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(data.user)); 

        navigate("/");
      } else {

        const data = await response.json();
        setErrorMessage(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false); 
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
                <div className={styles.formBodyLeft}>
                  <div className={styles.formBodyLeftC1}>
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
                  </div>
                </div>
              </div>
            </ThemeProvider>
            
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            
            <button className={styles.ButtonCreate} onClick={handleSubmit} disabled={loading}>
              {loading ? "Logging in..." : t("login")}
            </button> 
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

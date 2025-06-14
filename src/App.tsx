import React, { useEffect } from "react";
import "./App.css";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import CircularProgress from "@mui/material/CircularProgress";
import SideBar from "./components/SideBar";
import Home from "./components/Home";
import Alert from "@mui/material/Alert";
import NightlightIcon from "@mui/icons-material/Nightlight";
import { InfoTooltip } from "./components/CustomComponents";
//? Router & Transitions
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import Experience from "./components/Experience";
import PersonalProjects from "./components/PersonalProjects";

const VERSION = "2.0.6";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}
function App() {
  const EmailAddress = "KareemTahaIsmail@gmail.com";

  const [openEmailSnackbar, setOpenEmailSnackbar] = React.useState(false);
  const [openInfoSnackbar, setOpenInfoSnackbar] = React.useState(true);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    // Clear timeout when component unmounts to avoid memory leaks
    return () => clearTimeout(timer);
  }, []);

  const handleEmailClick = () => {
    navigator.clipboard
      .writeText(EmailAddress)
      .then(() => {
        setOpenEmailSnackbar(true);
      })
      .catch((error) => {
        console.error("Failed to copy email: ", error);
      });
  };

  const handleCloseEmailSnackbar = () => {
    setOpenEmailSnackbar(false);
  };

  const handleCloseInfoSnackbar = () => {
    setOpenInfoSnackbar(false);
  };

  return (
    <>
      <div className="App">
        <div className="moon">
          <InfoTooltip
            arrow
            placement="left"
            title="Dark/Light Mode switch coming soon!"
          >
            <NightlightIcon fontSize="large" sx={{ color: "white" }} />
          </InfoTooltip>
        </div>
        <div className="box bar">
          <SideBar version={VERSION} onEmailClick={handleEmailClick} />
        </div>
        <div className="loader" style={{ display: loading ? "block" : "none" }}>
          <CircularProgress
            sx={{
              color: "#646cff",
            }}
          />
        </div>
        <div
          className="box everything"
          style={{
            display: loading ? "none" : "flex",
          }}
        >
          <BrowserRouter basename="/portfolio">
            <Routes>
              <Route
                path="/"
                element={
                  <TransitionGroup>
                    <CSSTransition key="home" classNames="slide" timeout={300}>
                      <Home />
                    </CSSTransition>
                  </TransitionGroup>
                }
              />
              <Route
                path="/experience"
                element={
                  <TransitionGroup>
                    <CSSTransition
                      key="experience"
                      classNames="slide"
                      timeout={300}
                    >
                      <Experience />
                    </CSSTransition>
                  </TransitionGroup>
                }
              />
              <Route
                path="/projects"
                element={
                  <TransitionGroup>
                    <CSSTransition
                      key="projects"
                      classNames="slide"
                      timeout={300}
                    >
                      <PersonalProjects />
                    </CSSTransition>
                  </TransitionGroup>
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
      <div className="snackBar">
        {openEmailSnackbar && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={openEmailSnackbar}
            onClose={handleCloseEmailSnackbar}
            autoHideDuration={3000}
            TransitionComponent={SlideTransition}
          >
            <Alert
              onClose={handleCloseEmailSnackbar}
              severity="success"
              variant="filled"
              sx={{
                width: "100%",
                backgroundColor: "#646cff",
                color: "white",
                borderRadius: "40px",
              }}
            >
              Email copied to clipboard!
            </Alert>
          </Snackbar>
        )}
      </div>
      {loading ? null : (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={openInfoSnackbar}
          autoHideDuration={5000}
          TransitionComponent={SlideTransition}
        >
          <Alert
            onClose={handleCloseInfoSnackbar}
            severity="info"
            variant="filled"
            className="unselectable"
            sx={{
              width: "100%",
              backgroundColor: "white",
              color: "black",
              borderRadius: "20px",
              fontSize: "3vh",
              textAlign: "center",
            }}
          >
            <span className="navInfoAlertLargeScreen">
             <i>If you have a touch screen</i>, feel free to{" "}
              <b>swipe up & down</b>!
            </span>
            <span className="navInfoAlertSmallScreen">
              Feel free to <b>swipe up & down</b>!
            </span>
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default App;

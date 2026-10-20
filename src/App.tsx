import React from "react";
import "./App.css";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import SideBar from "./components/SideBar";
import Home from "./components/Home";
import Alert from "@mui/material/Alert";
//? Router & Transitions
import { CSSTransition, TransitionGroup } from "react-transition-group";
// HashRouter so deep links (e.g. /#/experience) work on GitHub Pages
import { HashRouter, Route, Routes } from "react-router-dom";
import Experience from "./components/Experience";
import PersonalProjects from "./components/PersonalProjects";
import PageDots from "./components/PageDots";

const VERSION = "2.1.0";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}
function App() {
  const EmailAddress = "KareemTahaIsmail@gmail.com";

  const [openEmailSnackbar, setOpenEmailSnackbar] = React.useState(false);
  const [openInfoSnackbar, setOpenInfoSnackbar] = React.useState(true);

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
        <div className="box bar">
          <SideBar version={VERSION} onEmailClick={handleEmailClick} />
        </div>
        <div className="box everything">
          <HashRouter>
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
            <PageDots />
          </HashRouter>
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
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openInfoSnackbar}
        onClose={handleCloseInfoSnackbar}
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
            <b>Scroll</b>, <b>swipe</b>, or use the <b>arrow keys</b> to navigate!
          </span>
          <span className="navInfoAlertSmallScreen">
            Feel free to <b>swipe up & down</b>!
          </span>
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;

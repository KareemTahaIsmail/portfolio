import React from "react";
import "./App.css";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import SideBar from "./components/SideBar";
import AboutMe from "./components/AboutMe";
import FlipCard from "./components/FlipCard";
import Alert from "@mui/material/Alert";
import NightlightIcon from "@mui/icons-material/Nightlight";
//? Router & Transitions
import { CSSTransition, TransitionGroup } from "react-transition-group";
import {
  BrowserRouter as BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

const VERSION = "1.0.0";

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
        <NightlightIcon className="moon" fontSize="large" />
        <div className="box sideBar">
          <SideBar version={VERSION} onEmailClick={handleEmailClick} />
        </div>
        <div className="box main">
          <BrowserRouter>
            <Routes>
              <Route
                path="/portfolio"
                element={
                  <TransitionGroup>
                    <CSSTransition key="about" classNames="slide" timeout={300}>
                      <AboutMe />
                    </CSSTransition>
                  </TransitionGroup>
                }
              />
              <Route
                path="/portfolio/flipcard"
                element={
                  <TransitionGroup>
                    <CSSTransition
                      key="flipcard"
                      classNames="slide"
                      timeout={300}
                    >
                      <FlipCard />
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
          sx={{
            width: "100%",
            backgroundColor: "white",
            color: "black",
            borderRadius: "40px",
            fontSize: "18px",
          }}
        >
          Try scrolling up or down!
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;

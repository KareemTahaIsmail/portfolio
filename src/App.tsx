import React from "react";
import "./App.css";
import Snackbar from "@mui/material/Snackbar";
import Slide, { SlideProps } from "@mui/material/Slide";
import Alert from "@mui/material/Alert";
import Home from "./components/Home";
import Experience from "./components/Experience";
import PersonalProjects from "./components/PersonalProjects";
import SectionDivider from "./components/SectionDivider";
import Watermark from "./assets/images/Watermark.png";
import { profile } from "./content";

const VERSION = "2.1.0";

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="up" />;
}

function App() {
  const [openEmailSnackbar, setOpenEmailSnackbar] = React.useState(false);

  const handleEmailClick = () => {
    navigator.clipboard
      .writeText(profile.email)
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

  return (
    <>
      <main className="pages">
        <Home onEmailClick={handleEmailClick} />
        <SectionDivider scene="run" />
        <Experience />
        <SectionDivider scene="moves" />
        <PersonalProjects />
      </main>
      <footer className="siteFooter">
        <img draggable="false" src={Watermark} alt="" />
        <p>v{VERSION}</p>
      </footer>
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
            backgroundColor: "#27272a",
            color: "#f4f4f5",
            borderRadius: "40px",
          }}
        >
          Email copied to clipboard!
        </Alert>
      </Snackbar>
    </>
  );
}

export default App;

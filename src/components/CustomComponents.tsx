import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

export const DemonTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    color: "black",
    backgroundColor: "#d2d3fc",
    fontSize: "12px",
    fontFamily: "silkscreen",
    borderRadius: "10px",
    border: "2px solid #646cff",
    padding: "5%",
  },
});


export const InfoTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))({
    [`& .${tooltipClasses.tooltip}`]: {
      color: "black",
      backgroundColor: "white",
      fontSize: 14,
      fontFamily: "Tahoma",
      
      borderRadius: "10px",
      border: "2px solid black",
      padding: "5%",
    },
  });

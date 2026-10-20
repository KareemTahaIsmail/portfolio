import { styled } from "@mui/material/styles";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";

export const DemonTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    color: "black",
    backgroundColor: "#e4e4e7",
    fontSize: "12px",
    fontFamily: "silkscreen",
    borderRadius: "10px",
    border: "2px solid #18181b",
    padding: "5%",
  },
});

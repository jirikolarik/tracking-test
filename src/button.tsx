import React from "react";
import {
  useAppInsightsContext,
  useTrackEvent,
} from "@microsoft/applicationinsights-react-js";

type ButtonProps = {
  onClick: () => void;
  // children: React.ReactNode;
  text: string;
};

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  const appInsights = useAppInsightsContext();
  const trackCheckout = useTrackEvent<{ text: string }>(appInsights, "Click", {
    text,
  });

  const handleClick = () => {
    trackCheckout({ text });
    onClick();
  };

  return <button onClick={handleClick}>{text}</button>;
};

export default Button;

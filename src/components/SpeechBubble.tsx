import React from "react";
import "./styles/SpeechBubble.css";
interface Props {
    text: JSX.Element
}

const SpeechBubble = ({ text }: Props) => {
    return (
        <div id="speech-bubble">
            <div id="bub-part-a"></div>
            <div id="bub-part-b"></div>
            <div id="bub-part-c"></div>
            <div id="speech-txt">{text}</div>
            <div id="bub-part-c"></div>
            <div id="bub-part-b"></div>
            <div id="bub-part-a"></div>

            <div id="speech-arrow">
                <div id="arrow-w"></div>
                <div id="arrow-x"></div>
                <div id="arrow-y"></div>
                <div id="arrow-z"></div>
            </div>
        </div>
    );
}

export default SpeechBubble;
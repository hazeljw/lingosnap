import React from "react";
import "./styles.css";


function RainbowTitle() {

  return (

    <div style={{width: "100%", position: 'absolute', zIndex: -1, top: '-10vw'}}>
        <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" viewBox="0 0 800 400">
            <path className='path' fill="none" stroke="#d84b3b" stroke-width="41"  stroke-dasharray='500' d="M-86.322 385.387Q178.305 238.77 362.982 238.77c184.676 0 305.576 90.81 547.695 113.134" transform="matrix(.86697 0 0 .8112 39.482 -126.35)"/>
            
            <path className='path pathDash' fill="none" stroke="#6e47ba" stroke-width="40.5" d="M-86.322 385.387Q178.305 238.77 362.982 238.77c184.676 0 305.576 90.81 547.695 113.134" transform="matrix(.86697 0 0 .8112 39.482 -126.35)"/>
            {/* <path  className='path'fill="none" stroke="#5ce37a" stroke-width="45" d="M-86.322 385.387Q178.305 238.77 362.982 238.77c184.676 0 305.576 90.81 547.695 113.134" transform="matrix(.86697 0 0 .8112 39.482 -93.706)"/> */}
            
            <path className='path pathDash' fill="none" stroke="#d84b3b" stroke-width="41"  d="M-86.322 385.387Q178.305 238.77 362.982 238.77c184.676 0 305.576 90.81 547.695 113.134" transform="matrix(.86697 0 0 .8112 45.83 -47.736)"/>

            <path className='path' fill="none" stroke="#6e47ba" stroke-width="42"  stroke-dasharray='500' d="M-86.322 385.387Q178.305 238.77 362.982 238.77c184.676 0 305.576 90.81 547.695 113.134" transform="matrix(.86697 0 0 .8112 45.83 -47.736)"/>


            <path fill="none" stroke="#6e47ba" stroke-width="40" d="M-86.322 385.387Q178.305 238.77 362.982 238.77c184.676 0 305.576 90.81 547.695 113.134" transform="matrix(.86697 0 0 .8112 39.482 -126.35)"/>
            <path fill="none" stroke="#5ce37a" stroke-width="40" d="M-86.322 385.387Q178.305 238.77 362.982 238.77c184.676 0 305.576 90.81 547.695 113.134" transform="matrix(.86697 0 0 .8112 39.482 -93.706)"/>
            <path fill="none" stroke="#f3a738" stroke-width="40" d="M-86.322 385.387Q178.305 238.77 362.982 238.77c184.676 0 305.576 90.81 547.695 113.134" transform="matrix(.86697 0 0 .8112 39.482 -66.883)"/>
            <path fill="none" stroke="#d84b3b" stroke-width="40" d="M-86.322 385.387Q178.305 238.77 362.982 238.77c184.676 0 305.576 90.81 547.695 113.134" transform="matrix(.86697 0 0 .8112 45.83 -47.736)"/>

        </svg>
    </div>

  );
}

export default RainbowTitle
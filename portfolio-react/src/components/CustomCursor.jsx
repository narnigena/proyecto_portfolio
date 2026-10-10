import { useEffect, useState } from "react";

function CustomCursor() {

    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });

    const [hover, setHover] = useState(false);

    useEffect(() => {

        function moverCursor(event) {

            setPosition({
                x: event.clientX,
                y: event.clientY
            });

        }

        function comprobarHover(event) {

            const elemento = event.target.closest(
                "a, button, input, textarea"
            );

            setHover(Boolean(elemento));

        }

        window.addEventListener(
            "mousemove",
            moverCursor
        );

        window.addEventListener(
            "mouseover",
            comprobarHover
        );

        return () => {

            window.removeEventListener(
                "mousemove",
                moverCursor
            );

            window.removeEventListener(
                "mouseover",
                comprobarHover
            );

        };

    }, []);


    return (
        <div
            className={`custom-cursor ${
                hover ? "cursor-hover" : ""
            }`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`
            }}
        />
    );
}

export default CustomCursor;
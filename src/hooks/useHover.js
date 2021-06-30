import { useEffect, useState } from "react";

const useHover = (ref) => {
    const [hovered, setHoverState] = useState(false);

    const setTrue = () => setHoverState(true);
    const setFalse = () => setHoverState(false);

    // useEffect(() => {
        // if (!ref.current) {
            // return;
        // }
        
        ref.current.addEventListener("mouseenter", setTrue);
        ref.current.addEventListener("mousemove", setTrue);
        ref.current.addEventListener("mouseleave", setFalse);

        // return function () {
        //     ref.current.removeEventListener("mouseenter", setTrue);
        //     ref.current.removeEventListener("mousemove", setTrue);
        //     ref.current.removeEventListener("mouseleave", setFalse);
        // }
    // }, []);
    console.log(hovered);

    return hovered;
}

export default useHover;
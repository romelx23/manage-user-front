import { FC, useEffect, useState } from "react";

interface TopLoaderProps {
    showLoader: boolean;
}

export const TopLoader: FC<TopLoaderProps> = ({ showLoader }) => {
    const [isVisible, setIsVisible] = useState(false); // Manage visibility state
    console.log(showLoader);
    useEffect(() => {
        setIsVisible(showLoader); // Update visibility based on prop
    }, [showLoader]);
    return (
        <div className={`top-loader ${ isVisible ? 'active' : 'hidden' }`}>
            <div className="loading-bar"></div>
        </div>
        // <div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-50">
        //     <div className="h-1 bg-blue-300 animate-pulse"></div>
        // </div>
    )
}

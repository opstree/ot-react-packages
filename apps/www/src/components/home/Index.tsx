import React from "react";
import Home from "./Home";
import Footer from "../footer/Footer";
import LatestComponent from "../newcomponents/Newcomponent";
import { Techsection } from "../footer/Tech";
import ComponentGrid from "./ComponentsGrid";
import Navbar from "../navbar/Navbar";

const ComponentLibraryDemo = () => {
    return (
        <>
            <Navbar />
            <main className="w-screen min-h-screen">
                <div className="relative overflow-hidden bg-white pt-4 pb-40 md:pt-10 dark:bg-black">
                    <div className="mt-4 flex flex-col items-start px-2 md:px-8 xl:px-0">
                        <Home />
                    </div>
                </div>
            </main>
        </>
    );
};

export default ComponentLibraryDemo;
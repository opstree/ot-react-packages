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
                <div className="max-w-screen-xl mx-auto">
                    <Home />
                    <ComponentGrid />
                </div>
            </main>
        </>
    );
};

export default ComponentLibraryDemo;
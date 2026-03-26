import React from "react";
import Home from "./Home";
import Footer from "../footer/Footer";
import LatestComponent from "../newcomponents/Newcomponent";
import { Techsection } from "../footer/Tech";
import Navbar from "../navbar/Navbar";

const ComponentLibraryDemo = () => {
    return (
        <main className="w-screen h-full dark:bg-[var(--bg)] bg-neutral-100">
            <Navbar />
            <div className=" text-landing-foreground pt-4 pb-6 lg:px-2 dark:text-landing-foreground-dark md:pb-12">
                <Home />
                {/* <LatestComponent /> */}
                <Techsection />
                <Footer />
            </div>
        </main>
    );
};

export default ComponentLibraryDemo;
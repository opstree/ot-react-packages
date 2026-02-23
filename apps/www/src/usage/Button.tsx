import React from "react";
import NoiseBackgroundDemo from "../components/docs/Button";

export default function ButtonUsage() {
    return (
        <div className="flex flex-col gap-8 items-center justify-center p-8">
            <div className="flex flex-wrap gap-4 justify-center">
                <NoiseBackgroundDemo variant="default">
                    Default Button
                </NoiseBackgroundDemo>

                <NoiseBackgroundDemo variant="emerald">
                    Emerald Button
                </NoiseBackgroundDemo>

                <NoiseBackgroundDemo variant="fire">
                    Fire Button
                </NoiseBackgroundDemo>
            </div>
        </div>
    );
}

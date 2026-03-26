import React from "react"
import { Routes as ReactRouterRoutes, Route } from "react-router-dom"
import ComponentLibraryDemo from "../components/home/Index"
import DocsLayout from "../../app/docs/layout"
import Template from "../../template/page"
import NotFound from "../../404"

export const Routes = () => {
    return (
        <ReactRouterRoutes>
            <Route path="/" element={<ComponentLibraryDemo />} />
            <Route path="/docs" element={<DocsLayout />} />
            <Route path="/docs/*" element={<DocsLayout />} />
            <Route path="/template" element={<Template />} />
            <Route path="*" element={<NotFound />} />
        </ReactRouterRoutes>
    )
}
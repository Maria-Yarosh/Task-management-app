import { createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
export * from "./paths"

export const router = createBrowserRouter(routes)
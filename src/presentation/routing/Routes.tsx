import { createBrowserRouter } from "react-router";
import App from "../../app";
import ServerError from "../components/errors/ServerError";
import Post from "../pages/Post";
import Index from "../pages/Index";
import Comment from "../pages/Comment";
import Album from "../pages/Album";
import Product from "../pages/Product";
import Todo from "../pages/Todo";
import User from "../pages/User";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <Index /> },
            { path: "/posts", element: <Post /> },
            { path: "/comments", element: <Comment /> },
            { path: "/albums", element: <Album /> },
            { path: "/products", element: <Product /> },
            { path: "/todos", element: <Todo /> },
            { path: "/users", element: <User /> },
            { path: "/server-error", element: <ServerError /> },
        ]
    }
]);
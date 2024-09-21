import { createBrowserRouter } from "react-router-dom";
import Users from "../pages/Users";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
  },
  {
    path: "/:id",
    element: <Users />,
  },
]);
export default routes;

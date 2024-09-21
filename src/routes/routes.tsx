import { createBrowserRouter } from "react-router-dom";
import Users from "../pages/Users";
import EditUser from "../pages/EditUser";
import PageNotFound from "../pages/PageNotFound";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
  },
  {
    path: "/user/:id",
    element: <EditUser />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
export default routes;

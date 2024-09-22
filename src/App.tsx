import { RouterProvider } from "react-router-dom";
import "./App.css";
import routes from "./routes/routes";
import { Provider } from "react-redux";
import store from "./store/store";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={routes} />
      <Toaster />
    </Provider>
  );
}

export default App;

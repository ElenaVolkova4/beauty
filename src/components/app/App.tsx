import Header from "../header/Header";
import SchedulePage from "../../pages/schedule/SchedulePage";
// import HistoryPage from "../../pages/history/HistoryPage";
// import CancelModal from "../modal/CancelModal";
import "./app.scss";
import AppointmentContextProvider from "../../context/appointments/AppointmentsContext";
import { createBrowserRouter, Outlet } from "react-router-dom";
import { RouterProvider } from "react-router";
import HistoryPage from "../../pages/history/HistoryPage";
import PageNotFound from "../../pages/404/404";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <PageNotFound />,
      children: [
        {
          path: "/",
          element: <SchedulePage />,
        },
        {
          path: "/schedule",
          element: <SchedulePage />,
        },
        {
          path: "/history",
          element: <HistoryPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

function Root() {
  return (
    <main className="board">
      <Header />
      <AppointmentContextProvider>
        <Outlet />
      </AppointmentContextProvider>
    </main>
  );
}

export default App;

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import useAuth from "./hooks/useAuth";
import GustLayout from "./layout/GustLayout";
import ProtectedLayout from "./layout/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Table from "./pages/Table";
import AdminRoutes from "./routes/AdminRoutes";
import GustRoute from "./routes/GustRoute";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const { loading } = useAuth();
  const routes = createBrowserRouter([
    {
      path: "/sign-in",
      element: (
        <GustLayout>
          <GustRoute>
            <SignIn />
          </GustRoute>
        </GustLayout>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <GustLayout>
          <GustRoute>
            <SignUp />
          </GustRoute>
        </GustLayout>
      ),
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <ProtectedLayout>
            <Navbar />
            <div className="flex justify-center items-center h-full">
              <h2>Home</h2>
            </div>
          </ProtectedLayout>
        </ProtectedRoute>
      ),
    },
    {
      element: (
        <ProtectedRoute>
          <ProtectedLayout>
            <Profile />
          </ProtectedLayout>
        </ProtectedRoute>
      ),
      path: "/profile",
    },
    {
      element: (
        <ProtectedRoute>
          <ProtectedLayout>
            <Dashboard />
          </ProtectedLayout>
        </ProtectedRoute>
      ),
      path: "/dashboard",
    },
    {
      element: (
        <ProtectedRoute>
          <AdminRoutes>
            <ProtectedLayout>
              <Navbar />
              <div className="flex justify-center items-center h-full">
                <h2>Billing</h2>
              </div>
            </ProtectedLayout>
          </AdminRoutes>
        </ProtectedRoute>
      ),
      path: "/billing",
    },
    {
      element: (
        <ProtectedRoute>
          <AdminRoutes>
            <ProtectedLayout>
              <Navbar />
              <Table />
            </ProtectedLayout>
          </AdminRoutes>
        </ProtectedRoute>
      ),
      path: "/tables",
    },
    { element: <h2 className=" text-center">Not Found Page!</h2>, path: "*" },
  ]);
  if (loading) return <h2>loading...</h2>;
  return (
    <main>
      <RouterProvider router={routes} />
    </main>
  );
}

export default App;

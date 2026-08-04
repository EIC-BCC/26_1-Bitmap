import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";
import PrivateRoute from "./components/PrivateRoute";
import NavBar from "./components/NavBar";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Hub from "./pages/Hub";
import Topic from "./pages/Topic";

const queryClient = new QueryClient();

export default function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/hub"
              element={
                <PrivateRoute>
                  <Hub />
                </PrivateRoute>
              }
            />
            <Route
              path="/topico/:id"
              element={
                <PrivateRoute>
                  <Topic />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

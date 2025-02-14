import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/auth-page/AuthPage";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./error-page/NotFound";
import Unauthorized from "./error-page/Unauthorized";
import { navigation, routes } from "./navigation";

const App = () => {
  return (
    <Routes>
      <Route index element={<AuthPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
        {navigation.map(({ key, path, component }) => (
          <Route id={key} key={key} path={path} element={component} />
        ))}
      </Route>
      {routes.map((item) => (
        <Route
          id={item.id}
          key={item.key}
          path={item.path}
          element={
            <ProtectedRoute accessibleRoles={item.roles}>
              {item.element}
            </ProtectedRoute>
          }
        />
      ))}
      <Route path="/403" element={<Unauthorized />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

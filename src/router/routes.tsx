import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Home } from "../features/home/pages/home";
import Login from "../features/auth/pages/Login";
import { Register } from "../features/auth/pages/Register";
import { Dashboard } from "../features/dashboard/pages/dashboard";
import { Protected, Redirect } from "./protected-routes";
import { NotFound } from "../features/shared/pages/not-found";
import {
  DashboardUsers,
  DashboardIncidents,
  DashboardAreas,
  // DashboardServices,
  // DashboardPriority,
  // DashboardSatifaction,
  DashboardSettings
} from "../features/dashboard/pages";
import { RolesLayout } from "../features/shared/layouts/RolesLayout";

// after
export const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/">
    <Route index element={<Home />} />
    <Route element={<Protected />}>
      {/* all view routes */}
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="dashboard/catalogos" element={<DashboardIncidents />} />
      <Route path="dashboard/settings" element={<DashboardSettings />} />
      {/* only admin view routes */}
      <Route
        path="dashboard/usuarios"
        element={
          <RolesLayout roles={["ADMIN_ROLE"]}>
            <DashboardUsers />
          </RolesLayout>
        }
      />

      {/* only monitor and admin show routes */}
      <Route
        path="dashboard/ambiente"
        element={
          <RolesLayout roles={["AMBIENT_ROLE", "ADMIN_ROLE"]}>
            <DashboardAreas />
          </RolesLayout>
        }
      />

      {/* All other routes that you want to protect will go inside here */}
    </Route>
    <Route
      path="auth"
      // loader={async () => await isAuthenticated()}
      element={<Redirect />}
    >
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route>
));
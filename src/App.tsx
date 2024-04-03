import { Authenticated, GitHubBanner, Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  ThemedLayoutV2,
  ThemedSiderV2,
  useNotificationProvider,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider, liveProvider } from "./providers";

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
// import { Header } from "./components/header";
// import { ColorModeContextProvider } from "./contexts/color-mode";

import { Layout } from "./components/layout";
import { DashboardPage, Login } from "./pages";
import { resources } from "./config/resources";
import { CompanyCreatePage, CompanyEditPage, CompanyListPage } from "./pages/companies";
import { TasksCreatePage, TasksEditPage, TasksListPage } from "./pages/tasks";

function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "5q7Pnw-DUK58j-n5MopG",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route
                      element={
                        <Authenticated
                          key="authenticated-layout"
                          fallback={<CatchAllNavigate to="/login" />}
                        >
                          <Layout>
                            <Outlet />
                          </Layout>
                        </Authenticated>
                      }
                    >
                      <Route index element={<DashboardPage />} />

                      <Route
                        path="/tasks"
                        element={
                          <TasksListPage>
                            <Outlet />
                          </TasksListPage>
                        }
                      >
                        <Route path="new" element={<TasksCreatePage />} />
                        <Route path="edit/:id" element={<TasksEditPage />} />
                      </Route>

                      <Route path="/companies">
                        <Route index element={<CompanyListPage />} />
                        <Route path="new" element={<CompanyCreatePage />} />
                        <Route path="edit/:id" element={<CompanyEditPage />} />
                      </Route>

                      <Route path="*" element={<ErrorComponent />} />
                  </Route>
                
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-auth"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource resource="dashboard" />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

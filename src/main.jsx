import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "dayjs/locale/ru";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/notifications/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ChangePassPage from "./pages/ChangePassPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import ForgotPassPage from "./pages/ForgotPassPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import OTPPage from "./pages/OTPPage.jsx";
import OperatorsDetailPage from "./pages/OperatorsDetailPage.jsx";
import OperatorsPage from "./pages/OperatorsPage.jsx";
import RolesPage from "./pages/RolesPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import UsersPage from "./pages/UsersPage.jsx";

const theme = createTheme({
    /** Put your mantine theme override here */
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/signup",
        element: <SignUpPage />,
    },
    {
        path: "/changepassword",
        element: <ChangePassPage />,
    },
    {
        path: "/otp",
        element: <OTPPage />,
    },
    {
        path: "/forgotpass",
        element: <ForgotPassPage />,
    },
    {
        path: "/main/",
        element: <Layout />,
        children: [
            {
                path: "/main/",
                element: <div>Home</div>,
            },
            {
                path: "/main/users",
                element: <UsersPage />,
            },
            {
                path: "/main/roles",
                element: <RolesPage />,
            },
            {
                path: "/main/operators",
                element: <OperatorsPage />,
            },
            {
                path: "/main/operators/:id",
                element: <OperatorsDetailPage />,
            },
            {
                path: "*",
                element: <ErrorPage />,
            },
        ],
    },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
    <StrictMode>
        {/* khong can quan tam */}
        <QueryClientProvider client={queryClient}>
            {/* provider cua thu vien ui */}
            <MantineProvider theme={theme}>
                {/* toast thong bao */}
                <Notifications />
                {/* routes */}
                <DatesProvider
                    settings={{ locale: "vn", firstDayOfWeek: 1, timezone: "Asia/Ho_Chi_Minh" }}
                >
                    <RouterProvider router={router} />
                </DatesProvider>
            </MantineProvider>
        </QueryClientProvider>
    </StrictMode>,
);

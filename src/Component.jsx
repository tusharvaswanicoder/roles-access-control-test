import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import {
    and,
    ComponentAccess,
    RouteAccess,
    useComponentAccess,
} from "roles-access-control";
import { Button, Case, Cases, Links, LoginLogoutContainer } from "./styles";

const Component = ({ currentUserRole, setCurrentUserRole, rolesAccesses }) => {
    const [isLoading, isPermissionsValid] = useComponentAccess({
        allowedRoles: ["user", "admin", "staff"],
        permissionsRequired: and("read", "update"),
    });
    return (
        <>
            <LoginLogoutContainer>
                {currentUserRole &&
                    `You are logged in as ${currentUserRole} and have ${rolesAccesses[currentUserRole]} permission(s).`}
                {currentUserRole ? (
                    <Button onClick={() => setCurrentUserRole(null)}>
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button onClick={() => setCurrentUserRole("user")}>
                            Login as user
                        </Button>
                        <Button onClick={() => setCurrentUserRole("admin")}>
                            Login as admin
                        </Button>
                        <Button onClick={() => setCurrentUserRole("staff")}>
                            Login as staff
                        </Button>
                    </>
                )}
            </LoginLogoutContainer>
            <Cases>
                <Case>
                    If you have delete access then you would see hello otherwise
                    you would see hi.
                    <ComponentAccess
                        allowedRoles={["user", "admin"]}
                        permissionsRequired="delete"
                        fallbackComponent={<div>Hi</div>}
                    >
                        <div>Hello</div>
                    </ComponentAccess>
                </Case>
                <Case style={isPermissionsValid ? { color: "green" } : {}}>
                    If you have read and update access then the text color would
                    turn to green
                </Case>
            </Cases>
            <Links>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/dashboard">
                    Dashboard
                    {!currentUserRole &&
                        "(redirection would happen as you are not logged in)"}
                </NavLink>
                <NavLink to="/admin">
                    Admin
                    {currentUserRole !== "admin" &&
                        "(you would see an error message)"}
                </NavLink>
            </Links>
            <Routes>
                <Route path="/" element={<>Everyone can access me</>} />
                <Route
                    path="/dashboard"
                    element={
                        <RouteAccess
                            allowedRoles={["user", "admin", "staff"]}
                            redirectTo="/"
                        >
                            Congrats You can access dashboard
                        </RouteAccess>
                    }
                />
                <Route
                    path="/admin"
                    element={
                        <RouteAccess
                            allowedRoles={["admin"]}
                            fallbackComponent={<>This is admin's only page</>}
                        >
                            Congrats you can access admin page.
                        </RouteAccess>
                    }
                />
            </Routes>
        </>
    );
};

export default Component;

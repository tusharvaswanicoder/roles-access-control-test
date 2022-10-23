import { useState } from "react";
import { RolesAccessControlContextProvider } from "roles-access-control";
import "./App.css";
import Component from "./Component";

const rolesAccesses = {
    user: ["read"],
    staff: ["read", "update"],
    admin: ["read", "write", "update", "delete"],
};

function App() {
    const [currentUserRole, setCurrentUserRole] = useState(null);
    return (
        <RolesAccessControlContextProvider
            currentUserRole={currentUserRole}
            rolesAccesses={rolesAccesses}
        >
            <Component
                rolesAccesses={rolesAccesses}
                currentUserRole={currentUserRole}
                setCurrentUserRole={setCurrentUserRole}
            />
        </RolesAccessControlContextProvider>
    );
}

export default App;

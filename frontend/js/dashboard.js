// Get Authentication Token
const token =
    localStorage.getItem(
        "authToken"
    );

// Prevent Unauthenticated Access
if (!token) {
    window.location.href =
        "index.html";
}

// Load Dashboard
async function loadDashboard() {
    try {
        const response =
            await fetch(
                "/api/auth/me",
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    }
                }
            );

        // Invalid / expired token
        if (!response.ok) {
            localStorage.removeItem(
                "authToken"
            );
            localStorage.removeItem(
                "user"
            );
            window.location.href =
                "index.html";
            return;
        }
        const user =
            await response.json();

        // Display name
        document
            .getElementById("userName")
            .textContent =
                user.name;

        // Display profile name
        document
            .getElementById("profileName")
            .textContent =
                user.name;

        // Display email
        document
            .getElementById("profileEmail")
            .textContent =
                user.email;

        // Display role
        document
            .getElementById("profileRole")
            .textContent =
                user.role;

                // Display role badge
        document
            .getElementById("roleBadge")
            .textContent =
                user.role;
    } catch (error) {
        localStorage.removeItem(
            "authToken"
        );
        localStorage.removeItem(
            "user"
        );
        window.location.href =
            "index.html";
    }
}

// Logout
document
    .getElementById("logoutBtn")
    .addEventListener(
        "click",
        async () => {
            try {
                await fetch(
                    "/api/auth/logout",
                    {
                        method: "POST",
                        headers: {
                            Authorization:
                                `Bearer ${token}`
                        }
                    }
                );
            } finally {
                // Remove authentication
                localStorage.removeItem(
                    "authToken"
                );
                localStorage.removeItem(
                    "user"
                );

                // Return to login
                window.location.href =
                    "index.html";
            }
        }
    );

// Start Dashboard
loadDashboard();
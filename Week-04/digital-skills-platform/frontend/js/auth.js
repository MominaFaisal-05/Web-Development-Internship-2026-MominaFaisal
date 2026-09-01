const API_URL = "/api/auth";

// Elements
const loginView =
    document.getElementById("loginView");
const signupView =
    document.getElementById("signupView");
const loginForm =
    document.getElementById("loginForm");
const signupForm =
    document.getElementById("signupForm");

// Message Function
function showMessage(
    elementId,
    message,
    type = "error"
) {
    const element =
        document.getElementById(elementId);
        element.textContent = message;
        element.className =
        `message ${type}`;
}
function clearMessage(elementId) {
    const element =
        document.getElementById(elementId);
        element.textContent = "";
        element.className = "message";
}

// Email Validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);
}

// Password Validation
function passwordIsValid(password) {
    return (
        password.length >= 8
        &&
        /[A-Za-z]/.test(password)
        &&
        /\d/.test(password)
    );
}

// Switch to Signup
document
    .getElementById("showSignup")
    .addEventListener(
        "click",
        () => {
            loginView.classList.add(
                "hidden"
            );
            signupView.classList.remove(
                "hidden"
            );
            clearMessage(
                "loginMessage"
            );
        }
    );

// Switch to Login
document
    .getElementById("showLogin")
    .addEventListener(
        "click",
        () => {
            signupView.classList.add(
                "hidden"
            );
            loginView.classList.remove(
                "hidden"
            );
            clearMessage(
                "signupMessage"
            );
        }
    );

// Show / Hide Password
document
    .querySelectorAll(".show-password")
    .forEach(button => {
        button.addEventListener(
            "click",
            () => {
                const input =
                    document.getElementById(
                        button.dataset.target
                    );
                    const visible =
                    input.type === "text";
                    input.type =
                    visible
                        ? "password"
                        : "text";
                        button.textContent =
                        visible
                        ? "Show"
                        : "Hide";
                    }
        );
    });

// Signup Password Rules
const signupPassword =
    document.getElementById(
        "signupPassword"
    );
signupPassword.addEventListener(
    "input",
    () => {
        const value =
            signupPassword.value;
            document
            .getElementById("lengthRule")
            .classList.toggle(
                "valid",
                value.length >= 8
            );
            document
            .getElementById("letterRule")
            .classList.toggle(
                "valid",
                /[A-Za-z]/.test(value)
            );
            document
            .getElementById("numberRule")
            .classList.toggle(
                "valid",
                /\d/.test(value)
            );
        }
);

// SIGNUP
signupForm.addEventListener(
    "submit",
    async event => {
        event.preventDefault();
        clearMessage(
            "signupMessage"
        );
        const name =
            document
                .getElementById("signupName")
                .value
                .trim();
        const email =
            document
                .getElementById("signupEmail")
                .value
                .trim();
        const password =
            document
                .getElementById("signupPassword")
                .value;
        const role =
            document
                .getElementById("signupRole")
                .value;

        // Required fields
        if (
            !name
            ||
            !email
            ||
            !password
            ||
            !role
        ) {
            showMessage(
                "signupMessage",
                "Please complete all fields."
            );
            return;
        }

        // Email
        if (!isValidEmail(email)) {
            showMessage(
                "signupMessage",
                "Please enter a valid email address."
            );
            return;
        }

        // Password
        if (!passwordIsValid(password)) {
            showMessage(
                "signupMessage",
                "Password needs 8+ characters, a letter, and a number."
            );
            return;
        }
        try {
            const response =
                await fetch(
                    `${API_URL}/signup`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            name,
                            email,
                            password,
                            role
                        })
                    }
                );
            const data =
                await response.json();
            if (!response.ok) {
                showMessage(
                    "signupMessage",
                    data.message ||
                    "Registration failed."
                );
                return;
            }

            // Reset form
            signupForm.reset();
            document
                .querySelectorAll(
                    ".password-rules span"
                )
                .forEach(
                    element =>
                        element.classList.remove(
                            "valid"
                        )
                );
            showMessage(
                "signupMessage",
                data.message,
                "success"
            );

            // Go to login
            setTimeout(
                () => {
                    signupView.classList.add(
                        "hidden"
                    );
                    loginView.classList.remove(
                        "hidden"
                    );
                    document
                        .getElementById(
                            "loginEmail"
                        )
                        .value = email;
                    clearMessage(
                        "signupMessage"
                    );
                },
                1200
            );
        } catch (error) {
            showMessage(
                "signupMessage",
                "Cannot connect to the server. Start the Flask backend."
            );
        }
    }
);

// LOGIN
loginForm.addEventListener(
    "submit",
    async event => {
        event.preventDefault();
        clearMessage(
            "loginMessage"
        );
        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim();
        const password =
            document
                .getElementById("loginPassword")
                .value;
        if (!email || !password) {
            showMessage(
                "loginMessage",
                "Email and password are required."
            );
            return;
        }
        if (!isValidEmail(email)) {
            showMessage(
                "loginMessage",
                "Please enter a valid email address."
            );
            return;
        }
        try {
            const response =
                await fetch(
                    `${API_URL}/login`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify({
                            email,
                            password
                        })
                    }
                );
            const data =
                await response.json();
            if (!response.ok) {
                showMessage(
                    "loginMessage",
                    data.message ||
                    "Login failed."
                );
                return;
            }
            
            // Store token
            localStorage.setItem(
                "authToken",
                data.token
            );
            
            // Store user
            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );
            showMessage(
                "loginMessage",
                "Login successful. Redirecting...",
                "success"
            );
            setTimeout(
                () => {
                    window.location.href =
                        "dashboard.html";
                    },
                500
            );
        } catch (error) {
            showMessage(
                "loginMessage",
                "Cannot connect to the server. Start the Flask backend."
            );
        }
    }
);

// Existing Login Check
if (
    localStorage.getItem("authToken")
) {
    window.location.href =
        "dashboard.html";
}
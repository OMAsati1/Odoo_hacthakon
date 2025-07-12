function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const storedUser = JSON.parse(localStorage.getItem("registeredUser"));

  if (!storedUser) {
    alert("No registered user found. Please register first.");
    return false;
  }

  if (email === storedUser.email && password === storedUser.password) {
    // Simulate login
    localStorage.setItem("loggedInUser", JSON.stringify({ email, name: storedUser.name }));
    alert("Login successful!");
    window.location.href = "h.html";
  } else {
    alert("Invalid email or password.");
  }

  return false;
}

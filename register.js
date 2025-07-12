function handleRegister(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  if (password !== confirm) {
    alert("Passwords do not match.");
    return false;
  }

  const user = { name, email, password };
  localStorage.setItem("registeredUser", JSON.stringify(user));

  alert("Registration successful! Please log in.");
  window.location.href = "h2.html";

  return false;
}

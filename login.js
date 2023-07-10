function handleFormSubmit() {
  // Retrieve the input values
  var username = document.getElementById("username").value;
  var password = document.getElementById("password").value;

  // Retrieve the stored data for the entered username from localStorage
  var storedData = localStorage.getItem(username);

  if (storedData) {
    // Parse the stored data to retrieve the username and password
    var storedCredentials = JSON.parse(storedData);

    if (password === storedCredentials.password) {
      // Successful login
      alert("Login successful!");
      return;
      // Redirect to the home page
      window.location.href = "/Home/index.html";
      return;
    }
  }

  // Invalid credentials
  alert("Invalid username or password. Please try again.");
  return;
}

function handleFormSubmit(event) {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
  
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
  
    if (username === '' || password === '') {
      alert('Please enter both username and password');
      return;
    }
  
    // Check if user already exists in local storage
    const existingUser = localStorage.getItem(username);
    if (existingUser) {
      alert('Username already exists. Please choose a different username.');
      return;
    }
  
    // Save user data in local storage
    const user = {
      username,
      password
    };
    localStorage.setItem(username, JSON.stringify(user));
  
    alert('Signup successful! You can now login.');

    window.location.href = '/Login/login.html';
    return

  }
  
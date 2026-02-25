const API_URL = '108.142.77.58:3000'

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const options = {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: form.get("email"),
            password: form.get("password")
        })
    }
    const response = await fetch(`http://localhost:3000/users/login`, options);
    const data = await response.json();
    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem('name', JSON.stringify(data.user.name))
        window.location.assign("index.html");
      } else {
        alert(data.error);
      }
})



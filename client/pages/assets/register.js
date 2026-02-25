const API_URL = '108.142.77.58:3000'

document.getElementById("registerForm").addEventListener("submit", async (e) => {
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
            password: form.get("password"),
            name: form.get("name")
        })
    }
    const response = await fetch(`http://localhost:3000/users/register`, options);
    const data = await response.json();
    if (response.status == 201) {
        window.location.assign("login.html");
    } else {
        alert(data.error);
    }
})
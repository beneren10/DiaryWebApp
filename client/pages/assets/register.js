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
    console.log(options);
    const response = await fetch("http://132.220.101.170:3000/users/register", options);
    const data = await response.json();
    console.log('hit');
    if (response.status == 201) {
        window.location.assign("login.html");
    } else {
        alert(data.error);
    }
})
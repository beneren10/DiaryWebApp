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
    console.log(options);
    const response = await fetch("http://9.163.217.198/users/login", options);
    const data = await response.json();
    console.log('hit');
    if (response.status == 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem('name', JSON.stringify(data.user.name))
        window.location.assign("index.html");
      } else {
        alert(data.error);
      }
})



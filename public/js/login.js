form.addEventListener("submit", ()=>{
    const login = {
        username: username.value,
        password: password.value
    }
    fetch("/api/login",{
        method: "POST",
        body: JSON.stringify(login),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(res => res.json())
    .then(data => {
        if (data.status == "error"){
            error.style.display = "block"
            error.innerText = data.error
            success.style.display = "none"
        } else {
            error.style.display = "none"
            success.innerText = data.success
            success.style.display = "block"
        }
    })
})
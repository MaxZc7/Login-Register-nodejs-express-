form.addEventListener("submit", ()=>{
    const register = {
        username: username.value,
        email: email.value,
        password: password.value
    }
    fetch("/api/register",{
        method: "POST",
        body: JSON.stringify(register),
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
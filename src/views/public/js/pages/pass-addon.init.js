document.getElementById("password-addon").addEventListener("click", function () {
    var e = document.getElementById("password");
    "password" === e.type ? (e.type = "text") : (e.type = "password");
});

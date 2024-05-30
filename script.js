let url = "https://665737379f970b3b36c86978.mockapi.io/login";
let user = document.getElementById("userName");
let email = document.getElementById("email");
let pass = document.getElementById("password");
let email1 = document.getElementById("email1");
let pass1 = document.getElementById("pass1");
let emailerror = document.getElementById("emailHelp");
let loginerror = document.getElementById("loginHelp");
let nameerror = document.getElementById("nameHelp");
let welcom = document.querySelector("#welcome");
let passerror = document.getElementById("passHelp");
let localStorageName = localStorage.getItem("user");
// --------------------logout Page
function logout() {
  window.location.href = "index.html";
  localStorage.removeItem("user");
}

// Page Home

function load() {
  welcom.innerText =
    localStorageName == null ? "" : `Welcome ${localStorage.getItem("user")}`;
}

// --------------------login page
async function login() {
  let data = await fetch(url);
  let res = await data.json();
  for (let element = 0; element < res.length; element++) {
    // console.log(res[element].userName);
    if (
      email1.value == res[element].email &&
      pass1.value == res[element].pass
    ) {
      localStorage.setItem("user", res[element].userName);
      //   console.log("Yes");

      window.location.href = "home.html";

      break;
    } else if (
      email1.value != res[element].email &&
      pass1.value != res[element].pass
    ) {
      loginerror.innerText = "email or password is incorrect";
    }
  }
}
// -------------------signUp page
async function register() {
  validatePass(pass.value);
  validateName(user.value);
  validate(email.value);
  if (user.value != "" && pass.value != "" && email.value != "") {
    let data = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        userName: user.value,
        email: email.value,
        pass: pass.value,
      }),
      headers: {
        "Content-Type": "application/json; chartset=UTF-8",
      },
    });
    let res = await data.json();

    window.location.href = "index.html";
    // alert("yes");
  }
}

function validate(params) {
  //   console.log(params);
  let re = /^([A-Za-z0-9_\-\.])*[@][A-Za-z]*[\.][a-z]{2,4}$/;
  !params.match(re) || params == ""
    ? (emailerror.innerText = "Please enter a valid email")
    : (emailerror.innerText = "");
}

function validateName(params) {
  params.length < 5 || params == ""
    ? (nameerror.innerText = "User name must be at least 5 characters")
    : (nameerror.innerText = "");
}
let correct = document.getElementById("true");
let uncorrect = document.getElementById("wrong");

//------------------------  validate in password
function validatePass(params) {
  if (params.length < 8) {
    uncorrect.style.display = "block";

    passerror.style.color = "red";
    correct.style.display = "none";
  } else {
    uncorrect.style.display = "none";

    correct.style.display = "block";
    passerror.style.color = "green";
  }
}

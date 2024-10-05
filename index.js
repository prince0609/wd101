let email = document.querySelector("#email");
email.addEventListener("input", (e) => validate(email));

let submit = document.querySelector("#submit");
submit.addEventListener("click", (event) => validate(email, event));

function validate(ele, event) {
    if (ele.validity.typeMismatch) {
        ele.setCustomValidity("Email is not valid");
        ele.reportValidity();
        event.preventDefault();  // This prevents form submission if the email is invalid
    } else {
        ele.setCustomValidity('');
    }
}



dob.addEventListener("input", (event) => valid(dob));
function valid(ele) {
    let str = ele.value;
    let dobYear = +str.slice(0, 4);   // + is there for converting string to number
    let date = new Date();
    let currentYr = date.getFullYear();
    let age = currentYr - dobYear;

    let errorMessage = document.getElementById("error-message");
    if (age > 18 && age < 55) {
        errorMessage.textContent = "";
        submit.disabled = true;
    } else {
        errorMessage.textContent = "Age must be between 18 and 55.";
        submit.disabled = false;
    }
}


let userForm = document.getElementById("userForm");

const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    if (entries) {
        entries = JSON.parse(entries);
    } else {
        entries = [];
    }
    return entries;
}

let userEntries = retrieveEntries();

const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td> ${entry.name}</td>`;
        const emailCell = `<td> ${entry.email}</td>`;
        const passwordCell = `<td> ${entry.password}</td>`;
        const dobCell = `<td> ${entry.dob} </td>`;
        const accepTermsCell = `<td> ${entry.accepTerms} </td>`;

        const row = `<tr> ${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${accepTermsCell} </tr>`;

        return row;
    }).join("\n");



    const table = `
        <table>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>DOB</th>
                    <th>Accepted Terms?</th>
                </tr>
                ${tableEntries}
        <table>`;

    let details = document.getElementById("user-entries");
    details.innerHTML = table;

}

const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const accepTerms = document.getElementById("accepTerms").checked;

    const entry = {
        name,
        email,
        password,
        dob,
        accepTerms
    };

    userEntries.push(entry);

    localStorage.setItem("user-entries", JSON.stringify(userEntries));

    displayEntries();
    userForm.reset();
}

userForm.addEventListener("submit", saveUserForm);

displayEntries();


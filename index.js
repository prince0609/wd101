let email = document.querySelector("#email");
let submit = document.querySelector("#submit");
let dob = document.getElementById("dob");
let userForm = document.getElementById("userForm");

// Email validation
email.addEventListener("input", (e) => validate(email, e));
submit.addEventListener("click", (e) => validate(email, e));

function validate(ele, event) {
    if (ele.validity.typeMismatch) {
        ele.setCustomValidity("Email is not valid");
        ele.reportValidity();
        event.preventDefault();
    } else {
        ele.setCustomValidity('');
    }
}

// Age validation
dob.addEventListener("input", (event) => valid(dob));
function valid(ele) {
    let str = ele.value;
    let dobYear = +str.slice(0, 4);
    let currentYr = new Date().getFullYear();
    let age = currentYr - dobYear;

    let errorMessage = document.getElementById("error-message");
    if (age < 18 || age > 55) {
        errorMessage.textContent = "Age must be between 18 and 55.";
        submit.disabled = true;
    } else {
        errorMessage.textContent = "";
        submit.disabled = false;
    }
}

// Retrieve entries from localStorage
const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
};

let userEntries = retrieveEntries();

// Display entries in the table
const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td> ${entry.name}</td>`;
        const emailCell = `<td> ${entry.email}</td>`;
        const passwordCell = `<td> ${entry.password}</td>`;
        const dobCell = `<td> ${entry.dob} </td>`;
        const accepTermsCell = `<td> ${entry.accepTerms ? 'Yes' : 'No'} </td>`;
        return `<tr> ${nameCell} ${emailCell} ${passwordCell} ${dobCell} ${accepTermsCell} </tr>`;
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
    </table>`;

    document.getElementById("user-entries").innerHTML = table;
};

// Save form data to localStorage
const saveUserForm = (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const accepTerms = document.getElementById("accepTerms").checked;

    const entry = { name, email, password, dob, accepTerms };
    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));

    displayEntries(); // Update the table after each submission
    userForm.reset(); // Clear the form fields after submission
};

// Add event listener for form submission
userForm.addEventListener("submit", saveUserForm);
displayEntries(); // Display entries on page load

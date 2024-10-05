// Retrieving saved entries from localStorage
const retrieveEntries = () => {
    let entries = localStorage.getItem("user-entries");
    return entries ? JSON.parse(entries) : [];
};

let userEntries = retrieveEntries();

// Function to display entries in the table
const displayEntries = () => {
    const entries = retrieveEntries();

    const tableEntries = entries.map((entry) => {
        const nameCell = `<td>${entry.name}</td>`;
        const emailCell = `<td>${entry.email}</td>`;
        const passwordCell = `<td>${entry.password}</td>`;
        const dobCell = `<td>${entry.dob}</td>`;
        const acceptTermsCell = `<td>${entry.acceptTerms ? 'Yes' : 'No'}</td>`;

        return `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
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

// Function to validate age (18 to 55)
const validateAge = (dob) => {
    const dobValue = new Date(dob.value);
    const today = new Date();
    let age = today.getFullYear() - dobValue.getFullYear();
    const monthDiff = today.getMonth() - dobValue.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobValue.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        document.getElementById("error-message").textContent = "Age must be between 18 and 55.";
        return false;
    } else {
        document.getElementById("error-message").textContent = "";
        return true;
    }
};

// Function to handle form submission
const saveUserForm = (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob");
    const acceptTerms = document.getElementById("acceptTerms").checked;

    // Validate age
    if (!validateAge(dob)) {
        return;
    }

    // Save entry to localStorage
    const entry = {
        name,
        email,
        password,
        dob: dob.value,
        acceptTerms
    };

    userEntries.push(entry);
    localStorage.setItem("user-entries", JSON.stringify(userEntries));

    // Reset the form and display the updated entries
    document.getElementById("userForm").reset();
    displayEntries();
};

// Event listener for form submission
document.getElementById("userForm").addEventListener("submit", saveUserForm);

// Display entries on page load
displayEntries();

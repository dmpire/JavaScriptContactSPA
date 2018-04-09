window.onload = function () {
    // Access all the fields needed from the html file
    const addBtn = document.getElementById("addBtn");
    const delBtn = document.getElementById("delBtn");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const tel = document.getElementById("tel");
    const editBtn = document.getElementById("editBtn");

    let contacts = document.querySelector(".contacts");
    const contactDisplay = document.querySelector(".contactDisplay");

    contacts = [
        {
            name: "Xeenarh Abah",
            email: "xeebah@gmail.com",
            tel: "07030000034"
        },
        {
            name: "Tolu Falana",
            email: "falu@mail.com",
            tel: "07030001234"
        },
        {
            name: "MaryJane",
            email: "mj@mail.com",
            tel: "07030000234"
        },
    ];

    // ADD NEW CONTACT
    function jsonStructure(name, email, tel) {
        this.name = name;
        this.email = email;
        this.tel = tel;
    }

    addBtn.addEventListener("click", function () {
        //Simple form validation. Ensure no form field is empty.
        var empty = name.value != '' && email.value != '' && tel.value != '';
        if (empty) {
            let newObj = new jsonStructure(name.value, email.value, tel.value);
            contacts.push(newObj);
            //Create a localStorage named "contactBook" and save the contacts into it as strings.
            localStorage['contactBook'] = JSON.stringify(contacts);
            //Clear form fields after adding the new contact.
            clearForm();
        }

    })

    // CLEAR FORM AFTER ADDING NEW CONTACT
    function clearForm() {
        let myForm = document.querySelectorAll(".formFields");
        for (let i in myForm) {
            myForm[i].value = '';
        }
    }

    // DISPLAY ALL CONTACTS
    function showContacts() {
        if (localStorage['contactBook'] === undefined) {
            localStorage['contactBook'] = JSON.stringify(contacts);
        }
            contacts = JSON.parse(localStorage['contactBook']);
            for (let n in contacts) {
                var str = '<button class="accordion">' + contacts[n].name + '</button>' + '<div class="panel"><p><strong>Email Address : </strong>' + contacts[n].email + '</p><p><strong>Phone Number : </strong>' + contacts[n].tel + ' </p><div class="del go-right"><a href="#" class="button delBtn" data-id="' + n + '">Delete</a></div><div class="go-right"><a href="#" class="button editBtn" data-id="' + n + '">Edit</a></div></div>';
                contactDisplay.innerHTML += str;
            }
        }
    showContacts();

    // REFRESH PAGE
    function refreshPage() {
        location.reload();
    }

    // DELETE AND EDIT FUNCTIONS
    function CloseInput() {
        //Hide the edit form once the edit button beside the form is clicked.
        document.getElementById('spoiler').style.display = 'none';
    }

    contactDisplay.addEventListener("click", function (e) {
        if (e.target.classList.contains("delBtn")) {
            // Get the actual delete button clicked on.
            var chosen = e.target.getAttribute("data-id");

            contacts.splice(chosen, 1);
            localStorage['contactBook'] = JSON.stringify(contacts);
            refreshPage();
        }
        if (e.target.classList.contains("editBtn")) {
            // Get all fields in new form
            var name = document.getElementById('edit-name');
            var email = document.getElementById('edit-email');
            var tel = document.getElementById('edit-tel');
            var id = e.target.getAttribute("data-id");
            // Assign values to edit form
            name.value = contacts[id].name;
            email.value = contacts[id].email;
            tel.value = contacts[id].tel;
            // Display fields in form
            document.getElementById('spoiler').style.display = 'block';

            // On submitting the form...
            document.getElementById('saveEdit').onsubmit = function () {
                var newName = name.value;
                var newEmail = email.value;
                var newTel = tel.value;
                // Remove old data
                contacts.splice(id, 1);
                // Create a new object with updated info
                let newObj = new jsonStructure(newName, newEmail, newTel);
                contacts.push(newObj);
                localStorage['contactBook'] = JSON.stringify(contacts);
                // Close the form and reload the page
                CloseInput();
                refreshPage();
            }
        }
    })

    // ACCORDION FUNCTION
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            /* Toggle "active" class */
            this.classList.toggle("active");

            /* Toggle hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
            } else {
                panel.style.display = "block";
            }
        });
    }
}
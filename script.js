window.onload = function () {
    const addBtn = document.getElementById("addBtn");
    const delBtn = document.getElementById("delBtn");
    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const tel = document.getElementById("tel");

    let contacts = document.querySelector(".contacts");
    const contactDisplay = document.querySelector(".contactDisplay");

    contacts = [
        {
            name:"Xeenarh Abah",        
            email:"xeebah@gmail.com",
            tel:"07030000034"
        },
        {
            name:"Tolu Falana",        
            email:"falu@mail.com",
            tel:"07030000034"
        }
    ];

    function jsonStructure(name, email, tel) {
        this.name = name;
        this.email = email;
        this.tel = tel;
    }

    addBtn.addEventListener("click", function () {
        let newObj = new jsonStructure(name.value, email.value, tel.value);
        contacts.push(newObj);
        localStorage['contactBook'] = JSON.stringify(contacts);
        clearForm();

    })

    function clearForm() {
        let myForm = document.querySelectorAll(".formFields");
        for (let i in myForm) {
            myForm[i].value = '';
        }
    }

    function showContacts() {
        if (localStorage['contactBook'] === undefined) {
            localStorage['contactBook'] = "[]";
        } else {
            contacts = JSON.parse(localStorage['contactBook']);
            for (let n in contacts) {
                var str = '<button class="accordion">' + contacts[n].name + '</button>' + '<div class="panel"><p><strong>Email Address : </strong>' + contacts[n].email + '</p><p><strong>Phone Number : </strong>' + contacts[n].tel + ' </p><div class="del go-right"><a href="#" class="button delBtn" data-id="' + n + '">Delete</a></div><div class="go-right"><a href="#" class="button editBtn" data-id="' + n + '">Edit</a></div></div>';
                contactDisplay.innerHTML += str;
            }
        }
    }
    showContacts();

    contactDisplay.addEventListener("click", function (e) {
        if(e.target.classList.contains("delBtn")){
            var chosen = e.target.getAttribute("data-id");
            contacts.splice(chosen, 1);
            localStorage['contactBook'] = JSON.stringify(contacts);
            // showContacts();
            alert("Please refresh this page after deleting a contact.");
        }
    })

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
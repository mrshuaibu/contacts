'use strict';

class Contact {
    #name;
    #city;
    #email;

    constructor(name, city, email) {
        this.#name = name;
        this.#city = city;
        this.#email = email;
    }

    get name() {
        return this.#name;
    }

    get city() {
        return this.#city;
    }

    get email() {
        return this.#email;
    }
}

let contacts = [];

function isValidEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}

function addContact() {
    if (contacts.length >= 20) {
        const errorMessage = document.querySelector('.error-message');
        errorMessage.textContent = "Storage is full!!";
        errorMessage.style.display = 'block';
        return;
    }

    const contactInfo = document.querySelector('.contact-info').value.trim();
    const errorMessage = document.querySelector('.error-message');

    const [name, city, email] = contactInfo.split(',').map(item => item.trim());

    if (!name || !city || !email) {
        errorMessage.textContent = "Enter a valid name, city, and email separated by commas";
        errorMessage.style.display = 'block';
        return;
    }
    if (!isValidEmail(email)) {
        errorMessage.textContent = "Please enter a valid email address";
        errorMessage.style.display = 'block';
        return;
    }
    if (name.length < 2) {
        errorMessage.textContent = "Please enter a valid name";
        errorMessage.style.display = 'block';
        return;
    }

    errorMessage.style.display = 'none';

    const newContact = new Contact(name, city, email);
    contacts.unshift(newContact);

    displayContacts();

    document.querySelector('.contact-info').value = '';
}


document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.contact-limit').textContent = "Contacts: 0 / 20";
});

function displayContacts() {
    const contactLimitMessage = document.querySelector('.contact-limit');
    
    if (contacts.length >= 20) {
        contactLimitMessage.textContent = "Storage is full!!";
    } else {
        contactLimitMessage.textContent = `Contacts: ${contacts.length} / 20`;
    }

    const box = document.querySelector('.box');
    box.innerHTML = ''; 

    contacts.forEach((contact) => {
        const contactCard = document.createElement("div");
        contactCard.classList.add("contact-card");

        const nameParagraph = document.createElement("p");
        nameParagraph.textContent = `Name: ${contact.name}`;

        const cityParagraph = document.createElement("p");
        cityParagraph.textContent = `City: ${contact.city}`;

        const emailParagraph = document.createElement("p");
        emailParagraph.textContent = `Email: ${contact.email}`;

        contactCard.append(nameParagraph, cityParagraph, emailParagraph);

        contactCard.addEventListener("click", () => removeContact(contact.email));

        box.appendChild(contactCard);
    });
}

function removeContact(email) {
    const contactIndex = contacts.findIndex(contact => contact.email === email);

    if (contactIndex !== -1) {
        contacts.splice(contactIndex, 1);
    }

    displayContacts();
}

document.querySelector(".button").addEventListener("click", addContact);


//Shuaibu Michael, Winnipeg, Shuaibumikel@gmail.com
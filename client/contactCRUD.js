const contactTbody = document.querySelector('#contact-table tbody');
const contactInput = document.getElementById("searchContact");
const contactType = document.getElementById("contactOptions");
const contactForm = document.querySelector("#contactForm");

const modal = document.getElementById('modal');
const editmodal = document.getElementById('editmodal');
const addButton = document.getElementById('add-contact');
const closeBtn = document.getElementById('close-modal');
const closeModalEdit = document.getElementById('close-modalEdit');
const addContactForm = document.getElementById('contact-form');
const editBtn = document.getElementById('editContact');

// 🔁 Fetch Contacts
async function fetchContacts() {
    const res = await fetch('http://localhost:3000/contacts?page=1&limit=10&sortBy=createdAt&sortOrder=asc', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        }
    });

    const contacts = await res.json();
    contactTbody.innerHTML = '';

    contacts.data.forEach(contact => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', contact.id);

        row.innerHTML = `
            <td data-label="Names">${contact.name}</td>
            <td data-label="Phone">${contact.phoneNumber}</td>
            <td data-label="Tags">${contact.tags.join(', ')}</td>
            <td data-label="Actions"><button>Edit</button><button>Delete</button></td>
        `;

        contactTbody.appendChild(row);
    });
}

window.addEventListener('DOMContentLoaded', fetchContacts);

// 🔍 Filter Contacts
contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = contactInput.value.trim().toLowerCase();
    const selectedColumn = contactType.value;
    const rows = contactTbody.querySelectorAll("tr");

    rows.forEach((row) => {
        let valueToCheck = "";

        switch (selectedColumn) {
            case "Name":
                valueToCheck = row.querySelector('[data-label="Names"]').textContent;
                break;
            case "Tags":
                valueToCheck = row.querySelector('[data-label="Tags"]').textContent;
                break;
            case "Phone":
                valueToCheck = row.querySelector('[data-label="Phone"]').textContent;
                break;
        }

        row.style.display = valueToCheck.toLowerCase().includes(query) ? "" : "none";
    });
});

// ➕ Add Modal Open/Close
addButton.addEventListener('click', () => modal.style.display = 'flex');
closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => {
    if (e.target === modal || e.target === editmodal) {
        modal.style.display = 'none';
        editmodal.style.display = 'none';
    }
});
closeModalEdit.addEventListener('click', () => editmodal.style.display = 'none');

// ➕ Submit New Contact
addContactForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const data = {
        name: document.getElementById('nameContact').value,
        phoneNumber: document.getElementById('phoneContact').value,
        tags: document.getElementById('tagsContact').value.split(',').map(t => t.trim())
    };

    const res = await fetch('http://localhost:3000/contacts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(data)
    });

    if (res.ok) {
        modal.style.display = 'none';
        addContactForm.reset();
        fetchContacts();
    }
});

// 🗑️ Delete Contact
contactTbody.addEventListener('click', async function (e) {
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Delete') {
        const row = e.target.closest('tr');
        const id = row.getAttribute('data-id');

        if (confirm('Are you sure you want to delete this contact?')) {
            await fetch(`http://localhost:3000/contacts/${id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            row.remove();
        }
    }
});

// ✏️ Edit Contact
contactTbody.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Edit') {
        const row = e.target.closest('tr');
        const id = row.getAttribute('data-id');

        document.getElementById('nameContactEdit').value = row.querySelector('[data-label="Names"]').textContent;
        document.getElementById('phoneContactEdit').value = row.querySelector('[data-label="Phone"]').textContent;
        document.getElementById('tagsContactEdit').value = row.querySelector('[data-label="Tags"]').textContent;

        editmodal.style.display = 'flex';

        editBtn.onclick = async function (e) {
            e.preventDefault();

            const updatedData = {
                name: document.getElementById('nameContactEdit').value,
                phoneNumber: document.getElementById('phoneContactEdit').value,
                tags: document.getElementById('tagsContactEdit').value.split(',').map(t => t.trim())
            };

            const res = await fetch(`http://localhost:3000/contacts/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(updatedData)
            });

            if (res.ok) {
                editmodal.style.display = 'none';
                fetchContacts();
            }
        };
    }
});

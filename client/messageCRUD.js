async function fetchMessage() {
    const res = await fetch('https://6874d13cdd06792b9c955d04.mockapi.io/api/auth/message-template')
    const messages = await res.json()

    messageDiv.innerHTML = ''

    messages.forEach(message => {
        const div = document.createElement('div')
        div.setAttribute('data-id', message.id);
        div.setAttribute('class', 'card');

        div.innerHTML = `
       <img src="${message.AssetUrl}" alt="Promo Image" class="card-image" data-label = "image"/>
        <div class="card-content">
            <h3 class="card-title" data-label="Name">${message.Name}</h3>
            <p class="card-type" data-label="Type">Type: <strong>${message.Type}</strong></p>
            <p class="card-text" data-label="Content">${message.Content}</p>
            <div class="chip-group">
                <span class="chip" data-label="Tags">${message.Tag}</span>
            </div>
                <p class="workspace" data-label="Workspace">${message.Workspace}</p>
            <div class="card-actions">
                <button>Edit</button>
                <button>Delete</button>
            </div>
        </div>
        `

        messageDiv.appendChild(div)
    });
}

window.addEventListener('DOMContentLoaded', fetchMessage)


//filter -start
const messageDiv = document.querySelector('#message-cards')
const search = document.getElementById('search')
const options = document.getElementById('options')
const form = document.getElementById('messageForm')

form.addEventListener('submit', function (e) {
    e.preventDefault()

    const query = search.value.trim().toLowerCase()
    const selectedDiv = options.value;

    const divs = document.querySelectorAll('#message-cards .card')

    divs.forEach(div => {
        let valueToCheck = ""

        switch (selectedDiv) {
            case "Name":
                valueToCheck = div.querySelector('[data-label="Name"]').textContent;
                break;
            case "Workspace":
                valueToCheck = div.querySelector('[data-label="Workspace"]').textContent;
                break;
            case "Tags":
                valueToCheck = div.querySelector('[data-label="Tags"]').textContent;
                break;
            default:
                valueToCheck = "";
        }

        if (valueToCheck.trim().toLowerCase().includes(query)) {
            div.style.display = ""
        }
        else {
            div.style.display = "none"
        }
    })
})
//filter-end

//add edit-start
const modal = document.getElementById("messageModal");
const closeModal = document.getElementById("closeModal");
const addForm = document.getElementById("addForm");
let isEdit = false;
let currentCard = null; 

document.getElementById("addMessageBtn").addEventListener("click", () => {
    isEdit = false;
    currentCard = null;
    modal.style.display = "flex";
    addForm.reset();
    updatePreview(); 
});

closeModal.onclick = () => {
    modal.style.display = "none";
    isEdit = false;
    currentCard = null;
};

//preview part-start

const previewImage = document.getElementById("previewImage");
const previewName = document.getElementById("previewName");
const previewType = document.getElementById("previewType");
const previewContent = document.getElementById("previewContent");
const previewTags = document.getElementById("previewTags");
const previewWorkspace = document.getElementById("previewWorkspace");

addForm.addEventListener("input", updatePreview);

function updatePreview() {
    previewName.textContent = document.getElementById("msgName").value;
    previewType.textContent = document.getElementById("msgType").value;
    previewContent.textContent = document.getElementById("msgContent").value;
    previewWorkspace.textContent = document.getElementById("msgWorkspace").value;

    const imageUrl = document.getElementById("msgImage").value;
    previewImage.setAttribute('src', imageUrl || "https://avatars.githubusercontent.com/u/60592260");

    const tags = document.getElementById("msgTags").value.split(",").map(tag => tag.trim()).filter(Boolean);
    previewTags.innerHTML = "";
    tags.forEach(tag => {
        const chip = document.createElement("span");
        chip.className = "chip";
        chip.textContent = tag;
        previewTags.appendChild(chip);
    });
}

//preview part-start

addForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("msgName").value;
    const type = document.getElementById("msgType").value;
    const content = document.getElementById("msgContent").value;
    const image = document.getElementById("msgImage").value;
    const tags = document.getElementById("msgTags").value.split(",").map(tag => tag.trim()).filter(Boolean);
    const workspace = document.getElementById("msgWorkspace").value;

    const data = {
        Name: name,
        Tag: tags.join(", "),
        Type: type,
        Content: content,
        AssetUrl: image || "https://avatars.githubusercontent.com/u/60592260",
        Workspace: workspace
    };

    if (isEdit && currentCard) {
        const id = currentCard.getAttribute('data-id');
        currentCard.querySelector("[data-label='Name']").textContent = name;
        currentCard.querySelector("[data-label='Type']").innerHTML = `Type: <strong>${type}</strong>`;
        currentCard.querySelector("[data-label='Content']").textContent = content;
        currentCard.querySelector("[data-label='image']").src = image || "https://avatars.githubusercontent.com/u/60592260";
        currentCard.querySelector("[data-label='Workspace']").textContent = `Workspace: ${workspace}`;

        const tagGroup = currentCard.querySelector(".chip-group");
        tagGroup.innerHTML = "";
        tags.forEach(tag => {
            const chip = document.createElement("span");
            chip.className = "chip";
            chip.textContent = tag;
            chip.setAttribute("data-label", "Tags");
            tagGroup.appendChild(chip);
        });

        await fetch(`https://6874d13cdd06792b9c955d04.mockapi.io/api/auth/message-template/${id}`, {
            method : 'PUT',
            headers : {
                'Content-Type' : "application/json"
            },
            body : JSON.stringify(data)
        })

    } else {

        const div = document.createElement('div');
        div.setAttribute('class', 'card');
        div.innerHTML = `
            <img src="${data.AssetUrl}" alt="Promo Image" class="card-image" data-label="image"/>
            <div class="card-content">
                <h3 class="card-title" data-label="Name">${name}</h3>
                <p class="card-type" data-label="Type">Type: <strong>${type}</strong></p>
                <p class="card-text" data-label="Content">${content}</p>
                <div class="chip-group">
                    ${tags.map(tag => `<span class="chip" data-label="Tags">${tag}</span>`).join("")}
                </div>
                <p class="workspace" data-label="Workspace">Workspace: ${workspace}</p>
                <div class="card-actions">
                    <button>Edit</button>
                    <button>Delete</button> 
                </div>
            </div>
        `;
        messageDiv.appendChild(div);

        await fetch('https://6874d13cdd06792b9c955d04.mockapi.io/api/auth/message-template', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    modal.style.display = 'none';
    addForm.reset();
    isEdit = false;
    currentCard = null;
});


messageDiv.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON' && e.target.textContent === 'Edit') {
        const card = e.target.closest('.card');
        if (!card) return;

        currentCard = card;
        isEdit = true;

        document.getElementById("msgName").value = card.querySelector("[data-label='Name']").textContent;
        document.getElementById("msgType").value = card.querySelector("[data-label='Type']").textContent.trim().replace('Type:', '').trim();
        document.getElementById("msgContent").value = card.querySelector("[data-label='Content']").textContent;
        document.getElementById("msgImage").value = card.querySelector("[data-label='image']").src;
        document.getElementById("msgWorkspace").value = card.querySelector("[data-label='Workspace']").textContent.replace('Workspace:', '').trim();

        const tagChips = [...card.querySelectorAll("[data-label='Tags']")].map(chip => chip.textContent);
        document.getElementById("msgTags").value = tagChips.join(", ");

        modal.style.display = 'flex';
        updatePreview();
    }
});

//add edit-end


//delete message-start
messageDiv.addEventListener('click' , async function(e){
    if(e.target.tagName === "BUTTON" && e.target.textContent === "Delete"){
        const selectedDiv = e.target.closest('.card')
        const id = selectedDiv.getAttribute('data-id')
        if(confirm('are you sure you want to delete the record')){
            selectedDiv.remove()    
            await fetch(`https://6874d13cdd06792b9c955d04.mockapi.io/api/auth/message-template/${id}`,{ 
                method : 'Delete'
            })
        }
    }
})
//delete message-end


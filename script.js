document.addEventListener("DOMContentLoaded", function () {
    
    // 🔍 Search Functionality for Property Listings
    const searchInput = document.querySelector(".search-box input");
    const searchButton = document.querySelector(".search-box button");
    const residenceCards = document.querySelectorAll(".residence-card");

    searchButton.addEventListener("click", function () {
        const searchText = searchInput.value.toLowerCase();
        
        residenceCards.forEach(card => {
            const location = card.querySelector(".property-location").textContent.toLowerCase();
            if (location.includes(searchText)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    // 📝 Add to List Functionality
    const addToListButtons = document.querySelectorAll(".add");
    const listButton = document.querySelector(".list-btn");
    let savedProperties = [];

    addToListButtons.forEach(button => {
        button.addEventListener("click", function () {
            const property = this.closest(".residence-card");
            const propertyName = property.querySelector(".property-name").textContent;
            
            if (!savedProperties.includes(propertyName)) {
                savedProperties.push(propertyName);
                alert(`${propertyName} added to your list.`);
            } else {
                alert(`${propertyName} is already in your list.`);
            }
        });
    });

    listButton.addEventListener("click", function () {
        if (savedProperties.length === 0) {
            alert("No properties added yet.");
        } else {
            alert("Saved Properties:\n" + savedProperties.join("\n"));
        }
    });

    // 📜 Smooth Scroll for Navigation Links
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // 📌 Expandable Feature List in Value Section
    const featureDropdowns = document.querySelectorAll(".feature");

    featureDropdowns.forEach(feature => {
        feature.addEventListener("click", function () {
            const dropdownText = this.querySelector(".dropdown-text");
            dropdownText.style.display = dropdownText.style.display === "block" ? "none" : "block";
        });
    });

    // ⏳ Footer Year Auto-Update
    const footerYear = document.querySelector(".footer-bottom p");
    if (footerYear) {
        footerYear.innerHTML = `&copy; ${new Date().getFullYear()} BuyNStay | All rights reserved.`;
    }

    // 🔝 Scroll to Top Button
    const scrollTopBtn = document.createElement("button");
    scrollTopBtn.innerText = "↑";
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: none;
        background: #007bff;
        color: white;
        font-size: 20px;
        cursor: pointer;
        display: none;
        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    `;
    document.body.appendChild(scrollTopBtn);

    window.addEventListener("scroll", function () {
        scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
    });

    scrollTopBtn.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

});
document.addEventListener("DOMContentLoaded", function () {
    // 🏡 Retrieve saved properties from local storage
    let savedProperties = JSON.parse(localStorage.getItem("savedProperties")) || [];

    // 🔘 Select "Add to List" buttons & "List" button
    const addToListButtons = document.querySelectorAll(".add");
    const listButton = document.querySelector(".list-btn");

    // 🎨 Create Modal (Control Panel)
    const modal = document.createElement("div");
    modal.id = "listModal";
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>📌 Your Saved Properties</h2>
            <div id="propertyList"></div>
            <button id="clearList" class="clear-btn">🗑️ Clear All</button>
        </div>
    `;
    document.body.appendChild(modal);

    // 📌 Function to update local storage
    function updateLocalStorage() {
        localStorage.setItem("savedProperties", JSON.stringify(savedProperties));
    }

    // ➕ Add property to the list
    addToListButtons.forEach(button => {
        button.addEventListener("click", function () {
            const property = this.closest(".residence-card");
            const propertyName = property.querySelector(".property-name").textContent;
            const propertyPrice = property.querySelector("h3").textContent;
            const propertyLocation = property.querySelector(".property-location").textContent;
            const propertyImage = property.querySelector("img").src;

            // Create an object for the selected property
            const propertyData = {
                name: propertyName,
                price: propertyPrice,
                location: propertyLocation,
                image: propertyImage
            };

            // Check if the property is already added
            const exists = savedProperties.some(prop => prop.name === propertyData.name);

            if (!exists) {
                savedProperties.push(propertyData);
                updateLocalStorage();
                alert(`${propertyName} added to your list.`);
            } else {
                alert(`${propertyName} is already in your list.`);
            }
        });
    });

    // 📜 Show saved properties in Modal
    listButton.addEventListener("click", function () {
        updatePropertyList();
        modal.style.display = "block";
    });

    // ❌ Close Modal
    document.querySelector(".close").addEventListener("click", function () {
        modal.style.display = "none";
    });

    // 🗑️ Clear All Properties
    document.getElementById("clearList").addEventListener("click", function () {
        savedProperties = [];
        updateLocalStorage();
        updatePropertyList();
    });

    // 🏡 Update Property List in Modal
    function updatePropertyList() {
        const propertyListContainer = document.getElementById("propertyList");
        propertyListContainer.innerHTML = "";

        if (savedProperties.length === 0) {
            propertyListContainer.innerHTML = "<p>No properties added yet.</p>";
            return;
        }

        savedProperties.forEach((property, index) => {
            const propertyItem = document.createElement("div");
            propertyItem.classList.add("property-item");
            propertyItem.innerHTML = `
                <img src="${property.image}" alt="${property.name}">
                <div class="property-details">
                    <h3>${property.name}</h3>
                    <p>${property.price} - ${property.location}</p>
                    <button class="remove-btn" data-index="${index}">❌ Remove</button>
                </div>
            `;
            propertyListContainer.appendChild(propertyItem);
        });

        // ❌ Remove Property from List
        document.querySelectorAll(".remove-btn").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                savedProperties.splice(index, 1);
                updateLocalStorage();
                updatePropertyList();
            });
        });
    }
});

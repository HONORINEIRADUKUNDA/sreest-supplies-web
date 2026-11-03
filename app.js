const products = [
  {
    id: 1,
    title: "Solar Floodlights, Street Lights & Indoor Fixtures",
    category: "solar",
    badge: "In Stock & Bulk",
    image: "images/solar-lights.jpeg",
    description: "High-lumen outdoor solar street lights, waterproof LED floodlights, and modern decorative interior lighting fixtures for homes, commercial buildings, and roads.",
    tags: ["Solar Street Lights", "LED Floodlights", "Chandeliers", "Bulk Supply"]
  },
  {
    id: 2,
    title: "Electrical Wires, Cables, Sockets & Switches",
    category: "electrical",
    badge: "Construction Grade",
    image: "images/electricals.jpeg",
    description: "Complete electrical installation materials including copper wiring rolls, heavy-duty power cables, wall sockets, smart switches, circuit breakers, and conduits.",
    tags: ["Electrical Wires", "Wall Sockets", "Breakers", "Conduits"]
  },
  {
    id: 3,
    title: "Architectural Paints, Finishes & Construction Tools",
    category: "construction",
    badge: "Wholesale & Retail",
    image: "images/paints-tools.jpeg",
    description: "Premium weather-resistant exterior and interior paints, primers, waterproofing coatings, brushes, rollers, and full hardware tools for construction projects.",
    tags: ["Interior/Exterior Paint", "Primers", "Hardware Tools", "Lesso Building"]
  },
  {
    id: 4,
    title: "Heavy-Duty Diesel & Petrol Power Generators",
    category: "power",
    badge: "Industrial & Backup",
    image: "images/generator.jpeg",
    description: "Reliable backup and prime power generators for construction sites, factories, hospitals, offices, and residences. Available in multiple kVA capacities.",
    tags: ["Backup Generators", "Industrial Power", "Silent Canopy", "Fast Delivery"]
  },
  {
    id: 5,
    title: "Modern Electric Cars (EV Fleet & Personal)",
    category: "ev",
    badge: "New Expansion ⚡",
    image: "images/ev-car.jpeg",
    description: "Zero-emission electric vehicles built for efficiency, comfort, and ultra-low running costs. Available for direct order and corporate fleet supply in Kigali.",
    tags: ["Electric Vehicles", "Zero Fuel Cost", "Fleet Orders", "Green Mobility"]
  },
  {
    id: 6,
    title: "High-Torque Electric Bikes & Delivery Motorcycles",
    category: "ev",
    badge: "New Expansion ⚡",
    image: "images/ev-bike.jpeg",
    description: "Powerful electric motorcycles engineered for Kigali's terrain. Ideal for commercial delivery riders, commuters, and businesses cutting fuel expenses.",
    tags: ["Electric Bikes", "Delivery Fleet", "Long Battery Life", "Fast Charging"]
  },
  {
    id: 7,
    title: "Custom Factory-Direct Bulk & LPO Procurement",
    category: "general",
    badge: "We Supply Anything",
    image: "images/showroom.jpeg",
    description: "Need items not pictured here? We partner directly with manufacturers to supply office consumables, hospitality glassware, ceramics, hygiene supplies, and custom machinery within 1 week of LPO.",
    tags: ["Custom LPOs", "Office & Cleaning Supplies", "Factory Direct", "DDP 7-Day Delivery"]
  }
];

const productGrid = document.getElementById("productGrid");
const filterBtns = document.querySelectorAll(".filter-btn");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");

function renderProducts(filter = "all") {
  productGrid.innerHTML = "";

  const filtered = filter === "all"
    ? products
    : products.filter(item => item.category === filter);

  filtered.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.title}" loading="lazy" />
        <span class="product-badge">${product.badge}</span>
      </div>
      <div class="product-body">
        <h3>${product.title}</h3>
        <p>${product.description}</p>
        <div class="product-tags">
          ${product.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
        <a href="#quote-section" class="btn btn-primary btn-block" onclick="prefillCategory('${product.title.replace(/'/g, "\\'")}')">
          Request Quote / Bulk Order
        </a>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// Category filter buttons
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderProducts(btn.dataset.filter);
  });
});

// Pre-fill quote form when clicking a product
window.prefillCategory = function(itemName) {
  const detailsBox = document.getElementById("orderDetails");
  if (detailsBox) {
    detailsBox.value = `I would like to request pricing / bulk supply for: ${itemName}\nQuantity needed: `;
    detailsBox.focus();
  }
};

// Mobile menu toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });
}

// Quote Form -> WhatsApp & Email handlers
const quoteForm = document.getElementById("quoteForm");
const emailOrderBtn = document.getElementById("emailOrderBtn");

function buildOrderMessage() {
  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const email = document.getElementById("clientEmail").value.trim();
  const category = document.getElementById("supplyCategory").value;
  const details = document.getElementById("orderDetails").value.trim();

  return `Hello Sreest Paints and Supplies Ltd!%0A%0A*NEW SUPPLY / QUOTE REQUEST*%0A*Client/Company:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Email:* ${encodeURIComponent(email || "N/A")}%0A*Category:* ${encodeURIComponent(category)}%0A*Items & Quantities:*%0A${encodeURIComponent(details)}`;
}

quoteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = buildOrderMessage();
  window.open(`https://wa.me/250780680463?text=${msg}`, "_blank");
});

emailOrderBtn.addEventListener("click", () => {
  if (!quoteForm.checkValidity()) {
    quoteForm.reportValidity();
    return;
  }
  const name = document.getElementById("clientName").value.trim();
  const phone = document.getElementById("clientPhone").value.trim();
  const category = document.getElementById("supplyCategory").value;
  const details = document.getElementById("orderDetails").value.trim();

  const subject = encodeURIComponent(`Supply / LPO Quote Request - ${name}`);
  const body = encodeURIComponent(
    `Hello Sreest Paints and Supplies Ltd,\n\nPlease find our supply inquiry below:\n\nClient / Company: ${name}\nPhone: ${phone}\nCategory: ${category}\n\nItems & Quantities Needed:\n${details}\n\nThank you.`
  );
  window.location.href = `mailto:honorineiradukunda4@gmail.com,uwitonzealexie5@gmail.com?subject=${subject}&body=${body}`;
});

// Initial load
renderProducts();
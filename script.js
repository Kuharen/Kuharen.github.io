import { SHEET_URLS } from './config.js';

const productList = document.getElementById("product-list");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");
const modalClose = document.getElementById("modal-close");

let currentGender = "men";

async function fetchData(gender) {
  const url = SHEET_URLS[gender];
  try {
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    console.error("Ошибка загрузки данных:", err);
    return [];
  }
}

function renderProducts(products) {
  productList.innerHTML = "";
  products.forEach((item) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${getImageUrl(item['Фото']) || 'default.jpg'}" alt="sneaker" />
      <h3>${item["Название"]}</h3>
      <p><strong>Размеры:</strong> ${item["Размеры"]}</p>
      <p class="price">${item["Цена"] || "—"}</p>
      <button class="order-btn">Заказать</button>
    `;
    card.addEventListener("click", () => openModal(item));
    productList.appendChild(card);
  });
}

function openModal(item) {
  modalBody.innerHTML = `
    <img src="${getImageUrl(item['Фото']) || 'default.jpg'}" alt="sneaker" />
    <h2>${item["Название"]}</h2>
    <p><strong>Артикул:</strong> ${item["артикул"] || "—"}</p>
    <p><strong>Бренд:</strong> ${item["Бренд"] || "—"}</p>
    <p><strong>Размеры:</strong> ${item["Размеры"] || "—"}</p>
    <p><strong>Цена:</strong> ${item["Цена"] || "—"}</p>
  `;
  modal.style.display = "block";
}
modalClose.onclick = () => (modal.style.display = "none");
window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};

document.getElementById("menBtn").addEventListener("click", () => {
  currentGender = "men";
  toggleGenderButtons();
  loadProducts();
});
document.getElementById("womenBtn").addEventListener("click", () => {
  currentGender = "women";
  toggleGenderButtons();
  loadProducts();
});

function toggleGenderButtons() {
  document.getElementById("menBtn").classList.toggle("active", currentGender === "men");
  document.getElementById("womenBtn").classList.toggle("active", currentGender === "women");
}

function getImageUrl(rawUrl) {
  const match = rawUrl?.match(/\/d\/([\w-]+)/);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : rawUrl;
}

async function loadProducts() {
  const data = await fetchData(currentGender);
  renderProducts(data);
}

loadProducts();
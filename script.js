
// script.js — финальная логика каталога
import { SHEET_URLS } from './config.js';

const catalogContainer = document.getElementById("catalog");
const menBtn = document.getElementById("menBtn");
const womenBtn = document.getElementById("womenBtn");

function setActive(button) {
  menBtn.classList.remove("active");
  womenBtn.classList.remove("active");
  button.classList.add("active");
}

function renderCatalog(data) {
  catalogContainer.innerHTML = data.map(item => `
    <div class="card">
      <img src="${item["Фото"]}" alt="sneaker">
      <h3>${item["Название"]}</h3>
      <p>Размеры: ${item["Размеры"]}</p>
      <p class="price">${item["Цена"]}</p>
      <button>Заказать</button>
    </div>
  `).join("");
}

async function loadCatalog(type) {
  const url = SHEET_URLS[type];
  const res = await fetch(url);
  const data = await res.json();
  renderCatalog(data);
}

menBtn.addEventListener("click", () => {
  setActive(menBtn);
  loadCatalog("men");
});

womenBtn.addEventListener("click", () => {
  setActive(womenBtn);
  loadCatalog("women");
});

// Стартуем с мужского каталога
loadCatalog("men");
setActive(menBtn);

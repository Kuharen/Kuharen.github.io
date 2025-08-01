
const maleSheet = 'https://opensheet.elk.sh/13TgVvLI8Dnfhn40fD_sQarLVuSsMd5_-oma2mgg5Ylc/Лист1';
const femaleSheet = 'https://opensheet.elk.sh/12SCGsWfpTbkKt5htyrPfdUi7hbvK2I7anSvvNs_qy3k/Лист1';

let currentGender = 'Мужские';
let products = [];

document.querySelectorAll(".tab-button").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tab-button").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    currentGender = button.dataset.gender;
    loadData();
  });
});

function loadData() {
  const url = currentGender === 'Мужские' ? maleSheet : femaleSheet;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      products = data;
      renderCatalog(data);
    });
}

function renderCatalog(data) {
  const container = document.getElementById("catalog");
  container.innerHTML = "";
  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${item.Фото || 'default.jpg'}" width="100%" />
      <h3>${item.Бренд || 'Без бренда'}</h3>
      <p>${item.Название || ''}</p>
      <p>${item.Цена}₽</p>
      <button onclick="addToCart('${item.Название}', ${item.Цена})">В корзину</button>
    `;
    container.appendChild(div);
  });
}

function addToCart(name, price) {
  const container = document.getElementById("cartItems");
  const div = document.createElement("div");
  div.textContent = `${name} — ${price}₽`;
  container.appendChild(div);
  const total = document.getElementById("totalPrice");
  const sum = parseInt(total.textContent) + parseInt(price);
  total.textContent = sum + "₽";
}

loadData();

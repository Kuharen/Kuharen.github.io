
async function fetchData(url) {
  const res = await fetch(url);
  return await res.json();
}

function renderCatalog(data) {
  const catalog = document.getElementById("catalog");
  if (!catalog) return;
  catalog.innerHTML = "";
  data.forEach(item => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = \`
      <strong>\${item["Название"]}</strong><br>
      Размеры: \${item["Размеры"]}<br>
      <span style="color:red">\${item["Цена"]}₽</span><br>
      <button onclick="addToCart('\${item["Название"]}', \${item["Цена"]})">Заказать</button>
    \`;
    catalog.appendChild(div);
  });
}

let currentData = [];
let cart = [];

function addToCart(name, price) {
  cart.push({ name, price: parseInt(price) });
  updateCart();
}

function updateCart() {
  document.getElementById("cart-count").innerText = cart.length;
  const ul = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  ul.innerHTML = "";
  let sum = 0;
  cart.forEach(item => {
    const li = document.createElement("li");
    li.innerText = \`\${item.name} — \${item.price}₽\`;
    ul.appendChild(li);
    sum += item.price;
  });
  total.innerText = sum + "₽";
}

async function loadCatalog(url) {
  const data = await fetchData(url);
  currentData = data;
  renderCatalog(data);
}

document.getElementById("menBtn").onclick = () => loadCatalog(CONFIG.mens);
document.getElementById("womenBtn").onclick = () => loadCatalog(CONFIG.womens);
document.getElementById("closeCartBtn").onclick = () => document.getElementById("cart").style.display = 'none';
document.getElementById("checkoutBtn").onclick = () => alert("Спасибо за заказ!");

loadCatalog(CONFIG.mens);

var inputs = document.querySelectorAll("input");
var title = document.getElementById("title");
var price = document.getElementById("price");
var taxes = document.getElementById("taxes");
var ads = document.getElementById("ads");
var discount = document.getElementById("discount");
var total = document.getElementById("total");
var count = document.getElementById("count");
var category = document.getElementById("category");
var createBtn = document.getElementById("createBtn");
var searchInput = document.getElementById("searchInput");
var tBody = document.querySelector("tbody");
var delAllBtn = document.getElementById("delAllBtn");
var mode = "create";
var proIndex;
var product;
var showTable;

function calcTotal() {
  if (price.value != "") {
    total.textContent = (
      +price.value +
      +taxes.value +
      +ads.value -
      +discount.value
    ).toString();
    total.style.background = "green";
  } else {
    total.textContent = "";
    total.style.background = "#4e4cec";
  }
}
let data;
addEventListener("keyup", calcTotal);
if (localStorage.product != null) {
  data = JSON.parse(localStorage.product);
} else {
  data = [];
}

createBtn.addEventListener("click", function () {
  inputs.forEach((item) => {
    if (item.value != "") {
      const newItem = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.textContent,
        category: category.value.toLowerCase(),
        count: count.value,
      };
      product = newItem;
      if (mode === "create") {
        if (count.value > 1) {
          for (let j = 0; j < newItem.count; j++) {
            data.push(newItem);
          }
        } else {
          data.push(newItem);
        }
      } else {
        data[proIndex] = product;
        mode = "create";
        createBtn.textContent = "Create";
        count.style.display = "block";
      }

      localStorage.setItem("product", JSON.stringify(data));
    }
    calcTotal();
    showData();
    resetInputs();
  });
});

function resetInputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.textContent = "";
  category.value = "";
  count.value = "";
}

function showData() {
  let table = "";

  for (let i = 0; i < data.length; i++) {
    table += `
     <tr>
        <td>${i + 1}</td>
        <td>${data[i].title}</td>
        <td>${data[i].price}</td>
        <td>${data[i].taxes}</td>
        <td>${data[i].ads}</td>
        <td>${data[i].discount}</td>
        <td>${data[i].total}</td>
        <td>${data[i].category}</td>
        <td class="tbtn" onclick="UpdateItem(${i})"><button>Update</button></td>
        <td class="tbtn" onclick="deleteData(${i})"><button>Delete</button></td>
    </tr>
    
    `;
    document.querySelector("#productsCount").textContent = `(${data.length})`;
  }

  tBody.innerHTML = table;

  if (data.length > 0) {
    delAllBtn.style.display = "block";
  } else if (data.length == 0) {
    delAllBtn.style.display = "none";
  }
}
showData();

function deleteData(i) {
  data.splice(i, 1);
  localStorage.product = JSON.stringify(data);
  showData();
}

function deleteAllData() {
  data.splice(0);
  localStorage.product = JSON.stringify(data);
  showData();
}

function UpdateItem(i) {
  title.value = data[i].title;
  price.value = data[i].price;
  taxes.value = data[i].taxes;
  ads.value = data[i].ads;
  discount.value = data[i].discount;
  total.textContent = data[i].total;
  category.value = data[i].category;
  createBtn.textContent = "Update";
  count.style.display = "none";
  mode = "update";
  calcTotal();
  proIndex = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

let searchMode = "title";

function getSearchMode(id) {
  if (id == "searchTitle") {
    searchMode = "title";
    searchInput.placeholder = "Search By Title";
  } else {
    searchMode = "category";
    searchInput.placeholder = "Search By category";
  }
  searchInput.focus();
  searchInput.value = "";
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < data.length; i++) {
    if (searchMode == "title") {
      if (data[i].title.includes(value.toLowerCase())) {
        table += `
 <tr>
    <td>${i + 1}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td class="tbtn" onclick="UpdateItem(${i})"><button>Update</button></td>
    <td class="tbtn" onclick="deleteData(${i})"><button>Delete</button></td>
</tr>

`;
      }
    } else {
      if (data[i].category.includes(value.toLowerCase())) {
        table += `
 <tr>
    <td>${i + 1}</td>
    <td>${data[i].title}</td>
    <td>${data[i].price}</td>
    <td>${data[i].taxes}</td>
    <td>${data[i].ads}</td>
    <td>${data[i].discount}</td>
    <td>${data[i].total}</td>
    <td>${data[i].category}</td>
    <td class="tbtn" onclick="UpdateItem(${i})"><button>Update</button></td>
    <td class="tbtn" onclick="deleteData(${i})"><button>Delete</button></td>
</tr>

`;
      }
    }
  }

  tBody.innerHTML = table;
}

let td = document.querySelector("td")
if(td.width > 143.84){
  td.style.fontSize = '10px'
}
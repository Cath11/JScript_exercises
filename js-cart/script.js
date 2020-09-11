var products = {
  1 : {
    name : "Cute fluffy",
    desc : "Soft and cuddly",
    img : "item6.jpg",
    price : 20
  },
  2 : {
    name : "Soft squishy",
    desc : "Gives the best hugs",
    img : "item8.jpg",
    price : 22
  },
  3 : {
    name : "Cuddly buddie",
    desc : "Great for afternoon cuddles",
    img : "item7.jpg",
    price : 24
  },
  4 : {
    name : "Cutesy Cutie",
    desc : "Soft and cuddly",
    img : "item5.jpg",
    price : 26
  }
};


window.addEventListener("load", function(){
  var container = document.getElementById("cart-products"),
      item = null, part = null;
  for (let i in products) {
    item = document.createElement("div");
    item.classList.add("p-item");

    part = document.createElement("img");
    part.src = products[i]['img'];
    part.classList.add("p-img");
    item.appendChild(part);

    part = document.createElement("div");
    part.innerHTML = products[i]['name'];
    part.classList.add("p-name");
    item.appendChild(part);

    part = document.createElement("div");
    part.innerHTML = "$" + products[i]['price'];
    part.classList.add("p-price");
    item.appendChild(part);

    part = document.createElement("div");
    part.innerHTML = products[i]['desc'];
    part.classList.add("p-desc");
    item.appendChild(part);

    part = document.createElement("input");
    part.type = "button";
    part.value = "Add to Cart";
    part.classList.add("p-add");
    part.onclick = cart.add;
    part.dataset.id = i;
    item.appendChild(part);

    container.appendChild(item);
  }
});

var cart = {
  data : null, 

  load : function(){
  
    cart.data = localStorage.getItem("cart");
    if (cart.data == null) { cart.data = {}; }
    else { cart.data = JSON.parse(cart.data); }
  },

  save : function(){
      localStorage.setItem("cart", JSON.stringify(cart.data));
  },
  add : function(){
  
    if (cart.data[this.dataset.id] == undefined) {
      var product = products[this.dataset.id];
      cart.data[this.dataset.id] = {
        name : product['name'],
        desc : product['desc'],
        img : product['img'],
        price : product['price'],
        qty : 1
      };
    } else {
      cart.data[this.dataset.id]['qty']++;
    }

    cart.save();
    cart.list();
  },

  list : function(){

    var container = document.getElementById("cart-list"),
        item = null, part = null, product = null;
    container.innerHTML = "";
    
    var isempty = function(obj){
      for (var key in obj) {
        if(obj.hasOwnProperty(key)) { return false; }
      }
      return true;
    };
    if (isempty(cart.data)) {
      item = document.createElement("div");
      item.innerHTML = "Cart is empty";
      container.appendChild(item);
    }
    
    else {
      var total = 0, subtotal = 0;
      for (var i in cart.data) {
        item = document.createElement("div");
        item.classList.add("c-item");
        product = cart.data[i];

        part = document.createElement("input");
        part.type = "number";
        part.value = product['qty'];
        part.dataset.id = i;
        part.classList.add("c-qty");
        part.addEventListener("change", cart.change);
        item.appendChild(part);

        part = document.createElement("span");
        part.innerHTML = product['name'];
        part.classList.add("c-name");
        item.appendChild(part);

        subtotal = product['qty'] * product['price'];
        total += subtotal;

        container.appendChild(item);
      }

      item = document.createElement("input");
      item.type = "button";
      item.value = "Empty";
      item.addEventListener("click", cart.reset);
      item.classList.add("c-empty");
      container.appendChild(item);
      
      item = document.createElement("input");
      item.type = "button";
      item.value = "Checkout - " + "$" + total;
      item.addEventListener("click", cart.checkout);
      item.classList.add("c-checkout");
      container.appendChild(item);
    }
  },

  change : function(){
    if (this.value == 0) {
      delete cart.data[this.dataset.id];
    } else {
      cart.data[this.dataset.id]['qty'] = this.value;
    }
    cart.save();
    cart.list();
  },

  reset : function(){
    if (confirm("Empty cart?")) {
      cart.data = {};
      cart.save();
      cart.list();
    }
  },

  checkout : function(){
      alert("TODO");
  }
};

window.addEventListener("load", function(){
  cart.load();
  cart.list();
});
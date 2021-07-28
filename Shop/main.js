
var User = class {
    constructor(){
        this.total = 0;
        this.items = [];        
    }
}

var a = new User;

fetch('https://fakestoreapi.com/products').then(res => res.json()).then(data => {data.map(obj =>{
    let card = document.createElement('div') 
    let top = document.createElement('div')
    let img = document.createElement('img')
    let bottom = document.createElement('div')  // HTML ELEMENTLERİNİN OLUŞTURULMASI
    let title = document.createElement('h1')
    let price = document.createElement('p')
    let button = document.createElement('button')

    card.className = "card";
    top.className = "top";
    img.className = "img";
    bottom.className = "bottom";    // HTML ELEMENTLERİNİN CLASSA DAHİL EDİLMESİ
    title.className = "title";
    price.className = "price";
    button.className = "button";
    
    top.style.gridArea = "top";
    bottom.style.gridArea = "bottom";
    title.style.gridArea = "title";     // HTML ELEMENTLERİNİN GRİD ALANLARININ VERİLMESİ
    price.style.gridArea = "price";
    button.style.gridArea = "button";

    document.body.appendChild(card);
    card.appendChild(top);
    top.appendChild(img);
    card.appendChild(bottom);       // HTML ELEMENTLERİNİN "document" İÇİNE DAHİL EDİLMESİ
    bottom.appendChild(title);
    bottom.appendChild(price);
    bottom.appendChild(button);

    img.src = `${obj.image}`;
    title.innerHTML = `${obj.title}`;
    price.innerHTML = `$${obj.price}`;      //USER NESNESİNDEKİ VERİLERİN ELEMENT İÇERLERİNE YERLEŞTİRİLMESİ
    button.innerHTML = `Add to Cart` ;
    
    button.addEventListener('click',()=>{
        a.total += obj.price;
        a.items.push(obj.title);                // "Add to Cart" BUTONU CLICK EVENTİNİN DİNLENMESİ VE FONKSİYONU
        document.getElementById('number').innerHTML = `${a.items.length}`;
    })

})});

function calculate(){ // SEPET BUTONUNUN FONKSİYONU
    if(a.items.length == 0){
        alert('There are no items in your cart.')
    }else{
        alert(`Total Price: $${parseFloat(a.total).toFixed(2)}
    Items:
    ${a.items}`);
    }
    
}
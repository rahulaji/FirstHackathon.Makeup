//declare html tags using dom

const div=document.createElement('div');
div.className="container";
document.body.append(div);
const header =document.querySelector('.header');
header.innerHTML=`<div class="heading">
<img class="tittle-image" src="./eyes.png">
    <h2 class="headText">MakeUp Room</h2>
    </div>
    `
    const load =document.createElement('div');
    load.className="load";
    load.innerHTML =` 
    <div id="loading"></div>
    <p class="loading-text">Thank You for your patient Your Style on your way"</p>
    </div>
    `
   

    //getting data using async & await
    
    async function getData(){
        let upiData="https://makeup-api.herokuapp.com/api/v1/products.json"
        try{
            const data= await fetch(upiData,
            {
                method:"GET"
            }
      );
      if(data.status===200){
        const products=await data.json(); 
        load.remove();
        loadData((products.slice(0,250))); //To speedup my loading data
      }else
           throw new Error("Page Not Found");
      
        }catch (err){
            console.log(err);
        }
    }


    function loadData(products){
        products.forEach(products => {
            div.innerHTML+=
            `<div class=box>
            <img class=product-image src=${products.api_featured_image}">
            <div class=product-details>
            <h3>${products.name}</h3>
            <p class="brand-name">${products.brand}</p>
            <div class="buy-now">
            <p class="price><span class="tittle">price:$</span>${products.price}USD</p>
            <a class="product-link" href="${products.product_link}">Buy Now</a>
            </div>
            <div class="description">
            <p><span class="tittle des-tittle">Description :<span><br>
            <span class="des-text">${products.description} :</span></p>
            </div>
            </div>
            </div>`   
        });
    }
   


    // calling the function

    const main=document.querySelector(".main")
    getData();
    main.append(load);
    main.append(div);
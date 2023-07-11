
const parent = document.querySelector(".parent");
let currentPage = 1;
var currindex;
renderingData();

async function renderingData(){
    try {
    //var api = `https://pokeapi.co/api/v2/pokemon/${i}/?limit=300`;
    var pokeData = [];

   for(var i=1; i<=300; i++){
    var api = `https://pokeapi.co/api/v2/pokemon/${i}`;
    
     var v1 = await fetch(api);
      //console.log("v1",v1);
     var p1 = await v1.json();
      //console.log("p1",p1);
     pokeData[i-1] = p1;
     
   }
//console.log("PD 1",pokeData);
var k=1, jindex=0;
renderingPokemon(pokeData, currentPage, jindex, k);

return pokeData;

    }catch(err){
        console.log("err", err);
    }

}


function renderingPokemon(pokeData, currentPage, jindex, k){
    clearPage();
    try{
       // console.log("PD", pokeData);
    
       j= jindex;

    for(var j; j<300; j++){
         //for(var a=0; a<30; a++){

         if(k<=30){

            var pokeobj = 
                        {
                            'id': pokeData[j].id,
                            'name': pokeData[j].name,
                            'image': pokeData[j].sprites['front_default'],
                            'type': pokeData[j].types.map((type) => type.type.name).join(', '),
                            'height': pokeData[j].height,
                            'weight': pokeData[j].weight
                        }

        //console.log("PokeObj", pokeobj);

        var box = document.createElement("div");
            box.classList.add("box");
      
        var pokeid = document.createElement("span");
                //pokeid.innerHTML = pokeobj.id;
                pokeid.innerHTML = `<b style="background-color:  rgb(65, 70, 98);  width:60px; display: inline-block;
                                    padding: 5px; border-radius: 50%;">
                                    ${pokeobj.id}</b>`
                pokeid.classList.add('pokeid');
                box.append(pokeid);
        var pokeimage = document.createElement("img");
                pokeimage.setAttribute('src', pokeobj.image);
                pokeimage.setAttribute('alt', pokeobj.name);
                pokeimage.classList.add('pokeimage');
                box.append(pokeimage); 
        var pokename = document.createElement('p');
                pokename.innerHTML = `<span class="ball1"> </span>  ${pokeobj.name} <span class="ball2"> </span>`;
                pokename.classList.add('pokename');
                box.append(pokename);
        var poketype = document.createElement('p');
                poketype.classList.add('type');
                poketype.innerHTML = `<span class="types"><b>Type </b></span> ${pokeobj.type}`;
                box.append(poketype);
        var pokeheight = document.createElement('span');
                pokeheight.classList.add('height');
                pokeheight.innerHTML = `<span class="hw"><b>Height </b></span>
                                         <b style="background-color:  rgb(99,89,239);  width:30px; display: inline-block;
                                         padding: 5px; border-radius: 50%;">
                                         ${pokeobj.height}</b>`;
                box.append(pokeheight);
        var pokeweight = document.createElement('span');
                pokeweight.classList.add('weight');
                pokeweight.innerHTML = `<span class="hw"><b>Weight </b></span>
                                         <b style="background-color:  rgb(186,41,125);  width:30px; display: inline-block;
                                         padding: 5px; border-radius: 50%;">
                                        ${pokeobj.height}</b>`;
                box.append(pokeweight);

        parent.append(box);
        k++;
  
       //if k loop end
     }
    }//for j loop end

    var navigation = document.createElement("div");
    navigation.className = "navigation";

    var firstpage = document.createElement("button");
    firstpage.classList.add("first-next-btn");
    firstpage.innerHTML = "First";    

    var previous = document.createElement("button");
    previous.classList.add("previous-last-btn");
    previous.innerHTML = "« Previous";

    var next = document.createElement("button");
    next.classList.add("first-next-btn");
    next.innerHTML = "Next »";

    var lastpage = document.createElement("button");
    lastpage.classList.add("previous-last-btn");
    lastpage.innerHTML = "Last";

    navigation.append(firstpage, previous, next, lastpage);
    parent.append(navigation);

    firstpage.addEventListener("click", async function firstPage() {
        k = 1;
        currentPage = 1;
        jindex = 0;
        await renderingPokemon(pokeData, currentPage, jindex, k);
        pagetopFunc();
    });

    previous.addEventListener("click", async function previousPage() {
        k = 1;
        currentPage--;
        const element = document.getElementsByClassName("box")
        currindex = element[29].firstElementChild.innerText;
        //console.log('jp1', currindex);
        jindex = Number(currindex) - 60;
        //console.log('jp2', j);
        await renderingPokemon(pokeData, currentPage, jindex, k);
        pagetopFunc();
    });

    if(currentPage == 1){
        previous.disabled = true;
        firstpage.disabled = true;
    }

    next.addEventListener("click", async function nextPage() {
        k = 1;
        currentPage++;
        const element = document.getElementsByClassName("box")
        currindex = element[29].firstElementChild.innerText;
        //console.log('jn1', currindex);
        jindex = Number(currindex);
        //console.log('jn2', jindex);
        await renderingPokemon(pokeData, currentPage, jindex, k);
        pagetopFunc();
    });

    lastpage.addEventListener("click", async function lastPage() {
            k = 1;
            currentPage = 10;
            jindex = 270;
            await renderingPokemon(pokeData, currentPage, jindex, k);
            pagetopFunc();
      });
      
      if(currentPage == 10){
        next.disabled = true;
        lastpage.disabled = true;
      }


    }catch(err){
        console.log("Error", err);
    }

}


function clearPage(){
  parent.innerHTML = '';
}

function pagetopFunc() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

function pokeSearch(){
  let userInput = document.getElementById("searchbar").value;
  userInput = userInput.toLowerCase();

  let search = document.getElementsByClassName("box");
  
  for(var i=0; i<search.length; i++){
      if(!search[i].innerHTML.toLowerCase().includes(userInput)){
          search[i].style.display = "none";
      }else{
          search[i].style.display = "list-item";
      }
  }
}
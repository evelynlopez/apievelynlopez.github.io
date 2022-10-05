const urlPersonajes='https://fedeperin-harry-potter-api.herokuapp.com/personajes'
const urlHechizos='https://fedeperin-harry-potter-api.herokuapp.com/hechizos'
const urlLibros ="https://fedeperin-harry-potter-api.herokuapp.com/libros"

let getPersonajesPrincipales=()=>{
    fetch(urlPersonajes)
   .then((res) => res.json())
   .then((data) => {
        data.forEach(index =>{
            let divPersonajes= document.getElementById("personajes")
            var div = document.createElement('div');
            div.id = index.apodo;
            div.className="col-lg-3 col-md-6 d-flex align-items-stretch"
            div.innerHTML=`
            <div class="member" data-aos="fade-up" data-aos-delay="100">
                <div class="member-img">
                    <img src="${index.imagen}" class="img-fluid" alt="">
                </div>
                <div class="member-info">
                    <h4>${index.personaje}</h4>
                    <span>${index.casaDeHogwarts}</span>
                </div>
            </div>
            `
            divPersonajes.appendChild(div);
        });
    })
    .catch((e) => console.log(e))
}

let getHechizos=()=>{
    fetch(urlHechizos)
    .then((res) => res.json())
    .then((data) => {
        data.forEach(index =>{
            let divPersonajes= document.getElementById("hechizos")
            var div = document.createElement('div');
            div.className="col-lg-4 col-md-6 d-flex align-items-stretch";
            div.dataAos ="zoom-in";
            div.innerHTML=`
                <div class="icon-box click" id="${index.hechizo}">
                <div id="${index.hechizo}" class="icon click"><i id="${index.hechizo}" class="bi bi-brush"></i></div>
                    <p><strong id="${index.hechizo}">${index.hechizo}</strong></p>
                    <p id="uso-${index.hechizo}"></p>
                </div>
            `
            divPersonajes.appendChild(div);
        });
        clickHechizos();
    })
    .catch((e) => console.log(e))
}

let clickHechizos=()=>{
    document.querySelectorAll(".click").forEach(el => {
        el.addEventListener("click", e => {
            const id = e.target.getAttribute("id");
            mostrarUso(id)
        });
    });
}

let mostrarUso=(nombreHechizo)=>{
    fetch(urlHechizos)
    .then((res) => res.json())
    .then((data) => {
        data.forEach(index =>{
            if(index.hechizo == nombreHechizo){
                document.getElementById(`uso-${index.hechizo}`).innerHTML= index.uso
            }
        });
    })
    .catch((e) => console.log(e))
}

let getLibros=()=>{
    fetch(urlLibros)
    .then((res) => res.json())
    .then((data) => {
        data.forEach(index =>{
            let divPersonajes= document.getElementById("row-libros")
            var div = document.createElement('div');
            div.className="col-lg-4 col-md-6 d-flex align-items-stretch";
            div.innerHTML=`
            <div class="member" data-aos="fade-up" data-aos-delay="100">
                <div class="member-img">
                    <img src="assets/img/librosPortada/libro${index.id}.jpg" class="img-fluid" alt="">
                </div>
                <div class="member-info">
                    <h4>${index.titulo_original}</h4>
                    <span>${index.autora}</span></br>
                    <span>${index.descripcion}</span>
                </div>
            </div>

            `
            divPersonajes.appendChild(div);
        });
        clickHechizos();
    })
    .catch((e) => console.log(e))
}

getPersonajesPrincipales(urlPersonajes);
getHechizos(urlHechizos);
getLibros();
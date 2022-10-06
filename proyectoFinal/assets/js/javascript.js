const urlPersonajes='https://fedeperin-harry-potter-api.herokuapp.com/personajes'
const urlHechizos='https://fedeperin-harry-potter-api.herokuapp.com/hechizos'
const urlLibros ="https://fedeperin-harry-potter-api.herokuapp.com/libros"
const urlCasas="https://hp-api.herokuapp.com/api/characters"

//funciones personajes
let getPersonajesPrincipales=()=>{
    fetch(urlPersonajes)
   .then((res) => res.json())
   .then((data) => {
        data.forEach(index =>{
            let template = document.querySelector("#personajes-template").content;
            let clone = template.cloneNode(true);
            let contenedor = document.querySelector("#personajes");
            clone.querySelector(".img-fluid").setAttribute("src", index.imagen);
            clone.querySelector(".dot").innerText = index.personaje;
            clone.querySelector(".s-casa").innerText = index.casaDeHogwarts;
            contenedor.appendChild(clone);
            clickHechizos();
        });
    })
    .catch((e) => console.log(e))
}

//funciones hechizos
let getHechizos=()=>{
    fetch(urlHechizos)
    .then((res) => res.json())
    .then((data) => {
        data.forEach(index =>{
            let template = document.querySelector("#hechizos-template").content;
            let clone = template.cloneNode(true);
            let contenedor = document.querySelector("#hechizos");
            clone.querySelector(".click").setAttribute("id", index.hechizo);
            clone.querySelector(".icon").setAttribute("id", index.hechizo);
            clone.querySelector(".bi-brush").setAttribute("id", index.hechizo);
            clone.querySelector(".p-name").innerText = index.hechizo;
            clone.querySelector(".uso").setAttribute("id", `uso${index.hechizo}`);
            contenedor.appendChild(clone);
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
                document.getElementById(`uso${index.hechizo}`).innerHTML= index.uso
            }
        });
    })
    .catch((e) => console.log(e))
}


//funcion libros
let getLibros=()=>{
    fetch(urlLibros)
    .then((res) => res.json())
    .then((data) => {
        data.forEach(index =>{
            let template = document.querySelector("#libros-template").content;
            let clone = template.cloneNode(true);
            let contenedor = document.querySelector("#row-libros");
            clone.querySelector(".librosimg").setAttribute("src", `assets/img/librosPortada/libro${index.id}.jpg`);
            clone.querySelector(".libroNombre").innerText = index.libro;
            clone.querySelector(".autora").innerText = `${index.autora} - ${index.fecha_de_lanzamiento}`;
            clone.querySelector(".descripcion").innerText = index.descripcion;
            contenedor.appendChild(clone);
        });
        clickHechizos();
    })
    .catch((e) => console.log(e))
}


let casa=(casa)=>{
    uri=`${urlCasas}${casa}`;
    fetch(uri)
    .then((res) => res.json())
    .then((data) => {
        for (var i=0; i < data.length; i++){
            let li = document.createElement("li");
            li.className="list-group-item"
            var p = document.createElement("p");
            contenido = `${data[i].name}`;
            p.appendChild(document.createTextNode(contenido));
            document.querySelector(`#${casa}`).appendChild(li).appendChild(p);
        }
    })
    .catch((e) => console.log(e))
}
let getCasaPersonaje=()=>{
    let getPersonaje=document.getElementById("search").value;
    fetch(urlCasas)
    .then((res) => res.json())
    .then((data) => {
        let search=toUppercase(getPersonaje.toLowerCase())
        let casas= document.getElementsByClassName("divs-casas");
        var bandera = 0;
        casas ? [].forEach.call(document.querySelectorAll(".divs-casas"), function(regla){regla.parentNode.removeChild(regla);}) : console.log("no existe")
        for (var i=0; i < data.length; i++){
            if ((data[i].name).includes(search.join(" "))) { 
                let template = document.querySelector("#casas-template").content;
                let clone = template.cloneNode(true);
                let contenedor = document.querySelector("#casasAlumnos");
                clone.querySelector(".casas-personajes").setAttribute("class", "col-lg-3 col-md-6 d-flex align-items-stretch casas-personajes divs-casas");
                clone.querySelector(".img-fluid").setAttribute("src", data[i].image);
                data[i].house != ""? clone.querySelector(".dot").innerText = data[i].house  : clone.querySelector(".dot").innerText = "No estudió en Hogwarts";
                clone.querySelector(".s-casa").innerText =data[i].name;
                contenedor.appendChild(clone);
                bandera =1;
            }
        }
        if(bandera==0){
            let template = document.querySelector("#casas-template").content;
            let clone = template.cloneNode(true);
            let contenedor = document.querySelector("#casasAlumnos");
            clone.querySelector(".casas-personajes").setAttribute("class", "col-lg-3 col-md-6 d-flex align-items-stretch casas-personajes divs-casas");
            clone.querySelector(".dot").innerText = "Personaje no encontrado :(";
            contenedor.appendChild(clone);
        }
    })
}

let toUppercase=(getPersonaje)=>{
    const palabras = getPersonaje.split(" ");
    for (let i = 0; i < palabras.length; i++) {
        palabras[i] = palabras[i][0].toUpperCase() + palabras[i].substr(1);
    }
    return palabras;
}


getPersonajesPrincipales(urlPersonajes);
getHechizos(urlHechizos);
getLibros();
var urlPersonajes='https://fedeperin-harry-potter-api.herokuapp.com/personajes'
var urlHechizos='https://fedeperin-harry-potter-api.herokuapp.com/hechizos'

let personajesPrincipales=()=>{
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
let hechizos=()=>{
    fetch(urlHechizos)
   .then((res) => res.json())
   .then((data) => {
        data.forEach(index =>{
                let divPersonajes= document.getElementById("hechizos")
                var div = document.createElement('div');
                div.className="col-lg-4 col-md-6 d-flex align-items-stretch";
                div.dataAos ="zoom-in";
                div.innerHTML=`
                    <div class="icon-box">
                        <div class="icon"><i class="bx bxl-dribbble"></i></div>
                    <p><strong>${index.hechizo}</strong></p>
                    <p>${index.uso}</p>
                    </div>
                `
                divPersonajes.appendChild(div);
        });

   })
   .catch((e) => console.log(e))
}

personajesPrincipales(urlPersonajes)
hechizos(urlHechizos);
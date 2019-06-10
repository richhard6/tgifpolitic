

var members ;


fetch('https://api.propublica.org/congress/v1/113/senate/members.json', {
    headers: {
        'X-API-Key': 'OIYqnvh45TuPsczPNG4SxTAQpkAb5UixfCO3m4QT'
    }
}) 
 .then(function(res){
    return res.json();
} )
.then(function(json){
    
members = json.results[0].members;
superCreaTablas();
quitaRepetidos();


})

//Listeners


document.getElementById("republicanos").addEventListener("change", sayHello);

document.getElementById("democratas").addEventListener("change", sayHello);

document.getElementById("independientes").addEventListener("change", sayHello);

document.getElementById("state-filter").addEventListener("change", sayHello);



let event = document.getElementById("allStates");








function superCreaTablas() 

{
    let table = document.getElementById("senate-data");
    

// Loop para que se haga sobre cada uno de los politicos
    for (let i = 0; i < members.length; i++){


        //Variable de la localizacion de la URL de cada politico
        var linkz = (members[i].url);

        //Creando elementos HTML  directamente 
        var tr = document.createElement("tr");

        var td = document.createElement("td");
        var td1 = document.createElement("td");
        var td2 = document.createElement("td"); 
        var td3 = document.createElement("td");
        var td4 = document.createElement("td");
        var enlace = document.createElement("a");                       // LINKS DE LOS POLITICOS. 
        enlace.setAttribute("href", linkz);          // añade atributo href a  A 
      

        //Creando nodos de texto 
        var apellidos = document.createTextNode(members[i].last_name);   
        var firstName = document.createTextNode(members[i].first_name);
        var middleName = document.createTextNode(members[i].middle_name);
        var party = document.createTextNode(members[i].party);
        var state = document.createTextNode(members[i].state);
        var seniority = document.createTextNode(members[i].seniority);
        var percent = document.createTextNode(members[i].votes_with_party_pct);
        var porcentaje = document.createTextNode("%")
        var fuckNull = document.createTextNode("")
        

        var years = document.createTextNode(" years")
        var espacio = document.createTextNode(" ")
        var espacio1 = document.createTextNode(" ")

            // Condicional que indica que si hay un null sea sustituido por nada 

        if(middleName.nodeValue == "null" || middleName.nodeValue == "") {
            middleName = fuckNull;
           
        }
        //Nodevalue es sagrado
        enlace.innerHTML= apellidos.nodeValue + espacio.nodeValue + middleName.nodeValue + espacio1.nodeValue + firstName.nodeValue;   // Escribe en el HTML el valor del objeto. 
       
      //Uniendo los objetos anteriormente creados
        td.appendChild(enlace);
        tr.appendChild(td);
        tr.appendChild(td1);
        td1.appendChild(party);
        tr.appendChild(td2);
        td2.appendChild(state);
        tr.appendChild(td3);
        td3.appendChild(seniority);
        td3.appendChild(years);
        tr.appendChild(td4);
        td4.appendChild(percent);
        td4.appendChild(porcentaje);
        table.appendChild(tr);
    }
}

   
function sayHello() {                                                                   //funcion que crea arrays con letras dependiendo de las checkboxes y su partido

    let repCb = document.getElementById("republicanos");
  
    let demCb = document.getElementById("democratas");
  
    let indCb = document.getElementById("independientes");
  
    let checkeados = [];

    let escogido = document.getElementById("state-filter").value


    let losEstados = document.getElementById("state-filter")

   

    let estados = [];


    if (repCb.checked) {
  
      checkeados.push("R");
      
    }
  
    if (demCb.checked) {
  
      checkeados.push("D");
      
    }
  
    if (indCb.checked ) {
  
      checkeados.push("I") ;
      
    }

 

    if (!repCb.checked && !demCb.checked && !indCb.checked) {
  
      checkeados.push("R");
  
      checkeados.push("D");
  
      checkeados.push("I");
  
    }
  
    let membersToPrint = [];
    
  
    members.forEach(function(member) {
      
      if (checkeados.includes(member.party) && (member.state == escogido || losEstados.value == "All the States")) {
        
        membersToPrint.push(member);
        
      }
  
    });
    console.log(membersToPrint);

    console.log(losEstados.value);
    printNewTable(membersToPrint);
  }







  function printNewTable(miembrosAImprimir) {                            //CREA LA NUEVA TABLA SEGUN CLICKES LOS CHECKBOXES

    let template = "";
    let tbody = document.getElementById("senate-data");
    
    miembrosAImprimir.forEach(function(member) {                                         
  

        if(member.middle_name = "null") {
            member.middle_name =""
        }
        template += `
  
    <tr>
  
        <td><a href="${member.url}">${member.last_name}${" "}${member.middle_name}${" "}${member.first_name}</a></td>
  
        <td>${member.party}</td>
  
        <td>${member.state}</td>
  
        <td>${member.seniority}${" years"}</td>
  
        <td>${member.votes_with_party_pct}%</td>
  
      </tr>`;
    });
  
    tbody.innerHTML = template;

    if(document.getElementById("senate-data").rows.length == 0){ 
        alert("There's no members to show in this section")
    }
     }
  

function quitaRepetidos() {                            

let template = "";
let opciones = document.getElementById("state-filter");
let norepeated = [];                                                        //Creamos un arraay vacio para pposteriormente introducir los valores no repetidos en el.

let states = members.map(member => member.state)                  //convertimos los todos los members en los estados correspondientes directamente. (map es un for each)


template += `
<option id=allStates value="All the States">All the States</option>
  `;


for (let i = 0; i < states.length; i++) {                             //hacemos un loop sobre los estados.
  if(!norepeated.includes(states[i])){                                  // Condicional que si el array vacio NO contiene los estados pues meteremos en el array vacio los estados 
    norepeated.push(states[i])                                          //Como .includes es un loop, al poner states[i] ya esta comparando una posicion con otra, 
  }                                                                     // if es un booleano, basicamente dice que si norepeated no incluye los estados[i], que los meta
}                                                                        // Y si los incluye, que no haga nada.
for (let i = 0; i < norepeated.sort().length; i++) {                      //Para cada posicion de norepeated, pues creara un option con el estado = norepeated
    
      template += `
<option value ="${norepeated[i]}">${norepeated[i]}</option>
  `;

opciones.innerHTML = template;

}

  }
 



  





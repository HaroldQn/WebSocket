
//Conectarse al servidor

//1. Crear el WebSocket con la dirección del servidor
const ws = new WebSocket("ws://localhost:8080");

//2. Escuchar los eventos
ws.addEventListener("open", (evt) => {
    console.log("Estoy Conectado");
})

ws.addEventListener("close" , (evt) => {
    console.log(`Desconectado por ${evt.code} - ${evt.reason}`);
})

//4. Verirficamos en consola
ws.addEventListener("message", (evt) => {
    //Ejemplo 01
    //console.log(`Recibido del servidor: ${evt.data}`);

    //Ejemplo 02
    console.log(`Recibido del servidor:`);
    console.log(JSON.parse(evt.data));
})

//Obtenemos el input
const mensajeEnviar = document.getElementById("mensaje")

// ---------------------------------------------------------------------------------------

//3. Enviar un mensaje por consola desde un input

//Ejemplo 01
const btnSend1 = document.getElementById("btnSend")
btnSend.addEventListener("click", (evt) => {
    evt.preventDefault()
    
    //Creamos una instacia de la constante 
    const mensaje = mensajeEnviar.value;
    //Aca enviamos la constante
    ws.send(mensaje)
})

//Ejemplo 02
const btnSend2 = document.getElementById("btnSend")
btnSend.addEventListener("click", (evt) => {
    evt.preventDefault()
    
    //Creamos una instacia de la constante 
    const persona ={
        nombre: "Harold",
        apellido: "Quispe",
        edad: 20,
        estudiante : true
    }
    //Aca enviamos la constante
    ws.send(JSON.stringify(persona))
})

// ---------------------------------------------------------------------------------------

//5. Cerramos la conexión
const btnDisconnect = document.getElementById("btnDisconnect")
    btnDisconnect.addEventListener("click", (evt) => {
        evt.preventDefault()
        ws.close()
})


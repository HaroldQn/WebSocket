// ***** Inicio de const *****
const invisibleClass = "invisible"
const modalBackground = document.getElementById("modalBackground")
const modal = document.getElementById("modal")
const btnShowModal = document.getElementById("btnShowModal")
const btnCancel = document.getElementById("btnCancel")
const btnSale = document.getElementById("btnSale")
const productId = document.getElementById("productId")
const amount = document.getElementById("amount")
const dataChart = [0, 0, 0, 0]
// ***** Fin de const *****

// ***** Inicio de modal *****
const showModal = show => {
    if (show) {
      modalBackground.classList.remove(invisibleClass)
      modal.classList.remove(invisibleClass)
      return
    }
  
    modalBackground.classList.add(invisibleClass)
    modal.classList.add(invisibleClass)
}

btnShowModal.addEventListener("click", evt => {
    evt.preventDefault()
    showModal(true)
})
  
btnCancel.addEventListener("click", evt => {
    evt.preventDefault()
    showModal(false)
})
//-----------------------------------------------------------------------
// ***** Inicio del grafico *****
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Zapatos', 'Camisas', 'Pantalones', 'Ropa interior'],
    datasets: [{
      label: '$ Sales',
      data: dataChart,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});
// ***** Fin del grafico *****

// ***** Inicio de websocket *****
// 1
const ws = new WebSocket("ws://localhost:8080");
ws.addEventListener("open", (evt) => {
    console.log("Estoy Conectado!!!");
})

ws.addEventListener("error" ,(evt) =>{
    console.log(evt);
})

btnSale.addEventListener("click" , evt =>{
    evt.preventDefault()

    //Envio del objeto
    const sale = {
        productId: parseInt(productId.value,10),
        amount: parseInt(amount.value,10)
    }
    //con stringify convierte el objeto a JSON PERO EN STRING
    ws.send(JSON.stringify(sale))
    showModal(false)
})

ws.addEventListener("message", ({data}) =>{
    //con parse convierte el string a JSON
    const val = JSON.parse(data)

    const index = val.productId - 1
    dataChart[index] += val.amount
    myChart.update()
})
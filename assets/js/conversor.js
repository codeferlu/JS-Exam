const queryNumber = document.getElementById("myMoney").value;

const getValues = async () => {
    const apiRoute = `https://www.mindicador.cl/api/`
    const response = await fetch(apiRoute)
    const dataValues = await response.json()
    const arrValues = Object.entries(dataValues).splice(3, 15);
    let myValues = []
    arrValues.forEach((val) => {
      myValues.push(val[0])
    })
    myValues.forEach((moneyValue) => {
        document.getElementById("valuesSelect").innerHTML += `<option>${moneyValue}</option>`
    })
  }
  
  getValues()


const getUf = async () => {
  const Ruta = `https://www.mindicador.cl/api/uf`
  const respuesta = await fetch(apiRoute)
  const dataValores = await response.json()
}





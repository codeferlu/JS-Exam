const api_url = 'https://mindicador.cl/api/';
let myChart = null;
const myMoney = document.getElementById("myMoney").value 

async function cualMoneda(url) {
	try {
		const monedas = await fetch(url);
		const { dolar, ivp, euro, uf, utm } = await monedas.json();
		return [dolar, ivp, euro, uf, utm];
	} catch (error) {
		throw new Error(error);
	}
}

async function renderCoinOptions(url) {
	try {
		const select_container = document.getElementById('select_coin');
		const coins = await cualMoneda(url);

		coins.forEach((coin_info) => {
			const option = document.createElement('option');
			option.value = coin_info['codigo'];
			option.innerText = coin_info['nombre'];

			select_container.appendChild(option);

			console.log(coin_info);
		});
	} catch (error) {
		throw new Error(error);
	}
}

document.getElementById('search').addEventListener('click', async (event) => {
  const option_selected = document.getElementById('select_coin').value;

  const coinValue = await getCoinDetails(api_url, option_selected);

  const inputPesos = parseFloat(document.getElementById("myMoney").value);

  if (!isNaN(inputPesos) && coinValue) {
      const convertion = (inputPesos / coinValue).toFixed(2);
      document.getElementById('result').innerText = `Resultado: ${convertion} ${option_selected}`;
  } else {
      alert('Ingrese un valor válido o seleccione una moneda');
  }

  renderGrafica();
});



async function getCoinDetails(url, coinID) {
	try {
		if (coinID) {
			const coin = await fetch(`${url}${coinID}`);
			const { serie } = await coin.json();
			const [{ valor: coinValue }] = serie;

			return coinValue;
		} else {
			alert('Seleciona una moneda');
		}
	} catch (error) {
		throw new Error(error);
	}
}

async function getAndCreateDataToChart(url, coinID) {
	const coin = await fetch(`${url}${coinID}`);
	const { serie } = await coin.json();

	// ZOna hoeizontal de la grafica
	const labels = serie.map(({ fecha }) => {
		return fecha;
	});
	// console.log(labels);
	// Zona vertical
	const data = serie.map(({ valor }) => {
		return valor;
	});

	const datasets = [
		{
			label: 'Precio ultimos dias',
			borderColor: 'rgb(255, 99, 132)',
			data,
		},
	];

	return { labels, datasets };
}

async function renderGrafica() {
	const option_selected = document.getElementById('select_coin').value;

	const data = await getAndCreateDataToChart(api_url, option_selected);
	console.log(data);
	const config = {
		type: 'line',
		data,
	};

	const canvas = document.getElementById('chart');
	canvas.style.backgroundColor = 'white';

	if (myChart) {
		myChart.destroy();
	}

	myChart = new Chart(canvas, config);
}

document.getElementById('search').addEventListener('click', async (event) => {
	const option_selected = document.getElementById('select_coin').value;

	const coinValue = await getCoinDetails(api_url, option_selected);

	const inputPesos = 5000;

	const convertion = (inputPesos / coinValue).toFixed(2);

	renderGrafica();
});

renderCoinOptions(api_url);


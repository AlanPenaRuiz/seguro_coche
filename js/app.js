//Cotizador constructor
function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function(seguro, total) {
        /* Precios
        1 americano 1.15
        2 asiatico 1.05
        3 europeo 1.35 */
        let cantidad;
        const base = 2000;
        switch (this.marca) {
            case '1':
                cantidad = base * 1.15;
                break;
            case '2':
                cantidad = base * 1.05;
                break;
            case '3':
                cantidad = base * 1.35;
                break;
        }

        //Leer año
        const diferencia = new Date().getFullYear() - this.anio;
        //Cada año de antiguedad 3% mas barato
        cantidad -= ((diferencia * 3) * cantidad) / 100;
        //Tipo seguro //Basico 30% Completo 50% sobre la base
        if (this.tipo === 'basico') {
            cantidad *= 1.30;
        } else {
            cantidad *= 1.50;
        }
        return cantidad;
    }
    //Todo loq ue muestra la interfaz
function Interfaz() {}

//Imprimir HTML
Interfaz.prototype.mostrarError = function(mensaje, tipo) {
        const div = document.createElement('div');

        if (tipo === 'error') {
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${mensaje}`;
        //insertar antes(elemento, lugar)
        formulario.insertBefore(div, document.querySelector('form-group'));
        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        }, 3000);

    }
    //Imprime resultado de la cotizacion
Interfaz.prototype.mostrarResultado = function(seguro, total) {
        const resultado = document.getElementById('resultado');
        let marca;
        switch (seguro.marca) {
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
        }
        //Crear div
        const div = document.createElement('div');
        //Insertar div
        div.innerHTML = `
        <p class='header'>Tu seguro:
        <p>Marca: ${marca}</p>
        <p>Año: ${seguro.anio}</p>
        <p>Tipo: ${seguro.tipo}</p>
        <p>Total: ${total}€</p>`;
        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function() {
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 2000);
        resultado.appendChild(div);
    }
    //EventListeners
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    //Leer marca del select (1,2,3)
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;
    //console.log(marcaSelect);

    //Leer año
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //Lee valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //Crear instancia interfaz
    const interfaz = new Interfaz();

    //Check empty
    if (marcaSeleccionada === '' || tipo === '') {
        //Error console.log('Faltan datos');
        interfaz.mostrarError('Faltan datos', 'error')
    } else {
        //Clear anteriores resultados
        const resultados = document.querySelector('#resultado div');
        if (resultados != null) {
            resultados.remove();
        }
        //Instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo)
            //Cotizar seguro
        const cantidad = seguro.cotizarSeguro();
        //Mostrar resultado
        interfaz.mostrarResultado(seguro, cantidad);
    }
});

const max = new Date().getFullYear(),
    min = max - 20;

const selectAnios = document.getElementById('anio');
for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}
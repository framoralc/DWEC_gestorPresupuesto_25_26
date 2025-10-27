'use strict';

function mostrarDatoEnId(idElemento, valor){
    let text = document.createElement("p");
    text.textContent = valor;
    let id = document.getElementById(idElemento);
    id.appendChild(text);
}

function mostrarGastoWeb(idElemento, gasto){
    let id = document.getElementById(idElemento);
    let classGasto = document.createElement("div");
    classGasto.classList.add("gasto");

    let gastoDescripcion = document.createElement("div");
    gastoDescripcion.classList.add("gasto-descripcion");
    gastoDescripcion.textContent = gasto.descripcion;

    let gastoFecha = document.createElement("div");
    gastoFecha.classList.add("gasto-fecha");
    gastoFecha.textContent = gasto.obtenerPeriodoAgrupacion("dia");

    let gastoValor = document.createElement("div");
    gastoValor.classList.add("gasto-valor");
    gastoValor.textContent = gasto.valor;

    let gastoListaEtiquetas = document.createElement("div");
    gastoListaEtiquetas.classList.add("gasto-etiqueta")

    let gastoEtiquetas = document.createElement("span");
    gastoEtiquetas.classList.add("gasto-etiqueta-etiquetas");

    
    classGasto.appendChild(gastoDescripcion);
    classGasto.appendChild(gastoFecha);
    classGasto.appendChild(gastoValor);
    classGasto.appendChild(gastoListaEtiquetas);

    for(let i = 0; i < gasto.etiquetas.length; i++){
        gastoEtiquetas.textContent = gasto.etiquetas
        gastoListaEtiquetas.appendChild(gastoEtiquetas)
    }

    id.appendChild(classGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup){
    
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
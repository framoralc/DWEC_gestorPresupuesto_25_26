import * as gp from './gestionPresupuesto.js';


'use strict';


function mostrarDatoEnId(idElemento, valor){
    let text = document.createElement("p");
    text.textContent = valor;
    let id = document.getElementById(idElemento);
    id.append(text);
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
    gastoListaEtiquetas.classList.add("gasto-etiquetas")
    
    classGasto.append(gastoDescripcion);
    classGasto.append(gastoFecha);
    classGasto.append(gastoValor);
    classGasto.append(gastoListaEtiquetas);

    for(let i = 0; i < gasto.etiquetas.length; i++){
        let gastoEtiquetas = document.createElement("span");
        gastoEtiquetas.classList.add("gasto-etiquetas-etiqueta");
        gastoEtiquetas.textContent = gasto.etiquetas[i];
        gastoListaEtiquetas.append(gastoEtiquetas);
        
    }

    id.append(classGasto);
}

function mostrarGastosAgrupadosWeb(idElemento, agrup, periodo){
    let id = document.getElementById(idElemento);
    let titulo = document.createElement("h1");
    titulo.textContent = 'Gastos agrupados por ' + periodo;
    let agrupacion = document.createElement("div");
    agrupacion.classList.add("agrupacion");
    agrupacion.append(titulo);

    for(let dato in agrup){
        let agrupacion_dato = document.createElement("div");
        agrupacion_dato.classList.add("agrupacion-dato");

        let agrupacion_clave = document.createElement("span");
        agrupacion_clave.classList.add("agrupacion-dato-clave");
        agrupacion_clave.textContent = dato;

        let agrupacion_valor = document.createElement("span");
        agrupacion_valor.classList.add("agrupacion-dato-valor");
        agrupacion_valor.textContent = agrup[dato];

        
        agrupacion_dato.append(agrupacion_clave);
        agrupacion_dato.append(agrupacion_valor);
        agrupacion.append(agrupacion_dato);
    }
    
    id.append(agrupacion);
}

function eliminarContenido(idElemento){
    let id = document.getElementById(idElemento);
    id.innerHTML = "";
}

function repintar(){
    eliminarContenido("presupuesto");
    eliminarContenido("gastos-totales");
    eliminarContenido("balance-total");

    let presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);
    let gasto = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gasto);
    let balance = gp.calcularBalance();
    mostrarDatoEnId("balance-total", balance);
}

function actualizarPresupuestoWeb(){
    let presupuesto = Number.parseInt(prompt("Introduce el nuevo presupuesto"));
    gp.actualizarPresupuesto(presupuesto);
    repintar();
}

let actualizar = document.getElementById("actualizarpresupuesto");
actualizar.addEventListener('click', actualizarPresupuestoWeb)


export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
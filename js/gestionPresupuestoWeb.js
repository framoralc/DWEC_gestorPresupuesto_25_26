import * as gp from './gestionPresupuesto.js';


'use strict';


function mostrarDatoEnId(idElemento, valor){
    let titulo = document.createElement("h1");
    titulo.textContent = idElemento;
    let text = document.createElement("p");
    text.textContent = valor;
    let id = document.getElementById(idElemento);
    id.append(titulo);
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
    
    let btnEditar = document.createElement("button");
    btnEditar.textContent = "Editar";
    btnEditar.className = "gasto-editar"
    let editar = new EditarHandle();
    editar.gasto = gasto;
    btnEditar.addEventListener("click", editar)

    let btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Borrar";
    btnBorrar.className = "gasto-borrar"
    let borrar = new BorrarHandle();
    borrar.gasto = gasto;
    btnBorrar.addEventListener("click", borrar);

    let espacio = document.createElement("br");

    classGasto.append(gastoDescripcion);
    classGasto.append(gastoFecha);
    classGasto.append(gastoValor);
    classGasto.append(gastoListaEtiquetas);
    classGasto.append(btnEditar);
    classGasto.append(btnBorrar);

    for(let i = 0; i < gasto.etiquetas.length; i++){
        let gastoEtiquetas = document.createElement("span");

        gastoEtiquetas.classList.add("gasto-etiquetas-etiqueta");
        gastoEtiquetas.textContent = gasto.etiquetas[i];
        gastoListaEtiquetas.append(gastoEtiquetas);
        let borrarEtiqueta = new BorrarEtiquetasHandle
        borrarEtiqueta.gasto = gasto
        borrarEtiqueta.etiqueta = etiqueta;
        gastoEtiquetas.addEventListener("click", borrarEtiqueta)
    }
    id.append(espacio);
    id.append(classGasto);
    id.append(espacio);
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
    eliminarContenido("listado-gastos-completo")

    let presupuesto = gp.mostrarPresupuesto();
    mostrarDatoEnId("presupuesto", presupuesto);
    let gasto = gp.calcularTotalGastos();
    mostrarDatoEnId("gastos-totales", gasto);
    let balance = gp.calcularBalance();
    mostrarDatoEnId("balance-total", balance);
    let listaGasto = gp.listarGastos();

    for(let i = 0; i < listaGasto.length; i++){
        mostrarGastoWeb("listado-gastos-completo", listaGasto[i])
    }
}

function actualizarPresupuestoWeb(){
    let presupuesto = Number.parseInt(prompt("Introduce el nuevo presupuesto"));
    gp.actualizarPresupuesto(presupuesto);
    repintar();
}

function nuevoGastoWeb(){

    // CrearGasto(descripcion, valor, fecha, ...etiquetas)

    let etiquetas = []

    let descripcion = prompt("Introduce la descripción del gasto");
    let valor = +prompt("Introduce el valor del gasto");
    let fecha
    let validarFecha = false;
    let etiqueta

    do{
        fecha = prompt("Introduce la fecha del gasto (aaaa-mm-dd)");
        if(!isNaN(Date.parse(fecha))){
            validarFecha = true;
        }
    }while(!validarFecha)
    
    etiqueta = prompt("Introduce las etiqueta");
    etiquetas.push(etiqueta.split(","))    
    let gasto = new gp.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gp.anyadirGasto(gasto);;
    repintar();
}

let btnActualizar = document.getElementById("actualizarpresupuesto");
btnActualizar.addEventListener('click', actualizarPresupuestoWeb);

let btnAnyadirGaston = document.getElementById("anyadirgasto");
btnAnyadirGaston.addEventListener('click', nuevoGastoWeb);

function EditarHandle(){
    this.handleEvent = function(event){
    let etiquetas = []

    let descripcion = prompt("Introduce la descripción del gasto", this.gasto.descripcion);
    let valor = +prompt("Introduce el valor del gasto", this.gasto.valor);
    let fecha;
    let validarFecha = false;
    let etiqueta;

    do{
        fecha = prompt("Introduce la fecha del gasto (aaaa-mm-dd)", this.gasto.obtenerPeriodoAgrupacion("dia"));
        if(!isNaN(Date.parse(fecha))){
            validarFecha = true;
        }
    }while(!validarFecha)
    
    etiqueta = prompt("Introduce las etiquetas", this.gasto.etiquetas.join(','));
    etiquetas= [ ...etiqueta.split(',')];
    console.log("ArrayEtiquetasDelPrompt", etiquetas);
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    debugger;
     this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
         console.log(this.gasto.etiquetas);
    // this.gasto.etiquetas = [];
    this.gasto.anyadirEtiquetas(etiquetas);

    repintar();
    }
}

function BorrarHandle(){
    this.handleEvent = function(event){
        gp.borrarGasto(this.gasto.id)
        repintar();
    }
}

function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){
        
    }
}

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
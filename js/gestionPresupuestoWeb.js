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
    btnEditar.className = "gasto-editar";
    let editar = new EditarHandle();
    editar.gasto = gasto;
    btnEditar.addEventListener("click", editar);

    let btnBorrar = document.createElement("button");
    btnBorrar.textContent = "Borrar";
    btnBorrar.className = "gasto-borrar"
    let borrar = new BorrarHandle();
    borrar.gasto = gasto;
    btnBorrar.addEventListener("click", borrar);

    let btnEditarFormulario = document.createElement("button");
    btnEditarFormulario.textContent = "Editar (Formulario)";
    btnEditarFormulario.className = "gasto-editar-formulario"
    let editarForm = new EditarHandleFormulario();
    editarForm.gasto = gasto;
    btnEditarFormulario.addEventListener('click', editarForm)

    let espacio = document.createElement("br");

    classGasto.append(gastoDescripcion);
    classGasto.append(gastoFecha);
    classGasto.append(gastoValor);
    classGasto.append(gastoListaEtiquetas);
    classGasto.append(btnEditar);
    classGasto.append(btnBorrar);
    classGasto.append(btnEditarFormulario);

    for(let i = 0; i < gasto.etiquetas.length; i++){
        let gastoEtiquetas = document.createElement("span");

        gastoEtiquetas.classList.add("gasto-etiquetas-etiqueta");
        gastoEtiquetas.textContent = gasto.etiquetas[i];
        gastoListaEtiquetas.append(gastoEtiquetas);
        let borrarEtiqueta = new BorrarEtiquetasHandle
        borrarEtiqueta.gasto = gasto
        borrarEtiqueta.etiqueta = gasto.etiquetas[i];
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
    
    etiqueta = prompt("Introduce las etiquetas");
    etiquetas = etiqueta.split(",");
    let gasto = new gp.CrearGasto(descripcion, valor, fecha, ...etiquetas);
    gp.anyadirGasto(gasto);
    repintar();
}

let btnActualizar = document.getElementById("actualizarpresupuesto");
btnActualizar.addEventListener('click', actualizarPresupuestoWeb);

let btnAnyadirGastos = document.getElementById("anyadirgasto");
btnAnyadirGastos.addEventListener('click', nuevoGastoWeb);

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
    this.gasto.actualizarDescripcion(descripcion);
    this.gasto.actualizarValor(valor);
    this.gasto.actualizarFecha(fecha);
    this.gasto.borrarEtiquetas(...this.gasto.etiquetas);
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
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}

let btnEditarForm = document.getElementById("anyadirgasto-formulario");
btnEditarForm.addEventListener('click', nuevoGastoWebFormulario);

function nuevoGastoWebFormulario(){
    
let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
let formulario = plantillaFormulario.querySelector("form");
let menuBtn = document.getElementById("controlesprincipales");
let btnCancel = formulario.querySelector('button.cancelar');

menuBtn.append(formulario);
btnEditarForm.disabled = true;

formulario.addEventListener('submit', function(event){
    event.preventDefault();

    let arrayEtiqueta = [];

    let descripcion = formulario.elements["descripcion"].value;
    let valor = +formulario.elements["valor"].value;
    let fecha = formulario.elements["fecha"].value;
    let etiquetas = formulario.elements["etiquetas"].value;
    arrayEtiqueta = etiquetas.split(",");
    let gasto = new gp.CrearGasto(descripcion, valor, fecha, arrayEtiqueta);
    gp.anyadirGasto(gasto);
    btnEditarForm.disabled = false;
    repintar();
    formulario.remove();
})


btnCancel.addEventListener('click', function(event){
    formulario.remove();
    btnEditarForm.disabled = false;
})

}

function EditarHandleFormulario(){
    this.handleEvent = function(event){
        let btnEditarFormulario = event.target.closest(".gasto-editar-formulario");
        btnEditarFormulario.disabled = true;
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        let formulario = plantillaFormulario.querySelector("form")
        let btnCancel = formulario.querySelector("button.cancelar");
        let menuEditar = event.target.closest(".gasto");
        let gasto = this.gasto;
        menuEditar.append(formulario);

        formulario.addEventListener('submit', function(event){
            event.preventDefault();
            let arrayEtiqueta = [];
            let descripcion = formulario.elements["descripcion"].value;
            let valor = +formulario.elements["valor"].value;
            let fecha = formulario.elements["fecha"].value;
            let etiquetas = formulario.elements["etiquetas"].value;
            arrayEtiqueta = etiquetas.split(",");
            gasto.actualizarDescripcion(descripcion);
            gasto.actualizarValor(valor);
            gasto.actualizarFecha(fecha);
            gasto.borrarEtiquetas(...gasto.etiquetas);
            gasto.anyadirEtiquetas(arrayEtiqueta);
            repintar()
            formulario.remove()
            btnEditarFormulario.disabled = false;
        })

        btnCancel.addEventListener('click', function(event){
            formulario.remove();
            btnEditarFormulario.disabled = false;
        })
    }
}

let filtroGastosWebForm = document.getElementById("formulario-filtrado");
filtroGastosWebForm.addEventListener('submit', function (event){
    debugger;
    event.preventDefault();
    let etiquetaFiltro = filtroGastosWebForm.elements["formulario-filtrado-etiquetas-tiene"].value;

    let etiquetasArray = gp.transformarListadoEtiquetas(etiquetaFiltro)

    let resul = gp.filtrarGastos
    ({
        fechaDesde: filtroGastosWebForm.elements["formulario-filtrado-fecha-desde"].value, 
        fechaHasta: filtroGastosWebForm.elements["formulario-filtrado-fecha-hasta"].value, 
        valorMinimo: filtroGastosWebForm.elements["formulario-filtrado-valor-minimo"].value, 
        valorMaximo: filtroGastosWebForm.elements["formulario-filtrado-valor-maximo"].value, 
        descripcionContiene: filtroGastosWebForm.elements["formulario-filtrado-descripcion"].value, 
        etiquetasTiene: etiquetasArray
    })

    eliminarContenido("listado-gastos-completo")

    if(resul && resul.length > 0){
    resul.forEach(gasto => {
        mostrarGastoWeb("listado-gastos-completo", gasto)
    })
    }
    else{
        let gastos = gp.listarGastos();

        for(let i = 0; i < gastos.length; i++){
            mostrarGastoWeb("listado-gastos-completo", gastos[i]);
        }
    }
});

export{
    mostrarDatoEnId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}
// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";
// TODO: Variable global
let presupuesto = 0;
let idGasto = 0;
let gastos = [];

function actualizarPresupuesto(valor) {
    if(valor >= 0 && !isNaN(valor)){
        presupuesto = valor;
        return presupuesto;
    }
    else{
        console.log("El valor introducido es incorrecto");
        return -1;
    }
}

function mostrarPresupuesto() {
        return "Tu presupuesto actual es de " + presupuesto + " €";
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {

    if(descripcion === undefined){
        descripcion = "";
    }

    if(valor === undefined  || isNaN(valor) || valor < 0){
        valor = 0;
    }

    if(fecha === undefined || isNaN(Date.parse(fecha))){
        fecha = Date.now();
    }
    else{
        fecha = Date.parse(fecha);
    }

    if(!Array.isArray(etiquetas) || etiquetas === undefined || etiquetas.length === 0){
        this.etiquetas = new Array();
    }

    this.descripcion = descripcion,
    this.valor = valor,
    this.fecha = fecha,
    this.etiquetas = etiquetas
    
    this.mostrarGasto = function(){
        return "Gasto correspondiente a " + descripcion + " con valor " + valor + " €";
    };

    this.actualizarDescripcion = function(descripcion){
        this.descripcion = descripcion;
    }

    this.actualizarValor = function(valor){
        if(valor > 0 || !isNaN(valor || valor === "undefined")){
            this.valor = valor;
        }
    }

    this.mostrarGastoCompleto = function(){
        let fechaObj = new Date(fecha);
        let fechaformateada = fechaObj.toLocaleString('es-ES');

        return `Gasto correspondiente a ${descripcion} con valor ${valor} €.
Fecha: ${fechaformateada}
Etiquetas:
- casa
- supermercado
- comida
`
    }

    this.actualizarFecha = function(fecha){
        if(isNaN(Date.parse(fecha)))
        {
            this.fecha = fecha;
        }
    }

    this.anyadirEtiquetas = function(){

    }
}

function listarGastos(){
    return gastos
}

function anyadirGasto(id){

}

function borrarGasto(gastos){

}

function calcularTotalGastos(){

}

function calcularBalance(){
    
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}

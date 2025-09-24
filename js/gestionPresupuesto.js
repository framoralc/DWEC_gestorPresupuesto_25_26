// TODO: Crear las funciones, objetos y variables indicadas en el enunciado
"use strict";
// TODO: Variable global
let presupuesto = 0;

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



function CrearGasto(descripcion, valor) {

    if(valor > 0  && !isNaN(valor)){
        this.descripcion = descripcion,
        this.valor = valor
    }
    else{
        valor = 0;
        this.descripcion = descripcion,
        this.valor = valor
    }
    return{
        descripcion,
        valor
    }
}

function mostrarGasto(){
    return "Gasto correspondiente a " + gasto.descripcion + " con valor " + gasto.valor + " €";
}

function actualizarDescripcion(descripcion){
    return gasto.descripcion = descripcion;
}

function actualizarValor(valor){
    return gasto.valor = valor;
}

// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto
}

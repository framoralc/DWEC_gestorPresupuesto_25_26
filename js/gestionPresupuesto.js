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
        if(valor > 0 && !isNaN(valor)){
            this.valor = valor;
        }
    }

    this.mostrarGastoCompleto = function(){
        let fechaObj = new Date(fecha);
        let fechaformateada = fechaObj.toLocaleString();

        return `Gasto correspondiente a ${descripcion} con valor ${valor} €.
Fecha: ${fechaformateada}
Etiquetas:
- casa
- supermercado
- comida
`
    }

    this.actualizarFecha = function(fecha){
        if(!isNaN(Date.parse(fecha)) && fecha !== undefined)
        {
            this.fecha = Date.parse(fecha);
        }
    }

    this.anyadirEtiquetas = function(...etiqueta){
        let count = 0;

        for(let i = 0; i < etiqueta.length; i++){
            for(let j = 0; j < this.etiquetas.length; j++){
                if(etiqueta[i] == this.etiquetas[j]){
                    count++;
                }
            }
            if(count == 0){
                this.etiquetas.push(etiqueta[i])
            }
            else{
                count = 0;
            }
        }
    }

    this.borrarEtiquetas = function(...etiqueta){
        for(let i = 0; i < etiqueta.length; i++){
            for(let j = 0; j < this.etiquetas.length; j++){
                if(etiqueta[i] == this.etiquetas[j]){
                    this.etiquetas.splice(j,1)
                }
            }
        }
    }

    function formatearFecha(fecha, modo){
                let resul = 0;
        if(modo == "mes"){
            if((fecha + 1) < 10){
            resul = "0" + (fecha + 1);
            }
            else{
                resul = fecha + 1;
            }
        }
        else if(modo == "dia"){
            if((fecha) < 10){
            resul = "0" + (fecha);
            }
            else{
                resul = fecha;
            }
        }
        return resul;
    }


    this.obtenerPeriodoAgrupacion = function(periodo){
        let resul = "";
        let fecha = new Date(this.fecha)
        
        if(periodo === "anyo"){
            resul = fecha.getFullYear();
        }
        else if(periodo === "mes"){
            resul = fecha.getFullYear() + "-" + formatearFecha(fecha.getMonth(), "mes");
        }
        else if(periodo === "dia"){
            resul = fecha.getFullYear() + "-" + formatearFecha(fecha.getMonth(), "mes") + "-" + formatearFecha(fecha.getDate(), "dia");
        }

        return resul
    }
}

function listarGastos(){
    return gastos;
}

function anyadirGasto(gasto){
    gasto.id = idGasto
    idGasto++;
    gastos.push(gasto)
    
}

function borrarGasto(id){
    for(let i = 0; i < gastos.length; i++){
        if(id == gastos[i].id){
            gastos.splice(i,1)
        }
    }
    
}

function calcularTotalGastos(){
    let total = 0;
    for(let i = 0; i < gastos.length; i++){
        total += gastos[i].valor
    }
    return total
}

function calcularBalance(){
    return presupuesto - calcularTotalGastos()
}

//array.filter(function(elemento) {
//  return condición;
//});

function filtrarGastos({fechaDesde, fechaHasta, valorMinimo, valorMaximo, descripcionContiene, etiquetasTiene}){

    let resul = [...gastos];

    if(fechaDesde !== undefined){
        resul = resul.filter(function(gasto){
            return new Date(fechaDesde) <= new Date(gasto.fecha);
        })
    }
    if(fechaHasta !== undefined){
        resul = resul.filter(function(gasto){
            return new Date(fechaHasta) >= new Date(gasto.fecha);
        })
    }
    if(valorMinimo !== undefined){
        resul = resul.filter(function(gasto){
            return valorMinimo < gasto.valor;
        })
    }
    if(valorMaximo !== undefined){
        resul = resul.filter(function(gasto){
            return valorMaximo > gasto.valor;
        })
    }
    if(descripcionContiene !== undefined){
        resul = resul.filter(function(gasto){
            return gasto.descripcion.includes(descripcionContiene);
        })
    }
    if(etiquetasTiene !== undefined){
        resul = resul.filter(function(gasto){
            if(gasto.etiquetas !== undefined){
                for(let i = 0; i < etiquetasTiene.length; i++){
                    if(gasto.etiquetas.includes(etiquetasTiene[i])){
                        return true;
                    }
                }
                return false;
            }
            else{
                return false;
            }
            
        });
    }
    return resul;
}

function VerificarPeriodo(periodo){
    if(periodo == "dia" || periodo == "mes" || periodo == "anyo"){
        return true;
    }
    else{
        return false;
    }
}

function agruparGastos(periodo, etiquetas, fechaDesde, fechaHasta){
    let filtro = {};
    
    if(etiquetas !== undefined){
        filtro.etiquetasTiene = [...etiquetas];
    }
    if(fechaDesde !== undefined){
        filtro.fechaDesde = fechaDesde;
    }
    if(fechaHasta !== undefined){
        filtro.fechaHasta = fechaHasta;
    }

    if(!VerificarPeriodo(periodo)){
        periodo = "mes";
    }

    const filtrados = filtrarGastos(filtro);

    const reducidos = filtrados.reduce(function(acc, gasto){
    let periodoGasto = gasto.obtenerPeriodoAgrupacion(periodo);
    let valor = Number(gasto.valor) || 0;
        if(acc[periodoGasto]){
            acc[periodoGasto] += valor;
        }
        else{
            acc[periodoGasto] = valor;
        }
        console.log(acc);
        return acc;
    },{})
    return reducidos;
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
function obtenerPeriodoAgrupacion(periodo){
    let resul = "";
    let fecha = new Date(this.fecha)
    
    if(periodo === "anyo"){
        resul = fecha.getFullYear();
    }
    else if(periodo === "mes"){
        resul = fecha.getFullYear() + "-" + formatearFecha(fecha.getMonth(), "mes");
    }
    else if(periodo === "dia"){
        resul = fecha.getFullYear() + "-" + formatearFecha(fecha.getMonth(), "mes") + "-" + formatearFecha(fecha.getDate(), "dia");
    }

    return resul
}

export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance,
    filtrarGastos,
    agruparGastos,
    obtenerPeriodoAgrupacion
}

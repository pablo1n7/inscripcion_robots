$( document ).ready(function() {
    console.log( "ready!" );
    $("#control_mas").click(control_mas);

    $("#control_menos").click(control_menos);

    $("#inscribir").click(enviar);
});

function control_menos() {
    console.log("menos");
    var ultima_fila = $('#tabla_participantes tr:last');
    if (ultima_fila.hasClass("participante_obligatorio")) {
        return;
    }
    ultima_fila.remove();
}

function control_mas() {
    console.log("mas");
    $('#tabla_participantes tr:last').after('<tr><td>Alumno</td><td><input class="obligatorio" validador="text" type="text" placeholder="Gonzales, Gerardo"></td><td><input class="obligatorio" validador="number" type="number" placeholder="37067513"></td><td><input class="obligatorio" validador="email" type="email" placeholder="geral@mail.com"></td></tr>');
}

tipo={"robot":/^\s*[0-9a-zA-Z,á,é,í,ó,ú,â,ê,ô,ã‌​,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô‌​,Ã,Õ,Ç,ü,ñ,Ü,Ñ][0-9a-zA-Z,á,é,í,ó,ú,â,ê,ô,ã‌​,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô‌​,Ã,Õ,Ç,ü,ñ,Ü,Ñ ]*$/,"text":/^(([A-Za-z,á,é,í,ó,ú,â,ê,ô,ã‌​,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô‌​,Ã,Õ,Ç,ü,ñ,Ü,Ñ,]+[\,\']?)*([A-Za-z,á,é,í,ó,ú,â,ê,ô,ã‌​,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô‌​,Ã,Õ,Ç,ü,ñ,Ü,Ñ,]+)?\s)+([A-Za-z,á,é,í,ó,ú,â,ê,ô,ã‌​,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô‌​,Ã,Õ,Ç,ü,ñ,Ü,Ñ,]+[\,\']?)*([A-Za-z,á,é,í,ó,ú,â,ê,ô,ã‌​,õ,ç,Á,É,Í,Ó,Ú,Â,Ê,Ô‌​,Ã,Õ,Ç,ü,ñ,Ü,Ñ,]+)?$/,"number":/^\d+$/,"email":/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i};
function checkear() {
    var campos_obligatorios = $(".obligatorio");
    var valido = true;
    for (var i = 0; i < campos_obligatorios.length; i++) {
        console.log(campos_obligatorios[i].value);
        var exp = tipo[$(campos_obligatorios[i]).attr("validador")];
        if (!exp.test(campos_obligatorios[i].value)) {
            $(campos_obligatorios[i]).addClass("error");
            valido = false;
        }else{
            $(campos_obligatorios[i]).removeClass("error");
        }
    }
    return valido;
}

function empaquetar(){
        var campos_obligatorios = $(".obligatorio");
        var robot ={};
        robot.nombre = campos_obligatorios[0].value;
        robot.peso = campos_obligatorios[1].value
        robot.categoria = $("#categoria_input")[0].selectedOptions[0].innerHTML;
        robot.escuela = $("#escuela_input")[0].selectedOptions[0].innerHTML;
        robot.profesor = {"nombre":campos_obligatorios[2].value,"dni":campos_obligatorios[3].value,"email":campos_obligatorios[4].value}
        robot.representante = {"nombre":campos_obligatorios[5].value,"dni":campos_obligatorios[6].value,"email":campos_obligatorios[7].value}
        robot.alumnos = [];
        for (var i = 8; i < campos_obligatorios.length; i=i+3){
            robot.alumnos.push({"nombre":campos_obligatorios[i].value,"dni":campos_obligatorios[i+1].value,"email":campos_obligatorios[i+2].value});
        }
        return robot;
}


function enviar() {
    if(checkear()){
        console.log("envio listo");
        var robot = empaquetar();
        $.ajax({
            url: '/inscribirRobot',
            contentType: 'application/json',
            dataType : 'json',
            data: JSON.stringify(robot),
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });

        
    }
}
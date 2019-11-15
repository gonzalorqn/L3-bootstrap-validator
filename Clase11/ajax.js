"use strict";
/// <reference path="./node_modules/@types/jquery/index.d.ts" />
window.onload = function () {
    $(document).ready(function () {
        $("#loginForm").bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                usuario: {
                    validators: {
                        notEmpty: {
                            message: 'El correo es requerido!!!'
                        },
                        stringLength: {
                            min: 3,
                            message: 'El mínimo de caracteres admitido es de 3!!!'
                        },
                        emailAddress: {
                            message: 'El campo correo no posee un formato válido!!!'
                        }
                    }
                },
                password: {
                    validators: {
                        notEmpty: {
                            message: 'La contraseña es requerida!!!'
                        },
                        stringLength: {
                            min: 6,
                            max: 20,
                            message: 'Por favor, ingrese entre 6 y 20 caracteres!!!'
                        }
                    }
                }
            }
        })
            .on('success.form.bv', function () {
            alert("Submit...");
        });
    });
};
function Login() {
    var correo = document.getElementById("txtCorreo").value;
    var clave = document.getElementById("txtClave").value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            var obj = JSON.parse(xhttp.responseText);
            console.log(obj);
            alert("Usuario encontrado");
        }
        else if (xhttp.readyState == 4 && xhttp.status == 403) {
            var obj = JSON.parse(xhttp.responseText);
            console.log(obj.mensaje);
            alert("Usuario no encontrado");
        }
    };
    xhttp.open("POST", "http://localhost/Clase11/validaciones/", true);
    xhttp.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    xhttp.send('usuario_json={"correo":"' + correo + '","clave":"' + clave + '"}');
}
//# sourceMappingURL=ajax.js.map
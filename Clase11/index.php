<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
require_once './vendor/autoload.php';
use \Firebase\JWT\JWT;
$config['displayErrorDetails'] = true;
$config['addContentLengthHeader'] = false;
$app = new \Slim\App(["settings" => $config]);

$app->group('/validaciones', function () {    
    $this->post('/', function (Request $request, Response $response) { 
        $ArrayDeParametros = $request->getParsedBody();
        $ahora = time();
        $json = json_decode($ArrayDeParametros["usuario_json"]);
        $datos = new stdclass();
        $datos->correo = $json->correo;
        $datos->clave = $json->clave;
        $datos->nombre = "juancito";
        $datos->perfil = "admin";
        
        if(true)
        {
            $payload = array(
                'iat' => $ahora,            //CUANDO SE CREO EL JWT (OPCIONAL)
                'exp' => $ahora + (30),     //INDICA EL TIEMPO DE VENCIMIENTO DEL JWT (OPCIONAL)
                'data' => $datos,           //DATOS DEL JWT
                'app' => "API REST 2019"    //INFO DE LA APLICACION (PROPIO)
            );
            $token = JWT::encode($payload, "miClaveSecreta");
            $retorno = new stdclass();
            $retorno->token = $token;
            $retorno->exito = true;
            $newResponse = $response->withJson($retorno,200);
        }
        else
        {
            $obj = new stdClass();
            $obj->exito = false;
            //$obj->mensaje = "No se encontro usuario";
            //$newResponse = $response->withJson("{'mensaje':'No se encontro usuario'}",403);
            $newResponse = $response->withJson($obj,403);
        }
        return $newResponse;
    
    });
});
$app->run();
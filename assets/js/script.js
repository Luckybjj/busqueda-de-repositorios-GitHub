// DEAFIO OBTENER REPOSITORIOS GITHUB

/*
Descripción 
 
En el siguiente desafío se desea visualizar los datos y repositorios de un usuario en                             
específico de Github. Para esto nos comunicaremos con la ​ API pública de Github,                         
específicamente con la dirección web de la API perteneciente al usuario:                     
"​ https://api.github.com/users/{user}​ ", a la cual se le debe pasar como parámetro el nombre                       
de usuario ​ /user​, para traer la información del usuario indicado, como: Nombre de usuario,                           
login, cantidad de repositorios, localidad, tipo de usuario y avatar. Así mismo, para traer los                             
repositorios del usuario indicado se deben pasar otros dos parámetros, como el número de                           
páginas que deseamos visualizar y la cantidad de repositorios que deseamos visualizar por                         
página, siendo la dirección web de API para este caso:                   
https://api.github.com/users/{user}/repos?page={pagina}&per_page={cantidad_repos}​. 
 
Para realizar la consulta por usuario, en la carpeta “Apoyo Desafío - Obtener información y                             
repositorios Github de usuarios” encontrarás todos los archivos necesarios para elaborar el                       
desafío, como el caso del archivo HTML con el formulario ya elaborado, en donde, se                             
muestran los tres campos de entrada o parámetros que se necesitan para conectar con la                             
API mediante la sentencia fetch: 
*/


/*  
Al obtener la información de la API mediante las dos consultadas realizadas, se deben                           
mostrar los resultados exactamente abajo del titulo “Resultados” en una columna se debe                         
mostrar toda la información del usuario y en otra columna la cantidad de repositorios que se                               
deseen visualizar, cada repositorio tendrá el nombre y enlace correspondiente que al hacer                         
click, deberá llevarnos al sitio del repositorio. Como se muestra a continuación en la                           
siguiente imagen: 
*/
/*
Requerimientos 
 
1. Crear tres funciones, una ​ request​ , otra ​ getUser ​ y por último una función ​ C,                         
todas deben implementar async..await. La función ​ request hará las peticiones a la                       
API y retorna el resultado, mientras que las funciones ​ getUser y ​ getRepo enviarán                         
los datos a la función ​ request para obtener la información del usuario y los                           
repositorios a mostrar. Utiliza una URL base con el valor:                   
https://api.github.com/users​.  
*/

//https://api.github.com/users/luckybjj
//https://api.github.com/users/luckybjj/repos?page=1&per_page=1
/*

 /*
2. Agregar una escucha (addEventListener) al formulario, que permita activar una                   
función en donde se capturen los datos ingresados por el usuario de la página                           
(nombre de usuario, número de página, repositorio por páginas). 
 
3. Mediante la implementación de una Promesa, realizar el llamado a las dos 
funciones al mismo tiempo que permiten conectarse con la API y traer la información en el                             
caso de existir “​getUser​ ” y “​getRepo​ ”. Pasando como parámetros los valores                     
necesarios para cada llamado de la API según la URL.  
 
4. Mostrar los resultados obtenidos de la API en el documento HTML en la sección de                             
“Resultados”, como se muestra en la figura número dos.  
 
5. En el caso que el mensaje retornado por la API sea “Not Found”, indicar mediante                             
una ventana emergente que el usuario no existe y no mostrar ningún tipo de                           
información en la sección de resultado en el documento HTML.  
*/




// Bloque 1: Se declara constante con URL base para las peticiones
const baseUrl = 'https://api.github.com/users';

// Bloque 2:
// Se crea una Función asíncrona request, recibbe como parametro la URL
// Esta hace las peticiones a la API y retorna los resultados en formato JSON.
const request = async (url) => {
    const results = await fetch(url);
    const response = await results.json();
    return response;
}


// Bloque 3: Función getUser crea una url para visualizar un usuario especifico del repositorio.
// llama a la función request() enviandole la url como parámetro interpolada
// con el nombre del usuario.
const getUser = async (usuario) => {
    const url = `${baseUrl}/${usuario}`
    return request(url);
}
console.log(getUser());

// Bloque 4: Función getRepo crea una url con usuario, pagina y cantidad de repostorios
// Llama a la función request() enviandole la url como parámetro.
const getRepo = async (usuario, pagina, cantidad_repos) => {
    const url = `${baseUrl}/${usuario}/repos?page=${pagina}&per_page=${cantidad_repos}`;
    return request(url);
}
console.log(getRepo());


// Bloque 5: Ejecución de la aplicación por medio del evento submit,
// que realiza la implementación en base a Promesas 

let formulario = document.querySelector('form');

// Evento submit del formulario
formulario.addEventListener('submit', (event) => {
    event.preventDefault();

    // Captura en constantes los valores de los campos del formulario
    const nombreUsuario = document.getElementById('nombre').value;
    const numeroPagina = document.getElementById('pagina').value;
    const repositoriosPorPagina = document.getElementById('repoPagina').value;


    // Promise.all nos permite ejecutar un arreglo de multiples de promesas.
    // Todas las promesas se deben resolver para que la promesa se cumpla.
    // Se les pasa como parametro las dos funciones getUser() y getRepo()

    Promise.all([getUser(nombreUsuario), getRepo(nombreUsuario, numeroPagina, repositoriosPorPagina)])
        .then(resp => {

            // Area de Resultados
            let resultados = document.getElementById('resultados');

            // IF-ELSE, IF para detectar error, else para mostrar datos en página web
            if (resp[0].nombreUsuario === null) {
                // Limpia área de Resultados
                resultados.innerHTML = '';

                // Crea error personalizado
                throw new Error('El usuario no existe');
            }
            else {
                
                resultados.innerHTML = `
                <div class="card-group text-center">
                <div class="card border-0 ml-5">
                    <img src=${resp[0].avatar_url} class='avatar w-75 mx-auto'>
                    <div class="card-body ">
                        <h4 class="card-title my-4"><b>Datos de Usuario</b></h4>
                        <div class="text-left ml-5">
                        <p>Nombre de usuario: ${resp[0].name}</p>
                        <p>Nombre de login: ${resp[0].login}</p>
                        <p>Cantidad de Repositorios: ${resp[0].public_repos}</p>
                        <p>Localidad: ${resp[0].location}</p>
                        <p>Tipo de usuario: ${resp[0].type}</p>
                        <hr>
            
                        </div>
                        
                    </div>
                </div>
                <div class="card border-0">
                    <div class="card-body ">
                        <h4 class="card-title my-4"><b>Nombre del Repositorio</b></h4>
                        <div class="text-left ml-5">
                            <div id="segunda_columna"></div>
                            <hr>
                        </div>
                        
                    </div>
                </div>
            </div>
                                       `;

                
                for (let i = 0; i < resp[1].length; i++) {
                    $('#segunda_columna').append(`<a href=${resp[1][i].html_url} target='_blank'>${resp[1][i].name}</a></br>`);
                }
            }
        })
        .catch(err => alert(err)); // Atrapa el error y muestra un alert() con el mensaje de error creado anteriormente

    // Limpia los campos del formulario en cada evento submit
    document.getElementById('nombre').value = '';
    document.getElementById('pagina').value = '';
    document.getElementById('repoPagina').value = '';
})


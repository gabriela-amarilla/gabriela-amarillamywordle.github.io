/*const palabra = "RATON";

const BOTON = document.getElementById("intentar");

BOTON.addEventListener("click", intentar);

function intentar(){
    let intento = document.getElementById("intento").value;
    console.log(intento);
}

*/

let resultElement = document.querySelector ('.resultado');

let word = 'texto';
let wordArray = word.toUpperCase().split ('');
console.log (wordArray)

let actualGrid = document.querySelector('.grid');

wordArray.forEach ( (item, index ) => {
    if (index ===0){
        actualGrid.innerHTML += `<input type="text" maxlength="1" class="square" focus>`
    } else {
        actualGrid.innerHTML += `<input type="text" maxlength="1" class="square">`
    }
});


let squares = document.querySelectorAll ('.square')
squares = [...squares];

let userInput = [];

squares.forEach (element =>{
    element.addEventListener('input', evento => {
        //Recoger ingreso usuario
        userInput.push (evento.target.value.toUpperCase())
        console.log(userInput)

        if (evento.target.nextElementSibling) {
            evento.target.nextElementSibling.focus ();
        } else {
            //comparar arreglos y estilear
            let rightIdex = compareArrays(wordArray, userInput);
            console.log (rightIdex);
            rightIdex.forEach (element => {
                squares [element].classList.add('green')
            })

            //si los arreglos son iguales
            if (rightIdex.length == wordArray.length){
                resultElement.innerHTML = `<p> Ganaste!</p>
                <button class="btn3"> RESTART </button>`
            }

            console.log(wordArray)

            //crear nueva linea
        }
        
    })
})


//funciones
function compareArrays(array1, array2){
    let equalsIndex = []
    array1.forEach((element, index) => {
        if (element == array2[index]) {
            console.log(`En la posicion ${index}' si son iguales`);
            equalsIndex.push (index);
        } else {
            console.log(`En la posicion ${index}' NO son iguales`)
        }
    });
    return equalsIndex;
}
let resultElement = document.querySelector ('.resultado');
let mainContainer = document.querySelector ('.main-container')
let gridId = 1;

let words = ['texto', 'autos', 'juego','perro']
let word = getRandomWord();
let wordArray = word.toUpperCase().split ('');
console.log (wordArray)

let actualGrid = document.querySelector('.grid');

drawSquares (actualGrid);
listenInput(actualGrid);

function getRandomWord () {
    return words[Math.floor(Math.random()* words.length)];
}

function listenInput(actualGrid) {
    let squares = actualGrid.querySelectorAll ('.square')
    squares = [...squares];

    let userInput = [];

    squares.forEach (element =>{
        element.addEventListener('input', evento => {
            if (evento.inputType !== 'deleteContentBackward'){
                        //Recoger ingreso usuario
                    userInput.push (evento.target.value.toUpperCase())
                    console.log(userInput)

                    if (evento.target.nextElementSibling) {
                        evento.target.nextElementSibling.focus ();
                    } else {
                        //crear arreglo con letras llenas

                        let squaresFilled = document.querySelectorAll ('.square');
                        squaresFilled = [...squaresFilled];
                        let lastFiveSquaresFilled = squaresFilled.slice(-5);
                        let finalUserInput = [];
                        lastFiveSquaresFilled.forEach (element => {
                            finalUserInput.push (element.value.toUpperCase()) 
                        });

                        //cambiar estilo si letra ok pero posicion oknt
                        let existingIndexArray = existingLetter(wordArray, finalUserInput);
                        existingIndexArray.forEach (element => {

                            squares [element].classList.add('gold');
                        });

                        //comparar arreglos y estilear
                        let rightIdex = compareArrays(wordArray, finalUserInput);
                        console.log (rightIdex);
                        rightIdex.forEach (element => {
                            squares [element].classList.add('green'); 
                        })

                        //si los arreglos son iguales
                        if (rightIdex.length == wordArray.length){
                            showResult ('Ganaste!')
                            return;
                        }

                        //crear una nueva fila
                        let actualGrid = addGrid ()
                        
                        if (!actualGrid) {
                            return
                        }
                        drawSquares (actualGrid);
                        listenInput(actualGrid);

                        //crear nueva linea
                    }

            } else {
                userInput.pop();
            }  
            console.log(userInput)    
        })
    })
}


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

function existingLetter (array1, array2){
    let existingIndexArray = [];
    array2.forEach((element, index)=>{
        if (array1.includes(element)){
            existingIndexArray.push(index)
        }
    });
    return existingIndexArray;
}



function addGrid(){
    gridId++
    if (gridId <= 5) {
        var newGrid = document.createElement("div");
        newGrid.classList.add("grid");
        newGrid.setAttribute("id", gridId);
        mainContainer.appendChild(newGrid);
        return newGrid;
    } else {
        showResult(`Bummer. Intentar de nuevo, la respuesta correcta era: "${word.toUpperCase()}". El juego se reiniciara en 5 segundos`);
        setTimeout (resetGame,5000);
    }
    
}


function drawSquares (actualGrid) {
    wordArray.forEach ( (item, index ) => {
        if (index ===0){
            actualGrid.innerHTML += `<input type="text" maxlength="1" class="square" focus>`
        } else {
            actualGrid.innerHTML += `<input type="text" maxlength="1" class="square">`
        }
    });
}



function showResult (textMsg) {
    resultElement.innerHTML = `<p> ${textMsg}</p>
                    <button class="btn3"> RESTART </button>`;
    
    let resetBtn = document.querySelector('.btn3');
    resetBtn.addEventListener ('click', () => {
        resetGame()//location.reload();
        })
}

function resetGame() {
    gridId = 1;
    word = getRandomWord(); // Obtener una nueva palabra
    wordArray = word.toUpperCase().split('');
    console.log(wordArray);
    mainContainer.innerHTML = '<div class="grid" id="1"></div>';
    actualGrid = document.querySelector('.grid');
    drawSquares(actualGrid);
    listenInput(actualGrid);
    resultElement.innerHTML = ''; // Limpiar el resultado
  }

const deepCopy = (arr=[]) => {
    let copy = [];
    arr.forEach(elem => {
      if(Array.isArray(elem)){
        copy.push(deepCopy(elem))
      }else{
        copy.push(elem) 
      }
    })
    return copy;
}



const displayData = (rows, cols, array=[], day) => {
    // const good = '⚪';
    // const bad = '⚫';
    const bad = '●';
    const good = "○";
    const rootDiv = document.getElementById("root");
    const currentDay = document.createElement("h1");
    currentDay.innerText = day;
    rootDiv.appendChild(currentDay)

    for(let i = 0; i < rows; i++){
        const div = document.createElement("div");


        for(let j = 0; j < cols; j++){
            let node = document.createElement("span");
            if(array[i][j] === 0){
              node.innerText = good; 
            } else {
                node.innerText = bad 
            }
            div.appendChild(node)
        }
        rootDiv.appendChild(div);
    }
    rootDiv.appendChild(document.createElement("br"))

}


const strawberries = (rows, cols, days, badSB = []) => {
    const directions = [
        [0,1], [0,-1], [1,0], [-1, 0]
    ]

    let strawberriesArray = [];
    for(let i = 0; i < rows; i++){
        strawberriesArray.push(Array.from(Array(cols), () => 0));
    }

    badSB.forEach(sb => {
        strawberriesArray[sb.row-1][sb.col-1] = 1;
    })
    displayData(rows, cols, strawberriesArray, 0)

     
    // console.log(array)
    for(let d = 1; d <= days; d++){

        let copyArr = deepCopy(strawberriesArray);
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                
                if(strawberriesArray[i][j] === 1){
                    directions.forEach(([x,y]) => {
                        const newX = i + x;
                        const newY = j + y;
                        if(newX >= 0 && newX < rows && newY >= 0 && newY < cols){
                        copyArr[newX][newY] = 1;  
                        }
                    })
                }

                
            }
        }
        strawberriesArray = deepCopy(copyArr);
        displayData(rows, cols, strawberriesArray, d)

    }
    // console.log(array)
    let goodSB = 0;
    let badSB2 = 0;
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            if(strawberriesArray[i][j] === 0){
                goodSB+=1;
            } else {
                badSB2+=1;
            }
        }
    }
    console.log(goodSB)
    console.log(badSB2)
    return goodSB;

}


strawberries(8, 10, 2, [{row: 4, col:8}, {row: 2, col:7}])
strawberries(50, 50, 20, [{row: 1, col:1}, {row: 50, col:50}])

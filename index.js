
const deepCopy = (arr) => {
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

const directions = [
    [0,1], [0,-1], [1,0], [-1, 0]
]

const strawberries = (rows, cols, days, badSB = []) => {
    
    let array = [];
    for(let i = 0; i < rows; i++){
        array.push(Array.from(Array(cols), () => 0));
    }

    badSB.forEach(sb => {
        array[sb.row-1][sb.col-1] = 1;
    })
 

     
    // console.log(array)

    for(let d = 1; d <= days; d++){
        
        console.log("***********")
        console.log('day ' + d)
        console.log("***********")

        let copyArr = deepCopy(array);
        for(let i = 0; i < rows; i++){
            for(let j = 0; j < cols; j++){
                
                if(array[i][j] === 1){
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
        array = deepCopy(copyArr);
    }
    // console.log(array)

    let goodSB = 0;
    let badSB2 = 0;
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            if(array[i][j] === 0){
                goodSB+=1;
            }

            if(array[i][j] === 1){
                badSB2+=1;
            }
        }
    }
    console.log(goodSB)
    console.log(badSB2)
    return goodSB;

}

strawberries(8, 10, 2, [{row: 4, col:8}, {row: 2, col:7}])


document.addEventListener('DOMContentLoaded', ()=>{
//재정의 할 수 없도록 const로 지정
    const grid = document.querySelector('.grid')
    const scoreDisplay = document.getElementById('score')
    const width = 8
    const squares = []
//재정의 될 수 있도록 let 으로 스코어 지정
    let score = 0
//이미지 주소 배열
    const jewelImages = [
        'url(images/jewel-Blue.png)' ,
        'url(images/jewel-Green.png)' ,
        'url(images/jewel-Orange.png)' ,
        'url(images/jewel-Red.png)' ,
        'url(images/jewel-Yellow.png)' ,
        'url(images/jewel-Pink.png)'
    ]

//보드 생성 
    function createBoard() {
//for 문으로 div 생성
        for(let i = 0; i < width*width; i++) {
        const square = document.createElement('div')
        //드레그 가능하게 만들어주기
        square.setAttribute('draggable',true)
        square.setAttribute('id', i)
        //고침 할떄 마다 랜덤으로 배치
        let randomColor = Math.floor(Math.random() * jewelImages.length)
        square.style.backgroundImage = jewelImages[randomColor]
        grid.appendChild(square)
        squares.push(square)
    }
}
//보드만드는 함수 생성
createBoard()

    //보석 드레그
    let jewelImagesDragged
    //보석 재배치
    let jewelImagesReplaced
    //보석의 드레그 되는 id 값
    let jewelIdDragged
    //보석이 재배치 되는 id 값
    let jewelIdReplaced



    //이벤트 리스너
    squares.forEach(square => square.addEventListener('dragstart', dragStart))
    squares.forEach(square => square.addEventListener('dragend', dragEnd))
    squares.forEach(square => square.addEventListener('dragover', dragOver))
    squares.forEach(square => square.addEventListener('dragenter', dragEnter))
    squares.forEach(square => square.addEventListener('dragleave', dragLeave))
    squares.forEach(square => square.addEventListener('drop', dragDrop))


    function dragStart(){
        jewelImagesDragged = this.style.backgroundImage
        jewelIdDragged = parseInt(this.id)
    
        
    }

   
    function dragOver(event){
        // 브라우저가 기본동작을 못하게 해주는 함수
        event.preventDefault()
        
    }

    function dragEnter(event){
        event.preventDefault()
        
    }

    function dragLeave(){
        
        this.style.backgroundImage=''
       
    }

    function dragDrop(){
        jewelImagesReplaced = this.style.backgroundImage
        jewelIdReplaced = parseInt(this.id)
        //드레그한 이미지와 드레그드롭되는 이미지를 변경
        this.style.backgroundImage = jewelImagesDragged 
        squares[jewelIdDragged].style.backgroundImage = jewelImagesReplaced
    }

    function dragEnd(){
    //보석의 움직임 지정
    let jewelMoves = [
        jewelIdDragged -1, 
        jewelIdDragged -width,
        jewelIdDragged +1, 
        jewelIdDragged +width
    ]
    let jewelMove = jewelMoves.includes(jewelIdReplaced)

    if(jewelMove && jewelIdReplaced){
        jewelIdReplaced = null
    } else if (jewelIdReplaced && !jewelMove){
        squares[jewelIdReplaced].style.backgroundImage = jewelImagesReplaced
        squares[jewelIdDragged].style.backgroundImage = jewelImagesDragged
    } else squares[jewelIdDragged].style.backgroundImage = jewelImagesDragged



 }

    //jewel 빈공간으로 내려와 채우게하는 함수
    function moveDown(){
        for(let i = 0; i < 55; i++){
            if(squares[i + width].style.backgroundImage === ''){
            squares[i + width].style.backgroundImage = squares[i].style.backgroundImage
            squares[i].style.backgroundImage = ''
            const firstRow = [0,1,2,3,4,5,6,7]
            const isFirstRow = firstRow.includes(i)
            if(isFirstRow && squares[i].style.backgroundImage === ''){
            // 보석을 배열에서 랜덤값으로 생성 
            let randomJewel = Math.floor(Math.random() * jewelImages.length)
            squares[i].style.backgroundImage = jewelImages[randomJewel]
                }
            }
        }
    }
    //가로 3줄
    function rowThree(){
    for(i = 0; i < 62; i++){
        let rowLineThree = [i, i+1, i+2]
        let decidedJewel = squares[i].style.backgroundImage
        const Empty = squares[i].style.backgroundImage === ''
        //행끝나는부분과 다음 행의 시작부분이 3줄로인식되지않도록 만듦
        const notValid = [6,7,14,15,22,23,30,31,38,39,46,47,54,55]
        if(notValid.includes(i))continue

        if(rowLineThree.every(index => squares[index].style.backgroundImage === decidedJewel && !Empty)){
            score += 3
            scoreDisplay.innerHTML = score
            rowLineThree.forEach(index => {
            squares[index].style.backgroundImage = ''
            //match 라는 id 값을 연결
            squares[index].classList.add('match')
           }) 
        }
    }
}

function rowFour(){
    for(i = 0; i < 61; i++){
        let rowLineFour = [i, i+1, i+2, i+3]
        let decidedJewel = squares[i].style.backgroundImage
        const Empty = squares[i].style.backgroundImage === ''
        //행끝나는부분과 다음 행의 시작부분이 4줄로인식되지않도록 만듦
        const notValid = [5,6,7,13,14,15,21,22,23,29,30,31,37,38,39,45,46,47,53,54,55]
        if(notValid.includes(i))continue

        if(rowLineFour.every(index => squares[index].style.backgroundImage === decidedJewel && !Empty)){
            score += 4
            scoreDisplay.innerHTML = score
            rowLineFour.forEach(index => {
            squares[index].style.backgroundImage = ''
            squares[index].classList.add('match')
           }) 
        }
    }
}

function rowFive(){
    for(i = 0; i < 61; i++){
        let rowLineFive = [i, i+1, i+2, i+3, i+4]
        let decidedJewel = squares[i].style.backgroundImage
        const Empty = squares[i].style.backgroundImage === ''
        //행끝나는부분과 다음 행의 시작부분이 4줄로인식되지않도록 만듦
        const notValid = [4,5,6,7,12,13,14,15,20,21,22,23,28,29,30,31,36,37,38,39,44,45,46,47,52,53,54,55]
        if(notValid.includes(i))continue

        if(rowLineFive.every(index => squares[index].style.backgroundImage === decidedJewel && !Empty)){
            score += 5
            scoreDisplay.innerHTML = score
            rowLineFive.forEach(index => {
            squares[index].style.backgroundImage = ''
            squares[index].classList.add('match')
           }) 
        }
    }
}


function columnThree(){
    for(i = 0; i < width * (width - 2); i++){
        let columnLineThree = [i, i + width, i + width * 2]
        let decidedJewel = squares[i].style.backgroundImage
        const empty = squares[i].style.backgroundImage === ''

        if(columnLineThree.every(index => squares[index].style.backgroundImage === decidedJewel && !empty)){
            score += 3
            scoreDisplay.innerHTML = score
            columnLineThree.forEach(index => {
            squares[index].style.backgroundImage = ''
            squares[index].classList.add('match')
            })
        }
    }
}

function columnFour(){
    for(i = 0; i < width * (width - 3); i++){
        let columnLineFour = [i, i + width, i + width * 2 , i + width*3]
        let decidedJewel = squares[i].style.backgroundImage;
        const empty = squares[i].style.backgroundImage === ''

        if(columnLineFour.every(index => squares[index].style.backgroundImage === decidedJewel && !empty)){
            score += 4
            scoreDisplay.innerHTML = score
            columnLineFour.forEach(index => {
            squares[index].style.backgroundImage = ''
            squares[index].classList.add('match')
            }) 
        }
    }
}

function columnFive(){
    for(i = 0; i < width * (width - 4); i++){
        let columnLineFive = [i, i + width, i + width * 2 , i + width*3, i + width*4]
        let decidedJewel = squares[i].style.backgroundImage
        const empty = squares[i].style.backgroundImage === ''

        if(columnLineFive.every(index => squares[index].style.backgroundImage === decidedJewel && !empty)){
            score += 5;
            scoreDisplay.innerHTML = score
            columnLineFive.forEach(index => {
            squares[index].style.backgroundImage = ''
            squares[index].classList.add('match')
            })
        }
    }
}



//start 전 초기화하는 함수 필요 ..



window.setInterval(function(){
    
    columnFive()
    rowFive()
    columnFour()
    rowFour()
    rowThree()
    columnThree()
    moveDown()
}, 120)



}) 
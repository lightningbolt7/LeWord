let AnalysisEl = document.getElementById("Analysis")
let LanderEl = document.getElementById("Lander")
let PlayEl = document.getElementById("Play")
let tempList = 2
let win = 0
let tempMax = 0
let wordArray = ["ache","acne","abet","acts","acid","afar","agar","aged","ages","ahoy","airy","alas","ally","ammo","ants","apex","apes","aqua","arch","ares","atom","axis","axel"]
let guessWord = randomWord(wordArray)

let analysisObj = {max_points: 0,name: guessWord,def:"",improved:"yes"}
let analysisArr = []
let points = 0
let offset =  true
let LanderMainEl = document.getElementById("LanderMain")
let AnalysisMainEl = document.getElementById("AnalysisMain")
let PlayMainEl = document.getElementById("PlayMain")
let url="https://api.dictionaryapi.dev/api/v2/entries/en/"
let word=""
let attempt=1
LanderEl.addEventListener("click",function(){
    if(tempList!=2){
        LanderMainEl.classList.remove("hidden")
        LanderEl.classList.add("active-list")
        removeEffectList(tempList)
        tempList=2
    }
})

AnalysisEl.addEventListener("click",function(){
    if(tempList!=1){
        AnalysisMainEl.classList.remove("hidden")
        AnalysisEl.classList.add("active-list")
        removeEffectList(tempList)
        tempList=1
    }
})

PlayEl.addEventListener("click",function(){
    if(tempList!=3){
        PlayMainEl.classList.remove("hidden")
        PlayEl.classList.add("active-list")
        removeEffectList(tempList)
        tempList=3
    }
})

function removeEffectList(tempList){
    if(tempList==1){
        AnalysisMainEl.classList.add("hidden")
        AnalysisEl.classList.remove("active-list")
    }
    else if(tempList == 2){
        LanderMainEl.classList.add("hidden")
        LanderEl.classList.remove("active-list")
    }
    else{
        PlayMainEl.classList.add("hidden")
        PlayEl.classList.remove("active-list")
    }
}

//INTERACT

let AlphaArr=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
let oneEl = document.getElementById("one")
let twoEl = document.getElementById("two")
let threeEl = document.getElementById("three")
let fourEl = document.getElementById("four")
let interactResultEl = document.getElementById("interact-result")
let timerInteract

oneEl.addEventListener("click",function(){
    oneEl.innerText = changeInteract(oneEl.innerText)
   if(timerInteract) {
    clearTimeout(timerInteract)
   }
   timerInteract = setTimeout(checkInteract,2000)
})
twoEl.addEventListener("click",function(){
    twoEl.innerText = changeInteract(twoEl.innerText)
    if(timerInteract) {
        clearTimeout(timerInteract)
       }
    timerInteract = setTimeout(checkInteract,2000)
})
threeEl.addEventListener("click",function(){
    threeEl.innerText = changeInteract(threeEl.innerText)
    if(timerInteract) {
        clearTimeout(timerInteract)
       }
      
    timerInteract = setTimeout(checkInteract,2000)
})
fourEl.addEventListener("click",function(){
    fourEl.innerText = changeInteract(fourEl.innerText)
    if(timerInteract) {
        clearTimeout(timerInteract)
       }
    timerInteract = setTimeout(checkInteract,2000)
})

function changeInteract(letter){
    if(letter=="Z"){
        return "A"
    }
    for(let i=0;i<AlphaArr.length;i++){
        if(letter==AlphaArr[i]){
            return AlphaArr[i+1]
        }
    }
}
function checkInteract(){
    word = oneEl.innerText+twoEl.innerText+threeEl.innerText+fourEl.innerText
    console.log(word)
    url +=word
    fetch(url).then(response => response.json()).then(function(data){
       console.log(data)
        if(data.title){
            console.log("not a word")
            interactResultEl.src = "./wrong.mp4"
            interactResultEl.classList.remove("interact-result")
            interactResultEl.classList.add("interact-result-2")
        }
        else {
            console.log(data)
            console.log("it is a word")
            interactResultEl.src = "./tick.mp4"
            interactResultEl.classList.add("interact-result")
            interactResultEl.classList.remove("interact-result-2")
        }
    })
    url="https://api.dictionaryapi.dev/api/v2/entries/en/"
}
//---------------------PLAY JS BEGINS HERE---------------
let answerEl = document.getElementById("answer")
let meaningEl = document.getElementById("meaning")
let meaning
function randomWord(arr){
    let ArrLength = arr.length
    let divisions = 1/ArrLength
    let randomNum = Math.random()
    for(let i=0;i<ArrLength;i++){
        if(randomNum<(divisions*(i+1)) && randomNum>=(divisions*i)){
            return arr[i]
        }
    }
}
function bugFixEnter(){
    offset =  true
}
function checkAttempt(num,event,val,access){
    val = val.toLowerCase()
    if(event.key=='Enter' && offset){
        offset = false
        setTimeout(bugFixEnter,3000)
        if(val.length==4){
            if(/\d/.test(val)){
                access.value=""
                access.placeholder="wrong input"
            }
            else{
                url+=val
                fetch(url).then(response => response.json()).then(function(data){
                    console.log(data)
                     if(data.title){
                         console.log("not a word")
                         access.value=""
                        access.placeholder="wrong input"
                     }
                     else {
                         console.log("it is a word")
                         ChangeElement(num,val)
                     }
                 })
                 url="https://api.dictionaryapi.dev/api/v2/entries/en/"
              
            }
        }
        else{
            access.value=""
            access.placeholder="wrong input"
        }
    }
}
function ChangeElement(num,val){
    tempMax = 0
    let temp = guessWord
    win=0
    let wordOne = document.getElementById("word"+num+1)
    let wordTwo = document.getElementById("word"+num+2)
    let wordThree = document.getElementById("word"+num+3)
    let wordFour = document.getElementById("word"+num+4)
    let designOne = document.getElementById("design"+num+1)
    let designTwo = document.getElementById("design"+num+2)
    let designThree = document.getElementById("design"+num+3)
    let designFour = document.getElementById("design"+num+4)

    wordOne.innerText = val[0].toUpperCase();
    checkWordChangeDisplay(num,val[0],0,designOne)
    wordOne.classList.remove("hideWord")
    wordTwo.innerText = val[1].toUpperCase();
    checkWordChangeDisplay(num,val[1],1,designTwo)
    wordTwo.classList.remove("hideWord")
    wordThree.innerText = val[2].toUpperCase();
    checkWordChangeDisplay(num,val[2],2,designThree)
    wordThree.classList.remove("hideWord")
    wordFour.innerText = val[3].toUpperCase();
    checkWordChangeDisplay(num,val[3],3,designFour)
    wordFour.classList.remove("hideWord")
    guessWord = temp

    if(tempMax>points){
        points = tempMax
    }
    if(win==4){
        let attemptEl = document.getElementById("attempt"+attempt)
        attemptEl.classList.add("hideWord")
        alert("Congrats you won!")
        analysisObj.max_points = points
        analysisArr.push(analysisObj)
        console.log(analysisArr)
        revealAnswer()

    }
    else{
       
        let attemptEl = document.getElementById("attempt"+attempt)
        attemptEl.classList.add("hideWord")
        
        attempt++
        if(attempt==5){
            analysisObj.max_points = points
            analysisArr.push(analysisObj)
            console.log(analysisArr)
            alert("You lost, answer: "+guessWord)
            revealAnswer()
        }
        else{
            setTimeout(function(){
                newAttemptGen(attemptEl,attempt)
            },2000)
            
        }
        
    }
}
function newAttemptGen(attemptEl,attempt){
    attemptEl = document.getElementById("attempt"+attempt)
    attemptEl.classList.remove("hideWord")
}
function checkWordChangeDisplay(num,letter,index,design){
    index -= win
    for(let i=0;i<guessWord.length;i++){
        if(letter==guessWord[i]){
            if(index==i){
                tempMax += 2
                design.classList.add("rightPlace")
                win++
                guessWord = guessWord.slice(0,i) + guessWord.slice(i+1,guessWord.length)
                //console.log(guessWord)
                break   
            }
            else {
                tempMax += 1
                design.classList.add("rightWord")
            }
        }
    }
}

function revealAnswer(){
    answerEl.innerText = guessWord.toUpperCase()
    fetch(url+guessWord).then(response => response.json()).then(function(data){

        meaning = data[0].meanings[0].definitions[0].definition
        analysisObj.def = meaning
        updateAnalysis()
        
    })
}

answerEl.addEventListener("mouseover",function(){
    
    meaningEl.innerText = meaning
    meaningEl.classList.add("anim-meaning")
    
})

answerEl.addEventListener("mouseout",function(){
    meaningEl.innerText = ""
})

// ------------------- ANALYSIS JS STARTS HERE------------------------------
let storeStr
let sum = 0
let tempName
let currentName = 0
let nameEl
let AnalysisNamesEl = document.getElementById("AnalysisNames")
let AccuracyEl = document.getElementById("Accuracy")
let AnalysisHeaderEl = document.getElementById("AnalysisHeader")
let AnalysisDefEl = document.getElementById("AnalysisDef")
let AnalysisPointsEl = document.getElementById("AnalysisPoints")
let AnalysiDescriptionEl = document.getElementById("AnalysiDescription")
let accuracy = 0
function updateAnalysis(){
    storeStr=""
    console.log(analysisArr[0].max_points)
   for(let i=0;i<analysisArr.length;i++){
    if(i>0 && analysisArr[i].max_points<analysisArr[i-1].max_points){
        analysisArr[i].improved = "no"

    }
    sum +=analysisArr[i].max_points
    storeStr += `<div class="nameDesign" id="Name${i==0 ? 0:1}" onclick="displayAnalysis(${i},this)">
                    ${analysisArr[i].name.toUpperCase()}
                </div>`
   }
   AnalysisHeaderEl.innerText = analysisArr[currentName].name.toUpperCase()
   AnalysisNamesEl.innerHTML = storeStr
   AnalysisDefEl.innerText = "Definition:" + " "+ analysisArr[currentName].def
   AnalysisPointsEl.innerText = "Max points:" + " "+ analysisArr[currentName].max_points
   accuracy = sum / analysisArr.length
   nameEl = document.getElementById("Name0")
   displayAnalysis(0,nameEl)
   AccuracyEl.innerText = "Accuracy:" + " "+accuracy 
   AccuracyTextDisplay()

}

function displayAnalysis(index,alr){
    alr.classList.add("activeName")
    if(tempName){
        tempName.classList.remove("activeName")
    }
    currentName = index
    tempName = alr
}
AccuracyEl.addEventListener("click",function(){
    AnalysiDescriptionEl.classList.remove("hidden")
    AccuracyTextDisplay()
})

function AccuracyTextDisplay(){
    let LetterAcc =  (accuracy<Math.floor(accuracy)+0.5) ? Math.floor(accuracy) : Math.ceil(accuracy)
    let pointLetter = Math.floor(LetterAcc/2)
    let pointPlace = LetterAcc%2
    console.log(pointLetter)
    AnalysiDescriptionEl.classList.remove("hidden")
    AnalysiDescriptionEl.innerText = `Your Accuracy approximately indicates  that you are able to identify ${pointLetter==4 ? `the word`:`atmost ${pointLetter} letters that are in the right place ${pointPlace>0 ? `and ${pointPlace} right letters with the wrong place `:``}`} during every iteration of the game`
}
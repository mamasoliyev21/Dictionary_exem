'use strict'

const elForm = document.querySelector(".dictionary-form")
const elInput = document.querySelector("#dict-form-input")
const elBTN = document.querySelector(".btn-submit")
const dict_wrapper =document.querySelector(".dictionary-wrapper")
console.log(dict_wrapper);




elForm.addEventListener(('submit'), e=>{
    e.preventDefault()
    dict_wrapper.innerHTML=''
    if(elInput.value.trim()!==''){
        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${elInput.value}`)
        .then(response => response.json())
        .then(data => renderFunc(data))
        .catch(err => console.error(err))
        elInput.value =''
        dict_wrapper.style.display = 'block'
    }else{
        alert("sorry no message")
        dict_wrapper.innerHTML = ''
        dict_wrapper.style.display ='none'
    }
})

// *** render function started***//


function renderFunc(data){
    console.log(data);
    if(data.length >0){
        data.filter((el)=>{
            let textWord = document.createElement("h3")
            // console.log(el.phonetics[0].meanings);
            textWord.innerText = ` ${el.word} = ${el.phonetic? el.phonetic?.text ? sentence.phonetic?.text : "" : ""} `
            dict_wrapper.appendChild(textWord)
            let defini_text =el.meanings[0].definitions


            defini_text.forEach((text)=>{
                const p = document.createElement("p")
                p.classList.add("def_text")
                p.innerHTML = ` <strong> Definition text: </strong> ${text.definition}
                `
                dict_wrapper.append(p)

              if(text.example){
                const elStrong = document.createElement("strong")
                elStrong.className ="exeple_el"
                elStrong.innerHTML=  `<h4> Exemple: </h4> ${text.example}`
                dict_wrapper.append(elStrong)
              }
            })
            if(el.phonetics[0].audio){
                const elAudio =document.createElement("audio")
                elAudio.setAttribute("controls", true)
                elAudio.setAttribute("src", el.phonetics[0].audio)
                elAudio.classList.add("audio_el")
                dict_wrapper.append(elAudio)
            } else{
                alert(' no audio ')
            }
            
        })
    } else{
        alert("no message")
        dict_wrapper.innerHTML = ''
        dict_wrapper.style.display ='none'
    }
    
}
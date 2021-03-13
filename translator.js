const fs = require('fs');
const csv = require('csv-writer').createObjectCsvWriter
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
urls = [
  ['https://valmikiramayan.net/utf8/baala/sarga', '/balasans', 78, 'book1'],
  ['https://valmikiramayan.net/utf8/ayodhya/sarga','/ayodhyasans',120, 'book2'],
  ['https://valmikiramayan.net/utf8/aranya/sarga', '/aranyasans', 76, 'book3'],
  ['https://www.valmikiramayan.net/utf8/kish/sarga','/kishkindhasans' ,68, 'book4'],
  ['https://www.valmikiramayan.net/utf8/sundara/sarga','/sundarasans',69 , 'book5'],
  ['https://www.valmikiramayan.net/utf8/yuddha/sarga','/yuddhasans',129, 'book6']
]
const csvWriter = csv({path:"allData.csv",header: [
  {id: 'ID', title: 'ID'},
  {id: 'SANS', title: 'SANS'},
  {id: 'ENG', title: 'ENG'},
]})
getAndAddEachBook(0, urls)


function getAndAddEachBook(i, urlVals){
  const promise = getAndAddEachChapter(1, urlVals[i][2], urlVals[i], i+1).then(()=>{
    if(i+1 < 6){
      getAndAddEachBook(i+1, urlVals)
    }
  })
}

function getAndAddEachChapter(x, max, urlVals, bookId){
  
  const vgmUrl= urlVals[0] + x + urlVals[1] + x + '.htm';
  got(vgmUrl).then(response => {
    var a = response.body
    var jsom = new JSDOM(a)
    pratipadas = jsom.window.document.getElementsByClassName('pratipada')
     const promise = addEachToFile(0, pratipadas.length, pratipadas, urlVals[3] + ".csv", x, bookId).then(()=>{
       if(x+1 < max){
         getAndAddEachChapter(x+1, max, urlVals, bookId)
       }

     })   
  }).catch(err => {
    console.log(err);
  });
  return new Promise(function(resolve, reject) {
    resolve('start of new Book');
  });
}

function addEachToFile(i, max, val, fileName, chapterId, bookId){
  pratipada = val[i]
  eng = ""
  sans = ""
  if (pratipada.nextElementSibling.className == "tat"){
    eng = "BEGIN_" + pratipada.nextElementSibling.textContent + "_END"
  }
  if (pratipada.previousElementSibling.className == "SanSloka"){
    sans = "BEGIN_" + pratipada.previousElementSibling.textContent + "_END"
  }

  id = "B_" + bookId + "_C_"+ chapterId + "_"+ i
  body = [{"ID": id, "SANS": sans, "ENG": eng}]
  csvWriter.writeRecords(body).then( () => {
        if (i+1 < max){
          addEachToFile(i+1, max, val, fileName, chapterId, bookId)
        }
    } 
  )
  return new Promise(function(resolve, reject) {
    resolve('start of new Chapter');
  });
}
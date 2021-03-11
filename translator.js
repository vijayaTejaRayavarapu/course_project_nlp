const fs = require('fs');
const got = require('got');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const k = 1
for (j = 1; j<2; j++){
  var i = j
  const vgmUrl= 'https://valmikiramayan.net/utf8/aranya/sarga'+i+'/aranyasans'+i+'.htm';
  
  got(vgmUrl).then(response => {
    var a = response.body
    var jsom = new JSDOM(a)
    sanslokas = jsom.window.document.body.childNodes
    console.log(sanslokas)
    for (each in sanslokas){
    console.log(sanslokas[each].innerHTML)
    }
//    tats = jsom.window.document.getElementsByClassName("tat")
  //  for(each in sanslokas){
//        fs.appendFileSync("sans_"+ k + ".txt",sanslokas[each].innerHTML + "\n")
//
//    }
//    for(each in tats){
//        fs.appendFileSync("eng_"+ k + ".txt",tats[each].innerHTML + "\n\n")
//
//    }
    
  }).catch(err => {
    console.log(err);
  });
}



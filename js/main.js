import {form,list,deleteButton,sortValue,sortName,showXml,showList,xmlList} from "../js/refs.js"
let listOfItems=[]
const onAdd=(key,value)=>{
    const el=`
    <li>${key}=${value}</li>`
    list.insertAdjacentHTML("beforeend",el)
    showXml.disabled=false
}
const onSubmit=(evt)=>
{
    evt.preventDefault();
    const text=evt.currentTarget.elements.text.value
    let before=""
    let after=""
    const array=[...text]
    const index =array.indexOf("=")
    array.map((letter,ind)=>{
       if(ind<index&&letter!==" ")
       {
        before+=letter
       }
       else if(ind>index&&letter!==" ")
       {
        after+=letter
       }
    })
    listOfItems.push({key:before,value:after})
    console.log(listOfItems)
    form.reset();
    onAdd(before,after)
} 
const onDelete=()=>{
    listOfItems=[]
    showXml.disabled=true
    list.innerHTML="";
}
const sortByName=()=>{
const cortedList=listOfItems.sort((a,b)=>a.key > b.key ? 1 : -1)
console.log(cortedList)
insertSorted(cortedList)
}
const sortByValue=()=>{
    const cortedList=listOfItems.sort((a,b)=>a.value > b.value ? 1 : -1)
    console.log(cortedList)
    insertSorted(cortedList)
}
const insertSorted=(array)=>{
    const insertLine= array.map(item=>`<li>${item.key}=${item.value}</li>`).join("")
    list.innerHTML=insertLine
}
function htmlEscape(str) {
    return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
}

const createXmlMarkup = (htmlElementArr) => {
    list.classList.add("is-hidden")
    xmlList.classList.add("space")
    showXml.classList.add("is-hidden")
    showList.classList.remove("is-hidden")
    let listStr = "";

  htmlElementArr.forEach((element) => {
    let itemStr = `\r\n    <item>
        <name>${element.key}</name>
        <value>${element.value}</value>
    </item>`;
    listStr = listStr + itemStr;
  });

  const xmlStr = `<list>${listStr}
  </list>`;
    const markup=htmlEscape(xmlStr)
    console.log(markup)
    xmlList.innerHTML=markup
    deleteButton.disabled=true
    sortValue.disabled=true
    sortName.disabled=true
    xmlList.classList.remove("is-hidden")
    
  };
const onHideXml=()=>{
    xmlList.classList.add("is-hidden")
    list.classList.remove("is-hidden")
    xmlList.classList.remove("space")
    xmlList.innerHTML=""
    showXml.classList.remove("is-hidden")
    showList.classList.add("is-hidden")
    const newList=listOfItems.map(item=>`<li>${item.key}=${item.value}</li>`).join("")
    list.innerHTML=newList
    deleteButton.disabled=false
    sortValue.disabled=false
    sortName.disabled=false
}

form.addEventListener("submit",onSubmit)
deleteButton.addEventListener("click",onDelete)
sortName.addEventListener("click",sortByName)
sortValue.addEventListener("click",sortByValue)
showXml.addEventListener("click",()=>createXmlMarkup(listOfItems))
showList.addEventListener("click",onHideXml)

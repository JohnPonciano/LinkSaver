const ul = document.querySelector("ul")
const input = document.querySelector("input")
const form = document.querySelector('form')


async function load(){
    const res = await fetch("http://localhost:4500").then((data)=>data.json())

    console.log(res.urls)
    
    res.urls.map(({ name, url })=> addElement({ name, url }))
}

load()

function reload() {
    location.reload()
    location.load()
}

function addElement({ name, url }) {
    const li = document.createElement('li')
    const a = document.createElement("a")
    const trash = document.createElement("span")

    a.href = url
    a.innerHTML = name
    a.target = "_blank"

    trash.innerHTML = "x"
    trash.onclick = () => removeElement(trash)

    li.append(a)
    li.append(trash)
    ul.append(li)

}

function removeElement(el) {
    if (confirm('Tem certeza que deseja deletar?'))
        el.parentNode.remove()
}

function update(name,url){
    fetch(`http://localhost:4500/?name=${name}&url=${url}`,{
            method: 'PUT'
        }).then((data)=>data.json())
        reload()

}

form.addEventListener("submit", (event) => {
    

    event.preventDefault();

    let { value } = input

    if (!value) 
        return alert('Preencha o campo')

    const [name, url] = value.split(",")

    if (!url) 
        return alert('formate o texto da maneira correta')

    if (!/^http/.test(url)) 
        return alert("Digite a url da maneira correta")
    
    
    update(name,url)
    input.value = ''
    
})

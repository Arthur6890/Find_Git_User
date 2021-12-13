
let btn = document.getElementById("btn");
let div = document.querySelector('#app');
let input = document.getElementById("input")

btn.onclick = function clicou(){
    div.innerHTML = '';
    let spanNome = document.createElement('span');
    let txtNome = '';
    let gitUser = document.querySelector('input[name=github_user]');
    let user = gitUser.value;
    gitUser.value = '';

    axios.get(`https://api.github.com/users/${user}`)
        .then(function(response){
            if(response.data.name !== null){
                txtNome = document.createTextNode(response.data.name)

                let img = document.createElement('img')
                img.setAttribute('src', response.data.avatar_url);
                img.setAttribute('alt', response.data.name);
                img.setAttribute('width', '250px');
                img.setAttribute('height', '250px');

                div.appendChild(img)
            }else{
                txtNome = document.createTextNode("The user doesn't exists.");
            }
            spanNome.appendChild(txtNome);
            div.appendChild(spanNome);
            gitUser.value = '';
        })
        .catch(function(error){
            txtNome = document.createTextNode("It wasn't possible to carry out the request");
            spanNome.appendChild(txtNome);
            div.appendChild(spanNome);
        })
}


input.addEventListener("keyup",function(event){
    if(event.keyCode === 13){
        event.preventDefault();
        document.getElementById("btn").click();
    }
});

const form = document.getElementById('github-form')
form.addEventListener('submit', handleSubmit)

const button = document.createElement('button')
button.textContent = 'Search for Users'
const breakinpage = document.createElement('br')
document.querySelector('h2').append(breakinpage, button)
button.addEventListener('click', handleToggleClick)

function handleSubmit(e) {
    e.preventDefault()
    document.querySelector('#user-list').innerHTML = ''
    document.querySelector('#repos-list').textContent = ''
    if (button.innerText === 'Search for Users') {
        fetchInfo(e.target.search.value)
    }
    if (button.innerText === 'Search for Repos') {
        fetchRepoSearch(e.target.search.value)
    }
}

function fetchInfo(searchedName) {
    fetch(`https://api.github.com/search/users?q=${searchedName}`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then (resp => resp.json())
    .then (data => {
        console.log(data)
        document.querySelector('#user-list').innerHTML = ''
        data.items.forEach(renderInfo)
    })
}

function renderInfo(userInfo) {
    document.querySelector('#repos-list').textContent = ''

    console.log(userInfo)
    //name
    const name = document.createElement('h2')
    name.textContent = userInfo.login
    name.addEventListener('click', () => fetchRepos(userInfo.login))

    //avatar
    const avatar = document.createElement('img')
    avatar.src = userInfo.avatar_url

    //profile link
    const profile = document.createElement('a')
    profile.textContent = "Profile Link"
    profile.href = userInfo.html_url

    //break 
    const breakx = document.createElement('br')


    document.querySelector('#user-list').append(name, profile, breakx, breakx, avatar)


}

function fetchRepos(name) {
    console.log(name)
    fetch(`https://api.github.com/users/${name}/repos`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then(resp => resp.json())
    .then(data => {
        document.querySelector('#repos-list').textContent = ''

        console.log(data)
        const header = document.createElement('h3')
        header.textContent = name
        document.querySelector('#repos-list').append(header)
        data.forEach(renderRepos)
    })

}

function renderRepos(repo) {
    console.log(repo)


    const li = document.createElement('li')
    const repoLink = document.createElement('a')
    repoLink.textContent = repo.name
    repoLink.href = repo.html_url

    li.append(repoLink)
    document.querySelector('#repos-list').append(li)
}

function handleToggleClick() {
    if (button.innerText === 'Search for Users') {
        button.innerText = 'Search for Repos'
    }
    else {
        button.innerText = 'Search for Users'
    }
}

function fetchRepoSearch(search) {
    fetch(`https://api.github.com/search/repositories?q=${search}`, {
        headers: {
            Accept: 'application/vnd.github.v3+json'
        }
    })
    .then (resp => resp.json())
    .then (data => {
        console.log(data)
        data.items.forEach(renderRepos)
    })
} 

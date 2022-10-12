'use strict'

console.log('Starting up')
onInit()

function onInit() {
    var projects = getProjects()
    renderProjects(projects)
}

function renderProjects(projects) {
    var strHTML = ''
    for (var i = 0; i < projects.length; i++) {
        strHTML += `<div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal" onClick="renderModal(${i})">
      <div class="portfolio-hover">
      <div class="portfolio-hover-content">
      <i class="fa fa-plus fa-3x"></i>
        </div>
      </div>
      <img class="img-fluid" src="img/portfolio/${projects[i].id}.png" alt="">
      </a>
      <div class="portfolio-caption">
      <h4>${projects[i].name}</h4>
      <p class="text-muted">${projects[i].desc}</p>
      </div>
      </div>`
    }
    $('.portfolio-items').html(strHTML)
}

function renderModal(projectIdx) {
    var projects = getProjects()
    var project = projects[projectIdx]
    var elModal = document.querySelector('.modal-body')
    elModal.querySelector('h2').innerText = project.name
    elModal.querySelector('.item-intro').innerText = project.desc
    elModal.querySelector('.img-fluid').src = `img/portfolio/${project.id}.png`
    elModal.querySelector('.list-inline').innerHTML = `<li>Date: ${new Date(
        project.publishedAt
    ).toLocaleDateString()}</li>
    <li>Lables: ${project.labels}</li>`
}

function onSubmit(ev) {
    ev.preventDefault()
    var email = $('[name=email]').val()
    var subject = $('[name=subject]').val()
    var message = $('[name=msg-txt]').val()
    $('[name=email]').val('')
    $('[name=subject]').val('')
    $('[name=msg-txt]').val('')
    // `https://mail.google.com/mail/?view=cm&fs=1&to=me@example.com&su=SUBJECT&body=BODY`
    window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${message}`
    )
}

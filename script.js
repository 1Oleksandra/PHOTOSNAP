fetch('./data/gallery.json')
  .then(response => response.json())
  .then(data => {
    const galleryContainer = document.querySelector('.gallery-items')

    if (galleryContainer) {
      const isIndex = document.body.classList.contains('index-page')
      const limit = isIndex ? 4 : null

      renderGallery(data, '.gallery-items', limit)
    }
  })

function renderGallery(data, containerSelector, limit = null) {
  const container = document.querySelector(containerSelector)
  const items = limit ? data.gallery.slice(0, limit) : data.gallery

  items.forEach(item => {
    const block = document.createElement('div')
    block.className = 'gallery-item';
    block.innerHTML = `
      <div class="gallery-img">
        <img src="${item.img}" alt="${item.title}" class="gallery-img">
      </div>
      <div class="gallery-contant">
        <p class="gallery-data">${item.data}</p>
        <h3 class="gallery-title">${item.title}</h3>
        <div class="gallery-author">${item.author}</div>
        <button class="gallery-button btn">${item.button}</button>
      </div>
    `
    container.appendChild(block)
  })
}


// Додавання header та footer на сторінки ============================

async function loadComponent(id, file) {
  let response = await fetch(file);
  let text = await response.text();
  document.getElementById(id).innerHTML = text;
  if (id === "header") {
    initBurgerMenu();
  }
}

function initBurgerMenu() {
    const burger = document.querySelector('.header-menu')
    const menu = document.querySelector('.header-contant')
    const links = document.querySelectorAll('.header-link')
    const menuBtn = document.querySelector('.header-menu')

    menu.classList.add('active')

    if (burger && menu) {
      burger.addEventListener('click', function () {
        menu.classList.toggle('active')
        menuBtn.classList.toggle('active')
      });

      links.forEach(link => {
        link.addEventListener('click', function (e) {
          e.preventDefault()
          console.log('click')
          const href = link.getAttribute('href')
          menu.classList.add('active'); 
          setTimeout(() => {
            window.location.href = href
          }, 300)
        })
      })
    }

    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault()
        console.log('click')

        const href = link.getAttribute('href')
        menu.classList.remove('active')

        setTimeout(() => {
          window.location.href = href
        }, 300)
      })
  })

  window.addEventListener('scroll', function () {
        if (!menu.classList.contains('active')) {
          menu.classList.add('active')
          menuBtn.classList.toggle('active')
        }
      })
}
// Премикач на Pricing.html =================================================

const monthBtn = document.querySelector('.monthBtn')
const yearBtn = document.querySelector('.yearBtn')
const monthBlock = document.querySelector('.monthly')
const yearBlock = document.querySelector('.yearly')
const toggle = document.getElementById('pricingToggle')

function clicker(){
  monthBtn.classList.add('active')
monthBlock.classList.add('active')

toggle.addEventListener('change', function () {
  if (toggle.checked) {
    yearBtn.classList.add('active')
    monthBtn.classList.remove('active')

    yearBlock.classList.add('active')
    monthBlock.classList.remove('active')
  } else {
    monthBtn.classList.add('active')
    yearBtn.classList.remove('active')
    
    monthBlock.classList.add('active')
    yearBlock.classList.remove('active')
  }
})
}

document.addEventListener('DOMContentLoaded', () => {
  clicker()
})



loadComponent("header", "header.html");
loadComponent("footer", "footer.html");
loadComponent("getInvite", "get-invite.html");


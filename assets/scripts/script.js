const headerNav = {
  header: document.querySelector("header.header"),
  nav: document.querySelector("header.header .header__nav"),
  burger: document.querySelector("header.header .header__burger"),
  main: document.querySelector("main"),
  footer: document.querySelector("footer.footer"),
  body: document.querySelector("body"),
  isOpen: false,
  timeValue: 200,
  regExp: new RegExp("\D", "g"),
  langNode: document.querySelector(".header__lang"),
  setHandlers: function () {
    this.burger.addEventListener("click", this.toggleBind)

  },
  windowClickHandler: function () {
    this.isOpen = false
    this.hide()
  },
  /**
   * Закрываем меню по нажатию на Esc
   * */
  windowKeyHandler: function ({code, keyCode}) {
    if (this.isOpen && (code.toLowerCase() === "escape" || keyCode === 27)) {
      this.isOpen = !this.isOpen
      this.hide()
    }
  },
  /**
  * Выставляет верхнюю точку меню навигации в мобилках
  * */
  setTopPosition: function () {
    this.nav.style.top = `${this.header.clientHeight}px`

  },
  /**
  * Получаем значение переменной в которой хранится время анимации меню в мобилках
  * */
  setTimeValue: function () {
    let cssVar = getComputedStyle(document.documentElement)
      .getPropertyValue("--toggle-menu-time");
    if (cssVar.indexOf("0") !== 0) {
      cssVar = cssVar.padStart(cssVar.length + 1, "0")
    }
    this.timeValue = cssVar.replace("s", '') * 1000
  },
  show: function () {
    const _this = this
    _this.main.classList.add("menu-opened")
    _this.footer.classList.add("menu-opened")
    _this.nav.classList.add("menu-opening")
    _this.burger.classList.add("menu-opening")
    _this.langNode.classList.add("menu-opening")
    setTimeout(function () {
      _this.nav.classList.remove("menu-opening")
      _this.langNode.classList.remove("menu-opening")
      _this.burger.classList.remove("menu-opening")
      _this.nav.classList.add("menu-opened")
      _this.burger.classList.add("menu-opened")
      _this.langNode.classList.add("menu-opened")
      window.addEventListener("click", _this.windowClickHandlerBind)
      window.addEventListener("keyup", _this.windowKeyHandlerBind)
      _this.setLangNodePosition()
    }, _this.timeValue * 2)

  },
  hide: function () {
    const _this = this
    _this.main.classList.remove("menu-opened")
    _this.footer.classList.remove("menu-opened")
    _this.nav.classList.remove("menu-opened")
    _this.langNode.classList.remove("menu-opened")
    _this.burger.classList.remove("menu-opened")
    _this.main.classList.add("menu-closed")
    _this.footer.classList.add("menu-closed")
    _this.burger.classList.add("menu-closed")
    _this.nav.classList.add("menu-closed")
    _this.langNode.classList.add("menu-closed")
    setTimeout(function () {
      _this.main.classList.remove("menu-closed")
      _this.footer.classList.remove("menu-closed")
      _this.nav.classList.remove("menu-closed")
      _this.burger.classList.remove("menu-closed")
      _this.langNode.classList.remove("menu-closed")
      _this.hideLangNode()
      window.removeEventListener("click", _this.windowClickHandlerBind)
      window.removeEventListener("keyup", _this.windowKeyHandlerBind)
    }, _this.timeValue * 2)

  },
  toggle: function () {
    this.isOpen = !this.isOpen
    this.isOpen ? this.show() : this.hide()
  },
  setLangNodePosition: function (e) {
    if (window.innerWidth > 550) {

      return
    }
    const list = this.nav.querySelector("ul")
    const listRect = list.getBoundingClientRect()
    let positionTop = listRect.bottom
    const type = e?.type
    console.log(positionTop)

    if (type && type.toLowerCase() === "scroll") {
      const bodyTop = this.body.getBoundingClientRect().y
      positionTop += Math.abs(bodyTop)
      console.log(positionTop)
    }

    this.langNode.style.top = `${positionTop + 20}px`
    this.langNode.style.left = `calc(50% - ${this.langNode.clientWidth / 2}px)`
  },
  hideLangNode: function () {
    this.langNode.classList.remove("mobile-show")
  },
  init: function () {
    this.setTimeValue()
    this.toggleBind = this.toggle.bind(this)
    this.windowClickHandlerBind = this.windowClickHandler.bind(this)
    this.windowKeyHandlerBind = this.windowKeyHandler.bind(this)
    this.setTopPosition()
    this.setHandlers()
    const _this = this
    window.addEventListener("resize", function () {
      if (_this.langNode) {
        if (window.innerWidth > 550) {
          _this.langNode.style.left = "auto"
          _this.langNode.style.top = "64px"
        } else {
          _this.setLangNodePosition()
        }
      }
      if (window.innerWidth > 768 && _this.isOpen) {
        _this.isOpen = false
        _this.hide()
      }
    })
    window.addEventListener("scroll", (e) => {
      if (_this.isOpen) {
        _this.setLangNodePosition(e)
      }
    })
  }
}

const bgPicture = {
  pictureNode: document.querySelector(".wrapper .bg-picture"),
  introNode: document.querySelector(".js-intro-node"),
  introHeight: null,
  imgPath: "./assets/img/bg.png",
  picture: null,
  setPictureNodeHeight: function () {
    const pictureTop = this.pictureNode.getBoundingClientRect().y
    const picture = this.pictureNode.querySelector("img")
    if (this.introNode) {
      const introBottom = this.introNode.getBoundingClientRect().bottom
      let diff = Math.abs(introBottom - pictureTop)
      diff = Math.min(diff, picture.height)
      this.pictureNode.style.height = `${diff}px`
    } else {
      this.pictureNode.style.height = `${Math.min(437, picture.height)}px`
    }
  },
  putPicture: function () {
    const _this = this
    this.isHomePage = this.pictureNode.classList.contains("homepage")
    this.picture = new Image()
    this.picture.onload = function () {
      if (_this.introNode || !_this.isHomePage) {
        _this.setPictureNodeHeightBind()
        window.addEventListener("resize", _this.setPictureNodeHeightBind)
      }
    }
    this.picture.src = this.imgPath
    this.picture.alt = "bg"
    this.pictureNode.append(this.picture)
  },
  init: function () {

    this.setPictureNodeHeightBind = this.setPictureNodeHeight.bind(this)


    // if (this.introNode || !this.isHomePage) {
    this.putPicture()
    // window.addEventListener("resize", this.setPictureNodeHeightBind)
    // }
  }
}


window.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector('.projects__slider')) {
    const projects = new Swiper('.projects__slider', {
      loop: true,
      slidesPerView: 1,
      spaceBetween: 68,
      speed: 1000,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      effect: 'coverflow',
      coverflowEffect: {
        rotate: 90,
        slideShadows: false,
      },
    })
  }


  bgPicture.init()

  new Modal("requisites")
  new Modal("automation")
  new Modal("services")
  new Modal("innovation")
  new PhoneMask({})
})

window.addEventListener("load", () => {
  headerNav.init()
})

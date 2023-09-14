const headerNav = {
  header: document.querySelector("header.header"),
  nav: document.querySelector("header.header .header__nav"),
  burger: document.querySelector("header.header .header__burger"),
  main: document.querySelector("main"),
  body: document.querySelector("body"),
  isOpen: false,
  timeValue: 200,
  regExp: new RegExp("\D", "g"),
  langNode: document.querySelector(".wrapper:not(.en) .header__lang"),
  setHandlers: function() {
    this.burger.addEventListener("click", this.toggleBind)

  },
  windowClickHandler: function() {
      this.isOpen = false
      this.hide()
  },
  /**
   * Закрываем меню по нажатию на Esc
   * */
  windowKeyHandler: function({code, keyCode}) {
    if (this.isOpen && (code.toLowerCase() === "escape" || keyCode === 27)) {
      this.isOpen = !this.isOpen
      this.hide()
    }
  },
  /*
  * Выставляет верхнюю точку меню навигации в мобилках
  * */
  setTopPosition: function() {
    this.nav.style.top = `${this.header.clientHeight}px`
  },
  /*
  * Получаем значение переменной в которой хранится время анимации меню в мобилках
  * */
  setTimeValue: function(){
    let cssVar = getComputedStyle(document.documentElement)
      .getPropertyValue("--toggle-menu-time");
    if (cssVar.indexOf("0") !== 0) {
      cssVar = cssVar.padStart(cssVar.length + 1, "0")
    }
    this.timeValue = cssVar.replace("s", '') * 1000
  },
  show: function() {
    const _this = this
    _this.main.classList.add("menu-opened")
    _this.nav.classList.add("menu-opening")
    _this.burger.classList.add("menu-opening")
    _this.langNode.classList.add("menu-opening")
    setTimeout(function() {
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
  hide: function() {
    const _this = this
    _this.main.classList.remove("menu-opened")
    _this.nav.classList.remove("menu-opened")
    _this.langNode.classList.remove("menu-opened")
    _this.burger.classList.remove("menu-opened")
    _this.main.classList.add("menu-closed")
    _this.burger.classList.add("menu-closed")
    _this.nav.classList.add("menu-closed")
    _this.langNode.classList.add("menu-closed")
    setTimeout(function() {
      _this.main.classList.remove("menu-closed")
      _this.nav.classList.remove("menu-closed")
      _this.burger.classList.remove("menu-closed")
      _this.langNode.classList.remove("menu-closed")
      _this.hideLangNode()
      window.removeEventListener("click", _this.windowClickHandlerBind)
      window.removeEventListener("keyup", _this.windowKeyHandlerBind)
    }, _this.timeValue * 2)

  },
  toggle: function() {
    console.log(this.isOpen)
    this.isOpen = !this.isOpen
    this.isOpen ? this.show() : this.hide()
  },
  setLangNodePosition: function() {
    if (window.innerWidth > 550) {
      // this.langNode.style.top = "64px"
      return
    }
    const list = this.nav.querySelector("ul")
    this.langNode.style.top = `${this.header.clientHeight + list.clientHeight + 20}px`
    // console.log(list)
  },
  hideLangNode: function() {
    this.langNode.classList.remove("mobile-show")
  },
  init: function() {
    this.setTimeValue()
    this.toggleBind = this.toggle.bind(this)
    this.windowClickHandlerBind = this.windowClickHandler.bind(this)
    this.windowKeyHandlerBind = this.windowKeyHandler.bind(this)
    this.setTopPosition()
    this.setHandlers()
    const _this = this
    window.addEventListener("resize", function() {
      if (_this.langNode && window.innerWidth > 550) {
        _this.langNode.style.top = "64px"
      }
    })
  }
}

const bgPicture = {
  pictureNode: document.querySelector(".wrapper .bg-picture"),
  introNode: document.querySelector(".js-intro-node"),
  introHeight: null,
  setPictureNodeHeight: function() {
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
  init: function() {
    this.setPictureNodeHeightBind = this.setPictureNodeHeight.bind(this)
    this.isHomePage = this.pictureNode.classList.contains("homepage")
    if (this.introNode || !this.isHomePage) {
      this.setPictureNodeHeightBind()
      window.addEventListener("resize", this.setPictureNodeHeightBind)
    }
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

  headerNav.init()
  bgPicture.init()

  new Modal("requisites")
  new Modal("automation")
  new Modal("services")
  new Modal("innovation")
  new PhoneMask({})
})


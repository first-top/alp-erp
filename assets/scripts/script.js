const headerNav = {
  header: document.querySelector("header.header"),
  nav: document.querySelector("header.header .header__nav"),
  burger: document.querySelector("header.header .header__burger"),
  main: document.querySelector("main"),
  body: document.querySelector("body"),
  isOpen: false,
  timeValue: 200,
  regExp: new RegExp("\D", "g"),
  setHandlers: function() {
    this.burger.addEventListener("click", this.toggleBind)

  },
  windowClickHandler: function() {
    this.isOpen = !this.isOpen
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
    setTimeout(function() {
      _this.nav.classList.remove("menu-opening")
      _this.nav.classList.add("menu-opened")
      window.addEventListener("click", _this.windowClickHandlerBind)
      window.addEventListener("keyup", _this.windowKeyHandlerBind)

    }, _this.timeValue * 2)

  },
  hide: function() {
    const _this = this
    _this.main.classList.remove("menu-opened")
    _this.nav.classList.remove("menu-opened")
    _this.main.classList.add("menu-closed")
    _this.nav.classList.add("menu-closed")
    setTimeout(function() {
      _this.main.classList.remove("menu-closed")
      _this.nav.classList.remove("menu-closed")
      window.removeEventListener("click", _this.windowClickHandlerBind)
      window.removeEventListener("keyup", _this.windowKeyHandlerBind)
    }, _this.timeValue * 2)

  },
  toggle: function() {
    this.isOpen = !this.isOpen
    this.isOpen ? this.show() : this.hide()
  },
  init: function() {
    this.setTimeValue()
    this.toggleBind = this.toggle.bind(this)
    this.windowClickHandlerBind = this.windowClickHandler.bind(this)
    this.windowKeyHandlerBind = this.windowKeyHandler.bind(this)
    this.setTopPosition()
    this.setHandlers()
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


window.addEventListener("load", () => {
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
  const tabs = new Tabs()
  new Modal("requisites")
  new PhoneMask({})
})


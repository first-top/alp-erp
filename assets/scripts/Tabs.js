class Tabs {
  tabLinks = null
  clickHandlerBind = null
  wrapper = null
  tabContent = null
  indicator = null
  constructor() {
    this.init()
  }

  addHandlers() {
    for (let link of this.tabLinks) {
      link.addEventListener("click", this.clickHandlerBind)
    }
  }

  clickHandler({target}) {
    this.wrapper = target.closest(".js-tab-wrapper")
    this.tabContent = this.wrapper.querySelectorAll("[data-content-id]")
    this.indicator = this.wrapper.querySelector(".js-tab__indicator")

    const id = target.getAttribute("data-tab-id")
    const current = [...this.tabContent].filter(c => c.getAttribute("data-content-id") === id)[0]
    const prevCurrent = [...this.tabContent].filter(c => c.classList.contains("show"))[0]
    this.wrapper.querySelectorAll("[data-tab-id]").forEach(e => e.classList.remove("current"))
    target.classList.add("current")
    prevCurrent.classList.remove("show")
    current.classList.add("show")
    this.setIndicatorPosition(target)
  }

  setIndicatorPosition(node) {
    const rectTarget = node.getBoundingClientRect()
    const rectWrapper = this.wrapper.getBoundingClientRect()
    this.indicator.style.left = `${rectTarget.x - rectWrapper.x}px`
    this.indicator.style.width = `${rectTarget.width}px`
  }

  init() {
    this.tabLinks = document.querySelectorAll("[data-tab-id]")
    if (this.tabLinks.length) {
      // this.wrapper = this.tabLinks[0].closest(".js-tab-wrapper")
      // this.tabContent = this.wrapper.querySelectorAll("[data-content-id]")
      // this.indicator = this.wrapper.querySelector(".js-tab__indicator")
      // this.indicator = this.wrapper.querySelector(".contacts__tabs-indicator")
      this.clickHandlerBind = this.clickHandler.bind(this)
      this.addHandlers()
    }
  }
}
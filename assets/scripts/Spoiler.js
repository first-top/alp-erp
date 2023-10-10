class Spoiler {
  heads = null
  clickHandlerBind = null
  wrapper = null
  isSingleShowMode = true
  contentNode = null
  constructor(params) {
    this.isSingleShowMode = params.isSingleShowMode
    this.init()
  }

  addHandlers() {
    for (let link of this.heads) {
      link.addEventListener("click", this.clickHandlerBind)
    }
    window.addEventListener("resize", this.resizeHandlerBind)
  }

  getContentHeight(node) {
    const paddingBottom = +getComputedStyle(node).getPropertyValue("padding-bottom").replace("px", "")
    const paddingTop = +getComputedStyle(node).getPropertyValue("padding-top").replace("px", "")
    const children = node.children
    let maxHeight = 0;
    maxHeight += paddingBottom
    maxHeight += paddingTop
    for(let child of children) {
      maxHeight += Math.max(child.scrollHeight, child.clientHeight)
    }
    return maxHeight
  }

  clickHandler({target}) {
    const _this = this
    _this.wrapper = target.closest(".js-spoiler-wrapper")
    _this.current = target.closest(".js-spoiler__item")
    _this.contentNode = target.closest(".js-spoiler__head").nextElementSibling
    _this.current.classList.toggle("opened")
    if (!_this.current.classList.contains("opened")) {
      _this.contentNode.style.maxHeight = "0px"
      return
    }
    const items = _this.wrapper.querySelectorAll(".js-spoiler__item")
    if (_this.isSingleShowMode) {
      for (let item of items) {
        if (item !== _this.current) {
          item.classList.remove("opened")
          item.querySelector(".js-spoiler__content").style.maxHeight = "0px"
        }
      }
    }
    _this.setContentHeight(_this.contentNode, _this.getContentHeight(_this.contentNode))
    // setTimeout(() => {
    //   _this.current.scrollIntoView({
    //     behavior: "smooth",
    //     block: "start"
    //   })
    // }, 501)

  }

  setContentHeight(node, height) {
    node.style.maxHeight = `${height + 1}px`
  }

  resizeHandler() {
    if (!this.wrapper) return false
    const openedNodes = this.wrapper.querySelectorAll(".js-spoiler__item.opened")
    if (openedNodes.length) {
        for (let itemNode of openedNodes) {
          const contentNode = itemNode.querySelector(".js-spoiler__content")
          this.setContentHeight(contentNode, this.getContentHeight(contentNode))
        }
    }
  }


  init() {
    this.heads = document.querySelectorAll(".js-spoiler__head")
    if (this.heads.length) {
      this.clickHandlerBind = this.clickHandler.bind(this)
      this.resizeHandlerBind = this.resizeHandler.bind(this)
      this.setContentHeightBind = this.setContentHeight.bind(this)
      this.addHandlers()
    }
  }
}
class Form {
  files = null
  fileInputWrapperClass = "input-file"
  fileInputEmptyNodeClass = "js-empty"
  fileInputLoadedNodeClass = "js-loaded"
  fileInputTextNodeClass = "input-file_text"
  fileHandlerBind = null
  fileWrapper = null
  removeNode = null
  emptyNode = null
  currentInput = null
  constructor () {
    this.init()
  }
  addHandlers() {
    for (let file of this.files) {
      const wrapper = file.closest(`.${this.fileInputWrapperClass}`)
      const emptyNode = wrapper.querySelector(`.${this.fileInputEmptyNodeClass}`)
      emptyNode.addEventListener("click", function() {
        file.click()
      })
      file.addEventListener("change", this.fileInputHandlerBind)
      file.value = ""
    }
  }


  removeFileHandler() {
    this.currentInput.style.pointerEvents = "auto"
    this.currentInput.value = ""
    this
      .removeNode
      .querySelector(`.${this.fileInputTextNodeClass}`)
      .textContent = ""
    this
      .removeNode
      .style
      .display = "none"
    this
      .emptyNode
      .style
      .display = "flex"
  }

  fileInputHandler(event) {
    const target = event.target
    this.currentInput = event.target
    const file = target.files[0]
    this.fileWrapper = target.closest(`.${this.fileInputWrapperClass}`)
    this.removeNode = this.fileWrapper.querySelector(`.${this.fileInputLoadedNodeClass}`)
    this.emptyNode = this.fileWrapper.querySelector(`.${this.fileInputEmptyNodeClass}`)
    this
      .removeNode
      .querySelector(`.${this.fileInputTextNodeClass}`)
      .textContent = file.name
    this
      .removeNode
      .style
      .display = "flex"
    this
      .emptyNode
      .style
      .display = "none"
    target.style.pointerEvents = "none"
    this
      .removeNode
      .addEventListener("click", this.removeFileHandler.bind(this), {once: true})

  }
  init() {
    this.files = document.querySelectorAll(".input-file input[type=file]")

    if (this.files.length) {
      this.fileInputHandlerBind = this.fileInputHandler.bind(this)
      this.addHandlers()
    }
  }
}
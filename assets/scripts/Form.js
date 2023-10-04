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
      file.addEventListener("change", this.fileInputHandlerBind)
      file.value = ""
    }
  }

  loadedHandler() {

  }

  removeHandler() {
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
      .addEventListener("click", this.removeHandler.bind(this), {once: true})


    console.log(target)
    console.log(target.value)

    console.log(file)


  }
  init() {
    this.files = document.querySelectorAll("input[name=file]")
    if (this.files.length) {
      this.fileInputHandlerBind = this.fileInputHandler.bind(this)
      this.addHandlers()
    }
  }
}
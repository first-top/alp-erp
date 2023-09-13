class Modal {
  modalOpen = null
  bodyNode = document.querySelector("body")
  modal = null


  constructor(type) {
    switch (type) {
      case "requisites":
        this.modalOpen = document.querySelector(".modal-open-requisites")
        this.modal = document.querySelector(".modal.modal-requisites")
        break
    //   case "automation":
    //     this.modalOpen = document.querySelector(".automation-open")
    //     this.modal = document.querySelector(".modal.modal-automation")
    //     break
    //   case "outsourcing":
    //     this.modalOpen = document.querySelector(".outsourcing-open")
    //     this.modal = document.querySelector(".modal.modal-outsourcing")
    //     break
    //   case "digital":
    //     this.modalOpen = document.querySelector(".digital-open")
    //     this.modal = document.querySelector(".modal.modal-digital")
    //     break
    }
    this.init()
  }

  showModal(e) {
    e.preventDefault()
    const _this = this

    this.modal.classList.add("opening")
    setTimeout(() => {
      _this.modal.classList.remove("opening")
      _this.modal.classList.add("opened")
    }, 1000)

    // setTimeout(() => {
    //   _this.modal.classList.add("opened")
    // }, 500)
    // this.bodyNode.classList.add("no-scroll")
    this.modal.addEventListener("click", this.closeModalBind)
    window.addEventListener("keyup", this.closeModalBind)
  }

  closeModal({key, keyCode, code, target, type}) {
    const _this = this
    if (type === "keyup") {
      if (key === "Escape" || code === "Escape" || keyCode === 27) {
        _this.modal.classList.add("closing")
        setTimeout(() => {
          _this.modal.classList.remove("closing")
          _this.modal.classList.remove('opened')
        }, 1000)
        // _this.modal.classList.add("closing")
        // setTimeout(() => {
        //   _this.modal.classList.remove("closing")
        // }, 1500)
        // setTimeout(() => {
        //   _this.modal.classList.remove('opened')
        // }, 1000)
        this.bodyNode.classList.remove("no-scroll")
        this.modal.removeEventListener("click", this.closeModalBind)
        window.removeEventListener("keyup", this.closeModalBind)
      }
    }
    if (type === "click") {
      if (target.closest(".modal__close") || !target.closest(".modal__body")) {
        _this.modal.classList.add("closing")
        setTimeout(() => {
          _this.modal.classList.remove("closing")
          _this.modal.classList.remove('opened')
        }, 1000)
        // setTimeout(() => {
        //   _this.modal.classList.remove('opened')
        // }, 500)
        // this.modal.classList.remove('opened')
        this.bodyNode.classList.remove("no-scroll")
        this.modal.removeEventListener("click", this.closeModalBind)
        window.removeEventListener("keyup", this.closeModalBind)
      }
    }
  }

  addListeners() {
    this.modalOpen.addEventListener("click", this.showModalBind)
  }

  init(type) {
    if (this.modalOpen && this.modal) {
      this.closeModalBind = this.closeModal.bind(this)
      this.showModalBind = this.showModal.bind(this)
      this.addListeners()
    }
  }
}
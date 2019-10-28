//------------------------------------------------
function sweetAlert(titleToBind, bodyToBind, typeToBind, play, stay){
swal({
  title: titleToBind,
  text: bodyToBind,
  type: typeToBind,
  showCancelButton: true,
  confirmButtonColor:"3085d6",
  cancelButtonColor:"#d33",
  buttonsStyling:false,
  reverseButtons: true
}).then((result) => {
  if (result.value) {
    swal({
      type:'success',
      timer: 2500
    })//swal
  }
  })
}

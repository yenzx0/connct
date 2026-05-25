'use strict'

 export const preview = (idFile, idImg) => {
    const file = document.getElementById(idFile).files[0]
    const img = document.getElementById(idImg)
    const reader = new FileReader()

    reader.onloadend = () => img.src = reader.result

    if (file) {
        reader.readAsDataURL(file)
    }else {
        img.src = ''
}}
const input_field = document.querySelector("input")
const add_button = document.querySelector("#agregar")
const lista = document.querySelector("#lista")

// Método para reciclar y agregar las tareas a la interfaz
const crear_tarea = (tarea, done = false) => {
    const li = document.createElement("li")
    const p = document.createElement("p")
    const button = document.createElement("button")
    p.textContent = tarea

    if (done) {
        p.style.textDecoration = "line-through"
    }
    
    button.textContent = '-'
    button.addEventListener("click", delete_item)

    p.addEventListener("click", toggle_tarea)
    li.appendChild(p)
    li.appendChild(button)

    lista.appendChild(li)
}

// Evento para añadir tarea utilizando el botón +
add_button.addEventListener("click", (event) => {
    event.preventDefault()

    const errorMsg = document.querySelector("#error-msg")

    if (input_field.value === '') {
        errorMsg.textContent = "No se puede agregar una tarea vacia"
        return 
    }
    
    errorMsg.textContent = ""

    crear_tarea(input_field.value)

    input_field.value = ""

    verificar_lista_vacia()
    hacer_backup_local_storage()
})

// Se respaldan las tareas en localStorage
const hacer_backup_local_storage = () => {
    const tareas = document.querySelectorAll("li p")
    const backup = []

    for (let i = 0; i < tareas.length; i++) {
        let aux = {
            tarea: tareas[i].childNodes[0].nodeValue,
            done: false
        }
        
        if (tareas[i].style.textDecoration) {
            aux.done = true
        }

        backup.push(aux)
    }

    localStorage.setItem("tareas", JSON.stringify(backup))
}

// Se obtienen las tareas del localStorage
const obtener_backup_local_storage = () => {
    const tareas = localStorage.getItem("tareas")

    const tareasObj = JSON.parse(tareas)

    if (tareasObj) {
        tareasObj.forEach((tarea) => crear_tarea(tarea?.tarea, tarea.done))
    }

    verificar_lista_vacia()
}

// Se verifica si la lista esta vacia o no para mostrar el correspondiente mensaje
const verificar_lista_vacia = () => {
    const tareas = document.querySelectorAll("li")
    const mensaje = document.querySelector("#lista-vacia")

    if (tareas.length === 0) {
        mensaje.style.display = "block";
    } else {
        mensaje.style.display = "none";
    }
}

// Se marca la tarea como completada
const toggle_tarea = (event) => {
    event.target.style.textDecoration = "line-through"

    hacer_backup_local_storage()
}

// Se borra la tarea de la lista
const delete_item = (event) => {
    const tarea = event.target.parentElement
    lista.removeChild(tarea)

    verificar_lista_vacia()
    hacer_backup_local_storage()
}

obtener_backup_local_storage()
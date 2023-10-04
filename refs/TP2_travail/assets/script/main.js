window.addEventListener('DOMContentLoaded', function(){

    const elTodo = document.querySelector('[data-js-todo]');

    for (let i = 0; i < aTaches.length; i++) {
        task = new Tache(aTaches[i]);
        console.log(task._el)
        elTodo.querySelector('div').insertAdjacentHTML('beforeend', task._el);
    }



})
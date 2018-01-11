import Axios from 'axios'

const URL = 'http://localhost:3004/api/todos'

export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})


export const search = () =>{

    return (dispacth, getState) =>{
        const description = getState().todo.description
        const search = description ? `&description__regex=/${description}/` : ''
        const request = Axios.get(`${URL}?sort=-createAt${search}`)
            .then(resp => dispacth({ type: 'TODO_SEARCH', payload: resp.data }))   
    }    
}

export const add = description => {
    return dispacth =>{
        Axios.post(URL, {description})
        .then(resp => dispacth(clear()))
        .then(resp => dispacth(search()))
    }
}

export const markAsDone = (todo)=>{
    return dispacth => {
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
        //.then(resp => dispacth({ type: 'TODO_MARKED_AS_DONE', payload: resp.data }))
        .then(resp => dispacth(search()))
    }
}

export const markAsPending = (todo) => {
    return dispacth => {
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
        .then(resp => { dispacth(search()) })
    }
}

export const remove = (todo) => {
    //O dispatch só esta disponivel por causa do middlware thunk
    return dispacth => {
        Axios.delete(`${URL}/${todo._id}`)
        .then(resp => dispacth(search()))
    }
}

export const clear = () => {
    //multi middleware permite mais de uma ação ou action
    return [{ type: 'TODO_CLEAR' }, search()]
}
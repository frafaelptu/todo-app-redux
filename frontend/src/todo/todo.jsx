import React from 'react'

import PageHeader from '../template/pageHeader'
import TodoForm from './todoForm'
import TodoLista from './todoList'

export default props => (
    <div>
        <PageHeader name='Tarefas' small='Cadastros' />
        <TodoForm />
        <TodoLista />
    </div>
)


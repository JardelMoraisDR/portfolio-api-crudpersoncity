import React, { Component } from 'react';
import FA from 'react-fontawesome';

export class ListPeople extends Component {
    static displayName = ListPeople.name;

    constructor(props) {
        super(props);
        this.state = { people: [], loading: true };
    }

    componentDidMount() {
        this.populatePeopleData();
    }

    static handleEdit(id) {
        window.location.href = "/form-person/edit/" + id;
    }

    static handleDelete(id) {
        if (!window.confirm("Deseja realmente deletar a pessoa de id : " + id)) {
            return;
        }
        else {
            fetch('api/people/' + id, { method: 'delete' })
                .then(json => {
                    window.location.href = "/list-people";
                    alert('Pessoa deletada!');
                })
        }
    }

    static renderPeopleTable(people) {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className="col-md-1 text-center">Código</th>
                        <th className="text-left">Nome</th>
                        <th className="text-center">CPF</th>
                        <th className="col-md-2">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {people.map(person =>
                        <tr key={"id_" + person.id}>
                            <td className="col-md-1 text-center align-middle">{person.id}</td>
                            <td className="text-left align-middle"><a href={"/form-person/read/" + person.id}>{person.name}</a></td>
                            <td className="text-center align-middle">{person.cpf}</td>
                            <td>
                                <button className="btn btn-success mr-1" onClick={(id) => this.handleEdit(person.id)}><FA name="edit" /></button>
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(person.id)}><FA name="trash" /></button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : ListPeople.renderPeopleTable(this.state.people);

        return (
            <div>
                <h1 id="tabelLabel" >Lista de Pessoas</h1>
                <p><a href="/form-person/add">Adicionar nova pessoa.</a></p>
                {contents}
            </div>
        );
    }

    async populatePeopleData() {
        const response = await fetch('api/people');
        const data = await response.json();

        this.setState({ people: data, loading: false });
    }
}
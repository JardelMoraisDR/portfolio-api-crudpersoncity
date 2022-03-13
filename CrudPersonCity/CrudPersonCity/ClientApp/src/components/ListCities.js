import React, { Component } from 'react';
import FA from 'react-fontawesome';

export class ListCities extends Component {
    static displayName = ListCities.name;

    constructor(props) {
        super(props);
        this.state = { cities: [], loading: true };
    }

    componentDidMount() {
        this.populateCitiesData();
    }

    static handleEdit(id) {

        if (id === 0) {
            alert('Registro reservado pelo sistema, não pode ser editado.');
            return;
        }

        window.location.href = "/form-city/edit/" + id;

    }

    static handleDelete(id) {

        if (id === 0) {
            alert('Registro reservado pelo sistema, não pode ser apagado.');
            return;
        }

        if (!window.confirm("Deseja realmente deletar a cidade : " + id)) {
            return;
        }
        else {
            fetch('api/cities/' + id, { method: 'delete' })
                .then(json => {
                    if (json.status === 401) {
                        alert('Essa cidade não pode ser apagada, pois tem uma ou mais pessoas associadas.');
                    } else {
                        window.location.href = "/list-cities";
                        alert('Cidade deletada!');
                    }
                });
        }

    }

    static renderCitiesTable(cities) {

        console.log(cities);

        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th className="col-md-1 text-center">Código</th>
                        <th className="text-left">Cidade</th>
                        <th className="text-center">UF</th>
                        <th className="col-md-2">Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {cities.map(city =>
                        <tr key={"id_" + city.id}>
                            <td className="col-md-1 text-center align-middle">{city.id}</td>
                            <td className="text-left align-middle"><a href={"/form-city/read/" + city.id}>{city.name}</a></td>
                            <td className="text-center align-middle">{city.uf}</td>
                            <td>
                                <button className="btn btn-success mr-1" onClick={(id) => this.handleEdit(city.id)}><FA name="edit" /></button>
                                <button className="btn btn-danger" onClick={(id) => this.handleDelete(city.id)}><FA name="trash" /></button>
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
            : ListCities.renderCitiesTable(this.state.cities);

        return (
            <div>
                <h1 id="tabelLabel" >Lista de Cidades</h1>
                <p><a href="/form-city/add">Adicionar nova cidade.</a></p>
                {contents}
            </div>
        );
    }

    async populateCitiesData() {
        const response = await fetch('api/cities');
        const data = await response.json();

        this.setState({ cities: data, loading: false });
    }
}
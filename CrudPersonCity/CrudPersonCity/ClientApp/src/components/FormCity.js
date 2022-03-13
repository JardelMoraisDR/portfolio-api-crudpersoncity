import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

export class City {
    constructor() {
        this.id = 0;
        this.name = "";
        this.uf = "";
    }
}

export default class FormCity extends Component {
    static displayName = FormCity.name;

    constructor(props) {
        super(props);
        this.state = { title: "", city: new City(), readonly: false, loading: true };

        this.renderCityForm = this.renderCityForm.bind(this);
        this.populateCityData = this.populateCityData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.populateCityData();
    }

    async handleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.city.id) {
            await fetch('api/cities/' + this.state.city.id, { method: 'PUT', body: data });
        }
        else {
            await fetch('api/cities/', { method: 'POST', body: data });
        }

        this.props.history.push('/list-cities');

    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/list-cities');
    }

    renderCityForm(city) {

        const renderButtons = () => {
            if (!this.state.readonly) {
                return <div className="form-group row justify-content-end">
                    <button className="btn btn-danger mr-2" onClick={this.handleCancel}>Cancelar</button>
                    <button type="submit" className="btn btn-success mr-4" value={city.id}>Salvar</button>
                </div>;
            }
        }

        const renderControlId = () => {
            if (city.id !== 0) {
                return <div className="col-md-2">
                    <Form.Label htmlFor="inputId">Código</Form.Label>
                    <Form.Control name="id" id="inputId" defaultValue={city.id} readOnly={true} />
                </div>;
            }
        }

        return (

            <Form onSubmit={this.handleSave}>

                <div className="form-group row">
                    <div className={city.id !== 0 ? "col-md-10" : "col-md-12"}>
                        <Form.Label htmlFor="inputName">Nome</Form.Label>
                        <Form.Control className="form-control" type="text" id="inputName" name="name" defaultValue={city.name} readOnly={this.state.readonly} required />
                    </div>
                    {renderControlId()}
                </div>

                <div className="form-group row">
                    <div className="col-md-12">
                        <Form.Label htmlFor="inputUf">Uf</Form.Label>
                        <Form.Control className="form-control" type="text" id="inputUf" name="uf" defaultValue={city.uf} readOnly={this.state.readonly} required />
                    </div>
                </div>

                {renderButtons()}

            </Form>

        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderCityForm(this.state.city);

        return (
            <div>
                <h1 id="tabelLabel" >{this.state.title}</h1>
                <p><a href="/list-cities">Voltar para a lista.</a></p>
                {contents}
            </div>
        );
    }

    async populateCityData() {

        var id = this.props.match.params["id"];
        if (id > 0) {

            const response = await fetch('api/cities/' + id);
            const data = await response.json();

            var operation = this.props.match.params["operation"];
            var title = "Alteração de Cidade";
            var readonly = false;

            if (operation === "read") {
                title = "Consulta de Cidade";
                readonly = true;
            }

            this.setState({ title: title, city: data, readonly: readonly, loading: false });

        } else {

            this.setState({ title: "Nova Cidade", city: new City(), readonly: false, loading: false });

        }

    }
}
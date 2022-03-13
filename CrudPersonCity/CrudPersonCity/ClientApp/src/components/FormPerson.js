import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

export class Person {
    constructor() {
        this.id = 0;
        this.name = "";
        this.cpf = "";
        this.id_city = 0;
        this.age = 0;
    }
}

export default class FormPerson extends Component {
    static displayName = FormPerson.name;

    constructor(props) {
        super(props);
        this.state = { title: "", person: new Person(), cities: null, readonly: false, loading: true };

        this.renderPersonForm = this.renderPersonForm.bind(this);
        this.populatePersonData = this.populatePersonData.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        this.populatePersonData();
    }

    async handleSave(event) {
        event.preventDefault();

        const data = new FormData(event.target);

        if (this.state.person.id) {
            await fetch('api/people/' + this.state.person.id, { method: 'PUT', body: data });
        }
        else {
            await fetch('api/people/', { method: 'POST', body: data });
        }

        this.props.history.push('/list-people');

    }

    handleCancel(event) {
        event.preventDefault();
        this.props.history.push('/list-people');
    }

    renderPersonForm(person, cities) {

        const renderButtons = () => {
            if (!this.state.readonly) {
                return <div className="form-group row justify-content-end">
                    <button className="btn btn-danger mr-2" onClick={this.handleCancel}>Cancelar</button>
                    <button type="submit" className="btn btn-success mr-4" value={person.id}>Salvar</button>
                </div>;
            }
        }

        const renderControlId = () => {
            if (person.id !== 0) {
                return <div className="col-md-2">
                    <Form.Label htmlFor="inputId">Código</Form.Label>
                    <Form.Control name="id" id="inputId" defaultValue={person.id} readOnly={true} />
                </div>;
            }
        }
        
        return (
            
            <Form onSubmit={this.handleSave}>

                <div className="form-group row">
                    <div className={person.id !== 0 ? "col-md-10" : "col-md-12"}>
                        <Form.Label htmlFor="inputName">Nome</Form.Label>
                        <Form.Control className="form-control" type="text" id="inputName" name="name" defaultValue={person.name} readOnly={this.state.readonly} required />
                    </div>
                    {renderControlId()}
                </div>

                <div className="form-group row">
                    <div className="col-md-6">
                        <Form.Label htmlFor="inputCpf">CPF</Form.Label>
                        <Form.Control className="form-control"
                            type="text"
                            pattern="[0-9]*"
                            placeholder="XXX.XXX.XXX-XX"
                            maxLength={11}
                            id="inputCpf"
                            name="cpf"
                            defaultValue={person.cpf}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            readOnly={this.state.readonly} required />
                    </div>
                    <div className="col-md-6">
                        <Form.Label htmlFor="inputAge">Idade</Form.Label>
                        <Form.Control className="form-control"
                            type="text"
                            pattern="[0-9]*"
                            id="inputAge"
                            name="age"
                            maxLength={3}
                            defaultValue={person.age}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}
                            readOnly={this.state.readonly} required />
                    </div>
                </div>

                <div className="form-group row">
                    <div className="col-md-12">
                        <Form.Label htmlFor="inputCity">Cidade</Form.Label>
                        <Form.Select name="id_city" id="inputCity" className="form-control" defaultValue={person.id_City} readOnly={this.state.readonly} disabled={this.state.readonly} >
                            {cities.map(city =>
                                <option key={"id_" + city.id} value={city.id} >{city.id} - {city.name}</option>
                            )}
                        </Form.Select>
                    </div>
                </div>

                {renderButtons()}

            </Form>

        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Carregando...</em></p>
            : this.renderPersonForm(this.state.person, this.state.cities);

        return (
            <div>
                <h1 id="tabelLabel" >{this.state.title}</h1>
                <p><a href="/list-people">Voltar para a lista.</a></p>
                {contents}
            </div>
        );
    }

    async populatePersonData() {

        const responseCity = await fetch('api/cities');
        const dataCity = await responseCity.json();

        var id = this.props.match.params["id"];
        if (id > 0) {

            const response = await fetch('api/people/' + id);
            const data = await response.json();

            var operation = this.props.match.params["operation"];
            var title = "Alteração de Pessoa";
            var readonly = false;

            if (operation === "read") {
                title = "Consulta de Pessoa";
                readonly = true;
            }

            this.setState({ title: title, person: data, cities: dataCity, readonly: readonly, loading: false });

        } else {

            this.setState({ title: "Nova Pessoa", person: new Person(), cities: dataCity, readonly: false, loading: false });

        }

    }
}
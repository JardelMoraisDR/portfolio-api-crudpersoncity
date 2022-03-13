import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    render() {
        return (
            <div>
                <h1>Portfólio - Projeto CrudPersonCity</h1>
                <p>Projeto demonstrativo com o objetivo de criar uma WEB API utilizando o .NET Core 5.</p>                
                <p>Acesse o Swagger dessa aplicação <a href="/swagger/index.html">clicando aqui.</a>.</p>
            </div>
        );
    }
}

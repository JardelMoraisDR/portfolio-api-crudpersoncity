import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

import { ListPeople } from './components/ListPeople';
import { ListCities } from './components/ListCities';

import FormPerson from './components/FormPerson';
import FormCity from './components/FormCity';

import './custom.css'

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/list-people' component={ListPeople} />
                <Route path='/form-person/add' component={FormPerson} />
                <Route path='/form-person/:operation/:id' component={FormPerson} />
                <Route path='/list-cities' component={ListCities} />
                <Route path='/form-city/add' component={FormCity} />
                <Route path='/form-city/:operation/:id' component={FormCity} />
            </Layout>
        );
    }
}

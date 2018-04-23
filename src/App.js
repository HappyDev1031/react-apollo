import React, { Component } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import logo from './logo.svg';
import './App.css';

import { ApolloProvider } from "react-apollo";

import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
});

class App extends Component {


  ExchangeRates() {

    return <Query
      query={gql`
      {
        rates(currency: "USD") {
          currency
          rate
        }
      }
    `}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.rates.map(({ currency, rate }) => (
          <div key={currency}>
            <p>{`${currency}: ${rate}`}</p>
          </div>
        ));
      }}
    </Query>

  }

  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <p className="App-intro">
            To get started, edit <code>src/App.js</code> and save to reload.
          </p>
          {
            this.ExchangeRates()
          }
        </div>
      </ApolloProvider>
    );
  }
}

export default App;

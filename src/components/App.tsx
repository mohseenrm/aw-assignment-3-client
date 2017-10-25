import * as React from 'react';
import * as elasticsearch from 'elasticsearch';
import axios from 'axios';

const es = new elasticsearch.Client({
  host: 'http://ec2-18-221-242-218.us-east-2.compute.amazonaws.com:9200',
  log: 'trace',
});

interface AppState {
  url? : string;
  lastUrl?: string;
  response?: any;
  responseTime: string;
  appData? : any;
}
export class App extends React.Component < any, any > {
  constructor (props: any) {
    super(props);
    this.state = {};
  }
  // ES call example
  /* componentDidMount () {
    console.log('Hola');
    return es.search({
      index: 'wiki',
      type: 'items',
      body: {
        query: {
          match: {
            content: 'generics',
          },
        },
      },
    }).then((response) => {
      console.log(response);
    }).catch(err => console.log(err));
  } */

  componentDidMount () {
    return axios({
      method: 'get',
      url: 'https://cdn.rawgit.com/mohseenrm/cdn/1e38b579/jsons/posts.json',
    }).then((response: any) => {
      console.log('App data: ', response.data);
      const appData = {
        appData: response.data,
      };
      this.setState(
        Object.assign(
          {},
          this.state,
          appData,
        ),
      );
    });
  }

  render () {
    if (this.state && this.state.appData) {
      return(
        <div className="main-wrapper">
          Hola {this.props.message}!
        </div>
      );
    }
    return(
      <div className="main-wrapper">
        Loading...
      </div>
    );
  }
}

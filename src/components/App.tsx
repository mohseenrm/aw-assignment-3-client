import * as React from 'react';
import * as elasticsearch from 'elasticsearch';
import axios from 'axios';

import { Posts } from './Posts';
import { Response } from './Response';

const es = new elasticsearch.Client({
  host: 'http://ec2-18-221-242-218.us-east-2.compute.amazonaws.com:9200',
  log: 'trace',
});

interface AppState {
  appData? : [{
    content: string;
    tags: string[];
    type: string;
  }];
  selectedIndex: number;
}
export class App extends React.Component < any, AppState > {
  constructor (props: any) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };

    this.updateSelectedIndex = this.updateSelectedIndex.bind(this);
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
        appData: response.data.posts,
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

  updateSelectedIndex (selectedIndex: number) {
    this.setState(
      Object.assign(
        {},
        this.state,
        { selectedIndex },
      ),
    );
  }

  getTags (index: number) {
    return this.state.appData[index].tags;
  }

  render () {
    if (this.state && this.state.appData) {
      return(
        <div className="main-wrapper">
          <Posts
            callbackParent={this.updateSelectedIndex}
            postsData={this.state.appData}
          />
          <Response
            tags={this.getTags(this.state.selectedIndex)}
          />
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

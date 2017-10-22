import * as React from 'react';
import * as elasticsearch from 'elasticsearch';

const es = new elasticsearch.Client({
  host: 'http://ec2-18-221-242-218.us-east-2.compute.amazonaws.com:9200',
  log: 'trace',
});
export class App extends React.Component < any, any > {
  constructor (props: any) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
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
  }

  render () {
    return(
			<div className="main-wrapper">
				Hola {this.props.message}!
			</div>
    );
  }
}

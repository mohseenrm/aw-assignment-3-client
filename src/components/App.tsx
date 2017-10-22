import * as React from 'react';

export class App extends React.Component < any, any > {
  constructor (props: any) {
    super(props);
    this.state = {};
  }

  render () {
    return(
			<div className="main-wrapper">
				Hola {this.props.message}!
			</div>
    );
  }
}

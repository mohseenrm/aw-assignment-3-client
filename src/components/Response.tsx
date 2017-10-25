import * as React from 'react';

export class Response extends React.Component < ResponseProps, any > {
  constructor (props: any) {
    super(props);
    this.state = {};
  }

  render () {
    return(
      <div className="main-wrapper--response">
				Response Panel
      </div>
    );
  }
}

interface ResponseProps {
  tags: string[];
}

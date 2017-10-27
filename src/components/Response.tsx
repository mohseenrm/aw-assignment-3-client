import * as React from 'react';
import * as elasticsearch from 'elasticsearch';
import {
	Accordion,
	Icon,
	List,
	Segment,
} from 'semantic-ui-react';

const es = new elasticsearch.Client({
  host: 'http://ec2-18-221-242-218.us-east-2.compute.amazonaws.com:9200',
  log: 'trace',
});
export class Response extends React.Component < ResponseProps, ResponseState > {
  constructor (props: any) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
		  this.handleClick = this.handleClick.bind(this);
  }

  handleClick (e: any, titleProps: any) {
    console.log('TITLE PROPS: ', titleProps);
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState(
			Object.assign(
				{},
				this.state,
				{ activeIndex: newIndex },
			),
		);
  }

  componentWillReceiveProps (props: ResponseProps) {
    // console.log('Response props: ', props);
    return es.search({
      index: 'wiki',
      type: 'items',
      body: {
        query: {
          multi_match: {
            query: this.generateQueryString(props.tags),
            fields: [
              'title^3',
              'content',
            ],
          },
        },
      },
    }).then((response) => {
      const esResults = response.hits.hits.map(result => result._source);
      // console.log(esResults);
      this.setState(
				Object.assign(
					{},
					this.state,
					{ esResults },
				),
			);
    }).catch(err => console.log(err));
  }

  generateQueryString (tags: string[]) {
    return tags.reduce((acc: string, current: string) => {
			// tslint:disable-next-line
      acc += ` OR \"${current}\"`;
      return acc;
    });
  }

  /* render () {
    if (this.state && this.state.esResults) {
      // console.log('TEST: ', this.generateQueryString(this.props.tags));
      return(
				<div className="main-wrapper--response">
					<Segment inverted={true}>
						<List divided={true} inverted={true} relaxed={true}>
							{
								this.state.esResults.map(result =>
									<List.Item>
										<List.Content>
											<List.Header>{result.title.replace('[edit]', '')}</List.Header>
											{result.content.slice(0, 50)}...
										</List.Content>
									</List.Item>,
								)
							}
						</List>
					</Segment>
				</div>
      );
    }
    return(
			<div className="main-wrapper--response">
				Click on post title to load results..
			</div>
    );
	} */
  render () {
    const { activeIndex, esResults } = this.state;

    if (this.state && this.state.esResults) {
      return(
				<div className="main-wrapper--response">
					<Segment inverted={true}>
						<Accordion inverted={true}>
							{
								esResults.map((result, index: number) => {
									return(
										<div>
											<Accordion.Title
												active={activeIndex === index}
												index={index}
												onClick={this.handleClick}
											>
												<Icon name="dropdown" />
												{result.title.replace('[edit]', '')}
											</Accordion.Title>
											<Accordion.Content
												active={activeIndex === index}
											>
												<p>
													{result.content}
												</p>
											</Accordion.Content>
										</div>
									);
								})
							}
						</Accordion>
					</Segment>
				</div>
      );
    }
    return(
			<div className="main-wrapper--response">
				Click on post title to load results..
			</div>
    );
  }
}

interface ResponseProps {
  tags: string[];
}

interface ResponseState {
  activeIndex: number;
  esResults?: [{
    content: string;
    title: string;
  }];
}

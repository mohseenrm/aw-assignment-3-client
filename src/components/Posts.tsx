import * as React from 'react';
import { List } from 'semantic-ui-react';

export class Posts extends React.Component < PostProps, any > {
  constructor (props: any) {
		/* tslint:disable */
		super(props);
		this.state = {};
		this.onClickHandler = this.onClickHandler.bind(this);
		/* tslint:enable */
  }

  onClickHandler (event: Event) {
    console.log('EVENT: ', event);
    console.log('data: ', event.target);
  }

  render () {
    return(
      <div className="main-wrapper--posts">
				<List
					divided={true}
					relaxed={true}
					onClick={this.onClickHandler}
				>
					{
						this.props.postsData.map((post, index) => {
							// tslint:disable-next-line
							return(
								<List.Item>
									<List.Icon name="stack overflow" size="large" verticalAlign="middle" />
									<List.Content>
										<List.Header as="a" id={index}>{post.content.slice(0, 30)}...</List.Header>
										<List.Description as="a">{post.type}</List.Description>
									</List.Content>
								</List.Item>
							);
							// tslint:disable-next-line
						})
					}
				</List>
      </div>
    );
  }
}

interface PostProps {
  postsData: [{
    content: string;
    tags: string[];
    type: string;
  }];
}

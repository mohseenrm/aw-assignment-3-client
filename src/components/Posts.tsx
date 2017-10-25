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

  onClickHandler (event: any) {
    console.log('data: ', event.target.dataset.index);
    this.props.callbackParent(event.target.dataset.index);
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
										<List.Header
											as="a"
											data-index={index}
										>
											{post.content.slice(0, 30)}...
										</List.Header>
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
  callbackParent: Function;
  postsData: [{
    content: string;
    tags: string[];
    type: string;
  }];
}

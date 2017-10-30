import * as React from 'react';
import {
	Button,
	Header,
	List,
	Modal,
} from 'semantic-ui-react';

export class Posts extends React.Component < PostProps, PostState > {
  constructor (props: any) {
		/* tslint:disable */
		super(props);
		this.state = {
			open: false,
		};
		this.close = this.close.bind(this);
		this.onClickHandler = this.onClickHandler.bind(this);
		this.show = this.show.bind(this);
		/* tslint:enable */
  }

  show (dimmer: string) {
		/* tslint:disable */
    return () => {
      return this.setState(
				Object.assign(
					{},
					this.state,
					{
						dimmer,
						open: true,
					},
				),
			);
		}
		/* tslint:enable */
  }

  close () {
    return this.setState(
			Object.assign(
				{},
				this.state,
				{ open: false },
			),
		);
  }

  onClickHandler (event: any) {
    this.props.callbackParent(event.target.dataset.index);
  }

  render () {
    const { dimmer, open } = this.state;

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
									<List.Icon
										name="stack overflow"
										size="large"
										verticalAlign="middle"
									/>
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
				<Button
					color="blue"
					onClick={this.show('inverted')}
				>
					Indexing Info
				</Button>
				<Modal
					dimmer={dimmer}
					open={open}
					onClose={this.close}
				>
					<Modal.Header>Indexing Information</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<Header>Tagging</Header>
							<p>The content of each post is processed with the Natural Language Toolkit in Python3, this helped get relevant tags. After cleaning the list of tags, and sorting them, the first four tags were selected and compiled in a json, which serves the data to this application</p>
							<Header>Multi match</Header>
							<p>A Multi match of these tags combined (OR) is generated client side, which interface with ElasticSearch to retrieve results</p>
							<Header>Weighted scores</Header>
							<p>In all fields, title is given 3x weight, as this would directly correspond to a relevant topic the post is talking about</p>
						</Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button positive={true} icon="checkmark" labelPosition="right" content="Ok, Got it" onClick={this.close} />
          </Modal.Actions>
				</Modal>
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

interface PostState {
  open: boolean;
  dimmer?: any;
}

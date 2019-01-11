import React, { Component } from 'react';
import * as api from '../api';
import './Article.css';
import Comments from './Comments';
import { Link } from '@reach/router';
import DeleteArticleButton from './DeleteArticleButton';

class Article extends Component {
  state = {
    article: {},
    userIsAuthor: false
  }
  render() {
    const { article, userIsAuthor } = this.state;
    console.log(article)
    const { title, body, author, created_at } = article;
    return (
      <div className='article'>
        <h2>{title}</h2>
        <p>by <Link to={`/users/${author}`}>{author}</Link> {userIsAuthor && <i>(you)</i>} | <i>{created_at}</i></p>
        <p>{body}</p>
        {userIsAuthor && <DeleteArticleButton />}
        <Comments articleId={this.props.article_id} />
      </div>
    );
  }

  componentDidMount() {
    this.fetchArticle(this.props.article_id)
  }

  componentDidUpdate(prevProps) {
    if (this.props.username !== prevProps.username) {
      this.setUserIsAuthor();
    }
    if (prevProps.article_id !== this.props.article_id) {
      this.fetchArticle(this.props.article_id)
    }
  }

  fetchArticle(topic) {
    api.fetchArticle(topic)
      .then((article) => this.setState({ article: article }))
      .then(() => this.setUserIsAuthor())
  }

  setUserIsAuthor = () => {
    const { author } = this.state.article;
    const { username } = this.props;
    if (username === author) {
      this.setState({ userIsAuthor: true })
    } else {
      this.setState({ userIsAuthor: false })
    }
  }
}

export default Article;
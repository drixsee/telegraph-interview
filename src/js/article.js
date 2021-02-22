const Utils = require('./utils');

class Article {
	constructor() {
    this.utils = new Utils();

    fetch('https://my-json-server.typicode.com/telegraph/frontend-exercise/comments')
      .then((response) => response.json())
      .then((comments) => {
        this.comments = comments;

        const commentsElement = document.querySelector('.comments');
        commentsElement.querySelector('.count').innerHTML = comments.length;
        commentsElement.querySelector('.body').innerHTML = this.createCommentsElements(this.comments);
        commentsElement.querySelector('.comment-sort-likes').addEventListener('click', ({ target }) => {
          this.sortComments(commentsElement, target, ({ likes: a }, { likes: b }) => b - a);
        });
        commentsElement.querySelector('.comment-sort-time').addEventListener('click', ({ target }) => {
          this.sortComments(commentsElement, target, ({ date: a }, { date: b }) => new Date(b) - new Date(a));
        });
        
        commentsElement.style.display = 'block';
      });
	}

  createCommentsElements(comments) {
    const template = document.querySelector('.comment-template').innerHTML;

    return comments.reduce((comments, commentData) => {
      let comment = template;

      const keys = Object.keys(commentData);
      for (const key of keys) {
        // TODO: Apply formatting if date
        // TODO: Can be expanded if more customized formatting is required in the future
        const value = this.utils.isISODateString(commentData[key])
          ? this.utils.formatDate(commentData[key])
          : commentData[key];

        comment = comment.replace(`{{${key}}}`, value);
      }

      return comments + comment;
    }, '');
  }

  sortComments(element, sortElement, comparator) {
    // TODO: No need to re-sort
    if (sortElement.classList.contains('active')) {
      return;
    }

    element.querySelector('.body').innerHTML = this.createCommentsElements(this.comments.slice().sort(comparator));
    sortElement.classList.add('active');

    if (this.sortElement) {
      this.sortElement.classList.remove('active');
    }
    this.sortElement = sortElement;
  }
}

module.exports = Article;

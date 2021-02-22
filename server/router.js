const { formatDate, getTitleIdentifier } = require('./utils/article');

const express = require('express');
const router = express.Router();

// TODO: Assume we allow empty title paths (i.e. "home" page `/` vs individual article pages `/title`)
router.get('/:title?', (req, res) => {
  const article = req.app.get('article').post;

  // TODO: Assume if title is empty, we show the main article
  // TODO: We also show it if the title matches our main article
  // TODO: Error case is if title is a mismatch (i.e. requesting a specific article)
  if (req.params.title && req.params.title !== getTitleIdentifier(article.title)) {
    res.render("error");
    return;
  }

  const posts = req.app.get('stories').posts.filter(({ category }) => category === article.category);

  res.render("home", {
		meta: req.app.get('meta'),
		article: {
      ...article,
      date: formatDate(article.date),
    },
		posts,
	});
});

module.exports = router;

const router = require('express').Router();
const {
  Post,
  User,
  Vote,
  Comment
} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// get all users
router.get('/', (req, res) => {
  console.log('======================');
  Post.findAll({
      attributes: [
        'id',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'],
        'blog_text'
      ],
      order: [
        ['created_at', 'DESC']
      ],
      include: [{
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
    .then(dbPostData => {
      // pass a single post object into the homepage template 
      const posts = dbPostData.map(post => post.get({
        plain: true
      }));
      // This will loop over and map each Sequelize object into a serialized version of itself, saving the results in a new posts array. Now we can plug that array into the template. However, even though the render() method can accept an array instead of an object, that would prevent us from adding other properties to the template later on. To avoid future headaches, we can simply add the array to an object and continue passing an object to the template.

      res.render('homepage', {
        posts
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });

});

router.get('/:id', (req, res) => {
  Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'created_at',
        [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count'],
        'blog_text'
      ],
      include: [{
        model: User,
        attributes: ['username']
      }]
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'No post found with this id'
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post('/', withAuth, (req, res) => {
  Post.create({
      title: req.body.title,
      blog_text: req.body.blog_text,
      user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/upvote', withAuth, (req, res) => {
  // make sure the session exists first
  if (req.session) {
    // pass session id along with all destructured properties on req.body
    Post.upvote({
        ...req.body,
        user_id: req.session.user_id
      }, {
        Vote,
        Comment,
        User
      })
      .then(updatedVoteData => res.json(updatedVoteData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  }
});

router.put('/:id', withAuth, (req, res) => {
  Post.update({
      title: req.body.title,
      blog_text: req.body.blog_text
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({
          message: 'No post found with this id'
        });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', withAuth, (req, res) => {
  Post.findOne({
      where: {
        id: req.params.id
      },
      include: [Comment]
    })
    .then(post => {
      post.comments.forEach(comment => {
        comment.destroy();
      })
      post.destroy();
      res.end();
    })
});


module.exports = router;
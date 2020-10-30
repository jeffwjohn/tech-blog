const {
  Model,
  DataTypes
} = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'title',
          'blog_text',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'),
            'vote_count'
          ]
        ]
      });
    });
  }
}

// create fields/columns for Post model
Post.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  blog_text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [1, 1000]
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
      // The user_id is conversely defined as the foreign key and will be the matching link.
    }
  }
}, {
  // In the second parameter of the init method, we configure the metadata, including the naming conventions.
  sequelize,
  freezeTableName: true,
  underscored: true,
  modelName: 'post'
});

module.exports = Post;
"use strict";
const { Model } = require("sequelize");

const moment = require("moment");

const { deleteFile } = require("../services/file-deleted");

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "userId" });
      
    }

    readableCreatedAt() {
      //: Package "moment" ajout heure locale françaisae 
      return moment(this.createdAt).locale("fr").format("LL");
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
    },
    {
      sequelize,
      validate: {
        eitherContentOrImageUrl() {
          if (!this.content && !this.imageUrl) {
            throw new Error("Publication vide ! Veuillez ajouter un contenu ou une image");
          }
        },
      },
      modelName: "Post",
    }
  );

  Post.afterDestroy(async (post) => {
    if (post.imageUrl) {
      await deleteFile(post.imageUrl);
    }
  });

  Post.afterUpdate(async (post) => {
    if (post.dataValues.imageUrl !== post._previousDataValues.imageUrl) {
      await deleteFile(post._previousDataValues.imageUrl);
    }
  });

  return Post;
};

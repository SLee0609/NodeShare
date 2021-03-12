class Post {
  constructor(id, categoryIds, title, userId, image, description, time) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.title = title;
    this.userId = userId;
    this.image = image;
    this.description = description;
    this.time = time;
  }
}

export default Post;

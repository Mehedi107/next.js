import { ObjectId } from 'mongodb';
import clientPromise from './mongodb';

export async function getPostById(id) {
  try {
    const client = await clientPromise;
    const dbName = client.db('next-blog');
    const postCollection = dbName.collection('posts');

    const singlePost = await postCollection.findOne({
      _id: new ObjectId(id),
    });

    return singlePost;
  } catch (error) {
    console.log('Mongodb error: ', error);
    return null;
  }
}

export async function getAllPost() {
  try {
    const client = await clientPromise;
    const dbName = client.db('next-blog');
    const postCollection = dbName.collection('posts');

    const posts = await postCollection.find().sort({ createdAt: -1 }).toArray();

    return posts;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return null; // or throw custom error
  }
}

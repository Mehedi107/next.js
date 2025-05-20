'use server';

import getSessionToken from '@/lib/auth';
import { BlogPostSchema } from '@/lib/definition';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function submitPost(state, formData) {
  // check if user logged in
  const user = await getSessionToken();

  if (!user) return redirect('/login');

  // get form input
  const inputData = {
    title: formData.get('title'),
    content: formData.get('content'),
  };

  // validate with schema
  const result = BlogPostSchema.safeParse(inputData);

  // if data is not valid
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      title: inputData.title,
      content: inputData.content,
    };
  }

  // save post data to database
  try {
    const client = await clientPromise;
    const dbName = client.db('next-blog');
    const postCollection = dbName.collection('posts');
    const newPost = {
      title: result.data.title,
      content: result.data.content,
      userId: user?.userId,
      createdAt: new Date(),
    };

    await postCollection.insertOne(newPost);

    return { success: true, message: 'Post save successfully!' };
  } catch (error) {
    console.error('Error inserting post:', error);
    return { success: false, message: 'Server error. Please try again later!' };
  }
}

export async function editPost(state, formData) {
  // check if user logged in
  const user = await getSessionToken();

  if (!user) return redirect('/login');

  // get form data
  const inputData = {
    title: formData.get('title'),
    content: formData.get('content'),
    postId: formData.get('postId'),
  };

  // validate with schema
  const result = BlogPostSchema.safeParse(inputData);

  // if data is not valid
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
      title: inputData.title,
      content: inputData.content,
    };
  }

  // extract data from result
  const { title: updatedTitle, content: updatedContent, postId } = result.data;

  // save updated data to db
  try {
    const client = await clientPromise;
    const dbName = client.db('next-blog');
    const postCollection = dbName.collection('posts');
    const filter = { _id: new ObjectId(postId) };
    const options = { upsert: true };
    const updatedDoc = {
      $set: {
        title: updatedTitle,
        content: updatedContent,
      },
    };
    await postCollection.updateOne(filter, updatedDoc, options);

    return { success: true, message: 'Post updated successfully!' };
  } catch (error) {
    console.log('Database error: ', error);
    return { success: false, message: 'Server error. Please try again later!' };
  }
}

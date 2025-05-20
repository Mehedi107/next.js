'use server';

import clientPromise from '@/lib/mongodb';
import { LoginSchema, RegisterSchema } from '@/lib/definition';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';
import { createSession } from '@/lib/session';
import { cookies } from 'next/headers';

export async function register(state, formData) {
  // Get user data
  const inputs = {
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  };

  // 1. Validate form fields
  const result = RegisterSchema.safeParse(inputs);

  // If user data not valid
  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const client = await clientPromise;
  const dbName = client.db('next-blog');
  const userCollection = dbName.collection('users');

  // Check for existing user
  const isUserExist = await userCollection.findOne({
    email: result.data.email,
  });

  if (isUserExist) {
    return { success: false, errors: { email: ['User already exists.'] } };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(result.data.password, 10);

  // 3. Insert the user into the database
  const response = await userCollection.insertOne({
    email: result.data.email,
    password: hashedPassword,
    createdAt: new Date(),
  });

  // 4. Create user session
  await createSession(response.insertedId.toString());

  // 5. Redirect user
  redirect('/');
}

export async function login(state, formData) {
  // get form data
  const inputs = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  // validate form fields with schema
  const validatedFields = LoginSchema.safeParse(inputs);

  // if form fields not valid
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // if form fields valid find the user in db
  const { email, password } = validatedFields.data;

  const client = await clientPromise;
  const dbName = client.db('next-blog');
  const userCollection = dbName.collection('users');

  const user = await userCollection.findOne({ email: email });

  // if user not found
  if (!user) {
    return {
      success: false,
      errors: { email: 'Invalid user.' },
    };
  }

  // if user found check user password
  const isMatch = await bcrypt.compare(password, user.password);

  // if not valid password
  if (!isMatch) {
    return {
      success: false,
      errors: { password: 'Wrong password' },
    };
  }

  // if user credential valid create session
  console.log(user);
  await createSession(user._id.toString());

  // redirect use to home page
  redirect('/');
}

export async function logout() {
  const cookieStore = cookies();
  cookieStore.delete('session');
  redirect('/login');
}

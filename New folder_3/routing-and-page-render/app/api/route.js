export function GET(response) {
  console.log(response);

  // return Response.json()
  return new Response('Hello!');
}

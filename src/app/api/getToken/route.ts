export async function POST(request:Request){
  //learn more about the new api routes
  console.log(request)
  return new Response("hello")
}

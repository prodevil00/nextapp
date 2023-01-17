import {All_POSTS_SLUGS, POST_QUERY} from "../../graphql/_post";
import client from "../../graphql/client";
import {Header, Render} from "../../components/Render";

export default function Post({ post}) {
  return (
    <>
      <Header post={post} />
      <Render post={post} />
    </>
  )
}

export async function getServerSideProps(ctx){


  const {data} = await client.query({
    query: POST_QUERY(ctx.params.postSlug.pop())
  });

  const post = data?.postBy;
  // const matchdate = () =>{
  //   const paramsdate = "/"+ctx.params.blog.slice(0,-1).join("/")+"/"
  //   const postdate = post?.uri.split(ctx.params.blog.pop())[0]
  //   return paramsdate === postdate
  // }

  if ( !post){
    return {
      props: {},
      notFound: true
    }
  }

  return {
    props: {
      post,
      revalidate: 1
    }
  }
}

// export async function getStaticPaths(){
//   const {data} = await client.query({
//     query: All_POSTS_SLUGS()
//   });

//   const paths = [];
//   data.posts.nodes?.map(post=>{
//       paths.push({params: {postSlug: post.uri.split("/").filter(e=>e)}})
//   })

//   return {
//     paths,
//     fallback: true
//   }

// }
export const config = {
  unstable_runtimeJS: false,
};
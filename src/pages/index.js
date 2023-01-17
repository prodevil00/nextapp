import Head from "next/head";
import client from "../graphql/client";
import { gql } from "@apollo/client";
import Link from "next/link";
import { useState } from "react";
import ExButton from "../components/HandleExport";

async function queryData(size, offset) {
  const { data } = await client.query({
    query: gql`{
      posts(where:{offsetPagination:{size:${size}, offset:${offset}}}){
        edges{
          node{
              id
              databaseId
              title
              slug
              uri
              date
              featuredImage{
                  node{
                      sourceUrl(size:THUMBNAIL)
                  }
              }
          }
        }
      }
  }`
  });
  return data;
}

const generateID = (id) => {
  const random = Math.floor(1000 + Math.random() * 9000);
  return btoa(`${random}${id}`);
}

async function searchData(keyword) {
  const { data } = await client.query({
    query: gql`{
      posts(where:{search:"${keyword}"}){
            edges{
              node{
                  id
                  databaseId
                  title
                  slug
                  uri
                  date
                  featuredImage{
                      node{
                          sourceUrl(size:THUMBNAIL)
                      }
                  }
              }
            }
          }
      }`
  });
  return data;
}


export default function Posts({posts, baseUrl}){

  const Copy = (p,e) =>{
    navigator.clipboard.writeText(p).then(()=>{
      e.target.innerHTML = "Copied";
      setTimeout(()=>{
        e.target.innerHTML = "Copy";
      },1000);
    })
  }

  const lists = (posts) => posts.length && posts.map((post,i) => (
    <tr key={i}>
        <td className="TableTitle"><Link href={post.path}>{post?.title}</Link></td>
        <td><img width={70} height={70} src={post?.image} /></td>
        <td><button className="button is-success is-light" onClick={(e)=>Copy(baseUrl+'/post?cts='+generateID(post?.databaseId), e)}>Copy</button></td>
        <td><button className="button is-success is-light" onClick={(e)=>Copy(baseUrl+'/post'+post?.url, e)}>Copy</button></td>
        <td><button className="button is-success is-light" onClick={(e)=>Copy(baseUrl+'/client'+post?.url, e)}>Copy</button></td>
        <td><a href={`https://www.facebook.com/sharer/sharer.php?u=${post?.url}`} target="_blank">Share on FB</a></td>
    </tr>
))

const [list, setList] = useState(lists(posts));

const LoadMore = (e)=>{
  const page = parseInt(e.target.getAttribute('data-page'))+1;
  queryData(100, (page-1)*100).then((data)=>{
    const posts = data.posts.edges.map(({node}) => ({
      title: node.title,
      slug: node.slug,
      databaseId: node.databaseId,
      image: node.featuredImage?.node?.sourceUrl,
      date: node.date,
      path: `/post${node.uri}`,
      url: `${node.uri}`,
    }));
    if(posts.length){
      setList([...list, lists(posts)]);
    e.target.setAttribute('data-page', parseInt(page));
    }else{
      e.target.innerHTML = "No more posts";
      e.setAttribute('disabled', true);
    }
  }
)
}

const Search = (e)=>{
  e.target.classList.add("is-loading");
  searchData(document.getElementById('searchinput').value).then((data)=>{
    const posts = data.posts.edges.map(({node}) => ({
      title: node.title,
      slug: node.slug,
      databaseId: node.databaseId,
      image: node.featuredImage?.node?.sourceUrl,
      date: node.date,
      path: `/post${node.uri}`,
      url: `${node.uri}`,
    }));
    if(posts.length){
      setList(lists(posts));
    }else{
      alert("No posts found");
    }
  }).then(()=>e.target.classList.remove("is-loading"))
}


    return (
        <>
        <Head>
            <title>All Posts</title>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <section className="section">
            <div className="container">
              <h1 className="title">
                Posts
              </h1>
              <div className="columns">
                <input type="text" id="searchinput" className="input column is-four-fifths" placeholder="Search" />
                <button className="button is-primary column" onClick={Search}>Search</button>
              </div>
              <ExButton />
              <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Featured Image</th>
                            <th>Copy ShortedUrl</th>
                            <th>Copy Serverurl</th>
                            <th>Copy Clienturl</th>
                            <th>Share on FB</th>
                        </tr>
                    </thead>
                    <tbody>
                        {list}
                    </tbody>
                </table>
                <div className="has-text-centered mb-5 p-5">
                  <button data-page={1} onClick={LoadMore} className="button is-primary">Load More</button>
                </div>
              </div>
            </div>
        </section>
        </>
    )
}

export async function getServerSideProps(context){
  const protocol = context.req.headers['x-forwarded-proto'] || 'http'
  const baseUrl = context.req ? `${protocol}://${context.req.headers.host}` : ''

    const data = await queryData(100, 0);

    return {
      props: {
        posts: data.posts.edges.map(({ node }) => {
          return {
            title: node.title,
            slug: node.slug,
            databaseId: node.databaseId,
            image: node.featuredImage?.node?.sourceUrl,
            date: node.date,
            path: `/post${node.uri}`,
            url: `${node.uri}`,
          }
        }),
        baseUrl: baseUrl
      }
    }
  }

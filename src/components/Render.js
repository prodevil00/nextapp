import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export function Header({post}){
    return (
      <Head>
      <title>{ post?.title }</title>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post?.seo?.title} />
        <meta property="og:description" content={post?.seo?.opengraphDescription || ""} />
        <meta property="og:url" content={post?.seo?.canonical} />
        <meta property="og:image" content={post?.seo?.opengraphImage?.mediaItemUrl || ""} />
        <meta property="og:site_name" content="" />
        <meta property="article:section" content="Animal" />
        <meta property="og:image:alt" content={post?.seo?.title} />

        {/* <meta property="og:site_name" content={post?.seo?.opengraphSiteName} />
        <link rel="canonical" href={post?.seo?.canonical} />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={post?.seo?.opengraphDescription || ""} />
        <meta property="article:published_time" content={post?.seo?.opengraphPublishedTime} />
        <meta property="og:image:width" content="960" />
        <meta property="og:image:height" content="536" />
        <meta property="og:image:type" content="image/jpeg" />
        <meta name="author" content="admin" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:label1" content="Written by"/>
        <meta name="twitter:data1" content={post?.seo?.opengraphAuthor || ""} />
        <meta name="twitter:label2" content="Est. reading time"/>
        <meta name="twitter:data2" content={post?.seo?.readingTime || ""} /> */}
    </Head>
    )
}

export function Render({post}){
    return (
      <div className={`${styles.container} container`}>
        <main className={`${styles.main} card mt-5`}>
        <nav className="navbar is-dark m-4 p-2" style={{width:"100%", borderRadius:"10px"}} role="navigation" aria-label="main navigation">
          <div className="navbar-menu">
            <div className="navbar-start">
              <a href="/" className="navbar-item">
                Home
              </a>
              <a href='#news' className="navbar-item">
                News
              </a>
              <a href="#contact" className="navbar-item">
                Contact
              </a>
            </div>
          </div>
  
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a href='#about' className="button is-primary">
                  <strong>About</strong>
                </a>
              </div>
            </div>
          </div>
  
        </nav>
          <h1 className={styles.title}>
            { post?.title }
          </h1>
  
          {/* featured img comment this out since your wp content already has featured img */}
          {/* <img src={post?.featuredImage.node.mediaItemUrl} alt={post?.featuredImage.node.altText} /> */}
  
          {/* <div className={styles.grid}>
            <div className={`${styles.content} content`} dangerouslySetInnerHTML={{
              __html: post?.content
            }} />
          </div> */}
  
          <p className={styles.backToHome}>
            <Link href="/">
              <a>
                &lt; Back to home
              </a>
            </Link>
          </p>
        </main>
      </div>
    )
  }
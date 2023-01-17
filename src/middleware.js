import { NextResponse, NextRequest } from 'next/server'
import Config from '../config';

export async function middleware(req, ev) {
    const url = req.nextUrl.clone()
    const referer = req.headers.get('referer') || "";

    if(!url.pathname.startsWith('/post')){
        return NextResponse.next()
    }

    const cts = req.nextUrl.searchParams.get('cts')

    if(cts){
        var b = new Buffer(cts, 'base64')
        var s = b.toString();
        const id = s.substring(4);
        const response = await fetch(Config.REDIRECTED_URL+"/wp-json/wp/v2/posts/"+id)
        const data = await response.json()
        if(data.link){
            if (req.nextUrl.searchParams.get('fbclid') || referer.includes('facebook.com')) {
                return NextResponse.redirect(data.link)
            }else{   
                url.pathname = '/post/2023/02/14/'+data.slug
                url.search = ''
                return NextResponse.redirect(url)
            }
        }else{
            return NextResponse.rewrite('/404')
        }
    }

    if (req.nextUrl.searchParams.get('fbclid') || referer.includes('facebook.com')) {
        return NextResponse.redirect(Config.REDIRECTED_URL+'/'+url.pathname)
    } else{
        return NextResponse.rewrite(url)
    }
    
}

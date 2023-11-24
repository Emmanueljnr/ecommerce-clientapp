import React from 'react';
import Link from 'next/link';
import {urlFor} from '../lib/client';
import Image from 'next/image'


function HeroBanner({heroBanner}) {
  return (
    <div className='hero-banner-container'>
        <div>
            <p className='beats-solo'> {heroBanner.smallText} </p> {/* SMALL TEXT  */}
            <h3>{heroBanner.midText}</h3> {/* MID TEXT  */}
            <h1>{heroBanner.largeText1}</h1>
            <Image 
                // src={urlFor(heroBanner.image)} 
                src={urlFor(heroBanner.image).url()} 
                alt="Hero-Banner-Image"  
                className='hero-banner-image'
                width={500} 
                height={300}
                priority //this tells next.js to prioritize loading this image (since its on the home page )
            />

            <div>
                <Link href={`/product/${heroBanner.product}`}>
                    <button type="button">{heroBanner.buttonText}</button> {/* BUTTON TEXT  */}
                </Link>
                <div className='desc'>
                    <h5>Description</h5> {/*   */}
                    <p>{heroBanner.desc}</p> {/* DESCRIPTION  */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroBanner
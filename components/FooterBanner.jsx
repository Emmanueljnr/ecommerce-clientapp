import React from 'react';
import Link from 'next/link';
import bannerData from '../data/bannerData'; // Importing my local banner data
import Image from 'next/image';


const FooterBanner = ({ footerBanner: {discount, largeText1, largeText2, saleTime, smallText, midText, desc, product, buttonText, image } }) => {
// Since `footerBanner` is an object from the `bannerData.js` file, and `product` is the slug to find the specific banner...
const localBanner = bannerData.find(b => b.product === product);
const imageUrl = localBanner.image; // Directly use the image URL from my local data
  
 
    return (
      <div className="footer-banner-container">
          <div className='banner-desc'>
              {/* Left side of the footer */}
              <div className='left'>
                  <p className=''>{discount}</p>
                  <h3 className=''>{largeText1}</h3>
                  <h3 className=''>{largeText2}</h3>
                  <p className=''>{saleTime}</p>
              </div>
              {/* Right side of the footer */}
              <div className='right'>
                  <p className=''>{smallText}</p>
                  <h3 className=''>{midText}</h3>
                  <p className=''>{desc}</p>
                  <Link href={`/product/${product}`}>
                   <button type='button'>{buttonText}</button>
                  </Link>
              </div>
                <Image
                    src={imageUrl}
                    alt="Footer-Banner-Image"
                    className='footer-banner-image'
                    width={500}
                    height={300}
                    priority // this tells Next.js to prioritize loading this image (since it's on the home page)
                />
          </div>
      </div>
  )
}

export default FooterBanner
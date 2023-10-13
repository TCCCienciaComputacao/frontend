'use client'

import '../styles/footer.css'
import React, { Component } from 'react';
import Link from 'next/link';

const current_year = new Date().getFullYear();
function Footer() {
    return (
        
        <div id="section_footer">
        <div className='text-center py-4'>
          <Link href="https://1manstartup.com/privacy-policy" target="_blank" className='btn btn-link'>
            Privacy
          </Link>
          <span> | </span>
          <Link href="https://1manstartup.com/terms-and-conditions" target="_blank" className='btn btn-link'>
            Terms
          </Link>
          <span> | </span>
          <Link href="mailto:Roads<dave@1manstartup.com>" className='btn btn-link'>
            Contact
          </Link>
          <p>Copyright  {current_year}, 1ManStartup LLC. All Rights Reserved.</p>
        </div>
      </div>
    );
    
}

export default Footer
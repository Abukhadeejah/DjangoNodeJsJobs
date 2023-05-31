import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-1">
      <p className="text-center mt-1">
        AppopoleisJobs - 2023-2024, All Rights Reserved
        <Link
          className="ml-4"
          rel="noreferrer"
          target="_blank"
          href="https://storyset.com/people"
        >
          People illustrations by Storyset
        </Link>
      </p>
    </footer>
  )
}

export default Footer;
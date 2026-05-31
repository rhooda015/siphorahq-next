import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 text-center">
      <p>&copy; {new Date().getFullYear()} Siphorahq. All rights reserved.</p>
    </footer>
  );
}

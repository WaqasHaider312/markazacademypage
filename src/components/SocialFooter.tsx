
import React from 'react';
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Youtube, Mail } from "lucide-react";

const SocialFooter: React.FC = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      url: 'https://www.facebook.com/markaz-app',
      color: 'hover:bg-blue-600 hover:text-white'
    },
    {
      name: 'Instagram', 
      icon: Instagram,
      url: 'https://www.instagram.com/markaz-app',
      color: 'hover:bg-pink-600 hover:text-white'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/company/markaz-app',
      color: 'hover:bg-blue-700 hover:text-white'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      url: 'https://www.youtube.com/@markaz-app',
      color: 'hover:bg-red-600 hover:text-white'
    }
  ];

  return (
    <footer className="bg-white border-t-2 border-blue-600 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Logo and Company Info */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Markaz Academy</h3>
                <p className="text-gray-600">Empowering Financial Education</p>
              </div>
            </div>
          </div>

          {/* Social Media Links */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-6">Connect With Us</h4>
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className={`w-12 h-12 border-2 border-gray-300 transition-all duration-300 ${social.color}`}
                    onClick={() => window.open(social.url, '_blank')}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="sr-only">{social.name}</span>
                  </Button>
                );
              })}
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@markaz.com" className="hover:text-blue-600 transition-colors">
                contact@markaz.com
              </a>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-200 pt-8">
            <p className="text-gray-600 text-sm">
              © 2024 Markaz Academy. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SocialFooter;

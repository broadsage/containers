import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Users, MessageCircle, Github, Heart, Code, BookOpen } from 'lucide-react';

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Join the SecureHub Community
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Connect with developers worldwide who are building secure software together.
            Everyone is welcome to join, learn, and contribute.
          </p>
        </div>

        {/* Community Channels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Github className="w-5 h-5" style={{ color: '#fd366e' }} />
                <span>GitHub</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Contribute code, report issues, and collaborate on SecureHub development.
              </p>
              <Button style={{ backgroundColor: '#fd366e' }} className="w-full text-white text-sm">
                Visit GitHub
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" style={{ color: '#fd366e' }} />
                <span>Discord</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Chat with the community, ask questions, and get real-time help from maintainers.
              </p>
              <Button style={{ backgroundColor: '#fd366e' }} className="w-full text-white text-sm">
                Join Discord
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" style={{ color: '#fd366e' }} />
                <span>Forum</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Discuss ideas, share experiences, and help others in our community forum.
              </p>
              <Button style={{ backgroundColor: '#fd366e' }} className="w-full text-white text-sm">
                Open Forum
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Ways to Participate */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Ways to Participate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <Code className="w-5 h-5 text-[#fd366e] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Contribute Code</h4>
                  <p className="text-sm text-gray-600">
                    Help improve SecureHub by contributing code, fixing bugs, or adding new features.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <BookOpen className="w-5 h-5 text-[#fd366e] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Improve Documentation</h4>
                  <p className="text-sm text-gray-600">
                    Help others by writing guides, tutorials, and improving existing documentation.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 text-[#fd366e] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Answer Questions</h4>
                  <p className="text-sm text-gray-600">
                    Share your knowledge by helping others on Discord, GitHub, or the forum.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 text-[#fd366e] mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Spread the Word</h4>
                  <p className="text-sm text-gray-600">
                    Share SecureHub with your network, write blog posts, or give talks about it.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Code of Conduct */}
        <Card>
          <CardHeader>
            <CardTitle>Code of Conduct</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-700">
              <p>
                SecureHub is committed to providing a welcoming and inclusive environment for everyone.
                We expect all community members to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Be respectful and considerate in all interactions</li>
                <li>Welcome newcomers and help them get started</li>
                <li>Accept constructive criticism gracefully</li>
                <li>Focus on what is best for the community</li>
                <li>Show empathy towards other community members</li>
              </ul>
              <p>
                Unacceptable behavior includes harassment, discrimination, trolling, or any behavior
                that makes others feel unwelcome or unsafe. Violations may result in removal from the community.
              </p>
              <Button variant="outline" className="mt-4" size="sm">
                Read Full Code of Conduct
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default CommunityPage;
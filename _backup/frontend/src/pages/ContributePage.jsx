import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { GitBranch, GitPullRequest, Code, FileText, Bug, Lightbulb, CheckCircle } from 'lucide-react';

const ContributePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-8 py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contribute to SecureHub
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Help us build the future of secure container images. Every contribution matters,
            whether it's code, documentation, or feedback.
          </p>
        </div>

        {/* Quick Start */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Quick Start Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#fd366e] text-white flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Fork the Repository</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Fork the SecureHub repository on GitHub to your account.
                  </p>
                  <code className="text-xs bg-gray-900 text-white px-3 py-1 rounded">
                    git clone https://github.com/yourusername/securehub.git
                  </code>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#fd366e] text-white flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Create a Branch</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Create a new branch for your changes.
                  </p>
                  <code className="text-xs bg-gray-900 text-white px-3 py-1 rounded">
                    git checkout -b feature/your-feature-name
                  </code>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#fd366e] text-white flex items-center justify-center text-sm font-semibold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Make Your Changes</h4>
                  <p className="text-sm text-gray-600">
                    Write code, update documentation, or fix bugs. Make sure to follow our coding standards.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#fd366e] text-white flex items-center justify-center text-sm font-semibold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">Submit a Pull Request</h4>
                  <p className="text-sm text-gray-600">
                    Push your changes and open a pull request with a clear description of your changes.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contribution Types */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="w-5 h-5" style={{ color: '#fd366e' }} />
                <span className="text-base">Code Contributions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Add new features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Fix bugs and issues</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Improve performance</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Refactor code</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" style={{ color: '#fd366e' }} />
                <span className="text-base">Documentation</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Write tutorials</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Improve existing docs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Add code examples</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Fix typos</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bug className="w-5 h-5" style={{ color: '#fd366e' }} />
                <span className="text-base">Bug Reports</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Report bugs</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Suggest improvements</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Test features</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Provide feedback</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Guidelines */}
        <Card className="mb-12">
          <CardHeader>
            <CardTitle>Contribution Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Code Standards</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Follow the existing code style and conventions</li>
                  <li>Write clear, self-documenting code with comments where necessary</li>
                  <li>Include tests for new features and bug fixes</li>
                  <li>Ensure all tests pass before submitting</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Pull Request Process</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Provide a clear description of the changes</li>
                  <li>Reference any related issues</li>
                  <li>Update documentation if needed</li>
                  <li>Respond to review feedback promptly</li>
                  <li>Keep PRs focused on a single issue or feature</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Commit Messages</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  <li>Use clear and descriptive commit messages</li>
                  <li>Start with a verb in present tense (Add, Fix, Update, etc.)</li>
                  <li>Keep the first line under 50 characters</li>
                  <li>Add detailed description if necessary</li>
                </ul>
                <div className="mt-3 bg-gray-900 text-white p-3 rounded text-xs font-mono">
                  git commit -m "Add vulnerability scanning to image detail page"
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recognition */}
        <Card>
          <CardHeader>
            <CardTitle>Contributor Recognition</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700 mb-4">
              We value and recognize all contributions to SecureHub. Contributors are:
            </p>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-[#fd366e] mr-2 mt-0.5 flex-shrink-0" />
                <span>Listed in our Contributors page</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-[#fd366e] mr-2 mt-0.5 flex-shrink-0" />
                <span>Mentioned in release notes for significant contributions</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-[#fd366e] mr-2 mt-0.5 flex-shrink-0" />
                <span>Eligible for contributor badges and swag</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-[#fd366e] mr-2 mt-0.5 flex-shrink-0" />
                <span>Invited to contributor events and meetings</span>
              </li>
            </ul>
            <div className="mt-6 pt-6 border-t">
              <Button style={{ backgroundColor: '#fd366e' }} className="text-white">
                Start Contributing Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default ContributePage;

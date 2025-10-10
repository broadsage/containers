import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Card, CardContent } from '../components/ui/card';
import { Book, FileText, Shield, AlertTriangle, ChevronRight } from 'lucide-react';
import 'highlight.js/styles/github-dark.css';

const DocumentationPage = () => {
  const { slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const currentDoc = slug || 'getting-started';

  const docs = [
    { id: 'getting-started', title: 'Getting Started', icon: Book },
    { id: 'sbom', title: 'SBOM', icon: FileText },
    { id: 'provenance', title: 'Provenance', icon: Shield },
    { id: 'vulnerabilities', title: 'Vulnerabilities', icon: AlertTriangle },
  ];

  useEffect(() => {
    const loadMarkdown = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/docs/${currentDoc}.md`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        setContent('# Documentation not found\n\nThe requested documentation could not be loaded.');
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
  }, [currentDoc]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <Card className="sticky top-20">
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm">Documentation</h3>
                <nav className="space-y-1">
                  {docs.map((doc) => {
                    const Icon = doc.icon;
                    const isActive = currentDoc === doc.id;
                    return (
                      <Link
                        key={doc.id}
                        to={`/docs/${doc.id}`}
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                          isActive
                            ? 'bg-[#fd366e] text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span>{doc.title}</span>
                        {isActive && <ChevronRight className="w-3 h-3 ml-auto" />}
                      </Link>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <Card>
              <CardContent className="p-8">
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#fd366e] mx-auto"></div>
                    <p className="text-gray-600 mt-4">Loading documentation...</p>
                  </div>
                ) : (
                  <article className="prose prose-sm max-w-none">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeRaw, rehypeHighlight]}
                      components={{
                        h1: ({ node, ...props }) => <h1 className="text-3xl font-bold text-gray-900 mb-4" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3" {...props} />,
                        h4: ({ node, ...props }) => <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2" {...props} />,
                        p: ({ node, ...props }) => <p className="text-gray-700 leading-relaxed mb-4" {...props} />,
                        a: ({ node, ...props }) => <a className="text-[#fd366e] hover:underline" {...props} />,
                        code: ({ node, inline, ...props }) =>
                          inline ? (
                            <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props} />
                          ) : (
                            <code className="block bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono" {...props} />
                          ),
                        pre: ({ node, ...props }) => <pre className="bg-gray-900 rounded-lg overflow-hidden my-4" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 mb-4 text-gray-700" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-700" {...props} />,
                        li: ({ node, ...props }) => <li className="text-gray-700" {...props} />,
                        blockquote: ({ node, ...props }) => (
                          <blockquote className="border-l-4 border-[#fd366e] pl-4 italic text-gray-600 my-4" {...props} />
                        ),
                        table: ({ node, ...props }) => (
                          <div className="overflow-x-auto my-4">
                            <table className="min-w-full border border-gray-300" {...props} />
                          </div>
                        ),
                        th: ({ node, ...props }) => <th className="border border-gray-300 px-4 py-2 bg-gray-100 font-semibold text-left" {...props} />,
                        td: ({ node, ...props }) => <td className="border border-gray-300 px-4 py-2" {...props} />,
                      }}
                    >
                      {content}
                    </ReactMarkdown>
                  </article>
                )}
              </CardContent>
            </Card>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DocumentationPage;
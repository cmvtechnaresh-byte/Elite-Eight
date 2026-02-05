import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const articles = [
  {
    id: 1,
    title: "The Future of Corporate Training in 2024",
    excerpt: "Discover the emerging trends shaping corporate learning and development strategies for modern organizations.",
    category: "Training",
    date: "Jan 15, 2024",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "PoSH Compliance: A Complete Guide for Organizations",
    excerpt: "Everything you need to know about implementing effective Prevention of Sexual Harassment policies.",
    category: "Compliance",
    date: "Jan 10, 2024",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Building High-Performance Sales Teams",
    excerpt: "Key strategies and techniques for developing sales teams that consistently exceed targets.",
    category: "Sales",
    date: "Jan 5, 2024",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "The Art of Effective Recruitment",
    excerpt: "Best practices for attracting and retaining top talent in a competitive market.",
    category: "Recruitment",
    date: "Dec 28, 2023",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Organizational Culture: The Hidden Driver of Success",
    excerpt: "How to build and maintain a positive organizational culture that drives performance.",
    category: "Development",
    date: "Dec 20, 2023",
    readTime: "6 min read",
  },
  {
    id: 6,
    title: "Leadership Development in the Modern Workplace",
    excerpt: "Essential skills and qualities for effective leadership in today's business environment.",
    category: "Training",
    date: "Dec 15, 2023",
    readTime: "5 min read",
  },
];

const Blog = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources & Insights</h1>
            <p className="text-lg text-muted-foreground">
              Expert articles, guides, and insights to help your organization thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="group hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4 line-clamp-3">
                    {article.excerpt}
                  </CardDescription>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {article.readTime}
                    </span>
                  </div>
                  <div className="mt-4 text-primary font-medium inline-flex items-center group-hover:underline">
                    Read more <ArrowRight className="ml-1 h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;

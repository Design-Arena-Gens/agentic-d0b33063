import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    // Generate landing page HTML without external API
    const html = generateLandingPageHtml(prompt);

    return NextResponse.json({ html });
  } catch (error: any) {
    console.error('Error generating landing page:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate landing page' },
      { status: 500 }
    );
  }
}

function generateLandingPageHtml(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();

  // Extract key themes
  const isDark = lowerPrompt.includes('dark') || lowerPrompt.includes('black');
  const isMinimal = lowerPrompt.includes('minimal') || lowerPrompt.includes('clean');
  const isSaas = lowerPrompt.includes('saas') || lowerPrompt.includes('software');
  const isProduct = lowerPrompt.includes('product') || lowerPrompt.includes('app');
  const isAgency = lowerPrompt.includes('agency') || lowerPrompt.includes('service');

  // Color scheme detection
  let primaryColor = '#4F46E5'; // indigo
  let secondaryColor = '#3B82F6'; // blue
  let bgColor = '#FFFFFF';
  let textColor = '#1F2937';

  if (isDark) {
    primaryColor = '#6366F1';
    secondaryColor = '#8B5CF6';
    bgColor = '#111827';
    textColor = '#F9FAFB';
  } else if (lowerPrompt.includes('blue')) {
    primaryColor = '#3B82F6';
    secondaryColor = '#2563EB';
  } else if (lowerPrompt.includes('green')) {
    primaryColor = '#10B981';
    secondaryColor = '#059669';
  } else if (lowerPrompt.includes('purple')) {
    primaryColor = '#8B5CF6';
    secondaryColor = '#7C3AED';
  } else if (lowerPrompt.includes('red')) {
    primaryColor = '#EF4444';
    secondaryColor = '#DC2626';
  }

  // Extract product name if mentioned
  const words = prompt.split(' ');
  const productName = words.find(w => w.length > 3 && w[0] === w[0].toUpperCase()) || 'YourBrand';

  const hasFeatures = lowerPrompt.includes('feature') || isSaas || isProduct;
  const hasPricing = lowerPrompt.includes('pricing') || lowerPrompt.includes('price');
  const hasTestimonials = lowerPrompt.includes('testimonial') || lowerPrompt.includes('review');
  const hasCTA = true; // Always include CTA

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${productName} - Landing Page</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: ${textColor};
            background-color: ${bgColor};
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }

        /* Navigation */
        nav {
            padding: 20px 0;
            ${isDark ? 'background: rgba(17, 24, 39, 0.9);' : 'background: rgba(255, 255, 255, 0.95);'}
            backdrop-filter: blur(10px);
            position: sticky;
            top: 0;
            z-index: 1000;
            border-bottom: 1px solid ${isDark ? '#374151' : '#E5E7EB'};
        }

        nav .container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: ${primaryColor};
        }

        nav ul {
            display: flex;
            list-style: none;
            gap: 30px;
        }

        nav a {
            text-decoration: none;
            color: ${textColor};
            font-weight: 500;
            transition: color 0.3s;
        }

        nav a:hover {
            color: ${primaryColor};
        }

        /* Hero Section */
        .hero {
            padding: 100px 0;
            text-align: center;
            background: linear-gradient(135deg, ${primaryColor}15 0%, ${secondaryColor}15 100%);
        }

        .hero h1 {
            font-size: ${isMinimal ? '48px' : '56px'};
            font-weight: 800;
            margin-bottom: 20px;
            background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .hero p {
            font-size: 20px;
            margin-bottom: 40px;
            color: ${isDark ? '#D1D5DB' : '#6B7280'};
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }

        .cta-button {
            display: inline-block;
            padding: 16px 40px;
            background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            color: white;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 18px;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        }

        .secondary-button {
            display: inline-block;
            padding: 16px 40px;
            background: transparent;
            color: ${primaryColor};
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 18px;
            border: 2px solid ${primaryColor};
            margin-left: 15px;
            transition: all 0.2s;
        }

        .secondary-button:hover {
            background: ${primaryColor};
            color: white;
        }

        /* Features Section */
        .features {
            padding: 80px 0;
        }

        .section-title {
            text-align: center;
            font-size: 42px;
            font-weight: 700;
            margin-bottom: 60px;
        }

        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
        }

        .feature-card {
            padding: 30px;
            border-radius: 12px;
            background: ${isDark ? '#1F2937' : '#FFFFFF'};
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transition: transform 0.2s;
        }

        .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2);
        }

        .feature-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            margin-bottom: 20px;
        }

        .feature-card h3 {
            font-size: 24px;
            margin-bottom: 15px;
        }

        .feature-card p {
            color: ${isDark ? '#D1D5DB' : '#6B7280'};
            line-height: 1.7;
        }

        /* Pricing Section */
        .pricing {
            padding: 80px 0;
            background: ${isDark ? '#1F2937' : '#F9FAFB'};
        }

        .pricing-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
            max-width: 1000px;
            margin: 0 auto;
        }

        .pricing-card {
            padding: 40px 30px;
            border-radius: 12px;
            background: ${isDark ? '#111827' : '#FFFFFF'};
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .pricing-card.featured {
            border: 3px solid ${primaryColor};
            transform: scale(1.05);
        }

        .pricing-card h3 {
            font-size: 24px;
            margin-bottom: 15px;
        }

        .price {
            font-size: 48px;
            font-weight: 700;
            color: ${primaryColor};
            margin: 20px 0;
        }

        .price span {
            font-size: 20px;
            color: ${isDark ? '#9CA3AF' : '#6B7280'};
        }

        .pricing-features {
            list-style: none;
            margin: 30px 0;
            text-align: left;
        }

        .pricing-features li {
            padding: 10px 0;
            color: ${isDark ? '#D1D5DB' : '#6B7280'};
        }

        .pricing-features li:before {
            content: "✓ ";
            color: ${primaryColor};
            font-weight: bold;
            margin-right: 10px;
        }

        /* Testimonials Section */
        .testimonials {
            padding: 80px 0;
        }

        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }

        .testimonial-card {
            padding: 30px;
            border-radius: 12px;
            background: ${isDark ? '#1F2937' : '#FFFFFF'};
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .testimonial-text {
            font-style: italic;
            margin-bottom: 20px;
            color: ${isDark ? '#D1D5DB' : '#6B7280'};
        }

        .testimonial-author {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .author-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
        }

        .author-name {
            font-weight: 600;
        }

        .author-title {
            font-size: 14px;
            color: ${isDark ? '#9CA3AF' : '#6B7280'};
        }

        /* CTA Section */
        .cta-section {
            padding: 100px 0;
            text-align: center;
            background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%);
            color: white;
        }

        .cta-section h2 {
            font-size: 42px;
            margin-bottom: 20px;
        }

        .cta-section p {
            font-size: 20px;
            margin-bottom: 40px;
            opacity: 0.9;
        }

        .cta-section .cta-button {
            background: white;
            color: ${primaryColor};
        }

        /* Footer */
        footer {
            padding: 40px 0;
            text-align: center;
            background: ${isDark ? '#1F2937' : '#F9FAFB'};
            color: ${isDark ? '#9CA3AF' : '#6B7280'};
        }

        @media (max-width: 768px) {
            .hero h1 {
                font-size: 36px;
            }

            .secondary-button {
                display: block;
                margin: 15px auto 0;
            }

            nav ul {
                gap: 15px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <nav>
        <div class="container">
            <div class="logo">${productName}</div>
            <ul>
                <li><a href="#features">Features</a></li>
                ${hasPricing ? '<li><a href="#pricing">Pricing</a></li>' : ''}
                ${hasTestimonials ? '<li><a href="#testimonials">Testimonials</a></li>' : ''}
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>

    <section class="hero">
        <div class="container">
            <h1>${isSaas ? 'Transform Your Workflow' : isProduct ? 'The Future of Innovation' : isAgency ? 'Elevate Your Brand' : 'Welcome to ' + productName}</h1>
            <p>${isSaas ? 'Streamline your business operations with our powerful SaaS platform. Increase productivity and collaboration across your entire team.' : isProduct ? 'Experience the next generation of technology designed to simplify your life and boost your productivity.' : isAgency ? 'We create exceptional digital experiences that drive results and grow your business.' : 'Discover amazing solutions tailored to your needs. Join thousands of satisfied customers today.'}</p>
            <a href="#" class="cta-button">Get Started Free</a>
            <a href="#" class="secondary-button">Learn More</a>
        </div>
    </section>

    ${hasFeatures ? `<section class="features" id="features">
        <div class="container">
            <h2 class="section-title">Powerful Features</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">⚡</div>
                    <h3>Lightning Fast</h3>
                    <p>Experience blazing-fast performance that keeps your workflow smooth and efficient.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔒</div>
                    <h3>Secure & Private</h3>
                    <p>Your data is protected with enterprise-grade security and encryption.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📊</div>
                    <h3>Advanced Analytics</h3>
                    <p>Get deep insights with powerful analytics and reporting tools.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🎨</div>
                    <h3>Customizable</h3>
                    <p>Tailor every aspect to match your brand and workflow perfectly.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🤝</div>
                    <h3>Team Collaboration</h3>
                    <p>Work together seamlessly with real-time collaboration features.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🚀</div>
                    <h3>Easy Integration</h3>
                    <p>Connect with your favorite tools and services effortlessly.</p>
                </div>
            </div>
        </div>
    </section>` : ''}

    ${hasPricing ? `<section class="pricing" id="pricing">
        <div class="container">
            <h2 class="section-title">Simple, Transparent Pricing</h2>
            <div class="pricing-grid">
                <div class="pricing-card">
                    <h3>Starter</h3>
                    <div class="price">$29<span>/mo</span></div>
                    <ul class="pricing-features">
                        <li>Up to 10 users</li>
                        <li>Basic features</li>
                        <li>Email support</li>
                        <li>5GB storage</li>
                    </ul>
                    <a href="#" class="cta-button">Choose Plan</a>
                </div>
                <div class="pricing-card featured">
                    <h3>Professional</h3>
                    <div class="price">$79<span>/mo</span></div>
                    <ul class="pricing-features">
                        <li>Up to 50 users</li>
                        <li>All features</li>
                        <li>Priority support</li>
                        <li>50GB storage</li>
                        <li>Advanced analytics</li>
                    </ul>
                    <a href="#" class="cta-button">Choose Plan</a>
                </div>
                <div class="pricing-card">
                    <h3>Enterprise</h3>
                    <div class="price">$199<span>/mo</span></div>
                    <ul class="pricing-features">
                        <li>Unlimited users</li>
                        <li>All features</li>
                        <li>24/7 support</li>
                        <li>Unlimited storage</li>
                        <li>Custom integrations</li>
                        <li>Dedicated manager</li>
                    </ul>
                    <a href="#" class="cta-button">Choose Plan</a>
                </div>
            </div>
        </div>
    </section>` : ''}

    ${hasTestimonials ? `<section class="testimonials" id="testimonials">
        <div class="container">
            <h2 class="section-title">What Our Customers Say</h2>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <p class="testimonial-text">"This product has completely transformed how we work. The team collaboration features are outstanding!"</p>
                    <div class="testimonial-author">
                        <div class="author-avatar"></div>
                        <div>
                            <div class="author-name">Sarah Johnson</div>
                            <div class="author-title">CEO, TechCorp</div>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <p class="testimonial-text">"Outstanding support and incredible features. We've seen a 300% increase in productivity since switching."</p>
                    <div class="testimonial-author">
                        <div class="author-avatar"></div>
                        <div>
                            <div class="author-name">Michael Chen</div>
                            <div class="author-title">CTO, InnovateLabs</div>
                        </div>
                    </div>
                </div>
                <div class="testimonial-card">
                    <p class="testimonial-text">"The best investment we've made for our business. Simple, powerful, and reliable."</p>
                    <div class="testimonial-author">
                        <div class="author-avatar"></div>
                        <div>
                            <div class="author-name">Emily Rodriguez</div>
                            <div class="author-title">Founder, StartupHub</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>` : ''}

    <section class="cta-section" id="contact">
        <div class="container">
            <h2>Ready to Get Started?</h2>
            <p>Join thousands of satisfied customers and transform your business today.</p>
            <a href="#" class="cta-button">Start Your Free Trial</a>
        </div>
    </section>

    <footer>
        <div class="container">
            <p>&copy; 2024 ${productName}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
}

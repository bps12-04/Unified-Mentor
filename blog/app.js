// Blog posts data
const posts = [
    {
        id: 1,
        title: "The Future of Web Development",
        date: "March 20, 2025",
        content: `
            <p>Web development has evolved dramatically over the past decade. From simple static HTML pages to complex interactive applications, the journey has been fascinating. What does the future hold for developers?</p>
            
            <h3>AI Integration</h3>
            <p>One of the most exciting developments is the integration of artificial intelligence into web development. AI can now help generate code, design interfaces, and even debug applications. This isn't about replacing developers but enhancing their capabilities and efficiency.</p>
            
            <p>Tools that can analyze user behavior and automatically adjust interfaces for better engagement are becoming more common. Imagine a website that adapts its layout based on how individual users interact with it - that's already becoming reality.</p>
            
            <h3>WebAssembly</h3>
            <p>WebAssembly (Wasm) is revolutionizing what's possible in browsers. It allows code written in languages like C++, Rust, and others to run in the browser at near-native speed. This opens up possibilities for more complex applications, games, and tools directly in the browser.</p>
            
            <h3>No-Code and Low-Code Platforms</h3>
            <p>While professional developers will always be in demand, no-code and low-code platforms are making web development accessible to a broader audience. Business users can create functional, professional-looking websites and applications without writing a single line of code.</p>
            
            <p>This democratization of development is leading to more innovation and unique solutions as people with domain knowledge but limited coding skills can bring their ideas to life.</p>
            
            <h3>Progressive Web Apps</h3>
            <p>Progressive Web Apps (PWAs) continue to close the gap between web and native applications. With capabilities like offline functionality, push notifications, and device hardware access, PWAs offer a compelling alternative to native apps without the hassle of app store distribution.</p>
            
            <h3>Conclusion</h3>
            <p>The future of web development is bright and full of exciting possibilities. As technology continues to evolve, developers who stay adaptable and embrace new tools and methodologies will thrive. The key is to focus on solving real problems for users, regardless of which technologies you use to get there.</p>
        `
    },
    {
        id: 2,
        title: "Essential CSS Tips for Beginners",
        date: "March 15, 2025",
        content: `
            <p>CSS can be intimidating for beginners, but with a few essential tips and tricks, you can master the basics quickly. Learn how to structure your stylesheets efficiently and avoid common pitfalls.</p>
            
            <h3>Start with a CSS Reset</h3>
            <p>Browsers have default styles for HTML elements that can vary from one browser to another. Starting with a CSS reset or normalize.css helps ensure consistency across different browsers by removing these default styles.</p>
            
            <p>This gives you a clean slate to work with and helps prevent unexpected styling issues later in your project.</p>
            
            <h3>Use a Logical CSS Organization</h3>
            <p>Organize your CSS files in a way that makes sense. One common approach is to structure them as follows:</p>
            <ul>
                <li>Variables/Custom Properties</li>
                <li>Reset/Normalize</li>
                <li>Base/Global styles</li>
                <li>Layout components</li>
                <li>UI components</li>
                <li>Utilities</li>
            </ul>
            
            <h3>Understand the Box Model</h3>
            <p>The CSS box model is fundamental to layout. Every element on a page is a rectangular box with content, padding, border, and margin areas.</p>
            
            <p>Use <code>box-sizing: border-box;</code> to include padding and border in an element's total width and height, making layout calculations much more intuitive.</p>
            
            <h3>Learn Flexbox and Grid</h3>
            <p>While floating elements was once the primary method for layout, modern CSS offers much better solutions: Flexbox and Grid.</p>
            
            <p>Flexbox is perfect for one-dimensional layouts (rows or columns) while Grid excels at two-dimensional layouts (rows and columns together). Mastering these will dramatically improve your layout capabilities.</p>
            
            <h3>Use Meaningful Class Names</h3>
            <p>Instead of naming classes based on how something looks (e.g., "red-text"), name them based on their purpose or content (e.g., "alert-message"). This makes your CSS more maintainable and adaptable to design changes.</p>
            
            <h3>Embrace the Cascade Wisely</h3>
            <p>The "C" in CSS stands for "Cascading," which means styles can inherit and override each other based on specificity and order. Understanding this concept is crucial.</p>
            
            <p>Avoid overusing !important as it breaks the natural cascade and can lead to maintenance nightmares. Instead, write more specific selectors when needed.</p>
            
            <h3>Conclusion</h3>
            <p>CSS has evolved significantly with features like custom properties, flexbox, and grid. By following these tips, you'll build a solid foundation that will serve you well as you continue your web development journey.</p>
        `
    },
    {
        id: 3,
        title: "JavaScript Frameworks: Which One Should You Choose?",
        date: "March 10, 2025",
        content: `
            <p>With so many JavaScript frameworks available today, choosing the right one for your project can be overwhelming. React, Vue, Angular, Svelte - each has its strengths and weaknesses. Let's explore them.</p>
            
            <h3>React</h3>
            <p>Developed by Facebook, React has become the most popular JavaScript library for building user interfaces. It's not a full framework but focuses on the view layer.</p>
            
            <p><strong>Pros:</strong></p>
            <ul>
                <li>Virtual DOM for efficient updates</li>
                <li>Component-based architecture</li>
                <li>Huge ecosystem and community support</li>
                <li>Great for large-scale applications</li>
            </ul>
            
            <p><strong>Cons:</strong></p>
            <ul>
                <li>Steep learning curve for beginners</li>
                <li>Requires additional libraries for routing, state management, etc.</li>
                <li>JSX syntax can be off-putting initially</li>
            </ul>
            
            <h3>Vue</h3>
            <p>Vue aims to be approachable, versatile, and performant. It's designed to be incrementally adoptable, allowing you to use as much or as little of it as you need.</p>
            
            <p><strong>Pros:</strong></p>
            <ul>
                <li>Gentle learning curve</li>
                <li>Detailed documentation</li>
                <li>More built-in features than React</li>
                <li>Great for small to medium projects</li>
            </ul>
            
            <p><strong>Cons:</strong></p>
            <ul>
                <li>Smaller ecosystem compared to React</li>
                <li>Fewer large-scale enterprise adoptions</li>
            </ul>
            
            <h3>Angular</h3>
            <p>Angular is a complete framework maintained by Google. It provides everything you need out of the box, including routing, forms, HTTP client, and more.</p>
            
            <p><strong>Pros:</strong></p>
            <ul>
                <li>Comprehensive solution</li>
                <li>Strong typing with TypeScript</li>
                <li>Dependency injection system</li>
                <li>Great for large enterprise applications</li>
            </ul>
            
            <p><strong>Cons:</strong></p>
            <ul>
                <li>Steepest learning curve</li>
                <li>More verbose than other frameworks</li>
                <li>Can be overkill for smaller projects</li>
            </ul>
            
            <h3>Svelte</h3>
            <p>Svelte takes a different approach by shifting work from runtime to compile time. Instead of using a virtual DOM, Svelte compiles your code to efficient JavaScript that updates the DOM directly.</p>
            
            <p><strong>Pros:</strong></p>
            <ul>
                <li>Minimal boilerplate code</li>
                <li>Extremely fast performance</li>
                <li>Small bundle sizes</li>
                <li>Easy to learn</li>
            </ul>
            
            <p><strong>Cons:</strong></p>
            <ul>
                <li>Smallest ecosystem</li>
                <li>Fewer learning resources</li>
                <li>Less mature than other options</li>
            </ul>
            
            <h3>How to Choose?</h3>
            <p>Consider these factors when selecting a framework:</p>
            <ul>
                <li>Project size and complexity</li>
                <li>Team experience and preference</li>
                <li>Available resources and learning materials</li>
                <li>Long-term maintenance considerations</li>
                <li>Specific feature requirements</li>
            </ul>
            
            <h3>Conclusion</h3>
            <p>There's no one-size-fits-all answer. The best framework depends on your specific needs and context. For beginners, Vue might be the easiest entry point. For large enterprise applications, Angular or React might be more suitable. For performance-critical applications with smaller scope, Svelte could be ideal.</p>
            
            <p>Remember, the framework is just a tool. Focus on solid JavaScript fundamentals, and you'll be able to adapt to any framework as needed.</p>
        `
    }
];

// Modal functionality
const modal = document.getElementById('postModal');
const modalTitle = document.querySelector('.modal-title');
const modalDate = document.querySelector('.modal-date');
const modalBody = document.querySelector('.modal-body');
const closeModal = document.querySelector('.close-modal');
const readMoreLinks = document.querySelectorAll('.read-more');

// Open modal with post content
readMoreLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const postId = parseInt(this.getAttribute('data-id'));
        const post = posts.find(p => p.id === postId);

        if (post) {
            modalTitle.textContent = post.title;
            modalDate.textContent = post.date;
            modalBody.innerHTML = post.content;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
    });
});

// Close modal
closeModal.addEventListener('click', function () {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
});

// Close modal when clicking outside
window.addEventListener('click', function (e) {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});

// Handle keyboard navigation
window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
});
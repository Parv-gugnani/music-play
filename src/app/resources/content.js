import { InlineCode } from "@/once-ui/components";

const person = {
    firstName: 'Parv',
    lastName:  'Gugnani',
    get name() {
        return `${this.firstName} ${this.lastName}`;
    },
    role:      'Full Stack Developer',
    avatar:    '/images/avatar.jpg',
    location:  'Asia/India',
    languages: ['Hindi', 'English', 'JavaScript', 'TypeScript']
}

const newsletter = {
    display: true,
    title: <>Join {person.firstName}'s Tech Insights Weekly</>,
    description: <>Get exclusive deep-dives into modern web architecture, performance optimization tricks, and hands-on tutorials. Plus, early access to my upcoming projects and tech resources!</>
}

const social = [
    {
        name: 'GitHub',
        icon: 'github',
        link: 'https://github.com/Parv-gugnani',
    },
    {
        name: 'LinkedIn',
        icon: 'linkedin',
        link: 'https://www.linkedin.com/in/parv-gugnani/',
    },
    {
        name: 'X',
        icon: 'x',
        link: 'https://x.com/parv_developer',
    },
    {
        name: 'Email',
        icon: 'email',
        link: 'mailto:parv18788@gmail.com',
    },
]

const home = {
    label: 'Home',
    title: `${person.name}`,
    description: `Crafting high-performance web applications and digital experiences`,
    headline: <>Full Stack Developer</>,
    subline: <>Hey! I'm Parv, a Full Stack Developer who transforms ideas into scalable solutions. Specializing in <InlineCode>Next.js</InlineCode>, modern JavaScript, and cloud architecture.<br/>I build lightning-fast web apps that users love and businesses rely on. Let's create something amazing together! 💻✨</>
}

const about = {
    label: 'About',
    title: 'About me',
    description: `Meet ${person.name}, a solution-focused ${person.role} crafting digital experiences from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: true
    },
    avatar: {
        display: true
    },
    calendar: {
        display: true,
        link: 'https://cal.com/parv7/'
    },
    intro: {
        display: true,
        title: 'Introduction',
        description: <>As a full-stack developer based in India, I specialize in building performant, scalable web applications that solve real business problems. With deep expertise in React and Node.js ecosystems, I focus on creating solutions that not only work flawlessly but also drive business growth. Whether it's optimizing load times, implementing complex features, or architecting robust systems, I bring a strategic approach to every project.</>
    },
    work: {
        display: true,
        title: 'Work Experience',
        experiences: [
            {
                company: 'MillionNeuron',
                timeframe: 'April 2022 - Jun 2022',
                role: 'Front Engineer Intern',
                achievements: [
                    <>Collaborated with the development team to create an educational game using Blueprints and C++, enhancing students' learning experience through practical application.</>,
                    <>Contributed to the development of showcase demos for investors, demonstrating the game's potential and value proposition.</>
                ],
                images: [
                    {
                        src: '/images/projects/project-01/cover-01.jpg',
                        alt: 'MillionNeuron',
                        width: 16,
                        height: 9
                    }
                ]
            },
            {
                company: 'Intellichains',
                timeframe: 'October 2021 - December 2021',
                role: 'VFX / Graphic Designer',
                achievements: [
                    <>Produced engaging game trailers for upcoming releases as a VFX artist, leveraging industry-standard software to create high-quality visuals.</>,
                    <>Designed professional marketing materials, including PDFs, designs, and business cards, as part of the graphic design team.</>
                ],
                images: []
            },
            {
                company: 'Digital Fruition',
                timeframe: 'August 2021 - September 2021',
                role: 'Graphic Design Intern',
                achievements: [
                    <>Developed visually compelling social media content to increase brand engagement.</>,
                    <>Created over 600 posts for the company's social media, significantly boosting online presence.</>
                ],
                images: []
            },
            {
                company: 'Nirmal Sanstha',
                timeframe: 'July 2021',
                role: 'Volunteer Graphic Designer',
                achievements: [
                    <>Designed informative posters for the NGO's social media handles to raise awareness about their initiatives and activities.</>
                ],
                images: []
            }
        ]
    },
    studies: {
        display: true, // set to false to hide this section
        title: 'Studies',
        institutions: [
            {
                name: 'Sdvm',
                description: <>Class XII | 8 CGPA | 2023</>,
            },
            {
                name: 'IGNOU',
                description: <>B.C.A., Computer Applications | 7 CGPA | 2023 - 2026</>,
            },
            {
                name: 'Scaler',
                description: <>PG Diploma, Software Engineering | 7 CGPA | 2024 - 2025</>,
            }
        ]
    },
    technical: {
        display: true,
        title: 'Technical Expertise',
        skills: [
            {
                title: 'Next.js & React',
                description: <>Expert in building production-grade applications with Next.js 13+. Specialized in server components, dynamic routing, and optimal rendering strategies for maximum performance.</>,
                images: []
            },
            {
                title: 'Full Stack Development',
                description: <>Proven track record in developing end-to-end solutions using Node.js, Express, and MongoDB. Strong focus on API design, security best practices, and scalable architecture.</>,
                images: []
            },
            {
                title: 'Modern JavaScript & TypeScript',
                description: <>Advanced proficiency in ES6+ features and TypeScript. Experienced in building type-safe, maintainable codebases that scale.</>,
                images: []
            },
            {
                title: 'Performance Optimization',
                description: <>Skilled in implementing advanced optimization techniques including code splitting, lazy loading, and caching strategies for optimal user experience.</>,
                images: []
            },
            {
                title: 'State Management & Architecture',
                description: <>Expert in Redux, Context API, and modern state management patterns. Strong understanding of clean architecture principles and design patterns.</>,
                images: []
            },
            {
                title: 'UI/UX Implementation',
                description: <>Proficient in TailwindCSS and modern CSS features. Creating responsive, accessible, and pixel-perfect interfaces that engage users.</>,
                images: []
            },
            {
                title: 'Database Design',
                description: <>Experienced in both SQL and NoSQL databases. Skilled in data modeling, query optimization, and implementing efficient data access patterns with Prisma and raw queries.</>,
                images: []
            },
            {
                title: 'Testing & Quality Assurance',
                description: <>Strong advocate for automated testing using Jest and React Testing Library. Implementing comprehensive test coverage for reliable deployments.</>,
                images: []
            }
        ]
    }
}

const blog = {
    label: 'Blog',
    title: 'Writing about design and tech...',
    description: `Read what ${person.name} has been up to recently`
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
}

const work = {
    label: 'Work',
    title: 'My projects',
    description: `Design and dev projects by ${person.name}`
    // Create new project pages by adding a new .mdx file to app/blog/posts
    // All projects will be listed on the /home and /work routes
}

const gallery = {
    label: 'Gallery',
    title: 'My photo gallery',
    description: `A photo collection by ${person.name}`,
    images: [
        {
            src: '/images/gallery/img-01.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-02.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-03.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-04.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-05.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-06.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-07.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-08.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-09.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-10.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-11.jpg',
            alt: 'image',
            orientation: 'vertical'
        },
        {
            src: '/images/gallery/img-12.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-13.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
        {
            src: '/images/gallery/img-14.jpg',
            alt: 'image',
            orientation: 'horizontal'
        },
    ]
}

export { person, social, newsletter, home, about, blog, work, gallery };
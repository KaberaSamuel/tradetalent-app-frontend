import type { ReviewTypes } from "@/App.types";

export const mockReviews: ReviewTypes[] = [
  // Reviews for Anya Sharma
  {
    id: "e49c71e8-7821-435b-803a-3c58b1932387",
    user: {
      name: "David Miller",
      first_name: "David",
      name_initials: "DM",
      email: "davidmiller@example.com",
      location: "Sydney, Australia",
      about:
        "Experienced video editor and motion graphics artist. Loves bringing stories to life through compelling visual narratives.",
      services_offered: "Video Editing, Motion Graphics, Photography",
      services_needed: "Digital Marketing, Financial Consulting",
      profile_image: "https://picsum.photos/seed/davidmiller/200/200",
    },
    revieweeEmail: "kaberanshutisamuel@gmail.com",
    date: "Jun 2, 2025",
    message:
      "Incredibly professional and delivered the work on time. Highly recommend!",
    rating: 4,
  },
  {
    id: "8f8b0068-d055-46f0-a15e-e47c23171351",
    user: {
      name: "Maria Sanchez",
      first_name: "Maria",
      name_initials: "MS",
      email: "mariasanchez@example.com",
      location: "Mexico City, Mexico",
      about:
        "Certified personal trainer and nutritionist. I help clients achieve their fitness goals through personalized workout plans and dietary advice.",
      services_offered:
        "Personal Training, Nutrition Coaching, Health Consulting",
      services_needed: "Digital Marketing, Web Development",
      profile_image: "https://picsum.photos/seed/mariasanch/200/200",
    },
    revieweeEmail: "kaberanshutisamuel@gmail.com",
    date: "Jul 8, 2025",
    message:
      "Great collaboration and communication throughout the project. Very happy with the result.",
    rating: 5,
  },
  {
    id: "97b1029c-648c-4a30-81f1-c42e20b3221b",
    user: {
      name: "Patrick Jones",
      first_name: "Patrick",
      name_initials: "PJ",
      email: "patrickjones@example.com",
      location: "Chicago, USA",
      about:
        "Seasoned photographer specializing in portraits and event coverage. I capture moments that tell a story.",
      services_offered: "Photography, Video Editing",
      services_needed: "Web Development, Social Media Management",
      profile_image: "https://picsum.photos/seed/patrickjones/200/200",
    },
    revieweeEmail: "kaberanshutisamuel@gmail.com",
    date: "Aug 4, 2025",
    message:
      "A pleasure to work with. The quality of work exceeded my expectations.",
    rating: 4,
  },
  {
    id: "27e462d7-c81b-4393-979a-2475e11059f1",
    user: {
      name: "Frank Williams",
      first_name: "Frank",
      name_initials: "FW",
      email: "frankwilliams@example.com",
      location: "London, UK",
      about:
        "Project manager with a background in software development. I specialize in agile methodologies and leading cross-functional teams to success.",
      services_offered: "Project Management, Agile Coaching",
      services_needed: "Copywriting, Data Analysis",
      profile_image: "https://picsum.photos/seed/frankwilliams/200/200",
    },
    revieweeEmail: "kaberanshutisamuel@gmail.com",
    date: "Jul 29, 2025",
    message:
      "Provided valuable insights and a great solution. Will definitely hire again.",
    rating: 5,
  },
  {
    id: "e98e2197-e898-4c91-9556-912a76f658b1",
    user: {
      name: "Tina Wong",
      first_name: "Tina",
      name_initials: "TW",
      email: "tinawong@example.com",
      location: "Hong Kong, Hong Kong",
      about:
        "Experienced nurse and health educator. I provide telehealth consultations and wellness workshops to help people live healthier lives.",
      services_offered:
        "Health Consulting, Wellness Workshops, Patient Education",
      services_needed: "App Development, Video Editing",
      profile_image: "https://picsum.photos/seed/tinawong/200/200",
    },
    revieweeEmail: "kaberanshutisamuel@gmail.com",
    date: "Aug 11, 2025",
    message:
      "Super fast and efficient. The final product was exactly what I was looking for.",
    rating: 4,
  },
  {
    id: "c6204c6b-9c7a-4286-905e-a61250325d30",
    user: {
      name: "Jack Smith",
      first_name: "Jack",
      name_initials: "JS",
      email: "jacksmith@example.com",
      location: "San Francisco, USA",
      about:
        "Product manager with a background in data analysis. I use data-driven insights to guide product development and strategy.",
      services_offered: "Product Management, Data Analysis",
      services_needed: "Graphic Design, Video Editing",
      profile_image: "https://picsum.photos/seed/jacksmith/200/200",
    },
    revieweeEmail: "kaberanshutisamuel@gmail.com",
    date: "Jun 26, 2025",
    message:
      "Excellent skills and a very positive attitude. Made the entire process enjoyable.",
    rating: 5,
  },
  {
    id: "1d2d385f-8c3b-482a-a924-118c7c9868e8",
    user: {
      name: "Olivia White",
      first_name: "Olivia",
      name_initials: "OW",
      email: "oliviawhite@example.com",
      location: "Toronto, Canada",
      about:
        "Event planner and hospitality professional. I organize seamless events, from small corporate gatherings to large-scale weddings.",
      services_offered: "Event Planning, Project Management",
      services_needed: "Digital Marketing, Photography",
      profile_image: "https://picsum.photos/seed/oliviawhite/200/200",
    },
    revieweeEmail: "kaberanshutisamuel@gmail.com",
    date: "Jul 17, 2025",
    message: "Very thoughtful and detail-oriented. The work was flawless.",
    rating: 4,
  },
  {
    id: "a5d09f7b-99f6-424a-826d-a60d009b0b4b",
    user: {
      name: "Isabella Rossi",
      first_name: "Isabella",
      name_initials: "IR",
      email: "isabellarossi@example.com",
      location: "Rome, Italy",
      about:
        "Content writer and journalist. I create engaging content for blogs, websites, and social media platforms, with a focus on technology and lifestyle topics.",
      services_offered: "Content Writing, SEO Optimization",
      services_needed: "UI/UX Design, Digital Marketing",
      profile_image: "https://picsum.photos/seed/isabellarossi/200/200",
    },
    revieweeEmail: "kaberanshutisamuel@gmail.com",
    date: "May 31, 2025",
    message:
      "Handled all my requests and revisions quickly and professionally.",
    rating: 5,
  },
  {
    id: "02587522-a5e2-4161-9c63-469b82875149",
    user: {
      name: "Noah Kim",
      first_name: "Noah",
      name_initials: "NK",
      email: "noahkim@example.com",
      location: "Seoul, South Korea",
      about:
        "Experienced market researcher and data analyst. I provide businesses with valuable insights to inform their strategic decisions.",
      services_offered: "Data Analysis, Market Research, Business Strategy",
      services_needed: "Graphic Design, Content Writing",
      profile_image: "https://picsum.photos/seed/noahkim/200/200",
    },
    revieweeEmail: "kaberanshutisamuel@gmail.com",
    date: "Jun 16, 2025",
    message:
      "Showed great initiative and helped me improve my original idea. Thank you!",
    rating: 4,
  },
  {
    id: "e4d754b2-a42e-4b68-b3d1-443b717c1a8c",
    user: {
      name: "Samuel Garcia",
      first_name: "Samuel",
      name_initials: "SG",
      email: "samuelgarcia@example.com",
      location: "São Paulo, Brazil",
      about:
        "Financial consultant helping small businesses with budgeting, investments, and long-term financial planning. Passionate about empowering entrepreneurs.",
      services_offered: "Financial Consulting, Accounting, Business Strategy",
      services_needed: "Web Development, Graphic Design",
      profile_image: "https://picsum.photos/seed/samuelgarcia/200/200",
    },
    revieweeEmail: "kaberanshutisamuel@gmail.com",
    date: "Jul 2, 2025",
    message:
      "An expert in their field. I learned a lot just from working with them.",
    rating: 5,
  },
  {
    id: "c1f73752-d1d6-4447-9759-d890066b1a32",
    user: {
      name: "Liam O'Connell",
      first_name: "Liam",
      name_initials: "LO",
      email: "liamoconnell@example.com",
      location: "Dublin, Ireland",
      about:
        "Professional content creator focusing on YouTube and social media. I specialize in video production, editing, and audience engagement.",
      services_offered:
        "Content Creation, Video Editing, Social Media Management",
      services_needed: "Graphic Design, Web Development",
      profile_image: "https://picsum.photos/seed/liamoconnell/200/200",
    },
    revieweeEmail: "kaberanshutisamuel@gmail.com",
    date: "Aug 7, 2025",
    message: "Highly reliable and committed to the project's success.",
    rating: 4,
  },
  {
    id: "766522c0-82d8-4f16-836e-d306b3a2468f",
    user: {
      name: "Yara Haddad",
      first_name: "Yara",
      name_initials: "YH",
      email: "yarahaddad@example.com",
      location: "Beirut, Lebanon",
      about:
        "Digital marketing strategist specializing in brand growth and SEO. I help businesses increase their online visibility and connect with their target audience.",
      services_offered: "Digital Marketing, SEO Optimization, Content Writing",
      services_needed: "Web Development, Graphic Design",
      profile_image: "https://picsum.photos/seed/yarahaddad/200/200",
    },
    revieweeEmail: "kaberanshutisamuel@gmail.com",
    date: "Aug 4, 2025",
    message:
      "The project was complex, but they made it seem easy. Truly a professional.",
    rating: 5,
  },
  // Reviews for Chen Wei
  {
    id: "217a6a48-4c8d-4a11-8551-7e8c339c63b4",
    user: {
      name: "Emily Rodriguez",
      first_name: "Emily",
      name_initials: "ER",
      email: "emilyrodriguez@example.com",
      location: "Madrid, Spain",
      about:
        "Marketing specialist with a focus on social media and digital campaigns. I help businesses connect with their audience and grow their brand.",
      services_offered:
        "Digital Marketing, Social Media Management, Photography",
      services_needed: "Graphic Design, Web Development",
      profile_image: "https://picsum.photos/seed/emilyrodriguez/200/200",
    },
    revieweeEmail: "chenwei@example.com",
    date: "Aug 9, 2025",
    message:
      "Incredibly professional and delivered the work on time. Highly recommend!",
    rating: 5,
  },
  {
    id: "d748f323-95c5-4235-866a-122e1b12b582",
    user: {
      name: "Anya Sharma",
      first_name: "Anya",
      name_initials: "AS",
      email: "kaberanshutisamuel@gmail.com",
      location: "Mumbai, India",
      about:
        "Graphic designer with a passion for creating impactful brand identities. Experienced in both digital and print media, always looking for new challenges.",
      services_offered: "Graphic Design, Brand Strategy, UI/UX Design",
      services_needed: "Web Development, Social Media Management",
      profile_image: "https://picsum.photos/seed/anyasharma/200/200",
    },
    revieweeEmail: "chenwei@example.com",
    date: "Jun 16, 2025",
    message:
      "Great collaboration and communication throughout the project. Very happy with the result.",
    rating: 4,
  },
  {
    id: "a98e8211-e408-46c5-ac33-b922055621a6",
    user: {
      name: "Kira Suzuki",
      first_name: "Kira",
      name_initials: "KS",
      email: "kirasuzuki@example.com",
      location: "Tokyo, Japan",
      about:
        "Front-end developer and UI/UX enthusiast. Passionate about creating beautiful and functional user interfaces.",
      services_offered: "Web Development, UI/UX Design",
      services_needed: "Project Management, Photography",
      profile_image: "https://picsum.photos/seed/kirasuzuki/200/200",
    },
    revieweeEmail: "chenwei@example.com",
    date: "Jul 11, 2025",
    message:
      "A pleasure to work with. The quality of work exceeded my expectations.",
    rating: 5,
  },
  {
    id: "e6a0d2f0-f94a-43d9-a41b-4f6b088b9070",
    user: {
      name: "Victor Nwankwo",
      first_name: "Victor",
      name_initials: "VN",
      email: "victornwankwo@example.com",
      location: "Lagos, Nigeria",
      about:
        "Experienced UX/UI designer with a passion for creating intuitive and beautiful user interfaces. Skilled in wireframing, prototyping, and user research.",
      services_offered: "UI/UX Design, Web Development",
      services_needed: "Project Management, Content Writing",
      profile_image: "https://picsum.photos/seed/victornwankwo/200/200",
    },
    revieweeEmail: "chenwei@example.com",
    date: "Jun 25, 2025",
    message:
      "Provided valuable insights and a great solution. Will definitely hire again.",
    rating: 4,
  },
  {
    id: "b11a0f9b-1e76-4a41-8656-658f8b6c4961",
    user: {
      name: "Tina Wong",
      first_name: "Tina",
      name_initials: "TW",
      email: "tinawong@example.com",
      location: "Hong Kong, Hong Kong",
      about:
        "Experienced nurse and health educator. I provide telehealth consultations and wellness workshops to help people live healthier lives.",
      services_offered:
        "Health Consulting, Wellness Workshops, Patient Education",
      services_needed: "App Development, Video Editing",
      profile_image: "https://picsum.photos/seed/tinawong/200/200",
    },
    revieweeEmail: "chenwei@example.com",
    date: "Jul 29, 2025",
    message:
      "Super fast and efficient. The final product was exactly what I was looking for.",
    rating: 5,
  },
  {
    id: "f86230f8-a006-4074-b778-9842a20e2e9c",
    user: {
      name: "Jack Smith",
      first_name: "Jack",
      name_initials: "JS",
      email: "jacksmith@example.com",
      location: "San Francisco, USA",
      about:
        "Product manager with a background in data analysis. I use data-driven insights to guide product development and strategy.",
      services_offered: "Product Management, Data Analysis",
      services_needed: "Graphic Design, Video Editing",
      profile_image: "https://picsum.photos/seed/jacksmith/200/200",
    },
    revieweeEmail: "chenwei@example.com",
    date: "Jul 23, 2025",
    message:
      "Excellent skills and a very positive attitude. Made the entire process enjoyable.",
    rating: 4,
  },
  {
    id: "35d6447e-8c67-4251-b847-1905398d5c48",
    user: {
      name: "Yara Haddad",
      first_name: "Yara",
      name_initials: "YH",
      email: "yarahaddad@example.com",
      location: "Beirut, Lebanon",
      about:
        "Digital marketing strategist specializing in brand growth and SEO. I help businesses increase their online visibility and connect with their target audience.",
      services_offered: "Digital Marketing, SEO Optimization, Content Writing",
      services_needed: "Web Development, Graphic Design",
      profile_image: "https://picsum.photos/seed/yarahaddad/200/200",
    },
    revieweeEmail: "chenwei@example.com",
    date: "May 27, 2025",
    message: "Very thoughtful and detail-oriented. The work was flawless.",
    rating: 5,
  },
  {
    id: "18f9c0c1-26c6-4318-8f83-d28f09d8d641",
    user: {
      name: "Olivia White",
      first_name: "Olivia",
      name_initials: "OW",
      email: "oliviawhite@example.com",
      location: "Toronto, Canada",
      about:
        "Event planner and hospitality professional. I organize seamless events, from small corporate gatherings to large-scale weddings.",
      services_offered: "Event Planning, Project Management",
      services_needed: "Digital Marketing, Photography",
      profile_image: "https://picsum.photos/seed/oliviawhite/200/200",
    },
    revieweeEmail: "chenwei@example.com",
    date: "Jun 26, 2025",
    message:
      "Handled all my requests and revisions quickly and professionally.",
    rating: 4,
  },
  {
    id: "51406456-4252-4752-9653-5290b22a6135",
    user: {
      name: "Rachel Tan",
      first_name: "Rachel",
      name_initials: "RT",
      email: "racheltan@example.com",
      location: "Singapore, Singapore",
      about:
        "Architectural designer with a focus on sustainable and modern urban spaces. I use my skills to create functional and aesthetically pleasing buildings.",
      services_offered: "Architectural Design, Urban Planning, 3D Modeling",
      services_needed: "Web Development, Digital Marketing",
      profile_image: "https://picsum.photos/seed/racheltan/200/200",
    },
    revieweeEmail: "chenwei@example.com",
    date: "Aug 10, 2025",
    message:
      "Showed great initiative and helped me improve my original idea. Thank you!",
    rating: 5,
  },
  {
    id: "7f870a31-6415-46b6-8968-3e4b4765d796",
    user: {
      name: "Frank Williams",
      first_name: "Frank",
      name_initials: "FW",
      email: "frankwilliams@example.com",
      location: "London, UK",
      about:
        "Project manager with a background in software development. I specialize in agile methodologies and leading cross-functional teams to success.",
      services_offered: "Project Management, Agile Coaching",
      services_needed: "Copywriting, Data Analysis",
      profile_image: "https://picsum.photos/seed/frankwilliams/200/200",
    },
    revieweeEmail: "chenwei@example.com",
    date: "Jun 20, 2025",
    message:
      "An expert in their field. I learned a lot just from working with them.",
    rating: 4,
  },
  {
    id: "893d5006-c875-43a0-8914-1e0f6b3e346f",
    user: {
      name: "Hassan Khan",
      first_name: "Hassan",
      name_initials: "HK",
      email: "hassankhan@example.com",
      location: "Dubai, UAE",
      about:
        "Web developer with a keen eye for user experience. I build clean, efficient, and user-friendly websites and applications.",
      services_offered: "Web Development, UI/UX Design, SEO Optimization",
      services_needed: "Content Writing, Video Editing",
      profile_image: "https://picsum.photos/seed/hassankhan/200/200",
    },
    revieweeEmail: "chenwei@example.com",
    date: "Jun 16, 2025",
    message: "Highly reliable and committed to the project's success.",
    rating: 5,
  },
  {
    id: "4164b8f3-8b43-4315-9988-c70a84e6015f",
    user: {
      name: "Samuel Garcia",
      first_name: "Samuel",
      name_initials: "SG",
      email: "samuelgarcia@example.com",
      location: "São Paulo, Brazil",
      about:
        "Financial consultant helping small businesses with budgeting, investments, and long-term financial planning. Passionate about empowering entrepreneurs.",
      services_offered: "Financial Consulting, Accounting, Business Strategy",
      services_needed: "Web Development, Graphic Design",
      profile_image: "https://picsum.photos/seed/samuelgarcia/200/200",
    },
    revieweeEmail: "chenwei@example.com",
    date: "Jul 21, 2025",
    message:
      "The project was complex, but they made it seem easy. Truly a professional.",
    rating: 4,
  },
];

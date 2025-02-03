interface BlogPost {
    id: string;
    title: string;
    image: string;
    content: string;
    description: string;
    slug: string;
    authorId: string;
    teamId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    metadata: any | null;
    author: {
      name: string;
      image: string;
    };
    tags: {
      id: string;
      name: string;
    }[];
  }
  
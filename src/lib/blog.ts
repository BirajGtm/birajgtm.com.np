import { getCollection } from "astro:content";
import { DEVTO_USERNAME } from "../consts";

export async function getAllPosts() {
  const localPosts = await getCollection("blog");

  // Fetch Dev.to posts
  let devtoPosts = [];
  try {
    const response = await fetch(`https://dev.to/api/articles?username=${DEVTO_USERNAME}`);
    if (response.ok) {
      const data = await response.json();
      devtoPosts = data.map((post: any) => ({
        id: post.id.toString(),
        slug: post.slug,
        title: post.title,
        description: post.description,
        pubDate: new Date(post.published_at),
        heroImage: post.cover_image || post.social_image,
        tags: post.tag_list || [],
        readingTime: `${post.reading_time_minutes} min read`,
        originalUrl: post.url,
        isExternal: true,
      }));
    }
  } catch (error) {
    console.error("Error fetching Dev.to posts:", error);
  }

  // Calculate reading time and prepare data
  const enhancedLocalPosts = localPosts.map((post) => {
    const wordCount = post.body.split(/\s+/g).length;
    const readingTime = Math.ceil(wordCount / 200); // ~200 words per minute
    const slug = post.id.replace(/\.md$/, "");
    return {
      id: post.id.replace(/\.md$/, ""),
      slug: slug,
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      heroImage: post.data.heroImage,
      tags: post.data.tags || [],
      readingTime: `${readingTime} min read`,
      isExternal: false,
    };
  });

  return [...enhancedLocalPosts, ...devtoPosts].sort(
    (a, b) => b.pubDate.valueOf() - a.pubDate.valueOf(),
  );
}

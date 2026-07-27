import { createClient } from "next-sanity";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";
export const useCdn = false;

export const sanityClient = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null;

export async function getPosts() {
  if (!sanityClient) {
    return [];
  }

  try {
    return await sanityClient.fetch(
      `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        categories,
        author->{name}
      }`
    );
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  if (!sanityClient) {
    return null;
  }

  try {
    return await sanityClient.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        body,
        categories,
        author->{name}
      }`,
      { slug }
    );
  } catch {
    return null;
  }
}

export async function getSimilarPosts(currentSlug: string) {
  if (!sanityClient) {
    return [];
  }

  try {
    return await sanityClient.fetch(
      `*[_type == "post" && slug.current != $currentSlug && defined(slug.current)]|order(publishedAt desc)[0..2]{
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage
      }`,
      { currentSlug }
    );
  } catch {
    return [];
  }
}

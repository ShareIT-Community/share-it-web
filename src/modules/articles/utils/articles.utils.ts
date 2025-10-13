import { getTagNamesByEntries } from "@helpers/tagHelper"
import { getCollection } from "astro:content"

const articles = await getCollection('articles', ({ data }) => !data.draft)
const authors = await getCollection('authors')

// Get all tags
const tagEntries = await getCollection('tags')
const tagMap = new Map(tagEntries.map((tag) => [tag.id, tag.data]))

// Combine articles with authors
const articlesWithAuthors = articles
    .map((article) => {
        const author = authors.find(
            (author) => author.id === article.data.author.id
        )
        return {
            ...article,
            author: author?.data || null,
        }
    })
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())

// Get tags for each article
const tagNamesByArticles = await getTagNamesByEntries(articles)

function getUniqueTags() {
    const tagIds = new Set<string>()
    const uniqueTags: Array<{ id: string; name: string }> = []

    articles.forEach((article) => {
        article.data.tags.forEach((tag) => {
            if (!tagIds.has(tag.id)) {
                tagIds.add(tag.id)
                const tagData = tagMap.get(tag.id)
                uniqueTags.push({
                    id: tag.id,
                    name: tagData?.name || tag.id,
                })
            }
        })
    })

    return uniqueTags.sort((a, b) => a.name.localeCompare(b.name))
}

const allTags = getUniqueTags()

const latestArticles = articles
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
  .slice(0, 2)
const tagNamesByArticle = await getTagNamesByEntries(latestArticles);

export { articlesWithAuthors, tagMap, tagNamesByArticles, allTags, articles, tagNamesByArticle, latestArticles }
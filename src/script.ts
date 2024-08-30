import { readFileSync } from "fs";
import splitMetadataFromMDContent from "parse-md";
import { Marked } from "marked";
import { v4 as uuidv4 } from "uuid";

type Metadata = {
  published: boolean;
  title: string;
  description: string;
  date: Date;
  slug: string;
  tags?: string[];
  imageUrl?: string;
};
function parseMarkdownFile(filepath: string) {
  const myFile = readFileSync("content/chris.md", "utf-8");
  const { metadata, content } = splitMetadataFromMDContent(myFile) as {
    metadata: Metadata;
    content: string;
  };

  const marked = new Marked();
  const html = marked.parse(content);

  const output = {
    id: uuidv4(),
    metadata,
    html,
  };
  return output;
}

function validateMetadata(metadata: unknown, fileName: string) {
  if (typeof metadata != "object" || metadata === null) {
    return false;
  }

  const { published, title, description, date, slug, tags, imageUrl } =
    metadata as Metadata;
  try {
    if (typeof published !== "boolean") {
      throw new Error("The markdown must contain a published boolean.");
    }
    if (typeof title !== "string") {
      throw new Error("The markdown must contain a valid title string.");
    }
    if (typeof description !== "string") {
      throw new Error("The markdown must contain a valid description string.");
    }
    if (!(date instanceof Date)) {
      throw new Error("The markdown must contain a valid date object.");
    }
    if (typeof slug !== "string") {
      throw new Error("The markdown must contain a valid slug string.");
    }
    if (
      imageUrl &&
      !imageUrl.startsWith("http://") &&
      !imageUrl.startsWith("https://") &&
      !imageUrl.startsWith("/")
    ) {
      throw new Error(
        "imageUrl must be an absolute URL or a path starting with /\nExample: /images/my-image.jpg for image in public folder\nOr: https://example.com/image.jpg for an external image"
      );
    }
  } catch (error) {
    if ("message" in (error as Error)) {
      console.error(
        "There was an error inside of " + fileName + ":\n",
        // @ts-expect-error
        error.message
      );
    }
    return false;
  }
  return true;
}

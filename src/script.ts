import { readFileSync } from "fs";
import splitMetadataFromMDContent from "parse-md";

type Metadata = {
  published: boolean;
  title: string;
  description: string;
  date: Date;
  slug: string;
  tags?: string[];
  imageUrl?: string;
};

const myFile = readFileSync("content/test.md", "utf-8");
const { metadata, content } = splitMetadataFromMDContent(myFile) as {
  metadata: Metadata;
  content: string;
};

if (typeof metadata.published != "boolean") {
  throw new Error("The markdown must contain a published boolean.");
}
if (typeof metadata.title != "string") {
  throw new Error("The markdown must contain a valid title string.");
}
if (typeof metadata.description != "string") {
  throw new Error("The markdown must contain a valid description string.");
}
if (typeof metadata.date != "string") {
  throw new Error("The markdown must contain a valid date object.");
}
if (typeof metadata.slug != "string") {
  throw new Error("The markdown must contain a valid slug string.");
}

// These are incase we make tags and imageUrl a required prop.
// if (typeof metadata.tags != "string") {
//   throw new Error("The markdown must contain a valid tags string.");
// }
// if (typeof metadata.imageUrl != "string") {
//   throw new Error("The markdown must contain a valid imageUrl string.");
// }

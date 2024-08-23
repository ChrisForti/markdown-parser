import { readFileSync } from "fs";
import splitMetadataFromMDContent from "parse-md";

type Metadata = {
  published: boolean;
  title: string;
  description: string;
  date: Date;
  slug: string;
  tags: string;
  imageUrl: string;
};

const myFile = readFileSync("content/test.md", "utf-8");
const { metadata, content } = splitMetadataFromMDContent(myFile) as {
  metadata: Metadata;
  content: string;
};

if (typeof metadata.published != "boolean") {
  throw new Error("The markdown must contain a published boolean.");
}

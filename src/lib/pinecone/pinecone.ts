import { downloadFileFromS3 } from "../aws/s3-server";
import { Pinecone, PineconeRecord } from "@pinecone-database/pinecone";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { getEmbeddings } from "../embeddings";
import md5 from "md5";
import { convertToAscii } from "../utils";
import { getPineconeClient } from "./client";
import { db } from "@/db";

// Type definition for a PDF page
type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};

export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};

// Prepare document for vectorization
async function prepareFile(page: PDFPage) {
  let { pageContent, metadata } = page;

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1024,
    chunkOverlap: 20,
    separators: ["\n", " ", ".", ",", "!", "?", ";", ":"],
  });
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: pageContent,
      },
    }),
  ]);
  return docs;
}

async function embedDocument(doc: Document) {
  try {
    const embeddings = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);

    return {
      id: hash,
      values: embeddings,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {
    console.log("Error embedding document", error);
    throw error;
  }
}

// Send S3 file to Pinecone
export async function uploadToPinecone(fileId: string) {
  console.log("Downloading file from S3..");

  const fileName = await downloadFileFromS3(fileId);

  if (!fileName) {
    throw new Error("Could not download from s3.");
  }

  const loader = new PDFLoader(fileName);
  const pages = (await loader.load()) as PDFPage[];

  const pageCount = pages.length;
  console.log("pageCount:", pageCount);

  const documents = await Promise.all(pages.map(prepareFile));
  const vectors = await Promise.all(documents.flat().map(embedDocument));
  const pinecone = getPineconeClient();
  const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);
  await pineconeIndex.upsert(vectors);

  console.log("Uploaded vectors to Pinecone.");

  await db.file.update({
    data: {
      uploadStatus: "SUCCESS",
    },
    where: {
      id: fileId,
    },
  });
  return documents[0];
}

export async function getMatches(embeddings: number[], fileId: string) {
  try {
    const pinecone = getPineconeClient();
    const pineconeIndex = pinecone.index(process.env.PINECONE_INDEX!);

    // const namespace = pineconeIndex.namespace(convertToAscii(fileId));
    // const queryResult = await namespace.query({
    //     topK: 5, // Return top 5 similar vectors
    //     vector: embeddings, // Vector to query against
    //     includeMetadata: true,
    //     filter: {},
    // });

    // Query entire index for now
    // TODO: Fix querying with fileId
    const queryResult = await pineconeIndex.query({
      topK: 5, // Return top 5 similar vectors
      vector: embeddings, // Vector to query against
      includeMetadata: true,
      filter: {},
    });

    return queryResult.matches || [];
  } catch (error) {
    console.log("Error querying embeddings", error);
    throw error;
  }
}

export async function getContext(query: string, fileId: string) {
  const queryEmbeddings = await getEmbeddings(query);
  const matches = await getMatches(queryEmbeddings, fileId);

  const qualifyingDocs = matches.filter(
    (match) => match.score && match.score > 0.7
  );

  type Metadata = {
    text: string;
    pageNumber: number;
  };

  let docs = qualifyingDocs.map((match) => (match.metadata as Metadata).text);

  return docs.join("\n").substring(0, 3000);
}

export const deleteFromPinecone = async (fileId: string) => {
  try {
    const pinecone = getPineconeClient();
    const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

    // Delete the records from Pinecone
    await pineconeIndex.deleteOne(fileId);

    console.log(`Deleted records associated with fileId: ${fileId}`);
  } catch (error) {
    console.error("Error deleting records from Pinecone", error);
    throw error;
  }
};

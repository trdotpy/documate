# DocuMate

DocuMate is a Next.js project that allows users to upload PDF files and interact with them using a state-of-the-art AI assistant. The application is designed to be user-friendly and efficient, providing a seamless experience for users.

## Getting Started

To get started with the project, clone the repository and install the dependencies using either npm, yarn, pnpm, or bun:
install

Then, start the development server:
dev

Open http://localhost:3000 with your browser to see the result. You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

## Run Locally

Clone the project

```bash
  git clone https://github.com/trdotpy/documate
```

Go to the project directory

```bash
  cd documate
```

Install dependencies

```bash
  npm install
```

Set environment variables

```bash
`CLERK_SECRET_KEY`
`CLERK_WEBHOOK_SECRET`
`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

`NEXT_PUBLIC_S3_ACCESS_KEY`
`NEXT_PUBLIC_S3_SECRET_KEY`
`NEXT_PUBLIC_S3_BUCKET_NAME`
`NEXT_PUBLIC_S3_REGION`

`PINECONE_ENVIRONMENT_KEY`
`PINECONE_API_KEY`
`PINECONE_INDEX`

`OPENAI_API_KEY`

`DATABASE_URL`

`WEBHOOK_SECRET`

`STRIPE_SECRET_KEY`

`STRIPE_WEBHOOK_SECRET`
```

Start the server

```bash
  npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)

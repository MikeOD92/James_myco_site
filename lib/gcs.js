import { Storage } from "@google-cloud/storage";

const storage = new Storage({
  credentials: {
    type: "service_account",
    project_id: process.env.NEXT_PUBLIC_GCP_PROJECTID,
    private_key_id: process.env.NEXT_PUBLIC_PRIVATE_KEY_ID,
    private_key: process.env.NEXT_PUBLIC_PRIVATE_KEY.split(String.raw`\n`).join(
      "\n"
    ),
    client_email: process.env.NEXT_PUBLIC_CLIENT_EMAIL,
    client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: process.env.NEXT_PUBLIC_CLIENT_X509_CERT_URL,
  },
});

const bucket = storage.bucket(process.env.NEXT_PUBLIC_BUCKET);

export const createStream = (file) => {
  const ref = bucket.file(file);

  const stream = ref.createWriteStream({
    gzip: true,
    contentType: file.mimeType,
  });

  return stream;
};

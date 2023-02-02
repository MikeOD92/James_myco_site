import "../styles/globals.css";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";
import { SessionProvider } from "next-auth/react";
import Header from "../components/Header";
import { motion, AnimatePresence } from "framer-motion";
import { Storage } from "@google-cloud/storage";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Header />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} />
      </AnimatePresence>
    </SessionProvider>
  );
}

export default MyApp;

export async function getServerSideProps() {
  const bucket = new Storage.bucket("my-bucket", {
    cors: [
      {
        methods: ["POST"],
        origins: ["*"],
        responseHeaders: ["*"],
      },
    ],
    forceDestroy: true,
  });
  exports.bucketName = bucket.url;
}

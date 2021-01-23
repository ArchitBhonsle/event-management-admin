import { Button } from "@chakra-ui/react";
import Layout from "../components/Layout";
import easyFetch from "../utils/easyFetch";

export default function Dashboard() {
  return (
    <Layout>
      <Button
        onClick={async () => {
          const { data, error } = await easyFetch("auth/me", {}, "GET");
          console.log({ data, error });
        }}
      >
        Me
      </Button>
    </Layout>
  );
}

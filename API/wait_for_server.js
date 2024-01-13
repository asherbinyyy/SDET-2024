import { execSync } from "child_process";

function waitForServer() {
  const maxAttempts = 30; // Adjust the number of attempts as needed
  const delay = 1000; // Adjust the delay between attempts in milliseconds
  const targetUrl = "http://localhost:3000";
  function checkServer() {
    try {
      // Use curl to make a HEAD request and check the response status
      const result = execSync(
        `curl -s -o /dev/null -w "%{http_code}" ${targetUrl}`,
        { stdio: ["pipe", "pipe", "ignore"], encoding: "utf-8" }
      );

      const statusCode = result.trim();
      if (statusCode === "404") {
        console.log("Server is ready!");
        return true;
      } else {
        console.log(`Server returned status code ${statusCode}. Retrying...`);
        return false;
      }
    } catch (error) {
      const statusCode = error.stdout.trim();
      console.error(
        `Error executing curl command. Exit code: ${error.status}, Stdout: ${statusCode}, Stderr: ${error.stderr}`
      );

      if (statusCode === "404") {
        console.log("Server is ready!");
        return true;
      }

      return false;
    }
  }

  async function poll() {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
      console.log(
        `Checking if the server is ready (Attempt ${attempt}/${maxAttempts})`
      );

      if (checkServer()) {
        console.log("Server is ready!");
        return;
      }

      // Wait for a short duration before the next attempt
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    console.error(
      "Timeout: Server did not become ready within the specified time."
    );
    process.exit(1);
  }

  poll();
}

waitForServer();

#!/usr/bin/env node

/**
 * Person CRUD MCP Server
 * 
 * This MCP server provides tools to perform CRUD operations on Person records
 * through Claude Desktop using Model Context Protocol (MCP).
 * 
 * To use this server in Claude Desktop:
 * 1. Install the MCP server package globally
 * 2. Add it to your Claude Desktop config.json
 * 3. Restart Claude Desktop
 * 4. Use the Person CRUD tools in conversations
 */

import StdioClientTransport from "@modelcontextprotocol/sdk/client/stdio";
import { Client } from "@modelcontextprotocol/sdk/client/index";
import readline from "readline";

const client = new Client(
  {
    name: "person-crud-client",
    version: "1.0.0",
  },
  {
    capabilities: {},
  }
);

async function main() {
  // Transport to connect to the MCP server
  const transport = new StdioClientTransport({
    command: "node",
    args: ["person-mcp-server.js"],
  });

  await client.connect(transport);

  console.log("=== Person CRUD MCP Client ===");
  console.log("Connected to Person CRUD MCP Server");
  console.log("\nAvailable tools:");
  console.log("- create_person: Create a new person record");
  console.log("- read_people: Fetch all people or a specific person");
  console.log("- update_person: Update a person's information");
  console.log("- delete_person: Delete a person record");
  console.log("\nType 'help' for command syntax or 'exit' to quit.\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = () => {
    rl.question("> ", async (input) => {
      if (input.toLowerCase() === "exit") {
        console.log("Goodbye!");
        rl.close();
        process.exit(0);
      }

      try {
        const result = await client.callTool(input);
        console.log("Result:", result);
      } catch (error) {
        console.error("Error:", error);
      }

      askQuestion();
    });
  };

  askQuestion();
}

main().catch(console.error);

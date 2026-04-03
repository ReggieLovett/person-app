import prisma from "../lib/prisma";

async function main() {
  console.log("🌱 Seeding database with sample data...");

  const samplePeople = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      age: 28,
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      age: 32,
    },
    {
      name: "Robert Johnson",
      email: "robert.johnson@example.com",
      age: 45,
    },
    {
      name: "Emily Williams",
      email: "emily.williams@example.com",
      age: 26,
    },
    {
      name: "Michael Brown",
      email: "michael.brown@example.com",
      age: 35,
    },
    {
      name: "Sarah Davis",
      email: "sarah.davis@example.com",
      age: 29,
    },
  ];

  try {
    // Clear existing data
    await prisma.person.deleteMany({});
    console.log("✓ Cleared existing data");

    // Create sample people
    for (const person of samplePeople) {
      await prisma.person.create({
        data: person,
      });
    }

    console.log(`✓ Created ${samplePeople.length} sample people`);
    console.log("✓ Database seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
